library(readxl)
library(dplyr)
library(tidyr)
library(stringr)

path <- "C:/Users/12501/Desktop/患者数据-20260625-01.xlsx"
time_levels <- c("基线", "14天", "30天", "60天", "90天", "180天")

raw_df <- read_excel(path, sheet = "原始数据")

long_df <- raw_df %>%
  pivot_longer(
    cols = -c(`患者编号`, `分组`),
    names_to = "name",
    values_to = "value"
  ) %>%
  mutate(
    metric = str_replace(name, "_[^_]+$", ""),
    timepoint = str_extract(name, "[^_]+$"),
    timepoint = factor(timepoint, levels = time_levels)
  ) %>%
  select(`患者编号`, `分组`, metric, timepoint, value)

cat("RANGE SUMMARY\n")
range_df <- long_df %>%
  group_by(metric) %>%
  summarise(
    min = min(value, na.rm = TRUE),
    q1 = quantile(value, 0.25, na.rm = TRUE),
    median = median(value, na.rm = TRUE),
    mean = mean(value, na.rm = TRUE),
    q3 = quantile(value, 0.75, na.rm = TRUE),
    max = max(value, na.rm = TRUE),
    .groups = "drop"
  )
print(range_df, n = Inf)

change_df <- long_df %>%
  pivot_wider(names_from = timepoint, values_from = value) %>%
  mutate(
    `14天变化` = `14天` - 基线,
    `30天变化` = `30天` - 基线,
    `60天变化` = `60天` - 基线,
    `90天变化` = `90天` - 基线,
    `180天变化` = `180天` - 基线
  )

cat("\nDAY180 CHANGE BY GROUP\n")
day180_change <- change_df %>%
  group_by(metric, `分组`) %>%
  summarise(
    n = n(),
    mean_change = mean(`180天变化`, na.rm = TRUE),
    sd_change = sd(`180天变化`, na.rm = TRUE),
    .groups = "drop"
  )
print(day180_change, n = Inf)

cat("\nWELCH TESTS ON CHANGE FROM BASELINE\n")
metrics <- unique(change_df$metric)
test_results <- lapply(metrics, function(m) {
  sub_df <- change_df %>% filter(metric == m)
  times <- c("14天变化", "30天变化", "60天变化", "90天变化", "180天变化")
  bind_rows(lapply(times, function(tp) {
    vals <- sub_df[[tp]]
    grp <- sub_df$`分组`
    tt <- t.test(vals ~ grp)
    tibble(
      metric = m,
      timepoint = tp,
      exp_mean = mean(vals[grp == "实验组"], na.rm = TRUE),
      ctrl_mean = mean(vals[grp == "对照组"], na.rm = TRUE),
      diff = mean(vals[grp == "实验组"], na.rm = TRUE) - mean(vals[grp == "对照组"], na.rm = TRUE),
      p_value = tt$p.value,
      conf_low = tt$conf.int[1],
      conf_high = tt$conf.int[2]
    )
  }))
})

print(bind_rows(test_results), n = Inf)
