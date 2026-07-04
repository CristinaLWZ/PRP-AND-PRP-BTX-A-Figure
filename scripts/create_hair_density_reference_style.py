from __future__ import annotations

from pathlib import Path

import pandas as pd
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

PDF_PATH = OUTPUT_DIR / "hair_density_publication_english_ylabel_T0_T1_T3_T6.pdf"
CSV_PATH = OUTPUT_DIR / "hair_density_publication_english_ylabel_T0_T1_T3_T6_summary.csv"

EXPERIMENT = "\u5b9e\u9a8c\u7ec4"
CONTROL = "\u5bf9\u7167\u7ec4"
GROUP_COL = "\u5206\u7ec4"
BASE_METRIC = "\u6bdb\u53d1\u5bc6\u5ea6"
DATA_TIME_LABELS_CN = ["\u57fa\u7ebf", "30\u5929", "90\u5929", "180\u5929"]
DISPLAY_TIME_LABELS = ["T0", "T1", "T3", "T6"]
X_VALUES = [0, 1, 2, 3]

PRP_RED = "#FF0000"
BTXA_GREEN = "#00E83A"
BLACK = "#000000"
WHITE = "#FFFFFF"

CM = 28.3464566929
PAGE_W = 8 * CM
PAGE_H = 6 * CM


def find_source_xlsx() -> Path:
    files = sorted(p for p in ROOT.glob("*.xlsx") if not p.name.startswith("~$"))
    if not files:
        raise FileNotFoundError("No .xlsx workbook found in workspace root.")
    return files[0]


def compute_summary(path: Path) -> pd.DataFrame:
    df = pd.read_excel(path, sheet_name=0)
    columns = [f"{BASE_METRIC}_{label}" for label in DATA_TIME_LABELS_CN]
    missing = [col for col in [GROUP_COL, *columns] if col not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")

    rows = []
    group_map = [
        (CONTROL, "PRP"),
        (EXPERIMENT, "PRP+BTX-A"),
    ]
    for source_group, display_group in group_map:
        subset = df[df[GROUP_COL].astype(str).str.strip().eq(source_group)]
        if subset.empty:
            raise ValueError(f"No rows found for group: {source_group}")
        for x, display_time, source_time, col in zip(
            X_VALUES,
            DISPLAY_TIME_LABELS,
            DATA_TIME_LABELS_CN,
            columns,
        ):
            values = pd.to_numeric(subset[col], errors="coerce").dropna()
            rows.append(
                {
                    "source_group": source_group,
                    "group": display_group,
                    "time_index": x,
                    "time_label": display_time,
                    "source_time_label": source_time,
                    "n": int(values.shape[0]),
                    "mean": float(values.mean()),
                    "sd": float(values.std(ddof=1)),
                }
            )
    return pd.DataFrame(rows)


def register_fonts() -> tuple[str, str, str, str]:
    fonts = Path("C:/Windows/Fonts")
    arial = fonts / "arial.ttf"
    arial_bold = fonts / "arialbd.ttf"
    cn = fonts / "msyh.ttc"
    cn_bold = fonts / "msyhbd.ttc"
    if not cn.exists():
        cn = fonts / "NotoSansSC-VF.ttf"
        cn_bold = cn
    for font in [arial, arial_bold, cn, cn_bold]:
        if not font.exists():
            raise FileNotFoundError(f"Required font not found: {font}")

    pdfmetrics.registerFont(TTFont("ArialLocal", str(arial)))
    pdfmetrics.registerFont(TTFont("ArialLocal-Bold", str(arial_bold)))
    pdfmetrics.registerFont(TTFont("ChineseLocal", str(cn)))
    pdfmetrics.registerFont(TTFont("ChineseLocal-Bold", str(cn_bold)))
    return "ArialLocal", "ArialLocal-Bold", "ChineseLocal", "ChineseLocal-Bold"


def hex_color(value: str) -> colors.Color:
    return colors.HexColor(value)


def y_axis(summary: pd.DataFrame) -> tuple[float, float, list[int]]:
    lo = float((summary["mean"] - summary["sd"]).min())
    hi = float((summary["mean"] + summary["sd"]).max())
    y_min = 80
    y_max = 240
    if lo < y_min:
        y_min = int((lo // 20) * 20)
    if hi > y_max:
        y_max = int(((hi + 19) // 20) * 20)
    ticks = list(range(y_min, y_max + 1, 40))
    return float(y_min), float(y_max), ticks


def draw_center(c: canvas.Canvas, x: float, y: float, text: str, font: str, size: float) -> None:
    c.setFont(font, size)
    c.drawString(x - pdfmetrics.stringWidth(text, font, size) / 2, y, text)


def draw_rotated_center(
    c: canvas.Canvas,
    x: float,
    y: float,
    text: str,
    font: str,
    size: float,
    angle: float = 90,
) -> None:
    c.saveState()
    c.translate(x, y)
    c.rotate(angle)
    c.setFont(font, size)
    c.drawString(-pdfmetrics.stringWidth(text, font, size) / 2, -size / 3, text)
    c.restoreState()


def draw_line(
    c: canvas.Canvas,
    points: list[tuple[float, float]],
    color: str,
    dashed: bool = False,
    width: float = 1.4,
) -> None:
    c.setStrokeColor(hex_color(color))
    c.setLineWidth(width)
    c.setDash(4, 2) if dashed else c.setDash()
    path = c.beginPath()
    path.moveTo(*points[0])
    for point in points[1:]:
        path.lineTo(*point)
    c.drawPath(path, stroke=1, fill=0)
    c.setDash()


def draw_marker(c: canvas.Canvas, x: float, y: float, marker: str, color: str, size: float = 3.8) -> None:
    c.setStrokeColor(hex_color(color))
    c.setFillColor(hex_color(color))
    c.setLineWidth(0.8)
    if marker == "circle":
        c.circle(x, y, size / 2, stroke=1, fill=1)
    else:
        c.rect(x - size / 2, y - size / 2, size, size, stroke=1, fill=1)


def draw_errorbar(c: canvas.Canvas, x: float, y_lo: float, y_hi: float, color: str) -> None:
    c.setStrokeColor(hex_color(color))
    c.setLineWidth(0.55)
    c.setDash()
    cap = 3
    c.line(x, y_lo, x, y_hi)
    c.line(x - cap / 2, y_lo, x + cap / 2, y_lo)
    c.line(x - cap / 2, y_hi, x + cap / 2, y_hi)


def draw_legend(c: canvas.Canvas, x: float, y: float, font: str) -> None:
    entries = [
        ("PRP", PRP_RED, "circle"),
        ("PRP+BTX-A", BTXA_GREEN, "square"),
    ]
    for idx, (label, color, marker) in enumerate(entries):
        xx = x + idx * 58
        yy = y
        draw_line(c, [(xx, yy), (xx + 13, yy)], color, dashed=False, width=1.05)
        draw_marker(c, xx + 6.5, yy, marker, color, size=3.8)
        c.setFillColor(hex_color(BLACK))
        c.setFont(font, 8.8)
        c.drawString(xx + 19, yy - 2.8, label)


def draw_pdf(summary: pd.DataFrame) -> None:
    font_en, font_en_bold, font_cn, font_cn_bold = register_fonts()
    c = canvas.Canvas(str(PDF_PATH), pagesize=(PAGE_W, PAGE_H), bottomup=1, pageCompression=1)
    c.setTitle("Hair density reference style T0 T1 T3 T6")

    left = 47
    bottom = 31
    plot_w = 168
    plot_h = 115
    plot_x0 = left
    plot_y0 = bottom
    plot_x1 = plot_x0 + plot_w
    plot_y1 = plot_y0 + plot_h

    x_min, x_max = -0.5, 3.5
    y_min, y_max, y_ticks = y_axis(summary)

    def sx(x: float) -> float:
        return plot_x0 + (x - x_min) / (x_max - x_min) * plot_w

    def sy(y: float) -> float:
        return plot_y0 + (y - y_min) / (y_max - y_min) * plot_h

    c.setFillColor(hex_color(WHITE))
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    c.setStrokeColor(hex_color(BLACK))
    c.setLineWidth(0.95)
    c.line(plot_x0, plot_y0, plot_x1, plot_y0)
    c.line(plot_x0, plot_y0, plot_x0, plot_y1)

    tick_len = 4
    c.setFillColor(hex_color(BLACK))
    for x, label in zip(X_VALUES, DISPLAY_TIME_LABELS):
        xx = sx(x)
        c.setLineWidth(0.9)
        c.line(xx, plot_y0, xx, plot_y0 - tick_len)
        draw_center(c, xx, plot_y0 - 13, label, font_en_bold, 9.5)

    for y in y_ticks:
        yy = sy(y)
        c.setLineWidth(0.9)
        c.line(plot_x0, yy, plot_x0 - tick_len, yy)
        c.setFont(font_en, 9)
        c.drawRightString(plot_x0 - 6, yy - 3.0, str(int(y)))

    draw_rotated_center(c, 15, plot_y0 + plot_h / 2, "Hair density (hairs/cm\u00b2)", font_en_bold, 9.5)

    series = [
        ("PRP", PRP_RED, "circle", False),
        ("PRP+BTX-A", BTXA_GREEN, "square", False),
    ]
    for group, color, marker, dashed in series:
        data = summary[summary["group"].eq(group)].sort_values("time_index")
        points = [(sx(row.time_index), sy(row["mean"])) for _, row in data.iterrows()]
        for _, row in data.iterrows():
            draw_errorbar(c, sx(row.time_index), sy(row["mean"] - row.sd), sy(row["mean"] + row.sd), color)
        draw_line(c, points, color, dashed=dashed, width=1.0)
        for xx, yy in points:
            draw_marker(c, xx, yy, marker, color)

    # Match the supplied example: significance marks at T3 and T6.
    for x in [2, 3]:
        red_row = summary[(summary["group"].eq("PRP")) & (summary["time_index"].eq(x))].iloc[0]
        green_row = summary[(summary["group"].eq("PRP+BTX-A")) & (summary["time_index"].eq(x))].iloc[0]
        star_y = max(float(red_row["mean"]), float(green_row["mean"])) + 5
        c.setFillColor(hex_color(BLACK))
        c.setFont(font_en_bold, 10)
        c.drawString(sx(x) + 4, sy(star_y) - 1, "*")

    draw_legend(c, plot_x0 + 22, PAGE_H - 17, font_en)
    c.showPage()
    c.save()


def main() -> None:
    source = find_source_xlsx()
    summary = compute_summary(source)
    summary.to_csv(CSV_PATH, index=False, encoding="utf-8-sig")
    draw_pdf(summary)
    print(f"source={source}")
    print(summary.to_string(index=False, float_format=lambda value: f"{value:.4f}"))
    print(f"pdf={PDF_PATH}")
    print(f"csv={CSV_PATH}")


if __name__ == "__main__":
    main()
