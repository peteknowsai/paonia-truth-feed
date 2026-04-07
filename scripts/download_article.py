#!/usr/bin/env python3
"""download_article.py -- Fetch a news article and save to raw/articles/.
Usage: python3 download_article.py <url> [source] [title]
Outputs: path of saved file
"""

import os
import re
import sys
from datetime import date
from html.parser import HTMLParser
from urllib.request import urlopen, Request

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARTICLES_DIR = os.path.join(PROJECT_DIR, "raw", "articles")


class ArticleExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_article = False
        self.in_title = False
        self.depth = 0
        self.text_parts = []
        self.title = ""
        self.skip_tags = {"script", "style", "nav", "header", "footer", "aside", "figure", "figcaption"}
        self.skip_depth = 0

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)

        if tag in self.skip_tags:
            self.skip_depth += 1
            return

        cls = attrs_dict.get("class", "")
        itemprop = attrs_dict.get("itemprop", "")

        if tag == "article" or "article-body" in cls or "story-body" in cls or itemprop == "articleBody":
            self.in_article = True
            self.depth = 0

        if self.in_article:
            self.depth += 1
            if tag in ("h1", "h2", "h3"):
                self.text_parts.append("\n## ")
            elif tag == "p":
                self.text_parts.append("\n\n")
            elif tag == "li":
                self.text_parts.append("\n- ")
            elif tag == "br":
                self.text_parts.append("\n")

        if tag == "h1" and ("headline" in cls or itemprop == "headline"):
            self.in_title = True

    def handle_endtag(self, tag):
        if tag in self.skip_tags and self.skip_depth > 0:
            self.skip_depth -= 1
        if self.in_title and tag == "h1":
            self.in_title = False
        if self.in_article:
            self.depth -= 1
            if tag == "article" and self.depth <= 0:
                self.in_article = False

    def handle_data(self, data):
        if self.skip_depth > 0:
            return
        if self.in_title:
            self.title += data.strip()
        if self.in_article:
            self.text_parts.append(data)


def main():
    if len(sys.argv) < 2:
        print("Usage: download_article.py <url> [source] [title]", file=sys.stderr)
        sys.exit(1)

    url = sys.argv[1]
    source = sys.argv[2] if len(sys.argv) > 2 else "unknown"
    given_title = sys.argv[3] if len(sys.argv) > 3 else ""

    os.makedirs(ARTICLES_DIR, exist_ok=True)

    # Fetch page
    req = Request(url, headers={"User-Agent": "PaoniaWikiBot/1.0"})
    with urlopen(req, timeout=15) as resp:
        html = resp.read().decode("utf-8", errors="replace")

    # Extract article content
    parser = ArticleExtractor()
    parser.feed(html)

    title = given_title or parser.title or "Untitled"
    body = "".join(parser.text_parts).strip()

    # Try to extract author from meta tags
    author_match = re.search(r'<meta[^>]+name=["\']author["\'][^>]+content=["\']([^"\']+)', html)
    author = author_match.group(1) if author_match else ""

    # Clean body
    body = re.sub(r"\n{3,}", "\n\n", body)

    # Generate filename
    source_prefix = source.lower().replace(" ", "-")
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower())[:60].strip("-")
    today = date.today().isoformat()
    filename = f"{source_prefix}-{slug}-{today}.md"
    filepath = os.path.join(ARTICLES_DIR, filename)

    # Write in existing format
    with open(filepath, "w") as f:
        f.write(f"# {title}\n\n")
        if author:
            f.write(f"**Author:** {author}\n")
        f.write(f"**Date:** {today}\n")
        f.write(f"**Source:** {source}\n")
        f.write(f"**URL:** {url}\n")
        f.write("\n---\n\n")
        if body:
            f.write(body + "\n")
        else:
            f.write("> Article content could not be extracted. Visit the URL directly.\n")

    print(filepath)


if __name__ == "__main__":
    main()
