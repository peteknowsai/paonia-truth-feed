import wikiCache from "./wiki-cache.json";

export interface WikiPage {
  slug: string;
  directory: string;
  route: string;
  title: string;
  type: string;
  created: string;
  updated: string;
  tags: string[];
  sources: string[];
  content: string;
  description: string;
  backlinks: { slug: string; title: string; route: string }[];
}

const pages: WikiPage[] = wikiCache as WikiPage[];

export function getAllPages(): WikiPage[] {
  return pages;
}

export function getPagesByDirectory(dir: string): WikiPage[] {
  const filtered = pages.filter((p) => p.directory === dir);
  if (dir === "events") {
    return filtered.sort((a, b) => {
      const dateA = a.created || a.updated || "";
      const dateB = b.created || b.updated || "";
      return dateB.localeCompare(dateA);
    });
  }
  return filtered;
}

export function getPage(dir: string, slug: string): WikiPage | undefined {
  return pages.find((p) => p.directory === dir && p.slug === slug);
}

export function getPageBySlug(slug: string): WikiPage | undefined {
  return pages.find((p) => p.slug === slug);
}

export function getStoryPages(): WikiPage[] {
  const stories = pages.filter(
    (p) =>
      p.directory === "analysis" ||
      (p.directory === "events" && p.tags.length > 0) ||
      (p.directory === "issues" && p.tags.length > 0)
  );
  return stories.sort((a, b) => {
    const dateA = a.updated || a.created || "";
    const dateB = b.updated || b.created || "";
    return dateB.localeCompare(dateA);
  });
}

export function getInitiativePages(): WikiPage[] {
  return pages.filter(
    (p) => p.directory === "issues" && p.tags.includes("initiative")
  );
}

export function getActionPages(): WikiPage[] {
  return getPagesByDirectory("open-questions");
}

export function getDirectoryLabel(dir: string): string {
  const labels: Record<string, string> = {
    people: "People",
    events: "Events",
    issues: "Issues",
    sources: "Sources",
    analysis: "Analysis",
    "open-questions": "Open Questions",
  };
  return labels[dir] || dir;
}

export function getDirectoryRoute(dir: string): string {
  const map: Record<string, string> = {
    people: "/wiki/people",
    events: "/wiki/events",
    issues: "/wiki/issues",
    sources: "/wiki/sources",
    analysis: "/wiki/analysis",
    "open-questions": "/wiki/questions",
  };
  return map[dir] || `/wiki/${dir}`;
}

export function getCategories(): {
  dir: string;
  label: string;
  route: string;
  count: number;
}[] {
  const dirs = ["people", "events", "issues", "sources", "analysis", "open-questions"];
  return dirs.map((dir) => ({
    dir,
    label: getDirectoryLabel(dir),
    route: getDirectoryRoute(dir),
    count: getPagesByDirectory(dir).length,
  }));
}
