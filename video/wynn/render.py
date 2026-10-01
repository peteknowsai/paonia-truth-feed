"""Render a square explainer video from a timeline JSON (videos/<slug>.json).

Look matches the homezero "Read This House" explainers: cream paper, hand-drawn scenes,
red display title, five-step progress bar, handwritten quote cards.

Timing comes from build/<slug>/timing.json (written by audio.py from ElevenLabs
alignment) when present; otherwise word times are estimated so the cut can be
previewed silently. Audio, when build/<slug>/mix.wav exists, is muxed in.

    python3 render.py videos/first-time-today.json            # full mp4
    python3 render.py videos/first-time-today.json --still 7.5  # one frame PNG
    python3 render.py videos/first-time-today.json --sheet      # contact sheet PNG
"""
import json
import math
import re
import subprocess
import sys
from functools import lru_cache
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).parent
ASSETS = ROOT / "assets"
W = H = 1080
FPS = 30
CREAM = (243, 238, 228)
RED = (222, 82, 72)
DRED = (150, 42, 36)
INK = (44, 40, 36)
GRAY = (160, 154, 144)
WHITE = (255, 253, 248)
BOX = (110, 118, 970, 838)  # scene area: 860 x 720
XFADE = 0.45
POP = 0.28
WPS = 2.6  # estimated narration words/sec when no ElevenLabs timing exists


@lru_cache(None)
def font(name, size):
    return ImageFont.truetype(str(ASSETS / name), size)


def display(size): return font("LuckiestGuy-Regular.ttf", size)
def hand(size): return font("PatrickHand-Regular.ttf", size)
def brush(size): return font("CaveatBrush-Regular.ttf", size)


def ease(x):
    x = min(max(x, 0.0), 1.0)
    return 1 - (1 - x) ** 3


def norm(w):
    return re.sub(r"[^a-z0-9]", "", w.lower())


# ---------- timeline ----------

def load(path):
    spec = json.loads(Path(path).read_text())
    timing_path = ROOT / "build" / spec["slug"] / "timing.json"
    timing = json.loads(timing_path.read_text()) if timing_path.exists() else None
    t0 = 0.0
    for i, seg in enumerate(spec["segments"]):
        if timing:
            seg["dur"], seg["words"] = timing[i]["dur"], timing[i]["words"]
        else:
            words = seg["narration"].split()
            seg["words"] = [{"w": w, "t": 0.35 + k / WPS} for k, w in enumerate(words)]
            seg["dur"] = 0.35 + len(words) / WPS + 0.6
        seg["start"] = t0
        t0 += seg["dur"]
        for ov in seg.get("overlays", []) + seg.get("sfx", []):
            ov["t"] = ov.get("at", word_time(seg, ov.get("word")))
    spec["end"]["start"] = t0
    spec["total"] = t0 + spec["end"]["dur"]
    return spec


def word_time(seg, word):
    if not word:
        return 0.0
    target = norm(word)
    for w in seg["words"]:
        if norm(w["w"]).startswith(target):
            return w["t"]
    raise ValueError(f"cue word {word!r} not in narration: {seg['narration']}")


# ---------- static layers ----------

@lru_cache(None)
def scene_src(name):
    return Image.open(ASSETS / f"{name}.jpg").convert("RGB")


@lru_cache(None)
def feather():
    bw, bh = BOX[2] - BOX[0], BOX[3] - BOX[1]
    m = Image.new("L", (bw, bh), 0)
    ImageDraw.Draw(m).rounded_rectangle((18, 18, bw - 18, bh - 18), 40, fill=255)
    return m.filter(ImageFilter.GaussianBlur(14))


def outlined(draw, xy, text, f, fill, stroke, sw, anchor="mm"):
    draw.text((xy[0] + 3, xy[1] + 4), text, font=f, fill=(0, 0, 0, 40), anchor=anchor,
              stroke_width=sw, stroke_fill=(0, 0, 0, 40))
    draw.text(xy, text, font=f, fill=fill, anchor=anchor, stroke_width=sw, stroke_fill=stroke)


@lru_cache(None)
def title_layer(text):
    im = Image.new("RGBA", (W, 120), (0, 0, 0, 0))
    size = 66
    while display(size).getlength(text) > W - 120:
        size -= 2
    outlined(ImageDraw.Draw(im), (W // 2, 62), text, display(size), RED, DRED, 3)
    return im


@lru_cache(None)
def progress_layer(steps, current):
    im = Image.new("RGBA", (W, 110), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    n = len(steps)
    xs = [180 + k * (W - 360) / (n - 1) for k in range(n)]
    y, r = 34, 17
    for k in range(n - 1):
        col = RED if k < current else (210, 204, 194)
        d.line((xs[k] + r, y, xs[k + 1] - r, y), fill=col, width=3)
    for k, (x, label) in enumerate(zip(xs, steps)):
        box = (x - r, y - r, x + r, y + r)
        if k < current:
            d.ellipse(box, fill=RED)
            d.line((x - 7, y, x - 2, y + 6, x + 8, y - 6), fill=WHITE, width=4, joint="curve")
        else:
            col = RED if k == current else GRAY
            d.ellipse(box, fill=WHITE, outline=col, width=3)
            d.text((x, y + 1), str(k + 1), font=hand(24), fill=col, anchor="mm")
        d.text((x, y + 40), label, font=hand(22), fill=RED if k == current else GRAY, anchor="mm")
    return im


def wrap(text, f, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if f.getlength(trial) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    return lines + [line]


@lru_cache(None)
def overlay_image(kind, text, by=""):
    if kind == "caption":
        f = display(64)
        while f.getlength(text) > W - 140:
            f = display(f.size - 2)
        im = Image.new("RGBA", (int(f.getlength(text)) + 40, 110), (0, 0, 0, 0))
        outlined(ImageDraw.Draw(im), (im.width // 2, 55), text, f, RED, DRED, 3)
        return im
    if kind == "quote":
        f, fb = hand(42), hand(25)
        lines = wrap(text, f, 680)
        lh = 50
        h = 44 + lh * len(lines) + (40 if by else 0) + 26
        im = Image.new("RGBA", (780, h + 24), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        d.rounded_rectangle((14, 18, 774, h + 18), 18, fill=(0, 0, 0, 45))
        im = im.filter(ImageFilter.GaussianBlur(8))
        d = ImageDraw.Draw(im)
        d.rounded_rectangle((6, 6, 766, h), 16, fill=WHITE, outline=(226, 218, 204), width=2)
        d.rectangle((6, 6, 16, h), fill=RED)
        for k, ln in enumerate(lines):
            d.text((50, 30 + k * lh), ln, font=f, fill=INK)
        if by:
            d.text((52, 34 + len(lines) * lh), f"— {by}", font=fb, fill=GRAY)
        return im.rotate(1.2, resample=Image.BICUBIC, expand=True)
    if kind == "label":
        f = brush(44)
        im = Image.new("RGBA", (int(f.getlength(text)) + 30, 70), (0, 0, 0, 0))
        ImageDraw.Draw(im).text((15, 8), text, font=f, fill=DRED, stroke_width=5, stroke_fill=CREAM)
        return im
    if kind == "stamp":
        f = display(78)
        while f.getlength(text) > 700:
            f = display(f.size - 2)
        tw = int(f.getlength(text))
        im = Image.new("RGBA", (tw + 90, 160), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        d.rounded_rectangle((10, 10, tw + 80, 150), 18, fill=WHITE + (225,), outline=RED + (235,), width=9)
        d.text((im.width // 2, 84), text, font=f, fill=RED + (235,), anchor="mm")
        return im.rotate(-7, resample=Image.BICUBIC, expand=True)
    raise ValueError(kind)


# ---------- frame ----------

def scene_frame(seg, lt):
    src = scene_src(seg["scene"])
    z0, z1 = seg.get("zoom", [1.0, 1.07])
    z = z0 + (z1 - z0) * ease(lt / seg["dur"])
    fx, fy = seg.get("focus", [0.5, 0.5])
    bw, bh = BOX[2] - BOX[0], BOX[3] - BOX[1]
    cw = src.width / z
    ch = cw * bh / bw
    cx = min(max(fx * src.width, cw / 2), src.width - cw / 2)
    cy = min(max(fy * src.height, ch / 2), src.height - ch / 2)
    return src.resize((bw, bh), Image.LANCZOS, box=(cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2))


def paste_pop(canvas, img, center, age, grow=0.18):
    k = ease(age / POP)
    s = (1 + grow) - grow * k if grow > 0 else 0.85 + 0.15 * k
    if s != 1:
        img = img.resize((max(1, int(img.width * s)), max(1, int(img.height * s))), Image.BICUBIC)
    if k < 1:
        a = img.getchannel("A").point(lambda v: int(v * k))
        img = img.copy()
        img.putalpha(a)
    canvas.alpha_composite(img, (int(center[0] - img.width / 2), int(center[1] - img.height / 2)))


def box_point(pos):
    return (BOX[0] + pos[0] * (BOX[2] - BOX[0]), BOX[1] + pos[1] * (BOX[3] - BOX[1]))


def draw_overlays(canvas, seg, lt):
    for ov in seg.get("overlays", []):
        age = lt - ov["t"]
        if age < 0:
            continue
        kind = ov["type"]
        img = overlay_image(kind, ov["text"], ov.get("by", ""))
        if kind == "caption":
            paste_pop(canvas, img, (W / 2, 892), age)
        elif kind == "stamp":
            paste_pop(canvas, img, box_point(ov.get("pos", [0.5, 0.42])), age, grow=0.6)
        else:
            c = box_point(ov.get("pos", [0.5, 0.5]))
            if kind == "label" and "arrow" in ov:
                a = box_point(ov["arrow"])
                k = ease(age / 0.5)
                tip = (c[0] + (a[0] - c[0]) * k, c[1] + 26 + (a[1] - c[1] - 26) * k)
                d = ImageDraw.Draw(canvas)
                d.line((c[0], c[1] + 26, *tip), fill=DRED, width=5)
                if k >= 1:
                    ang = math.atan2(a[1] - c[1] - 26, a[0] - c[0])
                    for s in (2.6, -2.6):
                        d.line((*a, a[0] - 22 * math.cos(ang + s / 6), a[1] - 22 * math.sin(ang + s / 6)),
                               fill=DRED, width=5)
            paste_pop(canvas, img, c, age, grow=0)


def end_frame(canvas, end, lt):
    d = ImageDraw.Draw(canvas)
    lines = end["lines"]
    for k, ln in enumerate(lines):
        age = lt - 0.25 - 0.55 * k
        if age < 0:
            continue
        img = Image.new("RGBA", (W, 200), (0, 0, 0, 0))
        outlined(ImageDraw.Draw(img), (W // 2, 100), ln, display(150), RED, DRED, 4)
        y = 470 - (len(lines) - 1) * 85 + k * 170
        paste_pop(canvas, img, (W / 2, y), age, grow=0.4)
    if lt > 0.25 + 0.55 * len(lines):
        f = hand(24)
        for k, ln in enumerate(wrap(end["source"], f, 820)):
            d.text((W / 2, 828 + k * 30), ln, font=f, fill=GRAY, anchor="mm")


def frame(spec, t):
    canvas = Image.new("RGBA", (W, H), CREAM + (255,))
    segs = spec["segments"]
    steps = tuple(spec["steps"])
    if t >= spec["end"]["start"]:
        end_frame(canvas, spec["end"], t - spec["end"]["start"])
        step = len(steps)
    else:
        i = max(k for k, s in enumerate(segs) if s["start"] <= t)
        seg, lt = segs[i], t - segs[i]["start"]
        img = scene_frame(seg, lt)
        if i > 0 and lt < XFADE and segs[i - 1]["scene"] != seg["scene"]:
            prev = segs[i - 1]
            img = Image.blend(scene_frame(prev, prev["dur"]), img, ease(lt / XFADE))
        canvas.paste(img, BOX[:2], feather())
        draw_overlays(canvas, seg, lt)
        step = seg["step"]
    canvas.alpha_composite(title_layer(spec["title"]), (0, 0))
    canvas.alpha_composite(progress_layer(steps, step), (0, 960))
    return canvas.convert("RGB")


def render(spec, out):
    out.parent.mkdir(parents=True, exist_ok=True)
    mix = ROOT / "build" / spec["slug"] / "mix.wav"
    cmd = ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-"]
    if mix.exists():
        cmd += ["-i", str(mix), "-c:a", "aac", "-b:a", "192k", "-shortest"]
    cmd += ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-movflags", "+faststart", str(out)]
    p = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    n = int(spec["total"] * FPS)
    for k in range(n):
        p.stdin.write(frame(spec, k / FPS).tobytes())
    p.stdin.close()
    if p.wait():
        sys.exit("ffmpeg failed")
    print(f"{out}  {spec['total']:.1f}s  audio={'yes' if mix.exists() else 'no'}")


def sheet(spec, out):
    ts = [s["start"] + s["dur"] * 0.85 for s in spec["segments"]] + [spec["total"] - 0.1]
    thumbs = [frame(spec, t).resize((360, 360)) for t in ts]
    cols = 4
    im = Image.new("RGB", (360 * cols, 360 * math.ceil(len(thumbs) / cols)), "white")
    for k, th in enumerate(thumbs):
        im.paste(th, ((k % cols) * 360, (k // cols) * 360))
    im.save(out)
    print(out)


if __name__ == "__main__":
    spec = load(sys.argv[1])
    build = ROOT / "build" / spec["slug"]
    build.mkdir(parents=True, exist_ok=True)
    if "--still" in sys.argv:
        t = float(sys.argv[sys.argv.index("--still") + 1])
        frame(spec, t).save(build / f"still-{t}.png")
        print(build / f"still-{t}.png")
    elif "--sheet" in sys.argv:
        sheet(spec, build / "sheet.png")
    else:
        render(spec, build / f"{spec['slug']}.mp4")
