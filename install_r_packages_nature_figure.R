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

repos <- "https://cloud.r-project.org"
installed <- rownames(installed.packages())
needed <- setdiff(packages, installed)

message("Need: ", paste(needed, collapse = ", "))

if (length(needed) > 0) {
  install.packages(needed, repos = repos, dependencies = TRUE)
}

message("Done")
