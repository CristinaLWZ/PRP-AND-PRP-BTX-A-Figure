packages <- c(
  "readxl",
  "ggplot2",
  "patchwork",
  "dplyr",
  "tidyr",
  "stringr",
  "forcats",
  "svglite",
  "ragg",
  "scales",
  "ggrepel"
)

for (pkg in packages) {
  ok <- requireNamespace(pkg, quietly = TRUE)
  cat(pkg, ":", ok, "\n", sep = "")
  if (ok) {
    suppressPackageStartupMessages(library(pkg, character.only = TRUE))
    cat("loaded:", pkg, "\n", sep = "")
  }
}
