import Link from "next/link";
import { deckTiles, recall, proofLink, type DeckTile } from "@/content/story";
import StoryDeck, { type DeckChapter } from "@/components/StoryDeck";

function withProof(tile: DeckTile): DeckChapter {
  return {
    ...tile,
    proof: tile.pageSlugs
      .map((s) => proofLink(s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({ title: p.title, route: p.route })),
  };
}

export default function HomePage() {
  const all = deckTiles.map(withProof);
  const featured = all[0];
  const tiles = all.slice(1);
  const recallChapter: DeckChapter = { ...recall, proof: [] };

  return (
    <div className="shell deck-wrap">
      <div className="deck-head">
        <p className="eyebrow">Paonia, Colorado · A Citizens&apos; Record</p>
        <h1 className="deck-q">
          What happens when you try to hold the Town of Paonia accountable?
        </h1>
        <p className="deck-sub">
          Over two years, Town Hall turned its power on the residents who
          questioned it — starting with the Mayor.{" "}
          <span className="hint">Click any square.</span>
        </p>
      </div>

      <StoryDeck featured={featured} tiles={tiles} recall={recallChapter} />

      <div className="deck-foot">
        <a
          href="https://townofpaonia.co/recall"
          target="_blank"
          rel="noopener noreferrer"
          className="deck-foot-recall"
        >
          Recall Mayor Smith →
        </a>
        <Link href="/story">The full story</Link>
        <Link href="/timeline">Timeline</Link>
        <Link href="/wiki">The full record</Link>
      </div>
    </div>
  );
}
