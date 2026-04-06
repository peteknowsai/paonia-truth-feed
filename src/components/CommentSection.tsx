"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export default function CommentSection({ pageSlug }: { pageSlug: string }) {
  const { user } = useUser();
  const comments = useQuery(api.pageComments.list, { pageSlug });
  const createComment = useMutation(api.pageComments.create);
  const deleteComment = useMutation(api.pageComments.deleteComment);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim()) return;
    await createComment({
      pageSlug,
      userId: user.id,
      username: user.firstName || user.username || "Anonymous",
      content: text.trim(),
    });
    setText("");
  };

  const handleDelete = async (commentId: string) => {
    if (!user) return;
    await deleteComment({
      commentId: commentId as any,
      userId: user.id,
    });
  };

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div style={{ marginTop: "1.5rem", borderTop: "1px solid #ccc", paddingTop: "0.75rem" }}>
      <div className="section-header">Comments</div>

      {user && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #999",
              fontFamily: "inherit",
              fontSize: "1rem",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            style={{
              marginTop: "0.25rem",
              padding: "0.25rem 0.75rem",
              border: "1px solid #999",
              background: "white",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "0.9rem",
            }}
          >
            post
          </button>
        </form>
      )}

      {!user && (
        <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.75rem" }}>
          Sign in to comment.
        </p>
      )}

      {comments && comments.length > 0 ? (
        <div>
          {comments.map((c: any) => (
            <div key={c._id} style={{ marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid #eee" }}>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>
                <strong style={{ color: "black" }}>{c.username}</strong> -- {formatDate(c.createdAt)}
                {user && c.userId === user.id && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    style={{
                      marginLeft: "0.5rem",
                      border: "none",
                      background: "none",
                      color: "#999",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "0.8rem",
                      textDecoration: "underline",
                    }}
                  >
                    delete
                  </button>
                )}
              </div>
              <div style={{ fontSize: "1rem", marginTop: "0.25rem" }}>{c.content}</div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: "0.9rem", color: "#999" }}>No comments yet.</p>
      )}
    </div>
  );
}
