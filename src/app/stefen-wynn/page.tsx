import Link from "next/link";
import type { Metadata } from "next";
import { Fragment } from "react";
import VideoTile from "@/components/VideoTile";
import { MEDIA, findings, sources, videos } from "@/content/wynn";

const DESCRIPTION =
  "Neptune Beach fired him and a Florida judge just ruled against his lawsuit. In Paonia he tried to force out an elected trustee, fired an employee who asked how to complain, and took critics to the police. Four short videos and the documents behind every line.";

export const metadata: Metadata = {
  title: "Stefen Wynn: The Record",
  description: DESCRIPTION,
  openGraph: {
    title: "Stefen Wynn: The Record",
    description: DESCRIPTION,
    images: [{ url: "/img/wynn/first-time-today.jpg", width: 1080, height: 1080 }],
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Stefen Wynn: The Record", description: DESCRIPTION },
};

/** Turn "[3]" markers into links to the numbered source list. */
function Cited({ text }: { text: string }) {
  const parts = text.split(/(\[\d+\])/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[(\d+)\]$/);
        return m ? (
          <sup key={i}>
            <a href={`#source-${m[1]}`} className="cite">{m[1]}</a>
          </sup>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        );
      })}
    </>
  );
}

function isExternal(href: string) {
  return /^https?:\/\//.test(href) || href.endsWith(".pdf");
}

export default function StefenWynnPage() {
  return (
    <article className="shell-narrow wynn" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      <p className="eyebrow" style={{ marginBottom: "1.1rem" }}>An independent public record · Updated October 1, 2026</p>
      <h1 className="font-display" style={{ fontWeight: 560, fontSize: "clamp(2.3rem, 6vw, 3.4rem)", lineHeight: 1.04, letterSpacing: "-0.02em", margin: "0 0 1.25rem", textWrap: "balance" }}>
        Stefen Wynn: The Record
      </h1>
      <p style={{ fontFamily: "var(--serif-display)", fontSize: "clamp(1.15rem, 2.4vw, 1.4rem)", lineHeight: 1.42, margin: "0 0 1rem" }}>
        Stefen Wynn is seeking the town administrator job in Cedaredge. His last
        two towns learned a lot about him. Neptune Beach, Florida fired him, and
        on October 1, 2026 a judge ruled against the lawsuit he filed over it. In
        Paonia, Colorado, he made his job contingent on removing an elected
        trustee, fired an employee who asked how to complain about him, and took
        residents&apos; political speech to the police until the police told him,
        in writing, that it was the First Amendment.
      </p>
      <p style={{ color: "var(--muted)", margin: 0 }}>
        Every claim below links to the court order, police record, or public
        document it comes from. Short videos of the same record are at the end.
      </p>
      <hr className="rule" />


      <h2 className="font-display" style={{ fontWeight: 560, fontSize: "clamp(1.6rem, 3.4vw, 2.1rem)", margin: "0 0 0.5rem" }}>The record</h2>
      <ol className="wynn-findings">
        {findings.map((f) => (
          <li key={f.id} id={f.id}>
            <h3 className="font-display">{f.heading}</h3>
            {f.body.map((para, i) => (
              <p key={i}><Cited text={para} /></p>
            ))}
          </li>
        ))}
      </ol>

      <hr className="rule" />
      <h2 className="font-display" style={{ fontWeight: 560, fontSize: "1.5rem", margin: "0 0 0.4rem" }}>Watch</h2>
      <p style={{ color: "var(--muted)", margin: "0 0 1.2rem" }}>The same record in four short videos, under a minute each.</p>
      <section aria-label="Videos" className="wynn-tiles">
        {videos.map((v) => (
          <VideoTile
            key={v.slug}
            slug={v.slug}
            title={v.title}
            blurb={v.blurb}
            src={`${MEDIA}/${v.slug}.mp4`}
            poster={`/img/wynn/${v.slug}.jpg`}
            downloadHref={`${MEDIA}/download/${v.slug}.mp4`}
          />
        ))}
      </section>

      <hr className="rule" />
      <h2 className="font-display" style={{ fontWeight: 560, fontSize: "1.5rem", margin: "0 0 0.75rem" }}>Sources</h2>
      <ol className="wynn-sources">
        {sources.map((s, i) => (
          <li key={i} id={`source-${i + 1}`}>
            {isExternal(s.href) ? (
              <a href={s.href} target="_blank" rel="noopener noreferrer">{s.title}</a>
            ) : (
              <Link href={s.href}>{s.title}</Link>
            )}
          </li>
        ))}
      </ol>
      <p style={{ color: "var(--muted)", fontSize: "0.92rem", marginTop: "2rem" }}>
        This page compiles public records: court filings, police reports, Town
        documents produced under the Colorado Open Records Act, and published news
        coverage. If anything here is wrong, the source is one click away. See{" "}
        <Link href="/about">about this site</Link> to send a correction.
      </p>
    </article>
  );
}
