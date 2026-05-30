"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface DeckChapter {
  id: string;
  kind: "featured" | "person" | "issue" | "recall";
  topic: string;
  title: string;
  summary: string;
  image?: string;
  imageAlt?: string;
  monogram?: string;
  proof: { title: string; route: string }[];
  storyHref: string;
  external?: boolean;
  cta?: string;
}

const TITLE_ID = "lb-title";

export default function StoryDeck({
  featured,
  tiles,
  recall,
}: {
  featured: DeckChapter;
  tiles: DeckChapter[];
  recall: DeckChapter;
}) {
  const items = [featured, ...tiles, recall];
  const [open, setOpen] = useState<number | null>(null);
  const isOpen = open !== null;

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  // Esc closes, arrows navigate, Tab is trapped inside the open panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key === "Tab" && panelRef.current) {
        const f = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const inside = !!active && f.includes(active);
        if (!inside) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, go]);

  // Move focus into the dialog on open; return it to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    } else if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  const c = open !== null ? items[open] : null;

  const renderTile = (ch: DeckChapter, index: number, className: string) => (
    <button
      key={ch.id}
      className={className}
      onClick={(e) => {
        triggerRef.current = e.currentTarget;
        setOpen(index);
      }}
      aria-haspopup="dialog"
      aria-label={`Open: ${ch.title}`}
      style={ch.image ? { backgroundImage: `url(${ch.image})` } : undefined}
    >
      <span className="deck-tile-scrim" aria-hidden />
      {ch.monogram && (
        <span className="deck-tile-mono" aria-hidden>
          {ch.monogram}
        </span>
      )}
      <span className="deck-tile-body">
        <span className="deck-tile-topic">{ch.topic}</span>
        <span className="deck-tile-line">{ch.title}</span>
        <span className="deck-tile-cue" aria-hidden>
          Open →
        </span>
      </span>
    </button>
  );

  return (
    <>
      {renderTile(featured, 0, "deck-tile deck-tile--featured")}

      <div className="deck-grid">
        {tiles.map((ch, i) =>
          renderTile(
            ch,
            i + 1,
            `deck-tile ${ch.kind === "person" ? "deck-tile--mono" : ""}`
          )
        )}
      </div>

      <button
        className="deck-recall"
        onClick={(e) => {
          triggerRef.current = e.currentTarget;
          setOpen(items.length - 1);
        }}
        aria-haspopup="dialog"
        aria-label={`Open: ${recall.title}`}
      >
        <span className="deck-recall-topic">{recall.topic}</span>
        <span className="deck-recall-title">{recall.title}</span>
        <span className="deck-recall-cue" aria-hidden>
          {recall.cta}
        </span>
      </button>

      {c && (
        <div className="lb" role="presentation" onClick={close}>
          <div
            className={`lb-panel ${c.kind === "recall" ? "lb-panel--recall" : ""}`}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lb-close" onClick={close} aria-label="Close">
              ×
            </button>

            {c.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="lb-img" src={c.image} alt={c.imageAlt || ""} />
            )}

            <div
              className={`lb-body ${c.kind === "recall" ? "lb-body--recall" : ""}`}
            >
              <p className="lb-topic">{c.topic}</p>
              <h2 id={TITLE_ID} className="lb-title font-display">
                {c.title}
              </h2>
              <p className="lb-summary">{c.summary}</p>

              {c.proof.length > 0 && (
                <p className="lb-proof">
                  <span className="lb-proof-label">Sourced</span>
                  {c.proof.map((p, j) => (
                    <span key={p.route}>
                      {j > 0 && <span className="lb-dot">·</span>}
                      <Link href={p.route}>{p.title}</Link>
                    </span>
                  ))}
                </p>
              )}

              <p className="lb-cta">
                {c.external ? (
                  <a
                    href={c.storyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lb-cta-btn font-display"
                  >
                    {c.cta || "Continue →"}
                  </a>
                ) : (
                  <Link href={c.storyHref} className="font-display">
                    Read this in full →
                  </Link>
                )}
              </p>
            </div>

            <div className="lb-nav">
              <button onClick={() => go(-1)} aria-label="Previous">
                ‹ Prev
              </button>
              <span className="lb-count">
                {open! + 1} / {items.length}
              </span>
              <button onClick={() => go(1)} aria-label="Next">
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
