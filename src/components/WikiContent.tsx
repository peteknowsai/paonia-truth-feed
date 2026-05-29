import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Remove a single leading top-level "# Heading" from markdown so it
 *  doesn't duplicate the page's own masthead title. In-memory only —
 *  the underlying wiki file is never modified. */
function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+.*(?:\r?\n|$)/, "");
}

export default function WikiContent({
  content,
  stripFirstH1 = false,
}: {
  content: string;
  stripFirstH1?: boolean;
}) {
  const md = stripFirstH1 ? stripLeadingH1(content) : content;
  return (
    <div className="wiki-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </div>
  );
}
