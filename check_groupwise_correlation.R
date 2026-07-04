library(readxl)
library(dplyr)
library(tidyr)
library(stringr)

path <- "D:/codex/prp AND btx-a/患者数据-20260625-01.xlsx"

raw_df <- read_excel(path, sheet = "原始数据")

long_df <- raw_df %>%
  pivot_longer(
    cols = -c(`患者编号`, `分组`),
    names_to = "name",
    values_to = "value"
  ) %>%
  mutate(
    metric = str_replace(name, "_[^_]+$", ""),
    timepoint = str_extract(name, "[^_]+$")
  )

wide_change <- long_df %>%
  filter(timepoint %in% c("基线", "180天")) %>%
  select(`患者编号`, `分组`, metric, timepoint, value) %>%
  pivot_wider(names_from = timepoint, values_from = value) %>%
  mutate(change = `180天` - 基线) %>%
  select(`患者编号`, `分组`, metric, change) %>%
  pivot_wider(names_from = metric, values_from = change)

print(cor.test(wide_change$毛发密度, wide_change$头皮血流))
print(wide_change %>% group_by(`分组`) %>% summarise(r = cor(毛发密度, 头皮血流), .groups = "drop"))
