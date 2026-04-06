import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function WikiContent({ content }: { content: string }) {
  return (
    <div className="wiki-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
