library(readxl)

path <- "D:/codex/prp AND btx-a/患者数据-20260625-01.xlsx"
sheets <- excel_sheets(path)

cat("SHEETS\n")
for (sheet in sheets) {
  cat(sheet, "\n", sep = "")
}

for (sheet in sheets) {
  cat("\n=== SHEET:", sheet, "===\n")
  df <- read_excel(path, sheet = sheet)
  cat("DIM:", nrow(df), "rows x", ncol(df), "cols\n")
  cat("COLS:\n")
  cat(paste(names(df), collapse = " | "), "\n")
  cat("HEAD:\n")
  print(utils::head(df, 10))
  cat("\n")
}
