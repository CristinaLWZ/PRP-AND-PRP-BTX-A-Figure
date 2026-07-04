options(timeout = 600)

packages <- c(
  "stringi",
  "farver",
  "isoband",
  "scales",
  "ggplot2",
  "stringr",
  "ggrepel",
  "systemfonts",
  "textshaping",
  "svglite",
  "ragg",
  "patchwork"
)

repos <- "https://mirrors.tuna.tsinghua.edu.cn/CRAN/"
installed <- rownames(installed.packages())
needed <- setdiff(packages, installed)

message("Need: ", paste(needed, collapse = ", "))

if (length(needed) > 0) {
  install.packages(
    needed,
    repos = repos,
    type = "binary",
    dependencies = c("Depends", "Imports")
  )
}

message("Done")
