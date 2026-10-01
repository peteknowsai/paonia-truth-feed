"""Generate a video's audio with ElevenLabs and mix it: narration (with word timings),
a music bed, and sound effects cued to narration words.

Writes build/<slug>/timing.json (render.py syncs every cue to it) and build/<slug>/mix.wav.
Every ElevenLabs response is cached under build/<slug>/audio/ by content hash, so reruns
only bill for text that changed. The API key is read from the macOS keychain
(service "elevenlabs") or ELEVENLABS_API_KEY.

    python3 audio.py videos/first-time-today.json [--voice <voice_id>]
"""
import base64
import hashlib
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

from render import ROOT, load, norm

API = "https://api.elevenlabs.io/v1"
VOICE = "nPczCjzI2devNBz1zQrb"  # "Brian": measured American narrator
LEAD, TAIL = 0.3, 0.35  # silence around each narration segment
MUSIC_DB, SFX_DB = -20, -6


def key():
    if os.environ.get("ELEVENLABS_API_KEY"):
        return os.environ["ELEVENLABS_API_KEY"]
    return subprocess.run(["security", "find-generic-password", "-s", "elevenlabs", "-w"],
                          capture_output=True, text=True, check=True).stdout.strip()


def call(path, body, cache_dir, ext):
    h = hashlib.sha256(json.dumps([path, body], sort_keys=True).encode()).hexdigest()[:16]
    out = cache_dir / f"{h}.{ext}"
    if out.exists():
        return out
    req = urllib.request.Request(f"{API}{path}", data=json.dumps(body).encode(), method="POST",
                                 headers={"xi-api-key": key(), "content-type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            out.write_bytes(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"ElevenLabs {path} failed: {e.code} {e.read().decode()[:300]}")
    return out


def duration(path):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                 "-of", "csv=p=0", str(path)], capture_output=True, text=True).stdout)


def narrate(seg, voice, cache):
    body = {"text": seg["narration"], "model_id": "eleven_multilingual_v2",
            "voice_settings": {"stability": 0.6, "similarity_boost": 0.8, "style": 0.1}}
    raw = json.loads(call(f"/text-to-speech/{voice}/with-timestamps", body, cache, "json").read_text())
    mp3 = cache / f"{hashlib.sha256(raw['audio_base64'][:2000].encode()).hexdigest()[:16]}.mp3"
    if not mp3.exists():
        mp3.write_bytes(base64.b64decode(raw["audio_base64"]))
    al = raw["alignment"]
    words, cur, start = [], "", None
    for ch, t in zip(al["characters"], al["character_start_times_seconds"]):
        if ch.isspace():
            if cur:
                words.append({"w": cur, "t": round(LEAD + start, 3)})
            cur, start = "", None
        else:
            start = t if start is None else start
            cur += ch
    if cur:
        words.append({"w": cur, "t": round(LEAD + start, 3)})
    return mp3, {"dur": round(LEAD + duration(mp3) + TAIL, 3), "words": words}


def main(spec_path, voice):
    spec = load(spec_path)
    build = ROOT / "build" / spec["slug"]
    cache = build / "audio"
    cache.mkdir(parents=True, exist_ok=True)

    clips, timing = [], []
    for seg in spec["segments"]:
        mp3, tm = narrate(seg, voice, cache)
        clips.append(mp3)
        timing.append(tm)
    (build / "timing.json").write_text(json.dumps(timing, indent=1))
    spec = load(spec_path)  # reload so cue times come from real word timings

    inputs, filters, mixes = [], [], []
    for k, (seg, mp3) in enumerate(zip(spec["segments"], clips)):
        inputs += ["-i", str(mp3)]
        ms = int((seg["start"] + LEAD) * 1000)
        filters.append(f"[{k}:a]aresample=48000,aformat=channel_layouts=stereo,adelay={ms}|{ms}[n{k}]")
        mixes.append(f"[n{k}]")
    n = len(clips)
    filters.append(f"{''.join(mixes)}amix=inputs={n}:normalize=0,asplit=2[voice][key]")

    idx = n
    sfx_labels = []
    for seg in spec["segments"]:
        for fx in seg.get("sfx", []):
            body = {"text": fx["prompt"], "duration_seconds": fx.get("dur", 1.0), "prompt_influence": 0.5}
            inputs += ["-i", str(call("/sound-generation", body, cache, "mp3"))]
            ms = int((seg["start"] + fx["t"]) * 1000)
            filters.append(f"[{idx}:a]aresample=48000,aformat=channel_layouts=stereo,"
                           f"volume={SFX_DB}dB,adelay={ms}|{ms}[s{idx}]")
            sfx_labels.append(f"[s{idx}]")
            idx += 1

    total = spec["total"]
    music = call("/music", {"prompt": spec["music"], "music_length_ms": int((total + 2) * 1000),
                            "model_id": "music_v1", "force_instrumental": True}, cache, "mp3")
    inputs += ["-i", str(music)]
    filters.append(f"[{idx}:a]aresample=48000,aformat=channel_layouts=stereo,volume={MUSIC_DB}dB,"
                   f"atrim=0:{total},afade=t=in:d=1,afade=t=out:st={total - 2.5}:d=2.5[mus]")
    filters.append("[mus][key]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[duck]")
    all_in = ["[voice]", "[duck]"] + sfx_labels
    filters.append(f"{''.join(all_in)}amix=inputs={len(all_in)}:normalize=0,"
                   f"alimiter=limit=0.95,apad=whole_dur={total}[out]")

    out = build / "mix.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(filters),
                    "-map", "[out]", "-t", str(total), "-ar", "48000", str(out)], check=True)
    print(f"{out}  {total:.1f}s  ({n} narration clips, {len(sfx_labels)} sfx, music)")


if __name__ == "__main__":
    v = sys.argv[sys.argv.index("--voice") + 1] if "--voice" in sys.argv else VOICE
    main(sys.argv[1], v)
