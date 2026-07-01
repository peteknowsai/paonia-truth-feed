# Paoniapedia

A self-contained, Wikipedia-style static rendering of the `wiki/` knowledge base.
Same source material as paoniatruth.site, presented as a browsable encyclopedia
(Vector skin, infoboxes, categories, "What links here", search, random article,
red links, talk stubs).

## Build

```bash
node encyclopedia/build.mjs      # or: npm run build:encyclopedia
```

Reads every `wiki/**/*.md`, resolves `[[wikilinks]]` to flat `slug.html` files
(unresolved targets become red links), and writes the whole site to
`public/encyclopedia/`. It runs automatically as part of `npm run prebuild`, and
the output is committed so it ships in the deploy even if the build host skips
`prebuild` (same convention as `src/lib/wiki-cache.json`).

Live at **/encyclopedia/** — e.g. https://paoniatruth.site/encyclopedia/

## Layout

- `build.mjs` — the generator (frontmatter → infobox, backlinks, categories, search index).
- `assets/style.css` — the Vector-2010 skin (edit here to reskin).
- `assets/app.js` — client search suggestions + random article.

## Preview locally

```bash
cd public/encyclopedia && python3 -m http.server 8791
# open http://localhost:8791/
```

The generator throws if any page still contains an unresolved `[[wikilink]]`,
so a clean run is its own smoke test.
