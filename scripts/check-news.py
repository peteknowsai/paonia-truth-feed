#!/usr/bin/env python3
"""check-news.py -- Check DCI and HCS RSS feeds for new Paonia articles.
Outputs JSON array of new {url, title, source, date, author, description} items.
Updates watcher state. No pip dependencies -- stdlib only.
"""

import json
import os
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
import time

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE_FILE = os.path.join(PROJECT_DIR, ".claude", "watcher-state.json")

FEEDS = [
    {
        "name": "DCI",
        "url": "https://www.deltacountyindependent.com/search/?f=rss&t=article&c=news/north-fork*&l=25",
    },
    {
        "name": "HCS",
        "url": "https://www.highcountryspotlight.com/search/?f=rss&t=article&c=local_news*&l=25",
    },
]

# Keywords that suggest Paonia government relevance (case-insensitive)
RELEVANCE_KEYWORDS = [
    "paonia", "trustee", "board of trustees", "town administrator",
    "town board", "planning commission", "str ", "short-term rental",
    "moratorium", "ordinance", "town clerk", "wynn", "verkada",
    "cora", "public records", "north fork", "delta county",
]


def load_state():
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    if not os.path.exists(STATE_FILE):
        with open(STATE_FILE, "w") as f:
            json.dump({}, f)
    with open(STATE_FILE) as f:
        return json.load(f)


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def fetch_feed(url, retries=2):
    """Fetch RSS feed with retries and backoff."""
    for attempt in range(retries + 1):
        try:
            req = Request(url, headers={"User-Agent": "PaoniaWikiBot/1.0"})
            with urlopen(req, timeout=15) as resp:
                return resp.read().decode("utf-8")
        except HTTPError as e:
            if e.code == 429 and attempt < retries:
                time.sleep(5 * (attempt + 1))
                continue
            print(f"HTTP {e.code} fetching {url}", file=sys.stderr)
            return None
        except (URLError, Exception) as e:
            print(f"Error fetching {url}: {e}", file=sys.stderr)
            return None
    return None


def parse_rss(xml_text):
    """Parse RSS XML into list of article dicts."""
    articles = []
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return articles

    ns = {"dc": "http://purl.org/dc/elements/1.1/"}
    for item in root.findall(".//item"):
        title = item.findtext("title", "").strip()
        link = item.findtext("link", "").strip()
        pub_date = item.findtext("pubDate", "").strip()
        creator = item.findtext("dc:creator", "", ns).strip()
        desc = item.findtext("description", "").strip()

        if not link:
            continue

        articles.append({
            "title": title,
            "url": link,
            "date": pub_date,
            "author": creator,
            "description": desc,
        })
    return articles


def main():
    state = load_state()
    news_state = state.get("news", {})
    known_urls = set(news_state.get("known_urls", []))

    new_articles = []

    for feed in FEEDS:
        xml_text = fetch_feed(feed["url"])
        if not xml_text:
            continue

        articles = parse_rss(xml_text)
        for article in articles:
            url = article["url"]

            # Normalize URL (strip tracking params)
            if "?" in url:
                url = url.split("?")[0]
            article["url"] = url

            if url in known_urls:
                continue

            known_urls.add(url)
            article["source"] = feed["name"]
            new_articles.append(article)

    # Update state
    news_state["known_urls"] = list(known_urls)
    news_state["last_checked"] = datetime.now(timezone.utc).isoformat()
    state["news"] = news_state
    save_state(state)

    print(json.dumps(new_articles))


if __name__ == "__main__":
    main()
