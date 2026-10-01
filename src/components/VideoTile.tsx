"use client";

import { useState } from "react";

/** A small square video that plays in place, with share and download under it. */
export default function VideoTile({
  slug,
  title,
  blurb,
  src,
  poster,
  downloadHref,
}: {
  slug: string;
  title: string;
  blurb: string;
  src: string;
  poster: string;
  downloadHref: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} | Stefen Wynn: The Record`, url });
      } catch {
        /* dismissed */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <figure id={slug} className="wynn-tile">
      <video src={src} poster={poster} preload="none" controls playsInline />
      <figcaption>
        <strong className="font-display">{title}</strong>
        <span>{blurb}</span>
        <span className="wynn-tile-actions">
          <button type="button" onClick={share}>{copied ? "Link copied" : "Share"}</button>
          <a href={downloadHref} download={`${slug}.mp4`}>Download</a>
        </span>
      </figcaption>
    </figure>
  );
}
