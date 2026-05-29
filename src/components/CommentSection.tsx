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
    <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--rule)", paddingTop: "1.5rem" }}>
      <p className="section-label">Comments</p>

      {user && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "1.5rem" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment…"
            rows={3}
            style={{
              width: "100%",
              padding: "0.65rem 0.75rem",
              border: "1px solid var(--rule)",
              background: "var(--paper-card)",
              color: "var(--ink)",
              fontFamily: "var(--serif-body)",
              fontSize: "1rem",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className="font-display"
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1.1rem",
              border: "none",
              background: text.trim() ? "var(--accent)" : "var(--paper-deep)",
              color: text.trim() ? "#fff" : "var(--muted)",
              cursor: text.trim() ? "pointer" : "default",
              fontWeight: 600,
              fontSize: "0.9rem",
            }}
          >
            Post comment
          </button>
        </form>
      )}

      {!user && (
        <p style={{ fontSize: "0.95rem", color: "var(--ink-soft)", marginBottom: "1rem" }}>
          Sign in to comment.
        </p>
      )}

      {comments && comments.length > 0 ? (
        <div>
          {comments.map((c: any) => (
            <div key={c._id} style={{ marginBottom: "1.1rem", paddingBottom: "0.9rem", borderBottom: "1px solid var(--rule-soft)" }}>
              <div style={{ fontSize: "0.88rem", color: "var(--muted)" }}>
                <strong style={{ color: "var(--ink)" }}>{c.username}</strong>
                <span style={{ color: "var(--rule)" }}>{"  ·  "}</span>
                {formatDate(c.createdAt)}
                {user && c.userId === user.id && (
                  <button
                    onClick={() => handleDelete(c._id)}
                    style={{
                      marginLeft: "0.6rem",
                      border: "none",
                      background: "none",
                      color: "var(--accent)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "0.82rem",
                      textDecoration: "underline",
                    }}
                  >
                    delete
                  </button>
                )}
              </div>
              <div style={{ fontSize: "1rem", marginTop: "0.3rem", lineHeight: 1.55 }}>{c.content}</div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: "0.95rem", color: "var(--muted)" }}>No comments yet.</p>
      )}
    </div>
  );
}
