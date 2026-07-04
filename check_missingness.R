library(readxl)

path <- "D:/codex/prp AND btx-a/患者数据-20260625-01.xlsx"
df <- read_excel(path, sheet = "原始数据")

na_count <- sapply(df, function(x) sum(is.na(x)))
print(na_count[na_count > 0])
