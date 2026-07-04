from __future__ import annotations

import math
from pathlib import Path

import pandas as pd
from PIL import Image, ImageDraw, ImageFont
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

PDF_PATH = OUTPUT_DIR / "hair_density_mean_sd.pdf"
PNG_PATH = OUTPUT_DIR / "hair_density_mean_sd_preview.png"
CSV_PATH = OUTPUT_DIR / "hair_density_mean_sd_summary.csv"

EXPERIMENT = "\u5b9e\u9a8c\u7ec4"
CONTROL = "\u5bf9\u7167\u7ec4"
GROUP_COL = "\u5206\u7ec4"
BASE_METRIC = "\u6bdb\u53d1\u5bc6\u5ea6"
DATA_TIME_LABELS_CN = ["\u57fa\u7ebf", "30\u5929", "90\u5929", "180\u5929"]
DISPLAY_TIME_LABELS = ["T0", "T1", "T3", "T6"]
X_VALUES = [0, 1, 2, 3]

RED = "#D62728"
BLUE = "#1F77B4"
BLACK = "#000000"
WHITE = "#FFFFFF"

CM = 28.3464566929
PAGE_W = 8 * CM
PAGE_H = 6 * CM


def find_source_xlsx() -> Path:
    files = sorted(p for p in ROOT.glob("*.xlsx") if not p.name.startswith("~$"))
    if not files:
        raise FileNotFoundError("No .xlsx workbook found in the workspace root.")
    return files[0]


def read_raw_data(path: Path) -> pd.DataFrame:
    xl = pd.ExcelFile(path)
    sheet_name = xl.sheet_names[0]
    return pd.read_excel(path, sheet_name=sheet_name)


def compute_summary(df: pd.DataFrame) -> pd.DataFrame:
    columns = [f"{BASE_METRIC}_{label}" for label in DATA_TIME_LABELS_CN]
    missing = [col for col in [GROUP_COL, *columns] if col not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")

    rows = []
    for group in [EXPERIMENT, CONTROL]:
        subset = df[df[GROUP_COL].astype(str).str.strip().eq(group)]
        if subset.empty:
            raise ValueError(f"No rows found for group: {group}")
        for x, display_label, source_label, col in zip(
            X_VALUES,
            DISPLAY_TIME_LABELS,
            DATA_TIME_LABELS_CN,
            columns,
        ):
            values = pd.to_numeric(subset[col], errors="coerce").dropna()
            rows.append(
                {
                    "group": group,
                    "time_day": x,
                    "time_label": display_label,
                    "source_time_label": source_label,
                    "n": int(values.shape[0]),
                    "mean": float(values.mean()),
                    "sd": float(values.std(ddof=1)),
                }
            )
    return pd.DataFrame(rows)


def nice_step(raw_step: float) -> float:
    if raw_step <= 0:
        return 1.0
    exponent = math.floor(math.log10(raw_step))
    fraction = raw_step / (10**exponent)
    for nice in [1, 2, 2.5, 5, 10]:
        if fraction <= nice:
            return nice * (10**exponent)
    return 10 * (10**exponent)


def axis_limits(summary: pd.DataFrame) -> tuple[float, float, list[float]]:
    lo = float((summary["mean"] - summary["sd"]).min())
    hi = float((summary["mean"] + summary["sd"]).max())
    target_lo = min(80.0, lo)
    target_hi = max(240.0, hi)
    pad = max(5.0, (target_hi - target_lo) * 0.04)
    raw_lo = target_lo - pad
    raw_hi = target_hi + pad
    step = nice_step((raw_hi - raw_lo) / 5)
    y_min = math.floor(raw_lo / step) * step
    y_max = math.ceil(raw_hi / step) * step
    ticks = []
    value = y_min
    while value <= y_max + step * 0.1:
        ticks.append(round(value, 8))
        value += step
    return y_min, y_max, ticks


def register_fonts() -> tuple[str, str, str]:
    fonts = Path("C:/Windows/Fonts")
    arial = fonts / "arial.ttf"
    arial_bold = fonts / "arialbd.ttf"
    cn = fonts / "msyh.ttc"
    if not cn.exists():
        cn = fonts / "NotoSansSC-VF.ttf"
    if not arial.exists() or not arial_bold.exists() or not cn.exists():
        raise FileNotFoundError("Required Arial/Chinese fonts were not found in C:/Windows/Fonts.")

    pdfmetrics.registerFont(TTFont("ArialLocal", str(arial)))
    pdfmetrics.registerFont(TTFont("ArialLocal-Bold", str(arial_bold)))
    pdfmetrics.registerFont(TTFont("ChineseLocal", str(cn)))
    return "ArialLocal", "ArialLocal-Bold", "ChineseLocal"


def hex_color(value: str) -> colors.Color:
    return colors.HexColor(value)


def draw_centered_text(c: canvas.Canvas, x: float, y: float, text: str, font: str, size: float) -> None:
    c.setFont(font, size)
    c.drawString(x - pdfmetrics.stringWidth(text, font, size) / 2, y, text)


def draw_rotated_centered_text(
    c: canvas.Canvas,
    x: float,
    y: float,
    text: str,
    font: str,
    size: float,
    angle: float,
) -> None:
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.setFont(font, size)
    c.drawString(-pdfmetrics.stringWidth(text, font, size) / 2, -size / 3, text)
    c.restoreState()


def draw_rotated_right_text(
    c: canvas.Canvas,
    x: float,
    y: float,
    text: str,
    font: str,
    size: float,
    angle: float,
) -> None:
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.setFont(font, size)
    c.drawRightString(0, 0, text)
    c.restoreState()


def polyline(c: canvas.Canvas, points: list[tuple[float, float]], dashed: bool = False) -> None:
    path = c.beginPath()
    first_x, first_y = points[0]
    path.moveTo(first_x, first_y)
    for x, y in points[1:]:
        path.lineTo(x, y)
    if dashed:
        c.setDash(4, 2)
    else:
        c.setDash()
    c.drawPath(path, stroke=1, fill=0)
    c.setDash()


def draw_marker(c: canvas.Canvas, x: float, y: float, marker: str, color: str) -> None:
    c.setStrokeColor(hex_color(color))
    c.setFillColor(WHITE)
    c.setLineWidth(0.85)
    size = 3.8
    if marker == "circle":
        c.circle(x, y, size / 2, stroke=1, fill=1)
    elif marker == "square":
        c.rect(x - size / 2, y - size / 2, size, size, stroke=1, fill=1)


def draw_errorbar(
    c: canvas.Canvas,
    x: float,
    y: float,
    y_lo: float,
    y_hi: float,
    color: str,
    cap_width_pt: float = 3,
) -> None:
    c.setStrokeColor(hex_color(color))
    c.setLineWidth(0.7)
    c.setDash()
    c.line(x, y_lo, x, y_hi)
    c.line(x - cap_width_pt / 2, y_lo, x + cap_width_pt / 2, y_lo)
    c.line(x - cap_width_pt / 2, y_hi, x + cap_width_pt / 2, y_hi)


def draw_legend(
    c: canvas.Canvas,
    x: float,
    y: float,
    font_cn: str,
    font_en: str,
) -> None:
    legend_w = 64
    legend_h = 34
    c.saveState()
    c.setFillAlpha(0.72)
    c.setFillColor(colors.Color(1, 1, 1, alpha=0.72))
    c.setStrokeColor(hex_color(BLACK))
    c.setLineWidth(0.5)
    c.rect(x, y - legend_h, legend_w, legend_h, stroke=1, fill=1)
    c.restoreState()

    row_y = [y - 11, y - 26]
    labels = [(EXPERIMENT, RED, "circle", False), (CONTROL, BLUE, "square", True)]
    for yy, (label, color, marker, dashed) in zip(row_y, labels):
        c.setStrokeColor(hex_color(color))
        c.setLineWidth(1.2)
        if dashed:
            c.setDash(4, 2)
        else:
            c.setDash()
        c.line(x + 6, yy, x + 24, yy)
        c.setDash()
        draw_marker(c, x + 15, yy, marker, color)
        c.setFillColor(hex_color(BLACK))
        c.setFont(font_cn, 10)
        c.drawString(x + 30, yy - 3.5, label)


def draw_pdf(summary: pd.DataFrame) -> None:
    font_en, font_en_bold, font_cn = register_fonts()
    c = canvas.Canvas(str(PDF_PATH), pagesize=(PAGE_W, PAGE_H), bottomup=1, pageCompression=1)
    c.setTitle("Hair density mean SD")

    left = 42
    right = 11
    bottom = 43
    top = 13
    plot_x0 = left
    plot_y0 = bottom
    plot_w = PAGE_W - left - right
    plot_h = PAGE_H - bottom - top
    plot_x1 = plot_x0 + plot_w
    plot_y1 = plot_y0 + plot_h

    x_min, x_max = -0.2, 3.2
    y_min, y_max, y_ticks = axis_limits(summary)

    def sx(x: float) -> float:
        return plot_x0 + (x - x_min) / (x_max - x_min) * plot_w

    def sy(y: float) -> float:
        return plot_y0 + (y - y_min) / (y_max - y_min) * plot_h

    c.setFillColor(hex_color(WHITE))
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    # Axes frame.
    c.setStrokeColor(hex_color(BLACK))
    c.setLineWidth(0.8)
    c.rect(plot_x0, plot_y0, plot_w, plot_h, stroke=1, fill=0)

    # Ticks point inward.
    tick_len = 4
    c.setLineWidth(0.7)
    c.setFillColor(hex_color(BLACK))
    c.setFont(font_en, 8.7)
    for x, label in zip(X_VALUES, DISPLAY_TIME_LABELS):
        xx = sx(x)
        c.line(xx, plot_y0, xx, plot_y0 + tick_len)
        c.line(xx, plot_y1, xx, plot_y1 - tick_len)
        draw_centered_text(c, xx, plot_y0 - 17, label, font_en, 10)

    for y in y_ticks:
        yy = sy(y)
        c.line(plot_x0, yy, plot_x0 + tick_len, yy)
        c.line(plot_x1, yy, plot_x1 - tick_len, yy)
        label = f"{int(y)}" if abs(y - round(y)) < 1e-7 else f"{y:g}"
        c.setFont(font_en, 10)
        c.drawRightString(plot_x0 - 6, yy - 3.5, label)

    y_label = "Hair density ( hairs/cm\u00b2 )"
    draw_rotated_centered_text(c, 11, plot_y0 + plot_h / 2, y_label, font_en_bold, 11, 90)

    for group, color, marker, dashed in [
        (EXPERIMENT, RED, "circle", False),
        (CONTROL, BLUE, "square", True),
    ]:
        data = summary[summary["group"].eq(group)].sort_values("time_day")
        pts = [(sx(row.time_day), sy(row["mean"])) for _, row in data.iterrows()]
        for _, row in data.iterrows():
            xx = sx(row.time_day)
            y_mean = sy(row["mean"])
            y_lo = sy(row["mean"] - row.sd)
            y_hi = sy(row["mean"] + row.sd)
            draw_errorbar(c, xx, y_mean, y_lo, y_hi, color, 3)
        c.setStrokeColor(hex_color(color))
        c.setLineWidth(1.25)
        polyline(c, pts, dashed=dashed)
        for xx, yy in pts:
            draw_marker(c, xx, yy, marker, color)

    draw_legend(c, plot_x0 + 6, plot_y1 - 5, font_cn, font_en)

    c.showPage()
    c.save()


def draw_png_preview(summary: pd.DataFrame) -> None:
    scale = 4
    w = int(round(PAGE_W * scale))
    h = int(round(PAGE_H * scale))
    img = Image.new("RGB", (w, h), "white")
    draw = ImageDraw.Draw(img, "RGBA")

    font_dir = Path("C:/Windows/Fonts")
    font_en = ImageFont.truetype(str(font_dir / "arial.ttf"), int(10 * scale))
    font_en_bold = ImageFont.truetype(str(font_dir / "arialbd.ttf"), int(11 * scale))
    font_cn = ImageFont.truetype(str(font_dir / "msyh.ttc"), int(10 * scale))
    font_cn_legend = ImageFont.truetype(str(font_dir / "msyh.ttc"), int(10 * scale))

    left = int(42 * scale)
    right = int(11 * scale)
    bottom = int(43 * scale)
    top = int(13 * scale)
    plot_x0 = left
    plot_y0 = top
    plot_w = w - left - right
    plot_h = h - bottom - top
    plot_x1 = plot_x0 + plot_w
    plot_y1 = plot_y0 + plot_h
    x_min, x_max = -0.2, 3.2
    y_min, y_max, y_ticks = axis_limits(summary)

    def sx(x: float) -> float:
        return plot_x0 + (x - x_min) / (x_max - x_min) * plot_w

    def sy(y: float) -> float:
        return plot_y1 - (y - y_min) / (y_max - y_min) * plot_h

    def text_center(x: float, y: float, text: str, font: ImageFont.FreeTypeFont, fill=BLACK) -> None:
        bbox = draw.textbbox((0, 0), text, font=font)
        draw.text((x - (bbox[2] - bbox[0]) / 2, y), text, font=font, fill=fill)

    def rotated_right_text(x: float, y: float, text: str, font: ImageFont.FreeTypeFont, angle: float) -> None:
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        label_img = Image.new("RGBA", (tw + 10, th + 10), (255, 255, 255, 0))
        label_draw = ImageDraw.Draw(label_img)
        label_draw.text((5, 5), text, font=font, fill=BLACK)
        rotated = label_img.rotate(angle, expand=True)
        img.paste(rotated, (int(x - rotated.width + 2), int(y)), rotated)

    draw.rectangle([plot_x0, plot_y0, plot_x1, plot_y1], outline=BLACK, width=max(1, int(0.8 * scale)))
    tick_len = int(4 * scale)
    for x, label in zip(X_VALUES, DISPLAY_TIME_LABELS):
        xx = sx(x)
        draw.line([(xx, plot_y1), (xx, plot_y1 - tick_len)], fill=BLACK, width=max(1, int(0.7 * scale)))
        draw.line([(xx, plot_y0), (xx, plot_y0 + tick_len)], fill=BLACK, width=max(1, int(0.7 * scale)))
        text_center(xx, plot_y1 + int(9 * scale), label, font_en)
    for y in y_ticks:
        yy = sy(y)
        draw.line([(plot_x0, yy), (plot_x0 + tick_len, yy)], fill=BLACK, width=max(1, int(0.7 * scale)))
        draw.line([(plot_x1, yy), (plot_x1 - tick_len, yy)], fill=BLACK, width=max(1, int(0.7 * scale)))
        label = f"{int(y)}" if abs(y - round(y)) < 1e-7 else f"{y:g}"
        bbox = draw.textbbox((0, 0), label, font=font_en)
        draw.text((plot_x0 - int(6 * scale) - (bbox[2] - bbox[0]), yy - (bbox[3] - bbox[1]) / 2), label, font=font_en, fill=BLACK)

    label = "Hair density ( hairs/cm\u00b2 )"
    bbox = draw.textbbox((0, 0), label, font=font_en_bold)
    label_img = Image.new("RGBA", (bbox[2] - bbox[0] + 8, bbox[3] - bbox[1] + 8), (255, 255, 255, 0))
    label_draw = ImageDraw.Draw(label_img)
    label_draw.text((4, 4), label, font=font_en_bold, fill=BLACK)
    label_img = label_img.rotate(90, expand=True)
    img.paste(label_img, (int(8 * scale) - label_img.width // 2, plot_y0 + plot_h // 2 - label_img.height // 2), label_img)

    for group, color, marker, dashed in [
        (EXPERIMENT, RED, "circle", False),
        (CONTROL, BLUE, "square", True),
    ]:
        data = summary[summary["group"].eq(group)].sort_values("time_day")
        pts = [(sx(row.time_day), sy(row["mean"])) for _, row in data.iterrows()]
        for _, row in data.iterrows():
            xx = sx(row.time_day)
            y_lo = sy(row["mean"] - row.sd)
            y_hi = sy(row["mean"] + row.sd)
            cap = 3 * scale
            draw.line([(xx, y_hi), (xx, y_lo)], fill=color, width=max(1, int(0.7 * scale)))
            draw.line([(xx - cap / 2, y_lo), (xx + cap / 2, y_lo)], fill=color, width=max(1, int(0.7 * scale)))
            draw.line([(xx - cap / 2, y_hi), (xx + cap / 2, y_hi)], fill=color, width=max(1, int(0.7 * scale)))
        if dashed:
            for start, end in zip(pts[:-1], pts[1:]):
                draw_dashed_line(draw, start, end, color, int(1.25 * scale), int(4 * scale), int(2 * scale))
        else:
            draw.line(pts, fill=color, width=max(1, int(1.25 * scale)))
        for xx, yy in pts:
            size = 3.8 * scale
            if marker == "circle":
                draw.ellipse([xx - size / 2, yy - size / 2, xx + size / 2, yy + size / 2], outline=color, fill=WHITE, width=max(1, int(0.85 * scale)))
            else:
                draw.rectangle([xx - size / 2, yy - size / 2, xx + size / 2, yy + size / 2], outline=color, fill=WHITE, width=max(1, int(0.85 * scale)))

    lx, ly = plot_x0 + int(6 * scale), plot_y0 + int(5 * scale)
    legend_w, legend_h = int(64 * scale), int(34 * scale)
    draw.rectangle([lx, ly, lx + legend_w, ly + legend_h], fill=(255, 255, 255, 184), outline=BLACK, width=max(1, int(0.5 * scale)))
    for i, (name, color, marker, dashed) in enumerate([(EXPERIMENT, RED, "circle", False), (CONTROL, BLUE, "square", True)]):
        yy = ly + int((11 if i == 0 else 26) * scale)
        if dashed:
            draw_dashed_line(draw, (lx + 6 * scale, yy), (lx + 24 * scale, yy), color, int(1.2 * scale), int(4 * scale), int(2 * scale))
        else:
            draw.line([(lx + 6 * scale, yy), (lx + 24 * scale, yy)], fill=color, width=max(1, int(1.2 * scale)))
        size = 3.8 * scale
        mx = lx + 15 * scale
        if marker == "circle":
            draw.ellipse([mx - size / 2, yy - size / 2, mx + size / 2, yy + size / 2], outline=color, fill=WHITE, width=max(1, int(0.85 * scale)))
        else:
            draw.rectangle([mx - size / 2, yy - size / 2, mx + size / 2, yy + size / 2], outline=color, fill=WHITE, width=max(1, int(0.85 * scale)))
        draw.text((lx + 30 * scale, yy - 4 * scale), name, font=font_cn_legend, fill=BLACK)

    img.save(PNG_PATH, dpi=(300, 300))


def draw_dashed_line(
    draw: ImageDraw.ImageDraw,
    start: tuple[float, float],
    end: tuple[float, float],
    fill: str,
    width: int,
    dash: int,
    gap: int,
) -> None:
    x0, y0 = start
    x1, y1 = end
    length = math.hypot(x1 - x0, y1 - y0)
    if length <= 0:
        return
    dx = (x1 - x0) / length
    dy = (y1 - y0) / length
    pos = 0.0
    while pos < length:
        end_pos = min(length, pos + dash)
        draw.line(
            [(x0 + dx * pos, y0 + dy * pos), (x0 + dx * end_pos, y0 + dy * end_pos)],
            fill=fill,
            width=max(1, width),
        )
        pos += dash + gap


def main() -> None:
    source = find_source_xlsx()
    df = read_raw_data(source)
    summary = compute_summary(df)
    summary.to_csv(CSV_PATH, index=False, encoding="utf-8-sig")
    draw_pdf(summary)
    draw_png_preview(summary)
    print(f"source={source}")
    print(summary.to_string(index=False, float_format=lambda value: f"{value:.4f}"))
    print(f"pdf={PDF_PATH}")
    print(f"png={PNG_PATH}")
    print(f"csv={CSV_PATH}")


if __name__ == "__main__":
    main()
