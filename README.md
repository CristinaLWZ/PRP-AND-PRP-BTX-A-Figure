# PRP and PRP+BTX-A Figure Workspace

这个仓库用于整理 PRP 与 PRP+BTX-A 相关的毛发密度研究作图资产，包含：

- `R` 分析和论文风格作图脚本
- `Python` 版图表生成脚本
- 一个无需构建即可直接打开的前端作图工具

仓库已经配置好 `git`，并且默认不上传本地原始 `xlsx`、导出图、预览图和临时打包文件。

## 目录说明

- `hair-density-web/`
  交互式前端作图工具，直接打开 `index.html` 或 `research-plotter.html` 即可使用。
- `scripts/`
  `Python` 作图脚本，读取工作区根目录下的 `xlsx` 数据并输出到 `outputs/`。
- `make_nature_style_figure.R`
  生成主论文风格图和配套统计表。
- `make_nature_style_equal_curves_T0T1T3T6.R`
  生成 T0/T1/T3/T6 的多指标等风格曲线图。
- `make_nature_style_single_metric_figures_scatter.R`
  生成单指标散点图 bundle。
- `make_nature_style_single_metric_figures_scatter_sd.R`
  生成带标准差展示的单指标散点图 bundle。
- `summarize_patient_data_for_figure.R`
  对原始患者数据做汇总、变化量和 Welch 检验检查。
- `check_*.R`
  数据完整性、缺失值和依赖检查脚本。
- `outputs/`
  `Python` 脚本输出目录，已被 `.gitignore` 排除。
- `single_metric_figures_scatter/`
  单指标导出结果目录，已被 `.gitignore` 排除。
- `single_metric_figures_scatter_sd/`
  带标准差的单指标导出结果目录，已被 `.gitignore` 排除。

## 环境要求

### Python

建议使用 `Python 3.10+`，至少安装这些包：

```powershell
pip install pandas pillow reportlab openpyxl
```

### R

仓库内已经提供依赖安装脚本：

```powershell
Rscript .\install_r_packages_nature_figure.R
```

如果你只想安装最小作图依赖，可以运行：

```powershell
Rscript .\install_r_minimal_plotting_deps.R
```

也可以先检查依赖是否齐全：

```powershell
Rscript .\check_r_figure_deps.R
```

## 数据文件约定

- 原始工作簿放在仓库根目录。
- `Python` 脚本会自动读取根目录里第一个非临时 `xlsx` 文件。
- 多个 `R` 脚本当前按“原始工作簿就在仓库根目录”这个前提编写。
- 原始 `xlsx` 已加入 `.gitignore`，默认只保留本地，不会上传到 GitHub。

如果你换了工作簿文件名，`Python` 脚本通常不需要改；部分 `R` 脚本可能需要同步更新文件路径。

## 常用用法

### 1. 打开前端作图工具

直接在浏览器中打开：

- `hair-density-web/index.html`
- `hair-density-web/research-plotter.html`

适合做交互式录入、快速预览和导出。

### 2. 运行 Python 图表脚本

生成均值/标准差图：

```powershell
python .\scripts\create_hair_density_chart.py
```

生成论文参考风格图：

```powershell
python .\scripts\create_hair_density_reference_style.py
```

输出文件会写入 `outputs/`。

### 3. 运行 R 作图脚本

生成主图：

```powershell
Rscript .\make_nature_style_figure.R
```

生成 T0/T1/T3/T6 等风格曲线图：

```powershell
Rscript .\make_nature_style_equal_curves_T0T1T3T6.R
```

生成单指标散点图：

```powershell
Rscript .\make_nature_style_single_metric_figures_scatter.R
Rscript .\make_nature_style_single_metric_figures_scatter_sd.R
```

### 4. 运行数据汇总检查

```powershell
Rscript .\summarize_patient_data_for_figure.R
Rscript .\check_missingness.R
Rscript .\check_groupwise_correlation.R
```

## Git 约定

- 原始 `xlsx`、导出图、预览图、临时 zip、备份文件默认不提交。
- 每次提交前先看状态：

```powershell
git status
```

- 常用提交流程：

```powershell
git add .
git commit -m "your message"
git push
```

## 当前仓库目标

这个仓库更适合作为“研究作图工作区”使用，而不是通用软件包。当前重点是：

- 保留作图脚本和网页工具源码
- 保留可复用的分析流程
- 避免把原始敏感数据和大体积导出物上传到远程仓库
