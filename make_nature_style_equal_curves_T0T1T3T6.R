suppressPackageStartupMessages({
  library(readxl)
  library(ggplot2)
  library(patchwork)
  library(dplyr)
  library(tidyr)
  library(stringr)
  library(forcats)
  library(svglite)
  library(ragg)
})

input_path <- "D:/codex/prp AND btx-a/患者数据-20260625-01.xlsx"
output_dir <- "D:/codex/prp AND btx-a"
figure_stem <- file.path(output_dir, "nature_style_equal_curves_T0T1T3T6")

time_key <- data.frame(
  timepoint_cn = c("基线", "30天", "90天", "180天"),
  visit = c("T0", "T1", "T3", "T6"),
  visit_num = c(0, 1, 3, 6),
  stringsAsFactors = FALSE
)

metric_key <- data.frame(
  metric_cn = c(
    "毛发密度",
    "毛发直径",
    "覆盖率",
    "终毛比例",
    "毳毛比例",
    "油脂分泌",
    "头皮硬度",
    "头皮血流"
  ),
  metric_en = c(
    "Hair density",
    "Hair shaft diameter",
    "Coverage index",
    "Terminal hair ratio",
    "Vellus hair ratio",
    "Sebum secretion",
    "Scalp stiffness",
    "Scalp blood flow"
  ),
  metric_display = c(
    "Hair density",
    "Hair shaft\ndiameter",
    "Coverage\nindex",
    "Terminal hair\nratio",
    "Vellus hair\nratio",
    "Sebum\nsecretion",
    "Scalp\nstiffness",
    "Scalp blood\nflow"
  ),
  stringsAsFactors = FALSE
)

group_key <- data.frame(
  group_cn = c("实验组", "对照组"),
  group_en = c("Treatment", "Control"),
  group_color = c("#0F766E", "#C17C3A"),
  stringsAsFactors = FALSE
)

theme_set(
  theme_classic(base_size = 6.4, base_family = "Arial") +
    theme(
      axis.line = element_line(linewidth = 0.35, colour = "black"),
      axis.ticks = element_line(linewidth = 0.35, colour = "black"),
      axis.text = element_text(size = 5.8, colour = "black"),
      axis.title = element_text(size = 6.2, colour = "black"),
      strip.background = element_rect(fill = "#F3EEE7", colour = NA),
      strip.text = element_text(size = 6.0, face = "bold", lineheight = 0.95),
      plot.title = element_text(size = 6.9, face = "bold", margin = margin(b = 2)),
      plot.subtitle = element_text(size = 5.6, colour = "#4B5563", margin = margin(b = 4)),
      plot.tag = element_text(size = 8, face = "bold"),
      plot.tag.position = c(0, 1),
      panel.grid = element_blank(),
      panel.spacing = grid::unit(7, "pt"),
      legend.position = "top",
      legend.title = element_blank(),
      legend.text = element_text(size = 5.8)
    )
)

save_pub_r <- function(plot, filename, width_mm = 183, height_mm = 152, dpi = 600) {
  width_in <- width_mm / 25.4
  height_in <- height_mm / 25.4

  svglite::svglite(
    paste0(filename, ".svg"),
    width = width_in,
    height = height_in,
    system_fonts = list(sans = "Arial")
  )
  print(plot)
  dev.off()

  grDevices::cairo_pdf(
    paste0(filename, ".pdf"),
    width = width_in,
    height = height_in,
    family = "Arial"
  )
  print(plot)
  dev.off()

  ragg::agg_tiff(
    paste0(filename, ".tiff"),
    width = width_in,
    height = height_in,
    units = "in",
    res = dpi
  )
  print(plot)
  dev.off()

  ragg::agg_png(
    paste0(filename, "_preview.png"),
    width = width_in,
    height = height_in,
    units = "in",
    res = 220
  )
  print(plot)
  dev.off()
}

raw_df <- read_excel(input_path, sheet = "原始数据")

long_df <- raw_df %>%
  rename(patient_id = `患者编号`, group_cn = `分组`) %>%
  pivot_longer(
    cols = -c(patient_id, group_cn),
    names_to = "compound_name",
    values_to = "value"
  ) %>%
  mutate(
    metric_cn = str_replace(compound_name, "_[^_]+$", ""),
    timepoint_cn = str_extract(compound_name, "[^_]+$")
  ) %>%
  filter(timepoint_cn %in% time_key$timepoint_cn) %>%
  left_join(time_key, by = "timepoint_cn") %>%
  left_join(metric_key, by = "metric_cn") %>%
  left_join(group_key, by = "group_cn") %>%
  mutate(
    group_en = factor(group_en, levels = c("Treatment", "Control")),
    metric_display = factor(metric_display, levels = metric_key$metric_display),
    visit = factor(visit, levels = c("T0", "T1", "T3", "T6"))
  )

summary_df <- long_df %>%
  group_by(group_en, group_color, metric_cn, metric_en, metric_display, visit, visit_num) %>%
  summarise(
    n = dplyr::n(),
    mean = mean(value),
    sd = stats::sd(value),
    sem = sd / sqrt(n),
    .groups = "drop"
  )

source_export <- long_df %>%
  transmute(
    patient_id,
    group = as.character(group_en),
    metric_cn,
    metric_en,
    visit,
    visit_num,
    value
  )

summary_export <- summary_df %>%
  transmute(
    group = as.character(group_en),
    metric_cn,
    metric_en,
    visit,
    visit_num,
    mean,
    sem,
    n
  )

write.csv(
  source_export,
  file = file.path(output_dir, "nature_style_equal_curves_T0T1T3T6_source_data.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

write.csv(
  summary_export,
  file = file.path(output_dir, "nature_style_equal_curves_T0T1T3T6_summary_stats.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

curve_plot <- ggplot(
  summary_df,
  aes(x = visit_num, y = mean, colour = group_en, fill = group_en)
) +
  geom_ribbon(
    aes(ymin = mean - sem, ymax = mean + sem, group = group_en),
    alpha = 0.18,
    colour = NA,
    show.legend = FALSE
  ) +
  geom_line(aes(group = group_en), linewidth = 0.95, show.legend = TRUE) +
  geom_point(
    shape = 21,
    size = 1.9,
    stroke = 0.35,
    colour = "white"
  ) +
  facet_wrap(~ metric_display, ncol = 2, scales = "free_y") +
  scale_colour_manual(values = setNames(group_key$group_color, group_key$group_en)) +
  scale_fill_manual(values = setNames(group_key$group_color, group_key$group_en)) +
  scale_x_continuous(
    breaks = c(0, 1, 3, 6),
    labels = c("T0", "T1", "T3", "T6"),
    expand = expansion(mult = c(0.03, 0.04))
  ) +
  labs(
    title = "Longitudinal trajectories across all endpoints",
    subtitle = "Equal-sized panels showing group mean ± s.e.m.",
    x = "Visit",
    y = NULL
  ) +
  guides(
    colour = guide_legend(override.aes = list(fill = NA, linewidth = 1.1, shape = 16))
  ) +
  theme(
    legend.justification = "left",
    legend.box.margin = margin(0, 0, 0, 0),
    strip.text = element_text(margin = margin(2, 2, 2, 2))
  )

final_plot <- curve_plot + plot_annotation(tag_levels = "a") &
  theme(
    plot.margin = margin(6, 6, 6, 6)
  )

save_pub_r(final_plot, figure_stem, width_mm = 183, height_mm = 152, dpi = 600)

contract_lines <- c(
  "Core conclusion: the treatment and control groups can be compared directly across all endpoints using matched longitudinal line plots at T0, T1, T3, and T6.",
  "Figure archetype: quantitative grid.",
  "Target journal/output: Nature-style double-column multi-panel figure.",
  "Backend: R.",
  "Final size: 183 mm x 152 mm.",
  "Panel map:",
  "  a-h: eight equal-sized longitudinal panels, one for each endpoint.",
  "Evidence hierarchy:",
  "  hero evidence: direct trajectory comparison for every endpoint.",
  "  validation evidence: repeated use of the same panel geometry and visit labels.",
  "  controls/robustness: matched styling and identical timepoint selection across all panels.",
  "Statistics needed: mean +/- s.e.m. at each visit for each group.",
  "Source data needed: filtered patient-level long-format data and summary statistics at T0, T1, T3, and T6.",
  "Image-integrity notes: no raster image processing; all panels drawn directly from tabular data in R."
)

writeLines(
  contract_lines,
  con = file.path(output_dir, "nature_style_equal_curves_T0T1T3T6_contract.txt")
)
