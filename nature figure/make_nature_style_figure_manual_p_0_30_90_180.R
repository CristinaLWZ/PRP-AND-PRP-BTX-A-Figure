suppressPackageStartupMessages({
  library(readxl)
  library(ggplot2)
  library(patchwork)
  library(dplyr)
  library(tidyr)
  library(stringr)
  library(svglite)
  library(ragg)
  library(scales)
})

input_path <- "C:/Users/12501/Desktop/患者数据-20260625-01.xlsx"
output_dir <- "D:/codex/prp AND btx-a/nature figure"
figure_stem <- file.path(output_dir, "nature_style_hair_response_manual_p_0_30_90_180")

time_key <- data.frame(
  timepoint_cn = c("基线", "30天", "90天", "180天"),
  day = c(0, 30, 90, 180),
  day_label = c("0", "30", "90", "180"),
  visit = c("T0", "T1", "T3", "T6"),
  stringsAsFactors = FALSE
)

metric_key <- data.frame(
  metric_cn = c(
    "毛发密度",
    "毛发直径",
    "油脂分泌",
    "头皮硬度",
    "头皮血流"
  ),
  metric_en = c(
    "Hair density",
    "Hair shaft diameter",
    "Sebum secretion",
    "Scalp stiffness",
    "Scalp blood flow"
  ),
  metric_display = c(
    "Hair density",
    "Hair shaft\ndiameter",
    "Sebum\nsecretion",
    "Scalp\nstiffness",
    "Scalp blood\nflow"
  ),
  category_en = c(
    "Hair-growth endpoints",
    "Hair-growth endpoints",
    "Scalp microenvironment",
    "Scalp microenvironment",
    "Scalp microenvironment"
  ),
  benefit_sign = c(1, 1, -1, -1, 1),
  stringsAsFactors = FALSE
)

group_key <- data.frame(
  group_cn = c("实验组", "对照组"),
  group_display = c("PRP+BTX-A", "PRP"),
  group_color = c("#0F766E", "#C17C3A"),
  stringsAsFactors = FALSE
)

manual_p_df <- data.frame(
  metric_cn = c(
    rep("毛发密度", 4),
    rep("毛发直径", 4),
    rep("油脂分泌", 4),
    rep("头皮硬度", 4),
    rep("头皮血流", 4)
  ),
  day = rep(c(0, 30, 90, 180), 5),
  p_value_num = c(
    0.7513, 0.5609, 0.0413, 0.0500,
    0.9988, 0.7052, 0.4850, 0.2915,
    0.9999, 0.00009, 0.00009, 0.0024,
    0.8133, 0.0001, 0.00009, 0.00009,
    0.9994, 0.00009, 0.00009, 0.00009
  ),
  p_label = c(
    "0.7513", "0.5609", "0.0413", "0.05",
    "0.9988", "0.7052", "0.485", "0.2915",
    "0.9999", "<0.0001", "<0.0001", "0.0024",
    "0.8133", "0.0001", "<0.0001", "<0.0001",
    "0.9994", "<0.0001", "<0.0001", "<0.0001"
  ),
  stringsAsFactors = FALSE
)

theme_set(
  theme_classic(base_size = 6.4, base_family = "Arial") +
    theme(
      axis.line = element_line(linewidth = 0.35, colour = "black"),
      axis.ticks = element_line(linewidth = 0.35, colour = "black"),
      axis.text = element_text(size = 5.9, colour = "black"),
      axis.title = element_text(size = 6.3, colour = "black"),
      strip.background = element_rect(fill = "#F3EEE7", colour = NA),
      strip.text = element_text(size = 6.1, face = "bold", margin = margin(2, 2, 2, 2)),
      plot.title = element_text(size = 6.9, face = "bold", margin = margin(b = 3)),
      plot.subtitle = element_text(size = 5.7, colour = "#4B5563", margin = margin(b = 3)),
      plot.tag = element_text(size = 8, face = "bold"),
      plot.tag.position = c(0, 1),
      panel.grid = element_blank(),
      panel.spacing = grid::unit(8, "pt"),
      legend.position = "right",
      legend.title = element_text(size = 5.8),
      legend.text = element_text(size = 5.5),
      legend.key.height = grid::unit(16, "pt")
    )
)

save_pub_r <- function(plot, filename, width_mm = 183, height_mm = 145, dpi = 600) {
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

signif_label <- function(p_value) {
  ifelse(
    p_value <= 0.001, "***",
    ifelse(p_value <= 0.01, "**", ifelse(p_value <= 0.05, "*", ""))
  )
}

hedges_g_stats <- function(treatment_values, control_values) {
  treatment_values <- treatment_values[is.finite(treatment_values)]
  control_values <- control_values[is.finite(control_values)]

  n_treat <- length(treatment_values)
  n_ctrl <- length(control_values)
  mean_treat <- mean(treatment_values)
  mean_ctrl <- mean(control_values)
  sd_treat <- stats::sd(treatment_values)
  sd_ctrl <- stats::sd(control_values)

  pooled_sd <- sqrt(
    (((n_treat - 1) * sd_treat^2) + ((n_ctrl - 1) * sd_ctrl^2)) /
      (n_treat + n_ctrl - 2)
  )

  if (!is.finite(pooled_sd) || pooled_sd == 0) {
    d_value <- 0
    g_value <- 0
    ci_low <- 0
    ci_high <- 0
  } else {
    d_value <- (mean_treat - mean_ctrl) / pooled_sd
    correction <- 1 - (3 / (4 * (n_treat + n_ctrl) - 9))
    g_value <- correction * d_value
    se_d <- sqrt(
      ((n_treat + n_ctrl) / (n_treat * n_ctrl)) +
        (d_value^2 / (2 * (n_treat + n_ctrl - 2)))
    )
    se_g <- correction * se_d
    ci_low <- g_value - 1.96 * se_g
    ci_high <- g_value + 1.96 * se_g
  }

  data.frame(
    mean_treatment = mean_treat,
    mean_control = mean_ctrl,
    diff = mean_treat - mean_ctrl,
    hedges_g = g_value,
    ci_low = ci_low,
    ci_high = ci_high,
    stringsAsFactors = FALSE
  )
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
  filter(metric_cn %in% metric_key$metric_cn, timepoint_cn %in% time_key$timepoint_cn) %>%
  select(patient_id, group_cn, metric_cn, timepoint_cn, value) %>%
  left_join(metric_key, by = "metric_cn") %>%
  left_join(time_key, by = "timepoint_cn") %>%
  left_join(group_key, by = "group_cn") %>%
  mutate(
    group_display = factor(group_display, levels = c("PRP+BTX-A", "PRP")),
    metric_en = factor(metric_en, levels = metric_key$metric_en),
    metric_display = factor(metric_display, levels = metric_key$metric_display)
  )

summary_df <- long_df %>%
  group_by(group_cn, group_display, group_color, metric_cn, metric_en, metric_display, category_en, benefit_sign, day, day_label, visit) %>%
  summarise(
    n = dplyr::n(),
    mean = mean(value),
    sd = stats::sd(value),
    sem = sd / sqrt(n),
    .groups = "drop"
  )

effect_df <- bind_rows(lapply(split(long_df, list(long_df$metric_cn, long_df$day), drop = TRUE), function(df_piece) {
  benefit_sign <- df_piece$benefit_sign[1]
  stat_row <- hedges_g_stats(
    treatment_values = df_piece$value[df_piece$group_display == "PRP+BTX-A"] * benefit_sign,
    control_values = df_piece$value[df_piece$group_display == "PRP"] * benefit_sign
  )

  data.frame(
    metric_cn = df_piece$metric_cn[1],
    metric_en = as.character(df_piece$metric_en[1]),
    metric_display = as.character(df_piece$metric_display[1]),
    category_en = df_piece$category_en[1],
    day = df_piece$day[1],
    day_label = df_piece$day_label[1],
    visit = df_piece$visit[1],
    stat_row,
    stringsAsFactors = FALSE
  )
})) %>%
  left_join(manual_p_df, by = c("metric_cn", "day")) %>%
  mutate(
    star_label = signif_label(p_value_num),
    metric_display = factor(metric_display, levels = metric_key$metric_display),
    category_en = factor(category_en, levels = c("Hair-growth endpoints", "Scalp microenvironment"))
  )

write.csv(
  long_df %>%
    transmute(
      patient_id,
      group = as.character(group_display),
      metric_cn,
      metric_en = as.character(metric_en),
      timepoint_cn,
      day,
      visit,
      value
    ),
  file = file.path(output_dir, "nature_style_hair_response_manual_p_0_30_90_180_source_data_long.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

write.csv(
  summary_df %>%
    transmute(
      group = as.character(group_display),
      metric_cn,
      metric_en = as.character(metric_en),
      day,
      visit,
      mean,
      sem,
      n
    ),
  file = file.path(output_dir, "nature_style_hair_response_manual_p_0_30_90_180_summary_stats.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

write.csv(
  effect_df %>%
    transmute(
      metric_cn,
      metric_en,
      category_en = as.character(category_en),
      day,
      visit,
      mean_treatment,
      mean_control,
      diff,
      hedges_g,
      ci_low,
      ci_high,
      p_value = p_label
    ),
  file = file.path(output_dir, "nature_style_hair_response_manual_p_0_30_90_180_effects.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

write.csv(
  manual_p_df %>%
    left_join(time_key %>% select(day, visit), by = "day"),
  file = file.path(output_dir, "nature_style_hair_response_manual_p_0_30_90_180_manual_pvalues.csv"),
  row.names = FALSE,
  fileEncoding = "UTF-8"
)

panel_a_stars <- summary_df %>%
  filter(metric_cn == "毛发密度") %>%
  group_by(metric_cn, day) %>%
  summarise(y = max(mean + sem), .groups = "drop") %>%
  left_join(effect_df %>% filter(metric_cn == "毛发密度") %>% select(metric_cn, day, star_label), by = c("metric_cn", "day")) %>%
  mutate(y = y + 8) %>%
  filter(star_label != "")

density_label_df <- summary_df %>%
  filter(metric_cn == "毛发密度", day == 180) %>%
  mutate(x = 189)

p_a <- ggplot() +
  geom_line(
    data = long_df %>% filter(metric_cn == "毛发密度"),
    aes(x = day, y = value, group = patient_id, colour = group_display),
    alpha = 0.10,
    linewidth = 0.28,
    show.legend = FALSE
  ) +
  geom_ribbon(
    data = summary_df %>% filter(metric_cn == "毛发密度"),
    aes(x = day, ymin = mean - sem, ymax = mean + sem, fill = group_display, group = group_display),
    alpha = 0.18,
    colour = NA,
    show.legend = FALSE
  ) +
  geom_line(
    data = summary_df %>% filter(metric_cn == "毛发密度"),
    aes(x = day, y = mean, colour = group_display),
    linewidth = 1.0,
    show.legend = FALSE
  ) +
  geom_point(
    data = summary_df %>% filter(metric_cn == "毛发密度"),
    aes(x = day, y = mean, fill = group_display),
    shape = 21,
    size = 2.0,
    stroke = 0.4,
    colour = "white",
    show.legend = FALSE
  ) +
  geom_text(
    data = panel_a_stars,
    aes(x = day, y = y, label = star_label),
    inherit.aes = FALSE,
    size = 2.5,
    family = "Arial"
  ) +
  geom_text(
    data = density_label_df,
    aes(x = x, y = mean, label = as.character(group_display), colour = group_display),
    hjust = 0,
    size = 2.5,
    fontface = "bold",
    show.legend = FALSE
  ) +
  scale_colour_manual(values = setNames(group_key$group_color, group_key$group_display)) +
  scale_fill_manual(values = setNames(group_key$group_color, group_key$group_display)) +
  scale_x_continuous(
    limits = c(0, 194),
    breaks = time_key$day,
    labels = time_key$day_label,
    expand = expansion(mult = c(0.01, 0.01))
  ) +
  labs(
    title = "Primary response in hair density",
    subtitle = "PRP is control and PRP+BTX-A is experimental",
    x = "Days after baseline",
    y = "Hair density"
  ) +
  coord_cartesian(clip = "off") +
  annotate(
    "text",
    x = 2,
    y = max(summary_df$mean[summary_df$metric_cn == "毛发密度"] + summary_df$sem[summary_df$metric_cn == "毛发密度"]) + 25,
    label = "Manual P values supplied by user",
    hjust = 0,
    vjust = 1,
    size = 2.3,
    colour = "#4B5563",
    family = "Arial"
  ) +
  theme(
    plot.margin = margin(6, 30, 6, 6)
  )

panel_b_metrics <- c("毛发直径", "油脂分泌", "头皮硬度", "头皮血流")

panel_b_star_ranges <- summary_df %>%
  filter(metric_cn %in% panel_b_metrics) %>%
  group_by(metric_cn, metric_display) %>%
  summarise(
    y_base = max(mean + sem),
    y_pad = max(0.06 * diff(range(mean, na.rm = TRUE)), 0.04 * y_base),
    .groups = "drop"
  )

panel_b_stars <- effect_df %>%
  filter(metric_cn %in% panel_b_metrics, star_label != "") %>%
  left_join(panel_b_star_ranges, by = c("metric_cn", "metric_display")) %>%
  mutate(y = y_base + y_pad)

p_b <- ggplot(
  summary_df %>% filter(metric_cn %in% panel_b_metrics),
  aes(x = day, y = mean, colour = group_display, fill = group_display)
) +
  geom_ribbon(
    aes(ymin = mean - sem, ymax = mean + sem, group = group_display),
    alpha = 0.18,
    colour = NA,
    show.legend = FALSE
  ) +
  geom_line(aes(group = group_display), linewidth = 0.9, show.legend = FALSE) +
  geom_point(
    shape = 21,
    size = 1.8,
    stroke = 0.35,
    colour = "white",
    show.legend = FALSE
  ) +
  geom_text(
    data = panel_b_stars,
    aes(x = day, y = y, label = star_label),
    inherit.aes = FALSE,
    size = 2.3,
    family = "Arial",
    colour = "black"
  ) +
  facet_wrap(~ metric_display, ncol = 2, scales = "free_y") +
  scale_colour_manual(values = setNames(group_key$group_color, group_key$group_display)) +
  scale_fill_manual(values = setNames(group_key$group_color, group_key$group_display)) +
  scale_x_continuous(
    breaks = time_key$day,
    labels = time_key$day_label,
    expand = expansion(mult = c(0.02, 0.05))
  ) +
  labs(
    title = "Selected endpoints with user-supplied P values",
    subtitle = "Hair diameter and scalp microenvironment metrics",
    x = "Days after baseline",
    y = NULL
  ) +
  theme(
    strip.text = element_text(lineheight = 0.95)
  )

heatmap_order <- c(
  "Hair density",
  "Hair shaft diameter",
  "Scalp blood flow",
  "Sebum secretion",
  "Scalp stiffness"
)

heatmap_df <- effect_df %>%
  mutate(
    metric_en = factor(metric_en, levels = rev(heatmap_order)),
    day_factor = factor(day, levels = c(0, 30, 90, 180), labels = c("0", "30", "90", "180"))
  )

p_c <- ggplot(
  heatmap_df,
  aes(x = day_factor, y = metric_en, fill = hedges_g)
) +
  geom_tile(width = 0.96, height = 0.96, colour = "white", linewidth = 0.45) +
  geom_text(
    aes(label = star_label),
    size = 2.4,
    family = "Arial",
    colour = "black"
  ) +
  scale_fill_gradient2(
    low = "#B65A3A",
    mid = "#F5F1EA",
    high = "#0F766E",
    midpoint = 0,
    limits = c(-3, 3),
    oob = squish,
    name = "Hedges g"
  ) +
  labs(
    title = "Same-timepoint between-group effect map",
    subtitle = "Stars use the supplied PRP versus PRP+BTX-A P values",
    x = "Days after baseline",
    y = NULL
  ) +
  theme(
    axis.ticks = element_blank(),
    axis.line = element_blank(),
    legend.justification = c(0, 0.5)
  )

forest_df <- effect_df %>%
  filter(day == 180) %>%
  mutate(
    metric_en = factor(metric_en, levels = rev(heatmap_order)),
    category_en = factor(category_en, levels = c("Hair-growth endpoints", "Scalp microenvironment"))
  )

forest_xlim <- c(
  min(-1.0, min(forest_df$ci_low) - 0.15),
  max(2.6, max(forest_df$ci_high) + 0.15)
)

p_d <- ggplot(forest_df, aes(y = metric_en, x = hedges_g)) +
  geom_vline(xintercept = 0, linetype = "dashed", linewidth = 0.4, colour = "#9CA3AF") +
  geom_segment(
    aes(x = ci_low, xend = ci_high, yend = metric_en),
    linewidth = 0.6,
    colour = "#4B5563"
  ) +
  geom_point(
    size = 2.1,
    shape = 21,
    stroke = 0.35,
    fill = "#0F766E",
    colour = "white"
  ) +
  facet_grid(category_en ~ ., scales = "free_y", space = "free_y", switch = "y") +
  scale_x_continuous(limits = forest_xlim, expand = expansion(mult = c(0.02, 0.02))) +
  labs(
    title = "Day-180 standardized between-group effects",
    subtitle = "Positive values favor PRP+BTX-A",
    x = "Hedges g",
    y = NULL
  ) +
  theme(
    strip.placement = "outside",
    strip.background = element_rect(fill = "#EFE7DB", colour = NA),
    strip.clip = "off",
    axis.line.y = element_blank(),
    axis.ticks.y = element_blank(),
    plot.margin = margin(6, 6, 6, 20)
  )

final_plot <- (
  p_a + p_b + plot_layout(widths = c(1.10, 1.07))
) / (
  p_c + p_d + plot_layout(widths = c(0.98, 1.02))
) +
  plot_layout(heights = c(1.05, 0.95)) +
  plot_annotation(tag_levels = "a") &
  theme(
    plot.margin = margin(6, 6, 6, 6)
  )

save_pub_r(final_plot, figure_stem, width_mm = 183, height_mm = 145, dpi = 600)

contract_lines <- c(
  "Core conclusion: the revised figure compares PRP (control) against PRP+BTX-A (experimental) using only the five endpoints for which user-supplied P values were provided.",
  "Figure archetype: asymmetric mixed-modality figure.",
  "Target journal/output: Nature-style double-column main figure.",
  "Backend: R.",
  "Final size: 183 mm x 145 mm.",
  "Panel map:",
  "  a: hair-density trajectories at baseline, 30, 90 and 180 days.",
  "  b: selected secondary endpoints using the same four timepoints.",
  "  c: same-timepoint between-group effect map for all manually annotated endpoints.",
  "  d: day-180 same-timepoint standardized between-group effects.",
  "Statistics needed: user-supplied same-timepoint P values; Hedges g on same-timepoint group contrasts.",
  "Source data needed: patient-level long-format data, group summary statistics, computed same-timepoint effect sizes, and supplied P-value table.",
  "Reviewer risk: significance stars now follow the supplied table rather than the earlier computed change-from-baseline tests."
)

writeLines(contract_lines, con = file.path(output_dir, "nature_style_hair_response_manual_p_0_30_90_180_contract.txt"))
