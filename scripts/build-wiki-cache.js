#!/usr/bin/env node

// Pre-compile wiki markdown into a JSON cache for edge runtime.
// Run before `next build` so the data is available at build time
// and bundled into the server output.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const WIKI_DIR = path.join(process.cwd(), "wiki");
const OUTPUT = path.join(process.cwd(), "src", "lib", "wiki-cache.json");

const DIRECTORY_ROUTE_MAP = {
  people: "/wiki/people",
  events: "/wiki/events",
  issues: "/wiki/issues",
  sources: "/wiki/sources",
  analysis: "/wiki/analysis",
  "open-questions": "/wiki/questions",
};

const VALID_DIRS = Object.keys(DIRECTORY_ROUTE_MAP);

function toDateStr(val) {
  if (!val) return "";
  if (val instanceof Date) return val.toISOString().slice(0, 10);
  return String(val);
}

function extractDescription(markdown) {
  const lines = markdown.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (
      !trimmed ||
      trimmed.startsWith("#") ||
      trimmed === "---" ||
      trimmed.startsWith("**Raw file") ||
      trimmed.startsWith("**Type:") ||
      trimmed.startsWith("**Date:") ||
      trimmed.startsWith("**Author:") ||
      trimmed.startsWith("**Recipients:")
    ) {
      continue;
    }
    const cleaned = trimmed
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*/g, "");
    if (cleaned.length > 20) {
      return cleaned.length > 200 ? cleaned.slice(0, 197) + "..." : cleaned;
    }
  }
  return "";
}

// Load all pages
const pages = [];
for (const dir of VALID_DIRS) {
  const dirPath = path.join(WIKI_DIR, dir);
  if (!fs.existsSync(dirPath)) continue;
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, "");
    const routeBase = DIRECTORY_ROUTE_MAP[dir];
    pages.push({
      slug,
      directory: dir,
      route: `${routeBase}/${slug}`,
      title: data.title || slug,
      type: data.type || dir,
      created: toDateStr(data.created),
      updated: toDateStr(data.updated),
      tags: data.tags || [],
      sources: data.sources || [],
      content,
      description: extractDescription(content),
      backlinks: [],
    });
  }
}

// Build slug map
const slugMap = new Map();
for (const page of pages) slugMap.set(page.slug, page);

// Build backlinks
for (const page of pages) {
  const linkPattern = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let match;
  while ((match = linkPattern.exec(page.content)) !== null) {
    const targetSlug = match[1];
    const target = slugMap.get(targetSlug);
    if (target && target.slug !== page.slug) {
      if (!target.backlinks.find((bl) => bl.slug === page.slug)) {
        target.backlinks.push({
          slug: page.slug,
          title: page.title,
          route: page.route,
        });
      }
    }
  }
}

// Resolve wikilinks in content
for (const page of pages) {
  page.content = page.content.replace(
    /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (match, slug, display) => {
      const target = slugMap.get(slug);
      if (target) {
        const label = display || target.title;
        return `[${label}](${target.route})`;
      }
      return display || slug;
    }
  );
}

// Remove rawContent (not needed in cache) and write
fs.writeFileSync(OUTPUT, JSON.stringify(pages, null, 0));
console.log(`Wiki cache: ${pages.length} pages -> ${OUTPUT}`);
