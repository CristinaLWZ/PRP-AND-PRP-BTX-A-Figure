suppressPackageStartupMessages({
  library(readxl)
  library(ggplot2)
  library(dplyr)
  library(tidyr)
  library(stringr)
  library(svglite)
  library(ragg)
})

input_path <- "D:/codex/prp AND btx-a/患者数据-20260625-01.xlsx"
output_dir <- "D:/codex/prp AND btx-a"
bundle_dir <- file.path(output_dir, "single_metric_figures_scatter_sd")

if (!dir.exists(bundle_dir)) {
  dir.create(bundle_dir, recursive = TRUE)
}

time_key <- data.frame(
  timepoint_cn = c("基线", "30天", "90天", "180天"),
  visit = c("T0", "T1", "T3", "T6"),
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
  file_stub = c(
    "hair_density",
    "hair_shaft_diameter",
    "coverage_index",
    "terminal_hair_ratio",
    "vellus_hair_ratio",
    "sebum_secretion",
    "scalp_stiffness",
    "scalp_blood_flow"
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
  theme_classic(base_size = 6.6, base_family = "Arial") +
    theme(
      axis.line = element_line(linewidth = 0.35, colour = "black"),
      axis.ticks = element_line(linewidth = 0.35, colour = "black"),
      axis.text = element_text(size = 6.0, colour = "black"),
      axis.title = element_text(size = 6.4, colour = "black"),
      plot.title = element_text(size = 7.2, face = "bold", margin = margin(b = 2)),
      plot.subtitle = element_text(size = 5.8, colour = "#4B5563", margin = margin(b = 3)),
      panel.grid = element_blank(),
      legend.position = "top",
      legend.title = element_blank(),
      legend.text = element_text(size = 5.8)
    )
)

save_pub_r <- function(plot, filename, width_mm = 89, height_mm = 72, dpi = 600) {
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
    visit = factor(visit, levels = c("T0", "T1", "T3", "T6"))
  )

summary_df <- long_df %>%
  group_by(metric_cn, metric_en, file_stub, group_en, group_color, visit) %>%
  summarise(
    n = dplyr::n(),
    mean = mean(value),
    sd = stats::sd(value),
    sem = sd / sqrt(n),
    .groups = "drop"
  )

write.csv(
  long_df %>%
    transmute(
      patient_id,
      group = as.character(group_en),
      metric_cn,
      metric_en,
      visit,
      value
    ),
  file = file.path(bundle_dir, "single_metric_figures_scatter_sd_source_data.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

write.csv(
  summary_df %>%
    transmute(
      group = as.character(group_en),
      metric_cn,
      metric_en,
      visit,
      mean,
      sd,
      n
    ),
  file = file.path(bundle_dir, "single_metric_figures_scatter_sd_summary_stats.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

metric_rows <- split(metric_key, seq_len(nrow(metric_key)))

for (row in metric_rows) {
  metric_cn <- row$metric_cn[[1]]
  metric_en <- row$metric_en[[1]]
  file_stub <- row$file_stub[[1]]

  metric_long <- long_df %>%
    filter(metric_cn == !!metric_cn)

  metric_summary <- summary_df %>%
    filter(metric_cn == !!metric_cn)

  p <- ggplot() +
    geom_point(
      data = metric_long,
      aes(x = visit, y = value, colour = group_en),
      position = position_jitterdodge(
        jitter.width = 0.08,
        jitter.height = 0,
        dodge.width = 0.34,
        seed = 20260626
      ),
      alpha = 0.32,
      size = 1.15,
      stroke = 0,
      show.legend = FALSE
    ) +
    geom_errorbar(
      data = metric_summary,
      aes(
        x = visit,
        y = mean,
        ymin = mean - sd,
        ymax = mean + sd,
        colour = group_en,
        group = group_en
      ),
      position = position_dodge(width = 0.34),
      width = 0.12,
      linewidth = 0.55,
      show.legend = FALSE
    ) +
    geom_line(
      data = metric_summary,
      aes(x = visit, y = mean, colour = group_en, group = group_en),
      position = position_dodge(width = 0.34),
      linewidth = 1.0
    ) +
    geom_point(
      data = metric_summary,
      aes(x = visit, y = mean, fill = group_en, group = group_en),
      position = position_dodge(width = 0.34),
      shape = 21,
      size = 2.15,
      stroke = 0.38,
      colour = "white"
    ) +
    scale_colour_manual(values = setNames(group_key$group_color, group_key$group_en)) +
    scale_fill_manual(values = setNames(group_key$group_color, group_key$group_en)) +
    scale_x_discrete(drop = FALSE) +
    labs(
      title = metric_en,
      subtitle = "Raw-data scatter with group mean and SD bars",
      x = NULL,
      y = metric_en
    ) +
    guides(
      colour = guide_legend(override.aes = list(linewidth = 1.1, alpha = 1, shape = 16)),
      fill = "none"
    ) +
    theme(
      legend.justification = "left",
      legend.box.margin = margin(0, 0, 0, 0),
      plot.margin = margin(6, 6, 6, 6)
    )

  out_stem <- file.path(bundle_dir, paste0("figure_", file_stub, "_scatter_sd"))
  save_pub_r(p, out_stem, width_mm = 89, height_mm = 72, dpi = 600)
}

contract_lines <- c(
  "Core conclusion: each endpoint is presented as a standalone longitudinal figure with evenly spaced categorical visits and explicit SD bars over raw patient-level scatter.",
  "Figure archetype: quantitative single-panel figures.",
  "Target journal/output: Nature-style single-column figure series.",
  "Backend: R.",
  "Final size: 89 mm x 72 mm per figure.",
  "Panel map:",
  "  one figure per endpoint; each figure contains raw-data scatter, group mean line, and SD error bars.",
  "Evidence hierarchy:",
  "  hero evidence: raw patient-level distribution at each visit.",
  "  validation evidence: matched mean trajectories for treatment and control.",
  "  controls/robustness: identical categorical visit spacing and styling across the eight figures.",
  "Statistics needed: raw patient values and mean +/- SD at each visit.",
  "Source data needed: filtered patient-level long-format data and per-metric summary statistics with SD.",
  "Image-integrity notes: all figures are vector/raster exports rendered directly from tabular data in R."
)

writeLines(
  contract_lines,
  con = file.path(bundle_dir, "single_metric_figures_scatter_sd_contract.txt")
)
