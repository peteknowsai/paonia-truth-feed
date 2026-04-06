import { getPage } from "@/lib/wiki";
import WikiContent from "@/components/WikiContent";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Timeline - reformpaonia.co" };

export default function TimelinePage() {
  const page = getPage("analysis", "master-timeline");

  if (!page) {
    return <p>Timeline not found.</p>;
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "home", href: "/" },
          { label: "timeline" },
        ]}
      />
      <WikiContent content={page.content} />
    </div>
  );
}
