import Link from "next/link";
import { getAllPages, getCategories } from "@/lib/wiki";

export const metadata = { title: "About - Paonia Truth Nuggets" };

export default function AboutPage() {
  const allPages = getAllPages();
  const categories = getCategories();

  return (
    <div>
      <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.75rem" }}>
        About This Site
      </h1>

      <div className="wiki-content">
        <p>
          <strong>Paonia Truth Nuggets</strong> is a public record of local government
          in Paonia, Colorado. Every claim is sourced from public documents, public
          meetings, published news coverage, or court records.
        </p>

        <h2>What's here</h2>

        <p>
          The site is built on a {allPages.length}-page wiki that documents people,
          events, issues, sources, analysis, and open questions about Paonia town
          governance. The wiki is fully browsable at{" "}
          <Link href="/wiki">/wiki</Link>.
        </p>

        <ul>
          {categories.map((cat) => (
            <li key={cat.dir}>
              <strong>{cat.label}</strong> ({cat.count}) -- {" "}
              {cat.dir === "people" && "elected officials and town staff"}
              {cat.dir === "events" && "board meetings, hearings, and key dates"}
              {cat.dir === "issues" && "ongoing governance concerns"}
              {cat.dir === "sources" && "ingested documents, letters, and transcripts"}
              {cat.dir === "analysis" && "cross-cutting patterns and timelines"}
              {cat.dir === "open-questions" && "unanswered questions with CORA request templates"}
            </li>
          ))}
        </ul>

        <h2>How it works</h2>

        <p>
          Every wiki page uses <code>[[wikilinks]]</code> to connect to related pages.
          The site resolves those links and builds backlinks automatically. When you
          read a page about a person, you see every page that references them.
        </p>

        <p>
          Stories in the feed are auto-generated from analysis pages, key events, and
          key issues. Voting and comments are powered by Convex (real-time database)
          and require a Clerk account.
        </p>

        <h2>Open questions and CORA</h2>

        <p>
          The <Link href="/actions">actions</Link> section lists open questions about
          town governance. Each includes pre-written CORA (Colorado Open Records Act)
          request templates you can submit to get answers. If you submit a request,
          sign in and track it so others can see what's in progress.
        </p>

        <h2>Source policy</h2>

        <p>
          No anonymous sources. No rumors. No editorializing. If something is in the
          wiki, it's because a public document says so, and that document is linked.
          If a claim can't be sourced, it goes in "open questions" with a CORA template
          to get the answer.
        </p>
      </div>
    </div>
  );
}
