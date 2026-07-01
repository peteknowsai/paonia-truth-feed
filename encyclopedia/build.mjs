#!/usr/bin/env node
// Paoniapedia generator: wiki/*.md  ->  self-contained Wikipedia-style static HTML.
// Reuses the frontmatter/backlink/wikilink logic from scripts/build-wiki-cache.js,
// but resolves links to flat slug.html files and keeps unresolved targets as red links.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WIKI_DIR = path.join(ROOT, "wiki");
const OUT = path.join(ROOT, "public", "encyclopedia");
const ASSETS_SRC = path.join(__dirname, "assets");

const SITE = "Paoniapedia";
const TAGLINE = "the free encyclopedia of the Town of Paonia";

const DIR_LABEL = {
  people: "People",
  events: "Events",
  issues: "Issues",
  sources: "Sources",
  analysis: "Analysis",
  "open-questions": "Open questions",
};
const TYPE_LABEL = {
  person: "Person",
  event: "Event",
  issue: "Issue",
  source: "Source document",
  analysis: "Analysis",
  "open-question": "Open question",
};
const DIRS = Object.keys(DIR_LABEL);

marked.setOptions({ gfm: true });

// ---------- helpers ----------
const slugify = (s) =>
  String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const toDate = (v) =>
  !v ? "" : v instanceof Date ? v.toISOString().slice(0, 10) : String(v);

// First real prose line, skipping headings and the leading **Key:** meta block.
function extractDescription(md) {
  for (const line of md.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || t === "---" || t.startsWith(">") || KEY_RE.test(t)) continue;
    const cleaned = t
      .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*`]/g, "")
      .trim();
    if (cleaned.length > 20) return cleaned.length > 160 ? cleaned.slice(0, 157) + "…" : cleaned;
  }
  return "";
}

// ---------- load ----------
const pages = [];
for (const dir of DIRS) {
  const dirPath = path.join(WIKI_DIR, dir);
  if (!fs.existsSync(dirPath)) continue;
  for (const file of fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.md$/, "");
    pages.push({
      slug,
      directory: dir,
      title: data.title || slug,
      type: data.type || dir,
      created: toDate(data.created),
      updated: toDate(data.updated),
      tags: Array.isArray(data.tags) ? data.tags : [],
      sources: Array.isArray(data.sources) ? data.sources : [],
      content,
      backlinks: [],
    });
  }
}
const bySlug = new Map(pages.map((p) => [p.slug, p]));

// ---------- backlinks ----------
for (const page of pages) {
  const re = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
  let m;
  const seen = new Set();
  while ((m = re.exec(page.content)) !== null) {
    const target = bySlug.get(m[1]);
    if (target && target.slug !== page.slug && !seen.has(target.slug)) {
      seen.add(target.slug);
      target.backlinks.push({ slug: page.slug, title: page.title });
    }
  }
}

// ---------- wikilink resolution -> HTML anchors ----------
function resolveLinks(text) {
  return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_all, slug, display) => {
    const target = bySlug.get(slug);
    const label = display || (target ? target.title : slug);
    if (target) return `<a href="${target.slug}.html">${esc(label)}</a>`;
    return `<a class="new" href="notfound.html?title=${encodeURIComponent(label)}" title="${esc(
      label
    )} (page does not exist)">${esc(label)}</a>`;
  });
}

// ---------- split lead meta (**Key:** value) into infobox rows ----------
const KEY_RE = /^\*\*(.+?):\*\*\s*(.*)$/;
function parseBody(page) {
  const resolved = resolveLinks(page.content);
  const lines = resolved.split("\n");
  let i = 0;
  // drop first H1
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i < lines.length && /^#\s+/.test(lines[i])) i++;
  while (i < lines.length && lines[i].trim() === "") i++;
  const rows = [];
  while (i < lines.length) {
    const mm = lines[i].match(KEY_RE);
    if (!mm) break;
    // skip noisy "Raw file:" pointer rows
    if (!/^raw file/i.test(mm[1])) rows.push({ k: mm[1].trim(), v: mm[2].trim() });
    i++;
  }
  const bodyMd = lines.slice(i).join("\n");
  return { rows, bodyHtml: marked.parse(bodyMd) };
}

// ---------- categories ----------
const categories = new Map(); // name -> { slug, members:[{slug,title}] }
function addCat(name, page) {
  const key = name;
  if (!categories.has(key)) categories.set(key, { slug: slugify(name), members: [] });
  categories.get(key).members.push({ slug: page.slug, title: page.title });
}
for (const p of pages) {
  addCat(DIR_LABEL[p.directory], p);
  for (const t of p.tags) addCat(t, p);
}
const catFile = (name) => `category-${slugify(name)}.html`;

// ---------- infobox ----------
function infobox(page, rows) {
  const metaRows = [];
  metaRows.push(`<tr><th>Type</th><td>${esc(TYPE_LABEL[page.type] || page.type)}</td></tr>`);
  if (page.created) metaRows.push(`<tr><th>First recorded</th><td>${esc(page.created)}</td></tr>`);
  if (page.updated && page.updated !== page.created)
    metaRows.push(`<tr><th>Last updated</th><td>${esc(page.updated)}</td></tr>`);
  const tagLinks = page.tags
    .map((t) => `<a href="${catFile(t)}">${esc(t)}</a>`)
    .join(" ");
  const scraped = rows
    .map((r) => `<tr><th>${esc(r.k)}</th><td>${marked.parseInline(r.v)}</td></tr>`)
    .join("");
  return `<div class="infobox">
  <div class="ib-title">${esc(page.title)}</div>
  <div class="ib-sub">${esc(TYPE_LABEL[page.type] || page.type)}</div>
  <table><tbody>
    ${scraped}
    <tr><td class="ib-section" colspan="2">Record</td></tr>
    ${metaRows.join("\n    ")}
    ${tagLinks ? `<tr><th>Topics</th><td class="ib-tags">${tagLinks}</td></tr>` : ""}
  </tbody></table>
</div>`;
}

// ---------- table of contents (Wikipedia "Contents" box) ----------
// Adds id anchors to h2/h3 and, for articles with 4+ headings, inserts a
// numbered collapsible TOC right before the first section (like real Wikipedia).
function addTocAndAnchors(bodyHtml) {
  const seen = new Set();
  const entries = [];
  let major = 0, minor = 0;
  const withIds = bodyHtml.replace(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/g, (_m, lvl, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugify(text) || "section";
    let n = id, i = 2;
    while (seen.has(n)) n = `${id}-${i++}`;
    seen.add(n);
    let num;
    if (lvl === "2") { major++; minor = 0; num = `${major}`; }
    else { minor++; num = `${major}.${minor}`; }
    entries.push({ lvl, text, id: n, num });
    return `<h${lvl} id="${n}">${inner}</h${lvl}>`;
  });
  if (entries.length < 4) return withIds;
  const items = entries
    .map(
      (e) =>
        `<li class="toc-l${e.lvl === "2" ? "1" : "2"}"><a href="#${e.id}"><span class="tocnum">${e.num}</span> <span class="toctext">${esc(e.text)}</span></a></li>`
    )
    .join("\n");
  const toc = `<details class="toc" open><summary>Contents</summary><ul>${items}</ul></details>`;
  const idx = withIds.search(/<h2\b/);
  return idx === -1 ? withIds : withIds.slice(0, idx) + toc + withIds.slice(idx);
}

// ---------- references ----------
function references(page) {
  const src = page.sources.filter((s) => s);
  if (!src.length) return "";
  const items = src
    .map((s) => {
      const t = bySlug.get(s);
      if (t) return `<li><a href="${t.slug}.html">${esc(t.title)}</a></li>`;
      return `<li><a class="new" href="notfound.html?title=${encodeURIComponent(s)}">${esc(s)}</a></li>`;
    })
    .join("\n");
  return `<div class="references"><h2>References</h2><ol>${items}</ol></div>`;
}

// ---------- what links here ----------
function whatLinksHere(page) {
  if (!page.backlinks.length) return "";
  const items = page.backlinks
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((b) => `<li><a href="${b.slug}.html">${esc(b.title)}</a></li>`)
    .join("\n");
  return `<div class="wlh"><h2>What links here</h2><ul>${items}</ul></div>`;
}

// ---------- category bar ----------
function catBar(page) {
  const names = [DIR_LABEL[page.directory], ...page.tags];
  const links = names
    .map((n) => `<li><a href="${catFile(n)}">${esc(n)}</a></li>`)
    .join("");
  return `<div class="catlinks"><b>Categories:</b><ul>${links}</ul></div>`;
}

// ---------- layout ----------
const SIDEBAR = `<div id="sidebar">
  <div class="logo"><a href="index.html">
    <span class="globe">🌐</span>
    <span class="name">${SITE}</span>
    <span class="tag">${TAGLINE}</span>
  </a></div>
  <div id="searchbox">
    <input id="searchInput" type="text" placeholder="Search ${SITE}" autocomplete="off" aria-label="Search">
    <div id="suggest"></div>
  </div>
  <h3>Navigation</h3>
  <ul>
    <li><a href="index.html">Main page</a></li>
    <li><a href="#" class="random-article">Random article</a></li>
    <li><a href="allpages.html">All pages</a></li>
    <li><a href="categories.html">Categories</a></li>
    <li><a href="about.html">About Paoniapedia</a></li>
  </ul>
  <h3>Categories</h3>
  <ul>
    ${DIRS.map((d) => `<li><a href="${catFile(DIR_LABEL[d])}">${esc(DIR_LABEL[d])}</a></li>`).join("\n    ")}
  </ul>
</div>`;

function layout({ title, tabs, bodyHtml, sub }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — ${SITE}</title>
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
<div class="mw-page">
${SIDEBAR}
<main id="content">
  ${tabs || ""}
  <h1 id="firstHeading">${title}</h1>
  <div class="sitesub">${sub || `From ${SITE}, ${TAGLINE}`}</div>
  <div id="body">${bodyHtml}</div>
</main>
</div>
<script src="assets/app.js"></script>
</body>
</html>`;
}

function articleTabs(page) {
  return `<div class="tabs">
    <a class="selected" href="${page.slug}.html">Article</a>
    <a href="talk-${page.slug}.html">Talk</a>
    <span class="spacer"></span>
    <a href="allpages.html">All pages</a>
  </div>`;
}

// ---------- emit ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "assets"), { recursive: true });
for (const f of fs.readdirSync(ASSETS_SRC))
  fs.copyFileSync(path.join(ASSETS_SRC, f), path.join(OUT, "assets", f));
const write = (name, html) => fs.writeFileSync(path.join(OUT, name), html);

// articles + talk stubs
const searchIndex = [];
let stray = 0;
for (const page of pages) {
  const { rows, bodyHtml } = parseBody(page);
  const full =
    infobox(page, rows) +
    addTocAndAnchors(bodyHtml) +
    references(page) +
    catBar(page) +
    whatLinksHere(page);
  if (/\[\[/.test(full)) { stray++; console.warn(`  stray wikilink in ${page.slug}`); }
  write(
    `${page.slug}.html`,
    layout({ title: esc(page.title), tabs: articleTabs(page), bodyHtml: full })
  );
  // talk stub
  write(
    `talk-${page.slug}.html`,
    layout({
      title: `Talk:${esc(page.title)}`,
      sub: `Discussion page for ${esc(page.title)}`,
      tabs: `<div class="tabs"><a href="${page.slug}.html">Article</a><a class="selected" href="talk-${page.slug}.html">Talk</a><span class="spacer"></span></div>`,
      bodyHtml: `<p><i>This talk page is for discussing improvements to the <a href="${page.slug}.html">${esc(
        page.title
      )}</a> article. It is currently empty.</i></p>`,
    })
  );
  searchIndex.push({
    slug: page.slug,
    title: page.title,
    type: TYPE_LABEL[page.type] || page.type,
    description: extractDescription(page.content),
    keywords: page.tags.join(" "),
  });
}
searchIndex.sort((a, b) => a.title.localeCompare(b.title));
write("search.json", JSON.stringify(searchIndex));

// category pages
for (const [name, cat] of categories) {
  const members = cat.members
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((m) => `<a href="${m.slug}.html">${esc(m.title)}</a>`)
    .join("\n");
  const body = `<p>Pages in the category <b>${esc(name)}</b> (${cat.members.length}).</p>
    <div class="catmembers">${members}</div>`;
  write(catFile(name), layout({ title: `Category: ${esc(name)}`, bodyHtml: body }));
}

// all pages
const allBody = `<p>All ${pages.length} articles in ${SITE}, alphabetical.</p><div class="catmembers">${searchIndex
  .map((p) => `<a href="${p.slug}.html">${esc(p.title)}</a>`)
  .join("\n")}</div>`;
write("allpages.html", layout({ title: "All pages", bodyHtml: allBody }));

// categories index
const catIndex = [...categories.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([name, c]) => `<a href="${catFile(name)}">${esc(name)} (${c.members.length})</a>`)
  .join("\n");
write(
  "categories.html",
  layout({ title: "Categories", bodyHtml: `<div class="catmembers">${catIndex}</div>` })
);

// notfound stub
write(
  "notfound.html",
  layout({
    title: "Page does not exist",
    bodyHtml: `<p><i>${SITE} does not yet have an article with this exact name.</i></p>
    <p>This is a <span style="color:#ba0000">red link</span> — the topic is referenced elsewhere in the encyclopedia but has not been written up as its own page yet.</p>
    <p><a href="index.html">Return to the Main Page</a> or <a href="allpages.html">browse all pages</a>.</p>
    <script>var t=new URLSearchParams(location.search).get('title');if(t){document.getElementById('firstHeading').textContent=t;}</script>`,
  })
);

// about
write(
  "about.html",
  layout({
    title: `About ${SITE}`,
    bodyHtml: `<p><b>${SITE}</b> is a Wikipedia-style rendering of the Paonia civic-transparency wiki — the same source material behind <a class="external" href="https://paoniatruth.site">paoniatruth.site</a>, presented as a browsable encyclopedia.</p>
    <p>Every article is generated from a plain-text wiki maintained by residents. Facts are sourced to the Town of Paonia's own records: budgets, meeting minutes, CORA responses, and court filings. Links in <span style="color:#ba0000">red</span> point to topics not yet written up.</p>
    <p>It currently contains <b>${pages.length}</b> articles across ${DIRS.length} categories.</p>`,
  })
);

// ---------- main page ----------
const featured = bySlug.get("the-case-against-mayor-smith") || pages.find((p) => p.type === "analysis");
const featIntro = (() => {
  const { bodyHtml } = parseBody(featured);
  const firstPara = bodyHtml.match(/<p>[\s\S]*?<\/p>/);
  return (firstPara ? firstPara[0] : "") ;
})();
const dyk = pages
  .filter((p) => p.type === "analysis" && p.slug !== featured.slug)
  .slice(0, 6)
  .map((p) => `<li>… that <a href="${p.slug}.html">${esc(p.title.toLowerCase())}</a>?</li>`)
  .join("\n");
const portals = DIRS.map(
  (d) =>
    `<a href="${catFile(DIR_LABEL[d])}">${esc(DIR_LABEL[d])}</a> <span style="color:#72777d">(${
      categories.get(DIR_LABEL[d]).members.length
    })</span>`
).join(" · ");

const mainBody = `<div class="mp-stats">Welcome to <b>${SITE}</b>, ${TAGLINE} — <b>${pages.length}</b> articles and counting.</div>
<div class="mainpage-grid">
  <div class="mp-box mp-featured">
    <h2>Featured article</h2>
    <p><b><a href="${featured.slug}.html">${esc(featured.title)}</a></b></p>
    ${featIntro}
    <p><a href="${featured.slug}.html">Full article →</a></p>
  </div>
  <div class="mp-box">
    <h2>Did you know…</h2>
    <ul>${dyk}</ul>
  </div>
</div>
<div class="mp-box" style="margin-top:1em">
  <h2>Browse by category</h2>
  <p>${portals}</p>
  <p><a href="allpages.html">All pages</a> · <a href="categories.html">All categories</a> · <a href="#" class="random-article">Random article</a></p>
</div>`;
write(
  "index.html",
  layout({
    title: `Welcome to ${SITE}`,
    sub: `${TAGLINE} that anyone can read`,
    bodyHtml: mainBody,
  })
);

if (stray) throw new Error(`${stray} page(s) contain unresolved [[wikilinks]] — check the regex`);
console.log(`${SITE}: ${pages.length} articles, ${categories.size} categories -> ${path.relative(ROOT, OUT)}`);
