import Link from "next/link";
import { proofLink, imagesReady, type Thread, type TimelineEntry, type CastMember } from "@/content/story";

/* ============================================================
   Editorial presentational components (all server-rendered).
   ============================================================ */

/** Image with a graceful tinted fallback while illustrations are
 *  being generated (controlled by `imagesReady` in story.ts). */
export function ThreadImage({
  src,
  alt,
  label,
  aspect = "16 / 10",
}: {
  src?: string;
  alt?: string;
  label?: string;
  aspect?: string;
}) {
  if (imagesReady && src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt || ""}
        style={{ width: "100%", aspectRatio: aspect, objectFit: "cover", background: "var(--paper-deep)" }}
      />
    );
  }
  return (
    <div
      aria-hidden
      style={{
        width: "100%",
        aspectRatio: aspect,
        background:
          "linear-gradient(135deg, var(--paper-deep) 0%, #e3d9c4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          background: "var(--accent)",
          opacity: 0.85,
          transform: "rotate(45deg)",
          position: "absolute",
          top: 18,
          left: 18,
        }}
      />
      {label && (
        <span className="eyebrow" style={{ color: "var(--civic)", opacity: 0.6 }}>
          {label}
        </span>
      )}
    </div>
  );
}

/** Initials avatar — used instead of photographs of real people. */
export function Monogram({ name, size = 52 }: { name: string; size?: number }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span
      aria-hidden
      style={{
        flex: "none",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--civic)",
        color: "#f3ede0",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--serif-display)",
        fontWeight: 600,
        fontSize: size * 0.4,
        letterSpacing: "0.02em",
      }}
    >
      {initials}
    </span>
  );
}

/** "Sourced:" line resolving slugs to live wiki links. */
export function ProofLinks({ slugs }: { slugs: string[] }) {
  const links = slugs.map((s) => proofLink(s)).filter(Boolean) as {
    slug: string;
    title: string;
    route: string;
  }[];
  if (links.length === 0) return null;
  return (
    <p style={{ margin: "0.9rem 0 0", fontSize: "0.9rem", color: "var(--muted)" }}>
      <span className="topic-tag" style={{ color: "var(--muted)", marginRight: "0.5rem" }}>
        Sourced
      </span>
      {links.map((l, i) => (
        <span key={l.slug}>
          {i > 0 && <span style={{ color: "var(--rule)" }}>{"  ·  "}</span>}
          <Link href={l.route}>{l.title}</Link>
        </span>
      ))}
    </p>
  );
}

/** A single story-thread card for the homepage grid. */
export function ThreadCard({ thread, featured = false }: { thread: Thread; featured?: boolean }) {
  return (
    <article
      className={featured ? "thread-card thread-card--featured" : "thread-card"}
      style={{
        gridColumn: featured ? "1 / -1" : undefined,
        border: "1px solid var(--rule)",
        background: "var(--paper-card)",
      }}
    >
      <Link href={`/story#${thread.id}`} style={{ display: "block" }}>
        <ThreadImage src={thread.image} alt={thread.imageAlt} label={thread.topic} aspect={featured ? "16 / 9" : "16 / 10"} />
      </Link>
      <div style={{ padding: featured ? "1.5rem 1.75rem" : "1.25rem 1.4rem 1.5rem" }}>
        <p className="topic-tag" style={{ marginBottom: "0.5rem" }}>{thread.topic}</p>
        <h3
          className="font-display"
          style={{
            margin: "0 0 0.5rem",
            fontWeight: 560,
            lineHeight: 1.14,
            fontSize: featured ? "clamp(1.5rem, 2.6vw, 2rem)" : "1.3rem",
          }}
        >
          <Link href={`/story#${thread.id}`} style={{ color: "var(--ink)" }}>
            {thread.title}
          </Link>
        </h3>
        <p style={{ margin: 0, color: "var(--ink-soft)", lineHeight: 1.5 }}>
          {featured ? thread.summary : thread.dek}
        </p>
        <ProofLinks slugs={thread.pageSlugs} />
        <p style={{ margin: "0.9rem 0 0" }}>
          <Link href={`/story#${thread.id}`} className="font-display" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
            Read this thread →
          </Link>
        </p>
      </div>
    </article>
  );
}

/** Vertical 18-month timeline. */
export function StoryTimeline({ entries, limit }: { entries: TimelineEntry[]; limit?: number }) {
  const items = limit ? entries.slice(0, limit) : entries;
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, position: "relative" }}>
      <span
        aria-hidden
        style={{ position: "absolute", left: 6, top: 6, bottom: 6, width: 2, background: "var(--rule)" }}
      />
      {items.map((e, i) => {
        const link = e.slug ? proofLink(e.slug) : null;
        return (
          <li key={i} style={{ position: "relative", paddingLeft: "2rem", marginBottom: "1.15rem" }}>
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                top: "0.45em",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "var(--paper)",
                border: "2px solid var(--accent)",
              }}
            />
            <span
              className="font-display"
              style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.04em", color: "var(--accent)", textTransform: "uppercase" }}
            >
              {formatDate(e.date)}
            </span>
            <span style={{ display: "block", lineHeight: 1.45 }}>
              {link ? <Link href={link.route} style={{ color: "var(--ink)" }}>{e.label}</Link> : e.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** The cast — monogram avatars, never photographs of real people. */
export function CastGrid({ members }: { members: CastMember[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1.1rem",
      }}
    >
      {members.map((m) => {
        const link = proofLink(m.slug);
        const inner = (
          <>
            <Monogram name={m.name} />
            <span style={{ minWidth: 0 }}>
              <span className="font-display" style={{ display: "block", fontWeight: 600, color: "var(--ink)" }}>
                {m.name}
              </span>
              <span style={{ display: "block", fontSize: "0.82rem", color: "var(--accent)", marginBottom: "0.2rem" }}>
                {m.role}
              </span>
              <span style={{ display: "block", fontSize: "0.88rem", color: "var(--ink-soft)", lineHeight: 1.4 }}>
                {m.relevance}
              </span>
            </span>
          </>
        );
        const style = { display: "flex", gap: "0.85rem", alignItems: "flex-start" } as const;
        return link ? (
          <Link key={m.slug} href={link.route} style={{ ...style, color: "inherit" }}>
            {inner}
          </Link>
        ) : (
          <div key={m.slug} style={style}>{inner}</div>
        );
      })}
    </div>
  );
}

/* ---------------- helpers ---------------- */
function formatDate(d: string): string {
  const parts = d.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (parts.length === 1) return parts[0]; // year only
  if (parts.length === 2) return `${months[+parts[1] - 1]} ${parts[0]}`;
  return `${months[+parts[1] - 1]} ${+parts[2]}, ${parts[0]}`;
}
