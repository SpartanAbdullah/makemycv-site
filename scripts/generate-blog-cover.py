#!/usr/bin/env python3
"""Generate a 1200x630 text-based PNG cover image for a blog post."""

import argparse
import os
import textwrap

from PIL import Image, ImageDraw, ImageFont

# ── Design tokens ────────────────────────────────────────
BG_COLOR = "#0f172a"
GRID_COLOR = "#1e293b"
GRID_STEP = 48
ACCENT_COLOR = "#2563eb"
ACCENT_WIDTH = 6
BRAND_DOT_R = 6
TITLE_COLOR = "#ffffff"
MUTED_COLOR = "#475569"
PILL_BG = "#1e3a8a"
PILL_FG = "#93c5fd"
WIDTH, HEIGHT = 1200, 630

# ── Font paths (cross-platform fallback) ─────────────────
FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "C:/Windows/Fonts/arialbd.ttf",
    "C:/Windows/Fonts/arial.ttf",
]


def _load_font(size: int) -> ImageFont.FreeTypeFont:
    for path in FONT_CANDIDATES:
        if os.path.isfile(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def generate(slug: str, title: str, category: str = "CV Tips") -> str:
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Subtle grid
    for x in range(0, WIDTH, GRID_STEP):
        draw.line([(x, 0), (x, HEIGHT)], fill=GRID_COLOR, width=1)
    for y in range(0, HEIGHT, GRID_STEP):
        draw.line([(0, y), (WIDTH, y)], fill=GRID_COLOR, width=1)

    # Left accent bar
    draw.rectangle([(0, 0), (ACCENT_WIDTH, HEIGHT)], fill=ACCENT_COLOR)

    # ── Top-left branding ────────────────────────────────
    brand_font = _load_font(26)
    bx, by = 36, 32
    draw.ellipse(
        [(bx, by + 4), (bx + BRAND_DOT_R * 2, by + 4 + BRAND_DOT_R * 2)],
        fill=ACCENT_COLOR,
    )
    draw.text((bx + BRAND_DOT_R * 2 + 10, by), "MakeMyCV", fill=TITLE_COLOR, font=brand_font)

    # ── Centre title ─────────────────────────────────────
    title_font = _load_font(68)
    wrapped = textwrap.fill(title, width=28)
    lines = wrapped.split("\n")[:3]  # max 3 lines
    title_text = "\n".join(lines)

    bbox = draw.multiline_textbbox((0, 0), title_text, font=title_font, spacing=12)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (WIDTH - tw) // 2
    ty = (HEIGHT - th) // 2 - 10
    draw.multiline_text((tx, ty), title_text, fill=TITLE_COLOR, font=title_font, spacing=12)

    # ── Bottom-left URL ──────────────────────────────────
    url_font = _load_font(18)
    draw.text((36, HEIGHT - 50), "makemycv.ae", fill=MUTED_COLOR, font=url_font)

    # ── Bottom-right category pill ───────────────────────
    pill_font = _load_font(16)
    pill_bbox = draw.textbbox((0, 0), category, font=pill_font)
    pw = pill_bbox[2] - pill_bbox[0]
    ph = pill_bbox[3] - pill_bbox[1]
    pad_x, pad_y = 16, 8
    pill_x = WIDTH - pw - pad_x * 2 - 36
    pill_y = HEIGHT - ph - pad_y * 2 - 36
    draw.rounded_rectangle(
        [(pill_x, pill_y), (pill_x + pw + pad_x * 2, pill_y + ph + pad_y * 2)],
        radius=12,
        fill=PILL_BG,
    )
    draw.text((pill_x + pad_x, pill_y + pad_y), category, fill=PILL_FG, font=pill_font)

    # ── Save ─────────────────────────────────────────────
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    out_dir = os.path.join(project_root, "public", "blog", "covers")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{slug}.png")
    img.save(out_path, "PNG", optimize=True)
    return out_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate blog cover image")
    parser.add_argument("--slug", required=True, help="Post slug for filename")
    parser.add_argument("--title", required=True, help="Post title text")
    parser.add_argument("--category", default="CV Tips", help="Category label")
    args = parser.parse_args()

    path = generate(args.slug, args.title, args.category)
    size = os.path.getsize(path)
    print(f"Generated: {path}")
    print(f"  Size: {size:,} bytes ({size / 1024:.1f} KB)")
