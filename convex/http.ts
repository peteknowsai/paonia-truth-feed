import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

const http = httpRouter();

// Clerk webhook endpoint
http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payload = await request.text();
    const headers = request.headers;

    // Get the Svix headers for verification
    const svix_id = headers.get("svix-id");
    const svix_timestamp = headers.get("svix-timestamp");
    const svix_signature = headers.get("svix-signature");

    // If any are missing, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing Svix headers", { status: 400 });
    }

    // Get the webhook secret from environment variable
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return new Response("Error: Missing CLERK_WEBHOOK_SECRET", { status: 500 });
    }

    // Create a new Svix instance with the secret
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error: Verification failed", { status: 400 });
    }

    // Handle the webhook events
    const eventType = evt.type;
    console.log(`Received webhook event: ${eventType}`);

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data;
      
      // Store user in database
      await ctx.runMutation(internal.users.store, {
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        firstName: first_name || "",
        lastName: last_name || "",
        imageUrl: image_url || "",
      });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      
      // Delete user from database
      await ctx.runMutation(internal.users.deleteUser, {
        clerkId: id!,
      });
    }

    return new Response("Webhook processed", { status: 200 });
  }),
});

export default http;