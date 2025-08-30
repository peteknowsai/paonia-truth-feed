import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const addDatesToPosts = internalMutation({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    
    // Map of post titles to dates based on user's requirements:
    // Story 1: 8/25, Story 2: 6/25, Story 3: 1/25, Story 4: 8/24, Story 5: 8/23, Story 6: 6/25, Story 7: 5/25
    const dateMappings: Record<string, string> = {
      "Mystery Robots Deploy While Democracy Dies": "Aug-25",
      "Town Claims Microsoft 365 Has No Audit Logs (Microsoft Says Otherwise)": "Jun-25",
      "The Administrator Who Rules Through Intimidation": "Jan-25",
      "Town Hires Attorney Previously Replaced for Losing Voter Rights Case": "Aug-24",
      "Secret Meeting About Already-Rejected Initiative": "Aug-23",
      "Stop the Cameras Before They Watch Our Kids": "Jun-25",
      "The Paper Trail of a Bad Rejection — Emails, meetings, and a flipped reading": "May-25"
    };

    for (const post of posts) {
      const date = dateMappings[post.title];
      if (date) {
        await ctx.db.patch(post._id, { date });
      }
    }

    return { success: true, updated: posts.length };
  },
});