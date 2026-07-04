const DEFAULT_TIMES = [
  { label: "T0", day: 0, aliases: ["\u57fa\u7ebf", "0\u5929"] },
  { label: "T1", day: 1, aliases: ["30\u5929", "1\u6708", "1\u4e2a\u6708"] },
  { label: "T3", day: 3, aliases: ["90\u5929", "3\u6708", "3\u4e2a\u6708"] },
  { label: "T6", day: 6, aliases: ["180\u5929", "6\u6708", "6\u4e2a\u6708"] },
];

const LEGACY_SIX_POINT_INDEXES = [0, 2, 4, 5];
const STORAGE_KEY = "hair-density-plotter";
const STORAGE_VERSION = 6;

const METRIC_CONFIG = {
  density: {
    label: "\u6bdb\u53d1\u5bc6\u5ea6",
    title: "\u6bdb\u53d1\u5bc6\u5ea6\u53ef\u89c6\u5316",
    lineTitle: "\u6bdb\u53d1\u5bc6\u5ea6\u968f\u65f6\u95f4\u53d8\u5316",
    barTitle: "\u6bdb\u53d1\u5bc6\u5ea6\u67f1\u72b6\u56fe",
    yAxisTitle: "Hair density (hairs/cm\u00b2)",
    headerKeyword: "\u6bdb\u53d1\u5bc6\u5ea6",
  },
  diameter: {
    label: "\u6bdb\u53d1\u76f4\u5f84",
    title: "\u6bdb\u53d1\u76f4\u5f84\u53ef\u89c6\u5316",
    lineTitle: "\u6bdb\u53d1\u76f4\u5f84\u968f\u65f6\u95f4\u53d8\u5316",
    barTitle: "\u6bdb\u53d1\u76f4\u5f84\u67f1\u72b6\u56fe",
    yAxisTitle: "Hair diameter",
    headerKeyword: "\u6bdb\u53d1\u76f4\u5f84",
  },
  coverage: {
    label: "\u6bdb\u53d1\u8986\u76d6\u7387",
    title: "\u6bdb\u53d1\u8986\u76d6\u7387\u53ef\u89c6\u5316",
    lineTitle: "\u6bdb\u53d1\u8986\u76d6\u7387\u968f\u65f6\u95f4\u53d8\u5316",
    barTitle: "\u6bdb\u53d1\u8986\u76d6\u7387\u67f1\u72b6\u56fe",
    yAxisTitle: "Coverage",
    headerKeyword: "\u8986\u76d6\u7387",
  },
  sebum: {
    label: "\u6cb9\u8102\u5206\u6ccc",
    title: "\u6cb9\u8102\u5206\u6ccc\u53ef\u89c6\u5316",
    lineTitle: "\u6cb9\u8102\u5206\u6ccc\u968f\u65f6\u95f4\u53d8\u5316",
    barTitle: "\u6cb9\u8102\u5206\u6ccc\u67f1\u72b6\u56fe",
    yAxisTitle: "Sebum secretion",
    headerKeyword: "\u6cb9\u8102\u5206\u6ccc",
  },
  hardness: {
    label: "\u5934\u76ae\u786c\u5ea6",
    title: "\u5934\u76ae\u786c\u5ea6\u53ef\u89c6\u5316",
    lineTitle: "\u5934\u76ae\u786c\u5ea6\u968f\u65f6\u95f4\u53d8\u5316",
    barTitle: "\u5934\u76ae\u786c\u5ea6\u67f1\u72b6\u56fe",
    yAxisTitle: "Scalp hardness",
    headerKeyword: "\u5934\u76ae\u786c\u5ea6",
  },
  bloodflow: {
    label: "\u5934\u76ae\u8840\u6d41",
    title: "\u5934\u76ae\u8840\u6d41\u53ef\u89c6\u5316",
    lineTitle: "\u5934\u76ae\u8840\u6d41\u968f\u65f6\u95f4\u53d8\u5316",
    barTitle: "\u5934\u76ae\u8840\u6d41\u67f1\u72b6\u56fe",
    yAxisTitle: "Scalp blood flow",
    headerKeyword: "\u5934\u76ae\u8840\u6d41",
  },
};

const METRIC_ORDER = ["density", "diameter", "coverage", "sebum", "hardness", "bloodflow"];

const DEFAULT_CHART_STYLE = {
  chartTitle: METRIC_CONFIG.density.lineTitle,
  xAxisTitle: "??",
  yAxisTitle: METRIC_CONFIG.density.yAxisTitle,
  titleSize: 16,
  axisSize: 13,
  tickSize: 12,
  legendSize: 13,
  textColor: "#384b5c",
  expColor: "#2463b3",
  ctrlColor: "#c84a42",
  lineWidth: 2.4,
  markerSize: 8,
  showTitle: true,
  showLegend: true,
  showXAxisTitle: true,
  showYAxisTitle: true,
  titleX: 50,
  titleY: 12,
  xAxisTitleX: 50,
  xAxisTitleY: 18,
  yAxisTitleX: 18,
  yAxisTitleY: 50,
  legendX: 72,
  legendY: 50,
  yMin: 0,
  yMax: 350,
  yStep: 50,
  axisColor: "#aab8c5",
  chartBgColor: "#ffffff",
  plotBgColor: "#ffffff",
  plotTop: 82,
  plotRight: 34,
  plotBottom: 72,
  plotLeft: 72,
  rawPointOpacity: 0.18,
  jitter: 1.7,
  errorCap: 5,
  showExp: true,
  showCtrl: true,
  expLineStyle: "solid",
  ctrlLineStyle: "solid",
  expLineWidth: 2.4,
  ctrlLineWidth: 2.4,
  expMarkerStyle: "square",
  ctrlMarkerStyle: "circle",
  expMarkerSize: 8,
  ctrlMarkerSize: 8,
  showRawPoints: true,
  showErrorBars: true,
  errorType: "sd",
  expErrorColor: "#2463b3",
  ctrlErrorColor: "#c84a42",
  expErrorWidth: 1.4,
  ctrlErrorWidth: 1.4,
  expErrorCap: 5,
  ctrlErrorCap: 5,
  xMin: -0.4,
  xMax: 6.4,
  tickDirection: "out",
  showMajorGrid: false,
  showMinorGrid: false,
  theme: "sci",
  fontFamily: "Arial",
  globalFontSize: 13,
  legendPosition: "top-left",
  legendTranslucent: false,
  legendBorder: false,
  showValueLabels: false,
  smoothCurve: false,
  smoothness: 0.55,
  normalize: false,
  interactionMode: "zoom",
  showMaxImprovement: true,
  showDifference: false,
};

const DEFAULT_BAR_STYLE = {
  ...DEFAULT_CHART_STYLE,
  chartTitle: METRIC_CONFIG.density.barTitle,
  yAxisTitle: METRIC_CONFIG.density.yAxisTitle,
  textColor: "#111827",
  expColor: "#0078ff",
  ctrlColor: "#ff0000",
  expErrorColor: "#0078ff",
  ctrlErrorColor: "#ff0000",
  axisColor: "#111827",
  xMin: -0.7,
  xMax: 6.7,
  barWidth: 34,
  barGap: 8,
  barOpacity: 0.82,
  barBorderWidth: 0,
  jitter: 2.2,
  expErrorCap: 7,
  ctrlErrorCap: 7,
  smoothCurve: false,
  showDifference: false,
};

const EXAMPLE_EXP = `EXP001\t142.0\t149.2\t169.8\t171.0
EXP002\t151.3\t154.6\t178.5\t176.4
EXP003\t137.8\t144.9\t166.1\t164.8
EXP004\t148.6\t153.5\t174.2\t172.7
EXP005\t146.1\t150.3\t172.9\t168.9`;

const EXAMPLE_CTRL = `CTL001\t144.8\t146.8\t159.9\t157.1
CTL002\t149.1\t150.2\t164.1\t160.6
CTL003\t140.7\t144.5\t157.2\t155.0
CTL004\t147.4\t149.9\t162.8\t160.2
CTL005\t143.9\t147.6\t159.7\t158.1`;

const state = {
  times: structuredClone(DEFAULT_TIMES),
  expRows: [],
  ctrlRows: [],
  stats: [],
  hoverPoints: [],
  currentDataRows: [],
  chartGeometry: null,
  draggableItems: [],
  drag: null,
  labelDrag: null,
  layoutUnlocked: false,
  activeMetric: "density",
  activeChart: "line",
  view: null,
  metricStates: {},
};

Object.defineProperties(state, {
  chartStyle: {
    get() {
      return ensureMetricState(this.activeMetric).chartStyle;
    },
    set(value) {
      ensureMetricState(this.activeMetric).chartStyle = { ...getMetricLineDefaults(this.activeMetric), ...(value || {}) };
    },
  },
  barStyle: {
    get() {
      return ensureMetricState(this.activeMetric).barStyle;
    },
    set(value) {
      ensureMetricState(this.activeMetric).barStyle = { ...getMetricBarDefaults(this.activeMetric), ...(value || {}) };
    },
  },
  lineView: {
    get() {
      return ensureMetricState(this.activeMetric).lineView;
    },
    set(value) {
      ensureMetricState(this.activeMetric).lineView = normalizeView(value);
    },
  },
  barView: {
    get() {
      return ensureMetricState(this.activeMetric).barView;
    },
    set(value) {
      ensureMetricState(this.activeMetric).barView = normalizeView(value);
    },
  },
  savedEffect: {
    get() {
      return ensureMetricState(this.activeMetric).savedEffect;
    },
    set(value) {
      ensureMetricState(this.activeMetric).savedEffect = normalizeSavedEffect(value, getMetricLineDefaults(this.activeMetric));
    },
  },
  savedBarEffect: {
    get() {
      return ensureMetricState(this.activeMetric).savedBarEffect;
    },
    set(value) {
      ensureMetricState(this.activeMetric).savedBarEffect = normalizeSavedEffect(value, getMetricBarDefaults(this.activeMetric));
    },
  },
});

const els = {
  appTitle: document.getElementById("appTitle"),
  metricNav: document.getElementById("metricNav"),
  timeGrid: document.getElementById("timeGrid"),
  expInput: document.getElementById("expInput"),
  ctrlInput: document.getElementById("ctrlInput"),
  expPanelTitle: document.getElementById("expPanelTitle"),
  ctrlPanelTitle: document.getElementById("ctrlPanelTitle"),
  expStatus: document.getElementById("expStatus"),
  ctrlStatus: document.getElementById("ctrlStatus"),
  showPoints: document.getElementById("showRawPointsInput") || document.getElementById("showPoints"),
  showSd: document.getElementById("showErrorBarsInput") || document.getElementById("showSd"),
  chart: document.getElementById("densityChart"),
  tooltip: document.getElementById("tooltip"),
  subtitle: document.getElementById("chartSubtitle"),
  summaryBody: document.getElementById("summaryBody"),
  pvalueHead: document.getElementById("pvalueHead"),
  pvalueBody: document.getElementById("pvalueBody"),
  copyPValues: document.getElementById("copyPValues"),
  currentDataBody: document.getElementById("currentDataBody"),
  copyCurrentData: document.getElementById("copyCurrentData"),
  chartPanelTitle: document.getElementById("chartPanelTitle"),
  lineChartTab: document.getElementById("lineChartTab"),
  barChartTab: document.getElementById("barChartTab"),
  lineControlPanel: document.getElementById("lineControlPanel"),
  barControlPanel: document.getElementById("barControlPanel"),
  loadExample: document.getElementById("loadExample"),
  clearAll: document.getElementById("clearAll"),
  exportCsv: document.getElementById("exportCsv"),
  exportPng: document.getElementById("exportPng"),
  exportPng300: document.getElementById("exportPng300"),
  exportSvg: document.getElementById("exportSvg"),
  resetView: document.getElementById("resetView"),
  saveChartEffect: document.getElementById("saveChartEffect"),
  barResetView: document.getElementById("barResetView"),
  barExportPng300: document.getElementById("barExportPng300"),
  barExportSvg: document.getElementById("barExportSvg"),
  lockLayout: document.getElementById("lockLayout"),
  unlockLayout: document.getElementById("unlockLayout"),
  chartTitleInput: document.getElementById("chartTitleInput"),
  xAxisTitleInput: document.getElementById("xAxisTitleInput"),
  yAxisTitleInput: document.getElementById("yAxisTitleInput"),
  titleSizeInput: document.getElementById("titleSizeInput"),
  axisSizeInput: document.getElementById("axisSizeInput"),
  tickSizeInput: document.getElementById("tickSizeInput"),
  legendSizeInput: document.getElementById("legendSizeInput"),
  textColorInput: document.getElementById("textColorInput"),
  expColorInput: document.getElementById("expColorInput"),
  ctrlColorInput: document.getElementById("ctrlColorInput"),
  lineWidthInput: document.getElementById("lineWidthInput"),
  markerSizeInput: document.getElementById("markerSizeInput"),
  showTitleInput: document.getElementById("showTitleInput"),
  showLegendInput: document.getElementById("showLegendInput"),
  showXAxisTitleInput: document.getElementById("showXAxisTitleInput"),
  showYAxisTitleInput: document.getElementById("showYAxisTitleInput"),
  titleXInput: document.getElementById("titleXInput"),
  titleYInput: document.getElementById("titleYInput"),
  xAxisTitleXInput: document.getElementById("xAxisTitleXInput"),
  xAxisTitleYInput: document.getElementById("xAxisTitleYInput"),
  yAxisTitleXInput: document.getElementById("yAxisTitleXInput"),
  yAxisTitleYInput: document.getElementById("yAxisTitleYInput"),
  legendXInput: document.getElementById("legendXInput"),
  legendYInput: document.getElementById("legendYInput"),
  yMinInput: document.getElementById("yMinInput"),
  yMaxInput: document.getElementById("yMaxInput"),
  yStepInput: document.getElementById("yStepInput"),
  axisColorInput: document.getElementById("axisColorInput"),
  chartBgColorInput: document.getElementById("chartBgColorInput"),
  plotBgColorInput: document.getElementById("plotBgColorInput"),
  plotTopInput: document.getElementById("plotTopInput"),
  plotRightInput: document.getElementById("plotRightInput"),
  plotBottomInput: document.getElementById("plotBottomInput"),
  plotLeftInput: document.getElementById("plotLeftInput"),
  rawPointOpacityInput: document.getElementById("rawPointOpacityInput"),
  jitterInput: document.getElementById("jitterInput"),
  errorCapInput: document.getElementById("errorCapInput"),
  showExpInput: document.getElementById("showExpInput"),
  showCtrlInput: document.getElementById("showCtrlInput"),
  expLineStyleInput: document.getElementById("expLineStyleInput"),
  ctrlLineStyleInput: document.getElementById("ctrlLineStyleInput"),
  expLineWidthInput: document.getElementById("expLineWidthInput"),
  ctrlLineWidthInput: document.getElementById("ctrlLineWidthInput"),
  expMarkerStyleInput: document.getElementById("expMarkerStyleInput"),
  ctrlMarkerStyleInput: document.getElementById("ctrlMarkerStyleInput"),
  expMarkerSizeInput: document.getElementById("expMarkerSizeInput"),
  ctrlMarkerSizeInput: document.getElementById("ctrlMarkerSizeInput"),
  showRawPointsInput: document.getElementById("showRawPointsInput"),
  showErrorBarsInput: document.getElementById("showErrorBarsInput"),
  errorTypeInput: document.getElementById("errorTypeInput"),
  expErrorColorInput: document.getElementById("expErrorColorInput"),
  ctrlErrorColorInput: document.getElementById("ctrlErrorColorInput"),
  expErrorWidthInput: document.getElementById("expErrorWidthInput"),
  ctrlErrorWidthInput: document.getElementById("ctrlErrorWidthInput"),
  expErrorCapInput: document.getElementById("expErrorCapInput"),
  ctrlErrorCapInput: document.getElementById("ctrlErrorCapInput"),
  xMinInput: document.getElementById("xMinInput"),
  xMaxInput: document.getElementById("xMaxInput"),
  tickDirectionInput: document.getElementById("tickDirectionInput"),
  showMajorGridInput: document.getElementById("showMajorGridInput"),
  showMinorGridInput: document.getElementById("showMinorGridInput"),
  themeInput: document.getElementById("themeInput"),
  fontFamilyInput: document.getElementById("fontFamilyInput"),
  globalFontSizeInput: document.getElementById("globalFontSizeInput"),
  legendPositionInput: document.getElementById("legendPositionInput"),
  legendTranslucentInput: document.getElementById("legendTranslucentInput"),
  legendBorderInput: document.getElementById("legendBorderInput"),
  showValueLabelsInput: document.getElementById("showValueLabelsInput"),
  smoothCurveInput: document.getElementById("smoothCurveInput"),
  smoothnessInput: document.getElementById("smoothnessInput"),
  normalizeInput: document.getElementById("normalizeInput"),
  interactionModeInput: document.getElementById("interactionModeInput"),
  showMaxImprovementInput: document.getElementById("showMaxImprovementInput"),
  showDifferenceInput: document.getElementById("showDifferenceInput"),
};

const barEls = {
  chartTitleInput: document.getElementById("barChartTitleInput"),
  xAxisTitleInput: document.getElementById("barXAxisTitleInput"),
  yAxisTitleInput: document.getElementById("barYAxisTitleInput"),
  titleSizeInput: document.getElementById("barTitleSizeInput"),
  axisSizeInput: document.getElementById("barAxisSizeInput"),
  tickSizeInput: document.getElementById("barTickSizeInput"),
  legendSizeInput: document.getElementById("barLegendSizeInput"),
  textColorInput: document.getElementById("barTextColorInput"),
  showTitleInput: document.getElementById("barShowTitleInput"),
  showLegendInput: document.getElementById("barShowLegendInput"),
  showXAxisTitleInput: document.getElementById("barShowXAxisTitleInput"),
  showYAxisTitleInput: document.getElementById("barShowYAxisTitleInput"),
  titleXInput: document.getElementById("barTitleXInput"),
  titleYInput: document.getElementById("barTitleYInput"),
  xAxisTitleXInput: document.getElementById("barXAxisTitleXInput"),
  xAxisTitleYInput: document.getElementById("barXAxisTitleYInput"),
  yAxisTitleXInput: document.getElementById("barYAxisTitleXInput"),
  yAxisTitleYInput: document.getElementById("barYAxisTitleYInput"),
  legendXInput: document.getElementById("barLegendXInput"),
  legendYInput: document.getElementById("barLegendYInput"),
  yMinInput: document.getElementById("barYMinInput"),
  yMaxInput: document.getElementById("barYMaxInput"),
  yStepInput: document.getElementById("barYStepInput"),
  xMinInput: document.getElementById("barXMinInput"),
  xMaxInput: document.getElementById("barXMaxInput"),
  axisColorInput: document.getElementById("barAxisColorInput"),
  chartBgColorInput: document.getElementById("barChartBgColorInput"),
  plotBgColorInput: document.getElementById("barPlotBgColorInput"),
  plotTopInput: document.getElementById("barPlotTopInput"),
  plotRightInput: document.getElementById("barPlotRightInput"),
  plotBottomInput: document.getElementById("barPlotBottomInput"),
  plotLeftInput: document.getElementById("barPlotLeftInput"),
  showExpInput: document.getElementById("barShowExpInput"),
  showCtrlInput: document.getElementById("barShowCtrlInput"),
  expColorInput: document.getElementById("barExpColorInput"),
  ctrlColorInput: document.getElementById("barCtrlColorInput"),
  barWidthInput: document.getElementById("barWidthInput"),
  barGapInput: document.getElementById("barGapInput"),
  barOpacityInput: document.getElementById("barOpacityInput"),
  barBorderWidthInput: document.getElementById("barBorderWidthInput"),
  showRawPointsInput: document.getElementById("barShowRawPointsInput"),
  showValueLabelsInput: document.getElementById("barShowValueLabelsInput"),
  rawPointOpacityInput: document.getElementById("barRawPointOpacityInput"),
  jitterInput: document.getElementById("barJitterInput"),
  showErrorBarsInput: document.getElementById("barShowErrorBarsInput"),
  errorTypeInput: document.getElementById("barErrorTypeInput"),
  expErrorColorInput: document.getElementById("barExpErrorColorInput"),
  ctrlErrorColorInput: document.getElementById("barCtrlErrorColorInput"),
  expErrorWidthInput: document.getElementById("barExpErrorWidthInput"),
  ctrlErrorWidthInput: document.getElementById("barCtrlErrorWidthInput"),
  expErrorCapInput: document.getElementById("barExpErrorCapInput"),
  ctrlErrorCapInput: document.getElementById("barCtrlErrorCapInput"),
  themeInput: document.getElementById("barThemeInput"),
  fontFamilyInput: document.getElementById("barFontFamilyInput"),
  globalFontSizeInput: document.getElementById("barGlobalFontSizeInput"),
  legendPositionInput: document.getElementById("barLegendPositionInput"),
  legendTranslucentInput: document.getElementById("barLegendTranslucentInput"),
  legendBorderInput: document.getElementById("barLegendBorderInput"),
  tickDirectionInput: document.getElementById("barTickDirectionInput"),
  showMajorGridInput: document.getElementById("barShowMajorGridInput"),
  showMinorGridInput: document.getElementById("barShowMinorGridInput"),
  normalizeInput: document.getElementById("barNormalizeInput"),
  showMaxImprovementInput: document.getElementById("barShowMaxImprovementInput"),
};

function getMetricConfig(metricKey = state.activeMetric) {
  return METRIC_CONFIG[metricKey] || METRIC_CONFIG.density;
}

function getMetricPreset(metricKey = state.activeMetric) {
  return window.METRIC_PRESETS?.[metricKey] || null;
}

function getMetricLineDefaults(metricKey = state.activeMetric) {
  const metric = getMetricConfig(metricKey);
  return {
    ...DEFAULT_CHART_STYLE,
    chartTitle: metric.lineTitle,
    yAxisTitle: metric.yAxisTitle,
    xAxisTitle: "??",
  };
}

function getMetricBarDefaults(metricKey = state.activeMetric) {
  const metric = getMetricConfig(metricKey);
  return {
    ...DEFAULT_BAR_STYLE,
    chartTitle: metric.barTitle,
    yAxisTitle: metric.yAxisTitle,
    xAxisTitle: "??",
  };
}

function normalizeView(view) {
  if (!view || typeof view !== "object") return null;
  const normalized = {
    xMin: Number(view.xMin),
    xMax: Number(view.xMax),
    yMin: Number(view.yMin),
    yMax: Number(view.yMax),
  };
  return Number.isFinite(normalized.xMin) &&
    Number.isFinite(normalized.xMax) &&
    Number.isFinite(normalized.yMin) &&
    Number.isFinite(normalized.yMax) &&
    normalized.xMax > normalized.xMin &&
    normalized.yMax > normalized.yMin
    ? normalized
    : null;
}

function createMetricState(metricKey, savedState = {}) {
  return {
    expInput: typeof savedState.expInput === "string" ? savedState.expInput : null,
    ctrlInput: typeof savedState.ctrlInput === "string" ? savedState.ctrlInput : null,
    chartStyle: { ...getMetricLineDefaults(metricKey), ...(savedState.chartStyle && typeof savedState.chartStyle === "object" ? savedState.chartStyle : {}) },
    barStyle: { ...getMetricBarDefaults(metricKey), ...(savedState.barStyle && typeof savedState.barStyle === "object" ? savedState.barStyle : {}) },
    lineView: normalizeView(savedState.lineView),
    barView: normalizeView(savedState.barView),
    savedEffect: normalizeSavedEffect(savedState.savedEffect, getMetricLineDefaults(metricKey)),
    savedBarEffect: normalizeSavedEffect(savedState.savedBarEffect, getMetricBarDefaults(metricKey)),
    activeChart: savedState.activeChart === "bar" ? "bar" : "line",
  };
}

function ensureMetricState(metricKey = state.activeMetric) {
  const key = METRIC_CONFIG[metricKey] ? metricKey : "density";
  if (!state.metricStates[key]) {
    state.metricStates[key] = createMetricState(key);
  }
  return state.metricStates[key];
}

function persistActiveMetricInputs() {
  const metricState = ensureMetricState();
  metricState.expInput = els.expInput?.value ?? "";
  metricState.ctrlInput = els.ctrlInput?.value ?? "";
}

function setMetricTitles() {
  const metric = getMetricConfig();
  if (els.appTitle) els.appTitle.textContent = metric.title;
  if (els.expPanelTitle) els.expPanelTitle.textContent = "PRP+BTX-A " + metric.label + " 原始数据";
  if (els.ctrlPanelTitle) els.ctrlPanelTitle.textContent = "PRP " + metric.label + " 原始数据";
}

function renderMetricNav() {
  if (!els.metricNav) return;
  els.metricNav.innerHTML = "";
  METRIC_ORDER.forEach((key) => {
    const metric = getMetricConfig(key);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `metric-button${state.activeMetric === key ? " active" : ""}`;
    button.textContent = metric.label;
    button.dataset.metric = key;
    button.addEventListener("click", () => setActiveMetric(key));
    els.metricNav.appendChild(button);
  });
}

function renderTimeInputs() {
  if (!els.timeGrid) return;
  els.timeGrid.innerHTML = "";
  state.times.forEach((time, index) => {
    const wrap = document.createElement("label");
    wrap.className = "time-cell";
    wrap.innerHTML = `
      <input aria-label="闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇川绾剧晫鈧箍鍎遍幏鎴︾叕椤掑倵鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝懐顦ч柣蹇撶箲閻楁鈧矮绮欏铏规嫚閺屻儱寮板┑鐐板尃閸曨厾褰炬繝鐢靛Т娴硷綁鏁愭径妯绘櫓闂佸憡鎸嗛崪鍐簥闂傚倷鑳剁划顖炲礉閿曞倸绀堟繛鍡樻尭缁€澶愭煏閸繃宸濈痪鍓ф櫕閳ь剙绠嶉崕閬嶅箯閹达妇鍙曟い鎺戝€甸崑鎾斥枔閸喗鐏堝銈庡幘閸忔﹢鐛崘顔碱潊闁靛牆鎳愰ˇ褔鏌ｈ箛鎾剁闁绘顨堥埀顒佺煯缁瑥顫忛搹瑙勫珰闁哄被鍎卞鏉库攽閻愭澘灏冮柛鏇ㄥ幘瑜扮偓绻濋悽闈浶㈠ù纭风秮閺佹劖寰勫Ο缁樻珦闂備礁鎲￠幐鍡涘椽閸愵亜绨ラ梻鍌氬€烽懗鍓佸垝椤栫偛绀夐柨鏇炲€哥粈鍫熺箾閸℃ɑ灏紒鈧径鎰厪闁割偅绻冨婵堢棯閸撗勬珪闁逞屽墮缁犲秹宕曢柆宥呯闁硅揪濡囬崣鏇熴亜閹烘垵鈧敻宕戦幘鏂ユ灁闁割煈鍠楅悘鍫濐渻閵堝骸骞橀柛蹇旓耿閻涱噣宕橀纰辨綂闂侀潧鐗嗛幊鎰八囪閺岋綀绠涢幘鍓侇唹闂佺粯顨嗛〃鍫ュ焵椤掍胶鐓紒顔界懃椤繘鎼圭憴鍕彴闂佸搫琚崕鍗烆嚕閺夊簱鏀介柣鎰緲鐏忓啴鏌涢弴銊ュ箻鐟滄壆鍋撶换婵嬫偨闂堟刀銏犆圭涵椋庣М闁轰焦鍔栧鍕熺紒妯荤彟闂傚倷绀侀幉锟犲箰閸℃稑妞介柛鎰典簻缁ㄣ儵姊婚崒姘偓宄懊归崶顒夋晪闁哄稁鍘奸崹鍌炲箹濞ｎ剙濡肩紒鈧崘顔界叆婵犻潧妫欓ˉ婊堟煟閿曞倷鎲炬慨濠傤煼瀹曟帒鈻庨幒鎴濆腐婵＄偑鍊戦崹褰掓晝閵堝鐓濈€广儱顦崡鎶芥煏韫囨洖啸妞ゆ柨顦靛娲箹閻愭彃濮堕梺鍛婃尰閻熲晠骞冨鈧獮搴ㄦ嚍閵壯冨箰闂備礁鎲￠崝鎴﹀礉鎼淬垺娅犻柡鍥╁Х绾惧ジ鏌嶈閸撶喎鐣峰鈧崺鐐村緞閸濄儳娉块梻鍌氼煬閸嬪嫬煤閵堝悿褰掓倻閸撳灝娲弫鍐焵椤掑嫭绠掓繝鐢靛Т閿曘倝鎮ц箛娑欏仼婵炲樊浜濋悡娑㈡倶閻愰鍤欏┑鈥炽偢閺屽秶鎲撮崟顐や紝閻庤娲栧畷顒勫煝鎼淬倗鐤€闁规儳顕Σ妤冪磽閸屾艾鈧悂宕愰悜鑺モ挃鐎广儱顦粈澶屸偓鍏夊亾闁告洦鍊犺閺岀喖姊荤€靛壊妲梺钘夊暟閸犳牠寮婚敐澶婃闁割煈鍠楅崐顖炴⒑缁嬪潡顎楅柣顓炲€垮璇测槈濡攱鏂€闂佸憡娲﹂崑鍕叏閵忋倖鍋犳慨妯哄⒔閻ｅ灚鎱ㄦ繝鍕笡闁瑰嘲鎳樺畷銊︾節閸愩劌澹嶉梻鍌欑劍濡炲潡宕㈡總鏉嗗洦娼忛埡鍌ゆ綗闂佺粯鍔曢顓㈡偡瑜版帗鐓冪憸婊堝礈閻旈晲绻嗛悗娑櫳戞刊鎾煕閹惧啿绾х€点倖妞藉娲焻閻愯尪瀚板褍鐡ㄩ〃銉╂倷閹绘帗娈梺瀹狀嚙闁帮綁鐛Ο铏规殾闁搞儴娉涢弲锝呪攽閿涘嫬浜奸柛濠冪墵楠炴劖銈ｉ崘銊╂７闂侀潧顦崕娆忊槈濠婂孩鈻屾繝娈垮枛閿曘倝鈥﹀畡鎵殾闁圭儤鍨熼弸搴ㄦ煙鐎电啸鐎规洖寮剁换婵嬫偨闂堟稐绮ч梺鍛婄墱婵炩偓鐎规洘顨婇幃娆擃敆閸屾顫嶉梻浣哥枃椤曆囨煀閿濆宓侀悗锝庡枟閸婄兘鎮楀☉娆欎緵闁哥偛鐖煎濠氬磼濞嗘埈妲┑鐘亾闂侇剙绉寸壕鍧楁煏閸繍妲堕柍褜鍓欓崯鎾嵁閸ヮ剦鏁婇柛鎾楀本笑闂傚倷绀侀幖顐ょ矓閺屻儱绀夐幖杈剧到婵剟鏌嶈閸撶喎顫忔繝姘＜婵ê宕·鈧┑鐐存尰绾板秹銆冩繝鍌滄殾闁哄洢鍨圭粻娑㈡煟濡も偓閻楀繘宕㈤幖浣光拺闁告稑锕ｇ欢閬嶆煕閻樺啿鍝虹€规洩缍侀崺鈧い鎺戝閳锋垿鏌涘┑鍡楊仾婵犫偓閹殿喚纾奸悗锝庡亜閻忔挳鏌涢埞鍨姕鐎垫澘瀚伴獮鍥敆閸屻倖鏁ら梻鍌欒兌缁垶宕濋弴鐐嶇喐绻濋崒銈囧姺缂傚倷鐒︾湁缂佽妫濋弻锝夊箛閸忓摜鐩庨梺閫炲苯澧柛銊ョ仢閻ｇ兘寮撮姀鐘烘憰闂侀潧顧€缁犳垵鈻撻悙缈犵箚闁靛牆绻掗崚浼存煕閻曚礁浜伴柟顔光偓鎰佹建闁逞屽墴瀵鎮㈢悰鈥充壕闁汇垺顔栭悞鎯归悩宕囩煂缂佽鲸甯￠幃鈺呮濞戞帗鐎版繝娈垮枛閿曘劌鈻嶉敐鍥у灊婵炲棙鎸哥粈宀勬煃閳轰礁鏆為柡鍡欏娣囧﹪鎮欓鍕ㄥ亾閹达箑绀夐悘鐐跺▏濞戞ǚ鏀介悗锝庡墮缁侊箓姊洪崜鎻掍簴闁稿氦椴搁崕顐︽⒒娴ｇ鏆遍柟纰卞亰瀹曟劙骞栨担鍝ュ姦濡炪倖宸婚崑鎾淬亜椤撶姴鍘寸€殿喖顭烽弫鍐焵椤掑啰浜藉┑鐐存尰閸戝綊宕规潏顭戞闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟鐑橆殕閸庡孩銇勯弽銊ュ毈婵炲吋鐗犻弻褑绠涢幘纾嬬缂佺偓鍎抽崥瀣┍婵犲浂鏁嶆慨姗嗗幗閸庢挸顪冮妶搴′簻闂佸府绲介～蹇涙惞閸︻厾鐓撻柣鐘充航閸斿秴危閳ь剟姊绘担渚劸闁挎洏鍎抽幑銏ゅ磼閻愭潙浠奸梺缁樺灱濡嫮绮婚敐澶嬬厽婵妫楁禍婊兠瑰鍫㈢暫闁哄被鍔岄埞鎴﹀幢濞戞墎鍋撳Δ鍛厸閻庯綆鍓欓弸娑㈡煛瀹€瀣М妤犵偞顭囬幑鍕倻濡皷鍋撻悙顒傜闁挎繂鎳忛幖鎰版煥閺囥劋閭柕鍡曠閳藉螣闁垮鏉搁梻浣虹《閸撴繈銆冮崱娑樼？妞ゅ繐鎳愮弧鈧梺姹囧灲濞佳嗏叴闂備胶顭堥鍡涘箰閹间焦绠掗梻浣虹帛閿氭俊顖氾躬瀹曟洟骞囬悧鍫㈠幗闂佽鍎抽崯鍧楀汲閻斿吋鐓欓柤纰卞墻閻掔偓銇勯婊冨鐎规洜鍘ч埞鎴﹀醇椤愶及婵嗏攽閻樺灚鏆╅柛瀣仱瀹曞綊宕滄担鍛婄€抽悗骞垮劚椤︿粙寮崘顔界厾闁诡厽甯掗崝婊堟煕濞嗗繒绠查柟渚垮妼铻栭柍褜鍓欒灋婵°倓鐒﹀▍鐘测攽閻樺磭顣查柣鎾存礋閺屾洟宕煎┑鍥舵！缂備讲鍋撻悗锝庡枟閻撴稓鈧厜鍋撻柍褜鍓熷畷浼村箻閼告娼熼梺鍦劋椤ㄥ懘锝為崨瀛樼厽婵☆垵娅ｉ敍宥吤瑰搴濈凹濞ｅ洤锕幃娆擃敂閸曘劌浜鹃柕鍫濐槸绾惧鏌涢弴銊ョ仩缂佺姷濮甸幈銊ヮ渻鐠囪弓澹曢柣搴㈩問閸犳盯顢氳椤㈡﹢宕楅悡搴ｇ獮婵犵數濮寸€氼剟鐛幇顑芥斀闁绘劘鍩栬ぐ褏绱掗煫顓犵煓妤犵偛顦甸崹楣冨棘閵夛妇浜栭梻浣告惈鐞氼偊宕曢弻銉ョ厱闁瑰濮风壕钘壝归敐鍫殐闁绘帞鏅槐鎺楁偐瀹曞洤鈷岄梺鍝勭焿缁插€熺亙闂佸憡鍔戦崜閬嶅鎺虫禍婊勩亜閹扳晛鐏紒鐘茬－缁辨帗娼忛妸銉х懆闁句紮缍侀弻銈吤圭€ｎ偅鐝曢梺鎼炲€曢惌鍌氼潖缂佹鐟归柍褜鍓熼崺鈧い鎺戝€告禒婊堟煠濞茶鐏￠柡鍛埣楠炴﹢顢欓悾灞藉箞闂備礁鐤囬～澶愬磿閾忣偆顩查柣鎰靛厸缁诲棝鏌ｉ幇鍏哥盎闁逞屽墯閻楁粓寮鈧獮鎺懳旈埀顒傚瑜版帗鐓曟繛鎴烇公閸旂喐銇勯埡鍛暠缂佺粯绻冪换婵嬪磼濠婂喚鏉搁梻浣虹帛閹哥偓鎱ㄩ悽鍨床婵炴垯鍨洪崵鎴澪涢悧鍫㈢畵婵炲牜鍙冨铏规嫚閺屻儳宕紓浣虹帛缁诲牆顕ｆ繝姘櫢闁绘ɑ褰冪粣娑橆渻閵堝棙灏靛┑顔芥尦閹繝鎮㈤懖鐑樻閹晠妫冨☉妤佸媰闂備焦瀵уú蹇涘垂娴犲违濞达絿纭堕弸搴ㄦ煙閻愵剚缍戝ù鐘层偢閺岋綀绠涢弴鐐板摋濠碘槅鍋勭€氼喚鍒掓繝姘ㄩ柕澶堝灪閺傗偓闂備焦瀵х粙鎴犫偓姘煎墯缁傚秵绺介崨濠勫幈婵犵數濮撮崯鐗堟櫠閻㈢鍋撳▓鍨灈妞ゎ參鏀辨穱濠囧箹娴ｅ摜鍘告繛杈剧到瑜般劑寮撮姀锛勫幗闁瑰吋鎯岄崹宕囩矓閻㈠憡鐓曢柣妯虹－婢у崬顭跨憴鍕缂佺粯绻傞～婵嬵敇閻樻彃濡囨繝鐢靛О閸ㄥジ宕洪弽顐ょ煓闁哄稁鍋嗛惌鍡涙倵閿濆簶鍋撻姀銏″殌妞ゎ厹鍔戝畷鐔碱敇閻橀潧甯ㄩ梻鍌欑閹碱偊寮甸鈧叅婵犻潧鐗忔稉宥嗙箾閹存瑥鐏╅崬顖炴偡濠婂啰绠婚柡浣哥Ч閹垽宕楃亸鏍ㄥ闂備浇宕甸崰鎰熆濮椻偓瀵娊鏌嗗鍡椻偓鍨叏濮楀棗浜滅€规挸妫涢埀顒侇問閸犳牠鈥﹂悜钘夌畺闁靛繈鍊曟导鐘绘煏婢诡垰瀚▓鐐烘⒒閸屾瑧顦﹀鐟帮躬閹繝宕奸妷銉х崶闂佸搫绋侀崣蹇曠礊閺嶎厽鐓曢柕澶樺枤娴犳粓鏌￠崘銊у闁稿鍔欏濠氬醇閻旇　妫╃紓渚囧枦濞夋盯鍩為幋锔藉€烽柛娆忣槴閺嬫瑩姊洪崨濠勬噧闁哥喎鐡ㄦ穱濠勨偓娑欘焽閻熷綊鏌嶈閸撴瑩顢氶敐澶樻晪闁逞屽墮閻ｇ兘鎮℃惔妯绘杸闂佺硶鍓濋崺鍐磻閹捐鍨傛い鏃囶潐閺傗偓闂備胶绮崝鏇烆嚕閸泙澶愭倷閻戞鍘遍梺鍝勫暊閸嬫捇鏌ｅΔ浣圭闁糕斂鍨归鍏煎緞婵犲嫷鍞烘繝寰锋澘鈧挾鎷嬮弻銉ョ濠电姵纰嶉埛鎴犵磼鐎ｎ偄顕滄繝鈧导瀛樼厾鐟滅増甯為悾娲煕閳规儳浜炬俊鐐€栫敮濠囨倿閿曞倸纾归柟閭﹀枓閸嬫挾鎲撮崟顒傤槰闂佸憡姊瑰ú鐔煎箖妤ｅ啯鏅搁柣妯垮皺閻ゅ洦绻濋悽闈浶㈤柛濠呭吹缁棃鎼归崗澶婁壕閻熸瑥瀚粈鈧梺缁樼墪閵堟悂濡存担鑲濇梹鎷呴搹鍦闂備礁鎲″ú锕傚储缁嬭娑㈠Ω閿斿墽鐦堥梺姹囧灲濞佳嗏叿闂備焦鎮堕崝搴ㄥ储瑜旈崺銏ゅ棘鎼存挻顫嶉梺鍐茬亪閺備線宕戦幘缁樻櫇闁稿被鍊栭弲銏ゆ⒑閸涘﹥澶勯柛鎾寸懄缁傚秴顭ㄩ崼鐔叉嫼缂備緡鍨卞ú鏍ㄦ櫠閺屻儲瀚呴梺顒€绉甸悡鏇熺箾閸℃绠崇紒鐘冲絻鑿愰柛銉戝秷鍚梺璇″枟閻燂箓鏁嶉幇顑芥斀闁糕剝锕╅崬鍙夌節閻㈤潧浠滈柣掳鍔庨崚鎺楀箻閸撲椒绗夐梺鍝勮癁鐏炲墽绋侀梻浣瑰劤缁绘锝炴径灞稿亾濮橆厼鍝洪柡灞界Ч婵＄兘濡搁敂鎯ф锭闂備浇顕х换瀣濮橆剦娼栭柧蹇撴贡閻瑩鏌熺粙鍨劉鐎规洘濞婂鐑樻姜閹殿噮妲銈庡幘閸忔﹢骞冩导鎼晪闁逞屽墮閻ｅ嘲顫滈埀顒勩€佸▎鎾村殐闁宠桨绀佽倴闂傚倸鍊风粈渚€骞夐敓鐘茬闊洦绋戦悿鐐箾閹存瑥鐏╃紒鈧径鎰厱婵炴垵宕鐐箾閹炬剚鐓奸柡灞炬礋瀹曠厧鈹戦崶鑸碉紒婵＄偑鍊戦崕閬嶆偋閹捐钃熼柍鈺佸暟閻熷綊鏌涢妷鎴濆瑜板酣鏌ｆ惔銈庢綈婵炲弶锕㈠畷褰掑锤濡ゅ啫绁﹀┑鈽嗗灥閸嬫劗澹曢崗闂寸箚妞ゆ牗绮岄崝瀣煟閵堝懎鈧灝顫忕紒妯诲闁惧繒鎳撶粭锟犳⒑閸涘﹥鈷愰柣鐔叉櫊瀹曟椽鍩€椤掍降浜滈柟鍝勭Х閸忓矂鏌曢崱妯烘诞闁哄矉缍侀崺鈩冪瑹閳ь剟宕ｉ崟顒佸弿濠电姴瀚敮娑㈡煙瀹勭増鍤囩€规洏鍔嶇换婵嬪礃閵娿儱顥掓繝鐢靛Х閺佹悂宕戦悩娲绘晪婵犲﹤鎳愭稉宥夋煙閹规劦鍤欐潻婵嬫⒑閸涘﹤濮﹂柛鐘崇墪椤斿繐鈹戦崶銉ょ盎闂佸搫鍟崐钘夘瀶閸涘﹦绠鹃柟缁樺笚閸熺偛菐閸パ嶈含濠碘剝鍎肩粻娑㈠即閻愯尙鍘掗梻鍌欑閹芥粓宕抽妷鈺佸瀭闁割偅娲栭弰銉︾箾閹存瑥鐏╃紒鐙呯秮閺屻劑寮崒娑欑彧闂佸憡锚瀹曨剟鍩為幋锔藉亹缂備焦蓱闁款厼鈹戦埥鍡椾簼妞ゃ劌锕妴渚€寮崼顐ｆ櫆闂佸憡渚楅崹鎶芥儊閸儲鈷戦梺顐ゅ仜閼活垱鏅剁€涙﹩娈介柣鎰皺鏁堝銈冨灪閻熲晛鐣峰鍡╂缂備浇椴搁悡鈥愁潖閾忚瀚氶柟缁樺笒濮ｆ劗绱撻崒姘毙㈡俊顐ｇ箓閻ｇ兘骞嬮敃鈧婵囥亜閹捐泛校婵炲牓绠栭幃妤呭礂婢跺﹣澹曢梻浣告啞濞诧箓宕滃☉銏犲偍闂侇剙绉甸埛鎴︽倵閸︻厼顎屾繛鍏煎姍閺屾稒鎯旈妶鍡欏涧缂備礁鍊哥粔褰掑箖濞嗘搩鏁勯悹鎭掑妿閻ｉ箖姊绘担铏瑰笡闁告棑闄勭粋宥咁煥閸繄鍔﹀銈嗗笂閼宠埖鏅堕柆宥嗙厸濞撴艾娲ゅ▍宥嗩殽閻愭潙绗掗摶鏍归敐鍫綈闁绘繃鐗犲缁樻媴閻熼偊鍤嬮梺鍝勮閸斿秹寮查懜鐢殿浄閻庯綆鍋勯崜褰掓⒑閻熸澘鈷旂紒顕呭灦閸╂盯骞掑Δ浣哄幈濡炪倖鍔戦崐鏇㈠几濞嗘挻鐓冪憸婊堝礂濞戞艾鍨濇繛鍡樻尭缁犳牠鏌ｉ幋锝呅撻柣鎺嶇矙閺屻劑寮埀顒勫磿閸愬樊鍤曢柟鎯板Г閳锋帒霉閿濆牊顏犻柕鍡楋躬閺屾盯骞樼€靛摜鐤勯梺鐐藉劵缁犳挸鐣烽崼鏇ㄦ晢闁逞屽墲缁绘岸姊绘担绛嬫綈濠㈢懓妫欓弲璺何旈崨顔间簵闂佹寧绻傞幃鑳亹閹烘垹顦ч梺鍏肩ゴ閺呮粓宕抽鍓х＝濞达絽澹婂Ο鍫ユ煕閿濆繒绉€殿喖顭烽弫宥夊礋椤忓懎濯伴梻浣风串缁蹭粙鎯堝Δ鍛ㄩ柨鏃囨〃缁ㄥ鎮峰鍐伇婵炲棎鍨归～婵堟崉妤︽寧鎲版繝鐢靛仦閸垶宕归崷顓犱笉濠电姵纰嶉崑锝夋煣韫囨洘鍤€闁告柨顑夐弻锝嗘償閵堝骸娈銈庝簻閸熷瓨淇婇懜鍨劅闁炽儴灏欓惄搴ｇ磽閸屾瑨鍏岀紒顕呭灦瀹曟繂螖閸涱厾鐓戦梺鍛婁緱閸欏骸銆掓繝姘厪闁割偅绻冮崳鐣岀磼閻樺崬宓嗛柟顔筋殔椤繈姊荤€靛憡鏅兼繝纰樷偓鍐茬骇闁告梹鐟ラ悾閿嬬附缁嬪灝宓嗛梺缁樻煥瀵墎鈧艾銈稿缁樻媴閸涘﹤鏆堢紓浣割儐閸ㄥ潡寮崘顔嘉ㄩ柨鏇楀亾缂佸墎鍋ら弻娑㈠即閵娿儳浠梺缁樻尰濞叉﹢骞堥妸銉富閻犲洩寮撴竟鏇犵磽閸屾瑨鍏屽┑顔炬暬閹囧即閵忊€充患閻庣懓瀚竟瀣绩娴犲鍊甸柨婵嗙凹缁ㄨ偐鈧鎸哥粔鎾€旈崘顔嘉ч柛鈩兠弳妤佺節濞堝灝鏋ら柛蹇旓耿瀵偄顓奸崨顏呮杸闁诲函缍嗛崑鈧柟鐤缁辨挻鎷呴崜鎻掑壉闁诲海鐟抽崘鑳偓鍧楁煟濡も偓閻楀﹪宕ｈ箛鏂剧箚妞ゆ牗绮犻悞鎯р攽閳ョ偨鍋㈤柡宀嬬秮閳ワ箓骞嬪┑鍡╂骄缂傚倷娴囨ご鎼佸箲閸パ呮殾闁圭儤鍨熼弸搴ㄦ煙闁箑鏋旈柛瀣耿濮婄粯鎷呴搹骞库偓濠囨煛閸涱喚鐭掗柟顔ㄥ洤鍗抽柕蹇娾偓鍏呮偅婵犵數濞€濞佳囶敄閸涱垳涓嶉柣鐔稿櫞瑜版帗鏅查柛娑卞枟閸犳劙姊烘导娆戞偧闁稿簺鍊楅幑銏犫槈閵忕姷楠囬梺鐟扮摠缁诲啴宕愰鐐粹拺閻犲洠鈧磭浠╅梺娲诲幖閸婃悂顢氶敐澶樻晝闁挎繂娲ㄩ惁鍫ユ⒑閸涘﹥澶勯柛妯圭矙閺佸秷绠涘☉娆屾嫼闂佽崵鍠愬妯何ｆ繝姘厽妞ゆ挾鍋涢埀顒€鐏濋悾鐑筋敃閿旇姤鍎梺绋跨箰椤︻垱绂嶆ィ鍐╃厽闁归偊鍠楅崵鈧梺閫炲苯澧柣妤佹礋閳ユ棃宕橀钘夌檮婵犮垼鍩栬摫缂傚秴楠搁埞鎴︽倷閸欏鏋欐繛瀛樼矋缁诲牓骞冮悙瀵哥瘈婵﹩鍘鹃崢浠嬫⒑瑜版帒浜伴柛銊ゅ嵆閹锋洘绺介崨濠傗偓鍨叏濮楀棗骞楃紒璺哄级閵囧嫰顢橀垾鍐插Х濡炪伇鍌滅獢闁哄本鐩弫鎰疀閺囩姌婊堟倵濞堝灝鏋涙い顓犲厴瀵偊骞囬鐐电獮闁诲函缍嗛崑鍛存偟閹惰姤鈷掑ù锝呮啞閸熺偛銆掑顓ф疁鐎规洏鍨介獮瀣箳閺冣偓濡测偓闂傚倸鍊搁崐椋庣矆娴ｅ浜归柣鎰仛椤洘銇勯弮鈧崕宕囨閵堝悿褰掓偐瀹割喖鍓伴弶鈺傜箞濮婃椽宕烽鐐插闂佺硶鏅涢悧鍡涒€﹂崶顒€鐓涢柛娑卞枤閸樹粙姊虹憴鍕婵炲懏娲熼獮鎴︽晲閸氥倕缍婇幃鈺咁敃閿濆棛褰嬫繝娈垮枛閿曘儱顪冮挊澶屾殾妞ゆ劧绠戠粈瀣亜閹哄棗浜惧┑鐐叉啚閸曨厾鐦堝┑鐐茬墕閻忔繈寮搁悢鍏肩厵闁告稑锕ら埢鏇㈡煕閵娾晝鐣虹€殿噮鍣ｅ畷鐓庘攽閸偅袨濠碉紕鍋戦崐鏍蓟閵娿儙锝夊醇閿濆孩鈻岄梻浣告惈閺堫剟鎯勯鐐叉槬闁告洦鍨扮粈鍐煕閹炬鍟闂傚倸鍊风粈渚€骞夐敓鐘冲仭闁靛鍎欏☉妯锋斀闁糕檧鏅滅紞搴♀攽閻愬弶鈻曞ù婊勭矊椤斿繐鈹戦崱蹇旀杸闂佺粯锚瀵爼宕崇憴鍕╀簻闁靛濡囩粻鎾淬亜椤忓嫬鏆ｅ┑鈥崇埣瀹曞崬螖閸愌勬▕濠碉紕鍋戦崐褏鈧潧鐭傚畷褰掑醇閺囨ǚ鍋撴担鍓叉僵闁肩鐏氬▍婊勭節閵忥絾纭鹃柨鏇畵椤㈡瑩宕ㄧ€涙ǚ鎷洪梺鍏间航閸庡秹顢旈崺璺烘处鐎电厧顫㈤妶鍜佹Ц闁宠鍨归埀顒婄秵閸嬪棝宕㈤悽鍛娾拺缂備焦蓱鐏忣厽绻涚€电鍘存鐐搭殜閹晝绱掑Ο鐓庡箥缂傚倷绀侀鍡涱敄濞嗘挻鍋傞柤娴嬫杹閸嬫挸鈻撻崹顔界彯闂佸憡鎸鹃崰鏍х暦濞差亜鐒垫い鎺嶉檷娴滄粓鏌熼悜妯虹仴妞ゅ浚浜弻宥夋煥鐎ｎ亞鐟ㄩ梻鍥ь樀閺屻劌鈹戦崱娆忣杸濡炪倕绻掓繛鈧柟顔荤矙椤㈡稑鈽夊顓炲灡闂備礁鎼悮顐﹀礉瀹€鍕剁稏婵犻潧顑嗛崵瀣煟閵忋倖娑ф鐐搭殜濮婄粯绻濇惔鈥茬盎濠电偠顕滅粻鎾愁嚕婵犳艾惟闁宠桨妞掔槐鍫曟⒑閹呯闁告ɑ绮撳畷鎴﹀箻閺傘儲鐏侀梺鍓茬厛閸犳鎮樺鍡欑瘈闁汇垽娼ф禒婊堟煥閺囥劋绨婚柣锝呭槻鐓ゆい蹇撴噺濞呫垽姊虹紒妯曟垼銇愰崘顏嗙幓婵炴垶锕╁〒濠氭煏閸繃顥為柍閿嬪姍閺屾稒鎯旈姀鐘灆闂佺粯渚楅崳锝呯暦婵傜唯闁挎棁顫夌€氬ジ姊洪懡銈呅㈡繛璇х畳閵囨劙宕橀鐓庢優闁哄鐗冮弲婵堝閻ｅ备鍋撻獮鍨姎闁瑰啿绻樿棢闁靛繆鎳囬崑鎾舵喆閸曨剛顦ㄧ紓渚囧枛閻倿宕洪姀鈩冨劅闁靛鍎抽悿鈧俊鐐€栧ú鏍箠韫囨洜鐭堟い鎰堕檮閳锋垿鏌涘┑鍡楊伌婵″弶鎮傞弻锝呂旈埀顒勫疮閺夋埈鍤曟い鎺嶈兌閻熷綊鏌嶈閸撴瑩鎮鹃悜钘夌闁挎洍鍋撶紒鐘差煼閺屻倝骞栨担瑙勯敪闂佸搫顑呴崐鍨潖濞差亜宸濆┑鐘插暙椤︹晠姊洪崨濠冨鞍闁烩晩鍨靛Λ鐔兼⒑闂堟冻绱￠柛娑卞灲缁辨娊姊绘担渚劸闁哄牜鍓欓～婵嬪Ω閵壯勬噧闂傚倸鍊烽悞锔锯偓绗涘厾娲晜閻ｅ矈娲稿銈呯箰閹冲秶鎹㈤崱娑欏€垫繛鎴烆伆閹寸偛鍨旈悗闈涙憸绾惧吋銇勯弽銊р姇缂佲偓閸愨斂浜滄い鎰╁灮鏁堝┑顔硷攻濡炶棄螞閸愩劉妲堟慨妯夸含閺嗕即姊绘笟鈧埀顒傚仜閼活垱鏅堕鐐寸厸閻庯綆浜楅崑銏⑩偓瑙勬礃閸ㄥ潡鐛Ο鑲╃＜婵☆垵銆€閸嬫挻绻濆顓犲幘闂佽鍘界敮鎺楀礉閵堝鐓曟俊顖氬悑閺嗏晝绱掓潏銊﹀磳鐎规洘甯掗埢搴ㄥ箣濠靛棭鐎撮梻鍌欑劍鐎笛冾潩閵娧勵潟闁圭儤鍩堝〒濠氭煥閺囨浜惧┑鐐额嚋缁犳捇骞冮敓鐘茬妞ゅ繐鎳庨弸鎴濃攽閻樿宸ラ柣妤€妫涚划鍫ュ醇閵夛妇鍙嗛梺鍝勬川閸嬫盯鍩€椤掍焦鍊愰柟顖氳嫰铻栭柛娑卞枤閸橀亶姊洪柅娑樺祮婵炰匠鍥у嚑婵炴垶姘ㄧ壕濂告煟濡櫣锛嶅褔浜堕弻宥堫檨闁告挻鐩獮濠囧箻閸ㄦ稑浜炬慨姗嗗亜瀹撳棛鈧娲橀崹鍓佹崲濠靛鐐婇柕濞垮劙缁ㄧ敻姊绘笟鈧褔藝椤愶箑鐤炬繝濠傜墛閸嬪倿鏌￠崶鈺佹灁缂佺娀绠栭弻鐔衡偓娑欘焽缁犳捇鏌ょ粙鎸庤础闁逞屽墯椤旀牠宕抽敐鍥╀笉闁哄稁鍘奸拑鐔兼煥閻斿搫孝妤犵偑鍨介弻宥嗘姜閹殿噮妲紓渚囧亜缁夌懓顫忓ú顏勪紶闁告洦鍘鹃崝鍦磽閸屾氨小闁绘帪绠撻獮鍫ュΩ閳轰胶鍔﹀銈嗗笒鐎氼參鎮￠崘顔肩骇闁绘劖娼欓婊堟煕韫囨捁瀚伴棁澶愭煟濞嗗苯浜鹃梺鍛娒妶鎼佸灳閺冨牆绀冩い鏂挎瑜旈弻娑㈠箛閳轰礁顬堝銈庡墮閻楁挸顫忓ú顏勭閹兼番鍨归ˇ鈺傜箾鐎涙鐭ゅù婊庝邯楠炲啯瀵奸幖顓熸櫔闂侀€炲苯澧柣锝呭槻椤粓鍩€椤掑嫨鈧礁鈻庨幘鏉戞疅闂侀潧顧€鐎靛本绂掕濮婂宕掑▎鎺戝帯缂備緡鍣崹鍫曞极鐎ｎ喗鍊垫繛鍫濈仢濞呮﹢鏌涢幘璺烘瀾濞ｅ洤锕獮鏍ㄦ媴閸濄儱骞愰梻浣侯焾閺堫剛鍒掑畝鈧弫顔嘉旈崨顔规嫽婵炶揪绲介幉锟犲疮閻愮數纾奸悹鍥ㄥ絻閳ь剙顭烽崺鈧い鎺嶇閸ゎ剟鏌涢幘璺烘灈鐎规洘妞介崺鈧い鎺嶉檷娴滄粓鏌熼崫鍕棞濞存粍鍎抽—鍐Χ鎼粹€崇闂佹悶鍨洪悡锟犲箖妤ｅ啯鍊婚柦妯侯樈濞煎﹪姊洪棃娑氬閻庢稈鏅犲鎻掝煥閸啿鎷洪梺鍛婃尰瑜板啯绂嶉悙鐑樼厱闁绘棃鏀遍崑銉︻殽閻愯尙绠伴悡銈嗐亜韫囨挻鍣抽柟閿嬫そ濮婃椽宕ㄦ繝鍕ㄦ闂佹寧娲忛崕铏閹间礁绠ユい鏃囨閺嬫垿姊洪崫鍕垫Ц闁诲繑绻堝鎶芥倷閻㈢數锛滈梺绋挎湰濮樸劌鐡梻浣哥枃椤宕归崹顔炬殾濠靛倻顭堥～鍛亜椤愵偄鏋ら幖鏉戯躬濮婄粯鎷呴挊澶婃優婵犳鍠楀娆戝弲闂佹寧娲戦梽宥嗙瑜版帗鐓曢柟浼存涧閺嬫稒鎱ㄧ憴鍕弨闁哄被鍔岄埞鎴﹀幢閳哄倐褔鏌ｆ惔锝嗘毄濠电偐鍋撻梺鍝勭焿缂嶄礁顕ｉ鍕閹兼番鍨归弸鎴犵磽閸屾瑨鍏屽┑鐐╁亾缂備胶濮甸悧鐘差嚕鐠囨祴妲堥柕蹇曞Х閸旀挳姊虹粙璺ㄧ濠殿垼鍘界粋宥夘敂閸繄鐣哄┑顔姐仜閸嬫捇鏌涢埡瀣瘈鐎规洘锕㈤、鏃堝椽閸愵亞顢呴梻鍌氬€峰ù鍥敋閺嶎厼鍨傞幖娣灪婵挳姊婚埀顒勫箛椤掆偓閻忓﹪姊婚崒姘偓宄懊归崶顒夋晪闁哄稁鍘肩粣妤呮煛瀹ュ骸浜炵紒鈧繝鍌楁斀闁绘ɑ褰冮埀顒€顭峰鎶芥晝閸屾稓鍘靛銈嗙墱閸嬫稒绂嶉悧鍫滅箚闁艰壈娉涢崥鍦磼鏉堛劍灏伴柟宄版嚇瀹曨偊宕熼鐐电▏闂傚倷绀侀幉鈥趁哄澶婄柧婵炲棙鍨兼慨鍐测攽閻樺磭顣查柍閿嬪灴濮婂宕奸悢鍓佺箒濠碉紕瀚忛崨顖滐紲闂傚鍋掗崢楣冩儗濞嗘挻鐓欐い鏃€鏋婚懓璺ㄢ偓娈垮枛椤攱淇婇悜鑺ユ櫆闁诡垎鍐唶闂備浇顕ф鎼佸储濠婂牆纾婚柟鍓х帛閸婄敻鏌ㄥ┑鍡涱€楀褌鍗抽弻銊モ槈濮橆剚鐎剧紓浣虹帛缁嬫捇鍩€椤掑倹鏆╂い顓炵墦椤㈡捇骞橀崜浣猴紲闂佺粯顭堝▍鏇炵暦鐏炵虎娈介柣鎰絻閺嗘瑩鏌嶇拠鏌ュ弰妤犵偞鐟╁畷姗€鍩￠崒娑氬綅闂傚倸鍊烽懗鍫曗€﹂崼銏″仏妞ゆ劧绠戠壕褰掓煛瀹ュ啫濡芥繛鍛箻濮婂宕掑顑藉亾瀹勬噴褰掑炊椤掑鏅悷婊冪Ч閿濈偛鈹戠€ｎ偅娅囬梺绋跨焿婵″洨绮欒箛鏃傜瘈闁靛骏绲剧涵楣冩煃椤栨稒绀嬬€规洦鍋婂畷鐔兼偨闂堟稑姹查梻鍌欑婢瑰﹪宕戦崨顖涘床闁稿瞼鍋涚壕鑽も偓骞垮劚椤︿即宕戦埄鍐瘈濠电姴鍊搁顏呫亜閵夈儳澧㈤柍褜鍓濋～澶娒哄Ο渚富濞寸姴顑呯粻鏍ㄧ箾閸℃ɑ灏ù鑲╁█閺屾盯寮撮妸銉ュ闂佸憡鑹鹃幊妯侯潖缂佹ɑ濯撮柣鐔煎亰閸ゅ鈹戦悙鏉戠祷缂佸鎳撻悾鐑藉箣閿曗偓缁犲鏌熺喊鍗炲箺妞ゆ梹妫冨铏圭磼濡搫袝婵炲瓨绮嶇划鎾诲箖濮椻偓瀵濡烽敂鎯у箰闂佽绻掗崑鐔煎疾椤愩儱鈧挳姊绘担绛嬪殐闁哥姵娲熷畷锟犲箮閽樺鐎俊銈忕到閸燁偆绮堥崒鐐寸厱婵炴垵宕鐐繆椤愶絿鐭岀紒杈ㄦ崌瀹曟帒顫濋钘変壕闁归棿绀佺壕鍦偓鐟板閸ｇ銇愰幒鎴犲€為梺闈涱煭缁茶偐鍒掗幘缁樷拺鐟滅増甯楅敍鐔虹磼閳ь剚绗熼埀顒€鐣疯ぐ鎺戠＜闁绘劕顕崢楣冩⒑閸涘﹦缂氶柛搴㈢叀瀵娊鍩￠崨顔惧帗闂佽崵鍠愭竟鍡楃摥闂備礁鐤囬～澶愬垂閸ф绠栭柍鍝勬噹閻顭跨捄渚叕婵℃煡浜跺缁樻媴娓氼垳鍔搁梺鎸庢处娴滎亜顕ｉ妸鈺傜劶鐎广儱鎲橀敃鍌涚厱闁哄洢鍔岄弸銈夋煟閵堝倸浜鹃梻鍌欑濠€閬嶅磻閹捐绀堟慨姗嗗幘椤╃兘姊洪鈧粔鐢稿煕閹寸姷纾奸悗锝庡亽閸庛儵鏌涙惔銏犲闁哄瞼鍠栭弻鍛槈濮樿京宕查梺鑺ド戠换鍫ュ蓟閻旇櫣纾奸柕蹇曞У閻忓秹姊虹紒妯诲鞍闁荤啙鍥х劦妞ゆ帒鍊归崵鈧柣搴㈢煯閸楀啿鐣烽幋鐐电瘈闁搞儜鍜冪吹闂備礁鎼崯顐︽偋婵犲洦鍋傛繛鎴炩棨瑜版帗鏅查柛銉ｅ妼濞堝本绻濆▓鍨灈缂佸鐖奸崺鈧い鎺戝枤濞兼劖绻涢崣澶屽⒌闁诡喓鍎茬缓鐣岀矙閹稿孩袣闂備浇娉曢崰鎾存叏閹绢喗鍊块柛顭戝亖娴滄粓鏌熼悜妯虹仴闁逞屽墲瀹曠數鍒掓繝姘婵炲棗澧介崬鐢告⒑閸忓吋鍊愭繛浣冲嫭鍙忛柛顐犲劜閻撳啴姊洪崹顕呭剰闁诲繑鎸抽弻鐔碱敊閻撳孩些闂佸疇顕у锔剧不濞戙垹绠奸柛鎰屽嫬浜濈紓鍌氬€搁崐椋庢媼閺屻儱纾婚柟鍓х帛閻撴洟鏌熼懜顒€濡介柡澶婃惈闇夋繝濠傚閻帡鏌″畝瀣瘈鐎规洘鍎奸ˇ铏亜閵夛妇鐭嬬紒缁樼〒閹风姾顦叉い鈺婂墴閺屽秷顧侀柛鎾村哺閹虫繃銈ｉ崘銊х枃濠殿喗銇涢崑鎾垛偓娈垮枛椤兘寮幇顓炵窞濠电姴瀚澶愭⒒娴ｈ鍋犻柛搴灦瀹曟洟顢氶埀顒€鐣烽幋锕€绠婚悹鍥皺閸旓箑顪冮妶鍡楃瑨閻庢凹鍙冮幃锟犲即閵忊€斥偓鐢告煥濠靛棝顎楀ù婊勭箘閳ь剝顫夊ú鏍儗閸岀偛钃熼柨婵嗘噳濡插牓鏌涘Δ鍐ㄤ沪闁绘繃绻堥幃妤冩喆閸曨剛顦ョ紓鍌氱Т閿曨亪濡存担绯曟瀻闁圭偓娼欐禍妤呮煙閸忓吋鍎楅柛鐘愁殘缁辩偤骞樼紒妯锋嫽闂佺鏈懝楣冨焵椤掑倸鍘撮柟铏殜瀹曟粍鎷呯粙璺ㄤ喊婵＄偑鍊栭悧婊堝磻閹达箑鐒垫い鎺嗗亾闁哥喐娼欓悾鐑藉础閻愨晜鐎婚棅顐㈡处閹哥偓绂嶆导瀛樼厽閹肩补鈧啿杈呴梺绋款儐閹瑰洭寮诲☉銏犲嵆婵☆垰鎼敮闂備胶顭堥鍡涘箲閸パ屽殨濞寸姴顑呮儫閻熸粌绻橀幆渚€宕奸妷锔规嫼闂佺鍋愰崑娑㈠礉閹绢喗鐓熼煫鍥ㄦ⒒濞叉挳鏌涢埡瀣瘈鐎规洏鍔戦、娆撳箚瑜嶇粭姘舵⒒閸屾瑧顦﹂柟璇х磿閹广垽宕掑┃鎯т壕婵鍘ф晶鎾煕閳规儳浜炬俊鐐€栫敮鎺楀磹瑜版帒姹叉い鎺嶇贰濞堜粙鏌ｉ幇顖氱毢缂佺姳鍗抽幃锟犲Χ閸℃劒绨婚棅顐㈡处閹稿宕抽幎鑺ョ厵闂佸灝顑嗛妵婵囨叏婵犲啯銇濈€规洏鍔嶇换婵嬪礋閵婏富娼旈梻鍌欑劍鐎笛兠洪埡鍐笉闁规崘顕ч弰銉╂煏婢舵稓鐣辩紒鍓佸仱閺岀喖鏌囬敃鈧獮姗€鏌涘▎蹇旑棦婵﹥妞藉畷顐﹀礋椤掆偓椤︹晠姊洪幐搴″摵闁哄本鐩顒傛嫚濞村浜鹃柡鍥ュ灪缁犳帗绻濋悽闈浶㈤柨鏇樺€濆畷顖烆敍閻愯尙鏌堥梺缁樺姉閸庛倝宕愰棃娴㈠綊鏁愰崨顓熸婵炲瓨绮岀紞濠囧蓟瀹ュ牜妾ㄩ梺鍛婃尰濮樸劎鍒掑▎鎾崇婵＄偟鍎甸崑鎾绘晝閸屾氨鍊炲銈嗗坊閸嬫捇鏌涚仦璇插闂囧鏌ｅΟ鐑樷枙闁稿孩鍔欓弻宥夋煥鐎ｎ亞浼岄梺鍝勬湰閻╊垶鐛崶顒夋晢闁逞屽墰閻ヮ亣顦归柡宀€鍠栭、娑橆潩閸楃偐鍙洪梻浣告惈鐞氼偊宕濋幋婵愬殨闁哄鍤﹂悢鐑樺仒闁炽儱鍘栨竟鏇炩攽閻樼粯娑фい鎴濇噽缁寮介妸锕€寮垮┑锛勫仩椤曆勭妤ｅ啯鈷戦悹鍥ｂ偓铏亐闂佸搫鎳忕换鍕ｉ幇鏉跨闁瑰啿纾崰鏍箖閳╁啯鍎熼柨娑樺閸熷牓姊婚崒姘偓鎼佸磹閻戣姤鍊块柨鏃堟暜閸嬫挾绮☉妯诲櫤鐎规洘鐓￠弻娑樼暆閳ь剟宕戝☉姘变笉闁绘顕х粻鍦磼椤旂偓鍤€闁诲繑濞婇弻銊モ攽閸℃﹩妫ょ紓浣叉閸嬫挻绻濆▓鍨灍闁挎洍鏅犲畷銏＄鐎ｎ亜鎯炴繝銏ｅ煐閸旀牠鍩涢幋锔界厱婵犻潧妫楅顐︽煃鐠囧樊妯€闁哄本绋戣灒闁革富鍘鹃悡鎾绘⒑鐠団€虫珯缂佺粯绻傞悾宄邦潨閳ь剟銆侀弮鍫濆窛妞ゆ挾鍠撻埀顒傚亾缁绘繈鎮介棃娴躲垽鏌ㄩ弴妯衡偓婵嬪箖瑜斿畷鍗炩枎閹寸姷鍔堕梻浣稿閸嬩線宕曢弻銉﹀亗闁绘柨鍚嬮悡娑㈡煕鐏炵偓鐨戝ù鐘灲閺岀喖顢欓挊澶屼紝闂佸搫鐭夌换婵嗙暦閵娾晩鏁婇柟顖嗗啰鍝楅梻鍌欑閹碱偊鎯屾径宀€绀婂〒姘ｅ亾闁绘侗鍣ｅ畷鍫曨敆婢跺娅屽┑鐐舵彧缁茶棄顕ｉ崼鏇熷€堕柛鈩冪⊕閳锋帒霉閿濆牊顏犻悽顖涚洴閺岀喓绮欑捄銊ョ厽閻庤娲樺ú鐔煎箖閻ｅ瞼鐭欓柤鎰佸灡閹茬増绻濋悽闈涗沪闁割煈鍨跺畷娲礋椤栨碍鐎梺鍛婂姦閸犳鎮￠妷锔剧瘈闂傚牊绋掗ˉ鐐碘偓鐟版啞缁诲牓寮婚敐澶嬫櫜闁告侗鍋勬禒顔尖攽椤旂》鏀绘俊鐐舵閻ｇ兘濡搁敂鍓х槇闂佸憡鍔楅崑鎾凰夊☉姘辩＝闁稿本鐟ㄩ崗灞解攽椤旂偓鏆€规洖缍婂畷绋课旈埀顒勬倶閹惰姤鐓涢柛鎰╁妿婢ф洜绱掗埀顒勫礃閳瑰じ绨婚梺鍝勫€圭€笛囷綖瀹ュ洦鍠愰柡鍐ㄧ墕閽冪喐绻涢幋娆忕仼闁绘帗妞介弻娑㈠箛椤旈棿澹曢梺浼欑到閵堢顫忓ú顏呭殥闁靛牆鎳忛悗顓㈡⒑閸涘﹥鈷愰柛銊ョ仢椤曪絾绻濆顓熸珳闂佺硶鍓濋敋闁告柨鎳樺娲濞戞氨顔婃繝娈垮枟濞兼瑨顣鹃梺鍓插亖閸庢煡鍩涢幋锔界厱婵犻潧瀚崝姘跺冀閿熺姵鈷戠紓浣癸供濞堟ê鈹戦悙鈺佷壕婵°倗濮烽崑娑㈠疮椤栫偛围闁挎繂顦粈鍐煏婵炲灝鍔ら柍褜鍓﹂崢濂糕€旈崘顔嘉ч柛鈩冾殔椤洭姊虹粙鍖℃敾妞ゃ劌锕悰顔界節閸屾鏂€闁诲函缍嗛崑鈧柟閿嬫そ濮婄粯绗熼崶褌绨介梺绋款儐閻╊垶骞婇悢纰辨晬婵炴垶鐟﹂悵鐑芥煟鎼达絾鏆╃痪顓炵埣瀹曟垿骞橀弬銉︾亖闂佸壊鐓堥崰妤呮倶閺囩儐娓婚柕鍫濇閼茬娀鏌涢妷鎴濇噹瀵劌鈹戦悩顔肩伇闁糕晜鐗犲畷婵嬪即椤喚绋忛梺鍛婄☉閻°劑鎮￠悢闀愮箚妞ゆ牗鑹鹃幃鎴︽煛閸″繑娅婇柡灞稿墲瀵板嫮鈧綆鍋勯埀顒佸姈閹便劍绻濋崟顓炵闂佺懓鍢查幊妯虹暦椤愶箑唯闁挎棃鏁崑鎾活敊鐏忔牗鏂€闂佹枼鏅涢崯銊︾閻樼粯鐓曢柡鍌涘閹癸綁鏌涢幒鎾虫诞鐎规洖銈搁幃銏ゆ惞鐟欏嫬娈為梻鍌欑窔閳ь剛鍋涢懟顖涙櫠閹绢喗鐓曢柕濞炬櫇閻ｈ櫣鈧鍠曠划娆撱€侀弴銏″亜闁炬艾鍊搁ˉ姘舵⒒娴ｇ懓顕滅紒璇插€归〃銉╁箹娴ｇ鍤戦梺缁樻煥閸氬鎮￠崘顔解拺闁割煈鍣崕蹇涙煟韫囨梹灏﹂柡宀嬬磿娴狅箓宕滆濡插牓姊虹€圭媭娼愰柛銊ョ仢閻ｇ兘宕￠悙宥嗘⒐缁绘繃鎷呴悜姗堢础濠电姷顣槐鏇㈠磻閹达箑纾归柟杈剧畱绾惧潡鏌ょ喊鍗炲闁搞劍绻勯埀顒€绠嶉崕閬嵥囬娑辨敯闂傚倷绀侀幉鈥趁洪敃鍌氬瀭闁规鍠氭稉宥夋煥濠靛棙顥犵紒鈾€鍋撻梻浣稿閻撳牓宕戦崟顒佸弿闁割偁鍎查悡鍐偣閸ヮ亜鐨哄褝绠撻弻鐔碱敊缁涘鐣堕梺宕囩帛閹瑰洤鐣疯ぐ鎺濇晩闁伙絽濂旈柇顖氣攽閿涘嫬浜奸柛濞垮€濆畷銏°偅閸愩劎顦у┑顔姐仜閸嬫捇鏌ｅ☉鍗炴珝鐎规洘锕㈤、娆戝枈鏉堛劎绉遍梻鍌欑窔濞佳囨偋閸℃稑绠犻幖杈剧悼閻滅粯绻涢幋鐐垫噮缂佲檧鍋撻梻浣圭湽閸ㄨ棄顭囪閻☆參姊绘担渚劸妞ゆ垵鎳庤灋婵犻潧顑呴弰銉╂煃瑜滈崜姘跺Φ閸曨垰绠崇€广儱娲ゆ俊浠嬫倵鐟欏嫭绀€闁哄牜鍓熼獮鍫ュΩ閿斿墽鐦堥梺鍛婂姀閺傚倹绂掗姀銈嗗€甸悷娆忓绾炬悂鏌涢弬璺ㄐら柟骞垮灩閳规垹鈧綆浜為敍婊冣攽椤旂煫顏堝触鐎ｎ剛绀婇柛宀€鍋為埛鎺楁煕鐏炲墽鎳呮い锔肩畵閺岀喓鍠婇崡鐐板枈濡ょ姷鍋涢敃銊х不濞戙垹鍗抽柣鏂垮槻缁ㄣ儵姊绘担铏广€婇柛鎾寸箘缁瑩骞嬮悜鍡樻暞闂傚倸鍊风粈浣虹礊婵犲洤纾诲┑鐘叉搐閸ㄥ倿鏌ｉ幘鍐差唫闁绘梻鍘х粈瀣亜閹邦喖鏋戦柡鍌楀亾濠碉紕鍋戦崐鏍ь潖婵犳艾违閻庯綆鍊犲☉姗嗘僵妞ゆ挾濮烽鏇㈡⒑閸涘﹦鐭婇柛鐔稿缁棃顢欑粵瀣啍闂佺粯鍔樼亸娆戠不婵犳碍鐓欐い鏃囶潐濞呭洭鏌熸搴♀枅闁瑰磭濞€閹虫粓宕归銏℃瘒闂傚倸鍊搁崐椋庢濮橆剦鐒界憸鏃囨婵炲濮撮鍛玻濡ゅ懏鐓欓柣鎴烇供濞堟梻鐥幆褜鐓奸柡宀€鍠栭幃娆擃敆閸屾粎宓侀梻浣告惈閸熺娀宕戦幘缁樼厵鐎瑰嫮澧楅崵鍥┾偓瑙勬礃椤ㄥ﹤鐣烽锕€唯鐟滃酣寮查妸锔剧瘈缁炬澘顦辩壕鍧楁煕鐎ｎ偄鐏寸€规洘鍔欏浠嬵敇閻愭鍞跺┑掳鍊х徊浠嬪疮椤愩倕顥氱紓浣诡焽缁犻箖鏌熺€电鍓遍柣鎺撴倐閺屻劌鈹戦崱姗嗘￥缂備讲妾ч崑鎾寸節濞堝灝鏋熼柨鏇楁櫊瀹曘垺绂掔€ｎ亜鎯炴繝銏ｅ煐閸旀牠鍩涢幋鐘电＝濞达絽顫栭鍛弿濠㈣埖鍔栭悡鏇㈠箹鐎涙鈽夐柍褜鍓氱换鍫ョ嵁閸愵喗鏅搁柣妯诲絻瀹撳棝姊虹紒妯活梿婵炲拑缍侀、娆撳即閵忊檧鎷洪梺鑽ゅ枛閸嬪﹪宕甸悢鍏肩厱閻庯綆鍓欓弸娑欘殽閻愯韬€规洜鍠栭、娑樷槈濮橆剙绠為梻浣烘嚀閸氬鎮鹃鍫濇槬闁告洦鍋€閺嬫梹绻濇繝鍌滃闁绘挻鐩幃姗€鎮欏▓璺ㄥ姼婵犫拃鍕弨闁哄瞼鍠庨悾锟犳偋閸繃顏ょ紓鍌欑贰閸犳鎮烽埡鍛祦闁归偊鍘介崕鐔兼煏韫囧﹥娅呴柡鍜佷邯濮婂宕掑顑藉亾妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛鈧艾顦伴妵鍕箳閸℃ぞ澹曢梺缁樻尪閸婃牜鎹㈠┑瀣棃婵炴垶鑹鹃埅杈ㄧ箾閹寸偞灏紒澶屾暩閹广垹鈽夐姀鐘殿吅闂佺粯鍔曢悘姘跺闯椤斿墽纾藉ù锝呮惈閳诲牏绱掗悩宕囧⒌鐎殿喖顭烽幃銏㈠枈鏉堛劍娅栭梻浣虹《閸撴繈銆冮崨鏉戠劦妞ゆ帊鐒﹂崐鎰版寠閻斿憡鍙忔俊顖氱仢閻撴劙鏌嶉柨瀣瑨闂囧鏌ㄥ┑鍡樺櫤闁规彃鎽滅槐鎺撳緞鐏炶棄濡洪梺闈涙搐鐎氫即寮幇顖滅杸闁哄洨濮靛▓濂告⒒娴ｇ瓔鍤冮柛鐘冲哺瀹曟垿濡舵径濠冪€梺鍛婂姀閺呮粍鍒婇幘顔界厵缂備焦锚缁楁岸鏌涙繝鍌炲弰婵﹤顭峰畷鎺戭潩椤戣棄浜鹃柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鏁愭径濠勵吅闂佹寧绻傞幉娑㈠箻缂佹鍘遍梺闈涚墕閹冲酣顢旈銏＄厸閻忕偛澧藉ú瀛樸亜閵忊剝绀嬮柡浣瑰姍瀹曞崬鈻庡Ο鎭嶆氨绱撻崒姘偓鐑芥嚄閼稿灚鍙忛梺鍨儑缁犻箖鏌嶈閸撶喖寮婚垾宕囨殕闁逞屽墴瀹曚即寮借閺嗭附绻濇繝鍌涳紞婵℃煡绠栭弻锝夊閳轰胶浠梺鐑╂櫓閸ㄨ泛顕ｇ拠娴嬫婵炲棙鍔曢崝鍛存⒑閹稿海鈽夐悗姘嚀椤﹀綊鏌＄仦绯曞亾瀹曞洦娈曢柣搴秵閸撴稖鈪靛┑掳鍊楁慨鐑藉磻濞戙埄鏁勫鑸靛姇閺嬩線鏌熼悧鍫熺凡妤犵偑鍨介弻宥夊传閸曨偂绨藉┑鈽嗗亜鐎氭澘顫忔繝姘＜婵炲棙鍨垫俊浠嬫⒑濞茶绨荤紓宥咃工閻ｇ兘骞囬鈺傛瀹曘劑顢橀悪鍛耿闂傚倷娴囬～澶婄暦濮椻偓瀹曟椽寮借閺嗭箓鏌涘▎蹇ｆШ缂佲檧鍋撻梻鍌氬€搁悧濠勭矙閹烘埈鍟呮繝闈涚墢绾惧ジ鏌嶉柨顖氫壕闂佺顑嗛幑鍥ь潖缂佹ɑ濯村〒姘煎灣閸旀悂姊洪崫鍕⒈闁告挻绋撻崚鎺戔枎閹惧磭顓哄┑鐘绘涧閸燁垶鎮楅崫鍕ㄦ斀闁绘绮☉褎銇勯幋婵囶棦闁糕晜鐩獮瀣偐閻㈢绱查梺璇插嚱缂嶅棝宕戦幒妤€纾块柕澶嗘櫆閻撴洟骞栧ǎ顒€鐏╁┑顔肩Ч閺屸€崇暆閳ь剟宕伴弽顓炵畺闁绘垼濮ら崑瀣煕椤愩倕鏋戦柛濠勫厴濮婃椽骞戦幇顒€鎯為梺绋款儍閸婃繂顕ｇ拠娴嬫闁靛繒濮烽悿鈧梻浣哥枃濡椼劎绮堟担鍛婃殰婵犵數濮烽。浠嬪礈濠靛浜归柛鎰靛枟閸嬪鏌熼幑鎰靛殭闁藉啰鍠栭弻宥夊Ψ閵壯嶇礊闂佸搫妫庨崐鏍Φ閸曨垰绫嶉柛灞捐壘娴犳﹢姊洪柅鐐茶嫰婢ь垶鏌熼鐓庘偓鎼佹偩閻戣姤鍋￠柟浣冩珪閺傗偓闂佽鍑界紞鍡涘磻閳ь剟鏌熷畡閭︾吋婵﹨娅ｇ划娆撳箰鎼淬垺瀚抽梻浣藉吹閸犲棝宕濋幋婵堟殾婵°倐鍋撻柣锝嗙箞閸┾偓妞ゆ帒瀚崕澶嬨亜韫囨挾澧遍柡浣告喘閺岋綁骞囬悧鍫熼敪闂佺粯鎸鹃崰鏍箖濡も偓閳绘捇宕归鐣屽蒋闂備礁鎲￠幐璇差潩閵娧冨灊妞ゆ挶鍨洪崑鍕煟閹捐櫕鎹ｉ柛鏃撶畱椤啴濡堕崱妤€娼戦梺绋款儐閹瑰洭寮婚敐澶嬫櫜闁搞儜鍐ㄧ婵°倗濮烽崑娑㈩敄婢舵劕鏋侀柛鎰靛枛閻掑灚銇勯幒鎴濃偓缁樼▔瀹ュ應鏀介柣妯虹－椤ｆ煡鏌ｉ幘瀵告噧閾荤偛螞妫颁焦绁伴柛蹇撶焸閺屾盯寮捄銊愌囨煙椤旂瓔娈滄俊顐㈠暙閳藉顫濋崡鐐残熷┑鐘愁問閸犳牠鏁冮妷銉富闁芥ê锛夊☉銏犵闁靛鍨洪～宥呪攽椤旀枻渚涢柛鎿勭畵瀵娊顢曢敐鍥╃槇缂佸墽澧楄摫妞ゎ偄锕弻娑氣偓锝庝簼閸ゅ洭鏌曢崱妤€鏆ｇ€规洖銈告慨鈧柣妯垮皺娴滅増淇婇悙顏勨偓鏍箰閸洖鍨傞柛锔诲幘娑撳秹鏌ц箛锝呬簵缂佽妫濋弻鏇㈠醇濠靛棭浼€濡炪倧璁ｇ粻鎾诲蓟瀹ュ牜妾ㄩ梺鍛婃尰閻熲晠骞冨Ο渚僵閻犻缚娅ｉ悿鍕⒑闂堟侗鐒鹃柛搴㈢懇閹垽宕楅悡搴濈暗闂佺鍋愮悰銉╁焵椤掑啫鐨洪悽顖涚洴濮婅櫣鎷犻幓鎺濆妷濡炪倖姊归悧鐘茬暦閹剁瓔鏁嬮柍褜鍓欓悾鐑藉箮閼恒儲娅滄繝銏ｆ硾閿曘劑骞楅弴鐐╂斀闁绘劖娼欓悘鐔兼煕閵娿儳绉洪柟顔光偓鏂ユ闁靛骏绱曢崢閬嶆煟韫囨洖浠滃褌绮欓幆宀€鈧綆鍠楅悡鏇㈡煙閻戞ɑ灏甸柍钘夘樀閹藉爼寮介鐔哄幗濠殿喗銇涢崑鎾寸箾娴ｅ啿瀚々鐑芥煥閺囩偛鈧綊宕戦妸锔轰簻闁哄秲鍎遍埀顒侇殘瀵囧焵椤掑嫭鈷戠紓浣姑肩欢閬嶆煕閻樻剚娈橀柟骞垮灩閳规垹鈧綆浜為崐鐐差渻閵堝骸澧婚柛蹇旓耿瀵煡鎮╃拠鑼舵憰闂佸搫娲ㄩ崰鎾绘偟閼哥偣浜滈柡宥冨妿椤ｆ煡鏌涢悢鍓叉疁闁哄本娲樼换娑㈡倷椤掍胶褰嗛梻浣瑰▕閺€閬嶅垂閸噮鍤曢柛顐ｆ礃閸婄兘鏌℃径瀣劸婵☆偄妫濆娲川婵犲啰鍙嗙紓浣割槸缂嶅﹤顕ｇ拠娴嬫闁靛繒濮烽惈鍕⒑闁偛鑻晶鎾煙椤旀儳鍘村┑锛勫厴閸╋繝宕掑顐ｅ亝闂傚倸鍊风粈渚€鎮樺┑瀣垫晞闁搞儺鍓氶埛鏃堟煕閺囥劌鐏￠柣鎾存礋閺岀喖骞嗚閺嗚京绱掗悪娆忔处閻撴盯鏌涘☉鍗炴灓缂佺姷鍋為幈銊︾節閸愨斂浠㈠Δ鐘靛仦閸旀牠骞嗛弮鍫熸櫜闁搞儮鏅滃▓鐓庘攽閻樺灚鏆╅柛瀣洴閹洦瀵奸弶鎴狀槷閻庡厜鍋撻柛鏇ㄥ亝鏉堝牓姊洪崘鍙夋儓闁瑰啿绻橀崺娑㈠箳濡や胶鍘遍柣蹇曞仦瀹曟ɑ绔熷鈧弻宥堫檨闁告挻宀搁獮鍐磼濮樿鲸娈鹃梺瑙勫婢ф宕愭繝姘厾闁诡厽甯掗崝姘箾閸喎鐏存慨濠冩そ瀹曟粓骞撻幒宥囧嚬婵犵數鍋炶ぐ鍐矓瑜版帒鏄ラ柍褜鍓氶妵鍕箳閹搭垰濮涢梺浼欑悼閺佹悂鍩€椤掑喚娼愭繛鍙夌墵婵″爼宕ㄦ繝浣虹畾闂佺粯鍨归悺鏃堝极婵犲洦鐓犻柟顓熷笒閸旀粓鏌ｅ┑鍥舵疁婵﹤顭峰畷鎺戔枎閹存繂顬夐梻浣筋嚃閸犳牠鎮ラ悡搴ｆ殾闁哄洢鍩勯弫宥夋煟閹邦垰鐨烘い锔诲櫍閺岀喖鎳濋悧鍫濇锭缂備礁寮剁€笛呯矙婢跺鍚嬮柛娑樺€瑰Λ鍐极閹版澘宸濇い鎾跺枑椤斿姊绘担铏瑰笡闁瑰憡鎮傚畷顖涘閺夋垹鐤呯紓浣割儐椤戞瑩鎮￠妷鈺傜厱妞ゆ劧绲跨粻妯汇亜閿旇寮慨濠呮缁辨帒螣閻戔晜瀚介梻浣告啞椤棝宕堕妸銉у絽闂備胶绮弻銊╁触鐎ｎ喗鍋傞柕澶涘缁犻箖鏌熺€甸晲绱虫い蹇撶墱閺佸倻鎲告惔锝嗗床婵炴垶顭囬弳鍡椻攽閻樿京绐旈柛瀣殜濮婃椽宕崟顒佹嫳闂佺儵鏅╅崹鍫曟偘椤斿槈鐔告媴閺囩喐顥堥柛鈹惧亾濡炪倖甯掗崐鐢稿磻閹炬剚娼╅柣鎾抽閳峰鎮楃憴鍕缂傚秴锕濠氬幢濡ゅ﹤鎮戦梺绯曞墲閻熴儵鐛Δ鍛拺闁荤喐婢橀幃鎴︽煟閿濆簼閭€规洘妞藉畷鐔碱敍濮樿鲸鐒鹃梻濠庡亜濞诧妇绮欓幒妤佸亗闁哄洢鍨洪悡銉︾節闂堟稒顥㈡い搴㈩殕缁绘盯宕ㄩ鐘樸倝鏌嶈閸撴繈锝炴径濞掑搫螣閻撳骸鐏婇悗鍏夊亾闁告洦鍋嗛崣鈧┑鐘灱閸╂牠宕濋弴顫稏闁告稑鐡ㄩ悡鐔镐繆椤栨稒銇熼柛鐔风箻閺屾盯鎮欓懠顒傂ㄥ┑顔硷功缁垶骞忛崨鏉戝窛濠电姴鍊瑰▓妯荤節閻㈤潧浠╂い鏇熺矌缁骞樺畷鍥ㄦ閻熸粎澧楃敮妤呭磻鐎ｎ喗鐓曟い鎰剁悼缁犳挸鈹戦鍏煎殗婵﹦绮幏鍛存寠婢跺﹥鍎梻浣告憸婵敻宕濆Δ鍛闁圭儤鍩堥崥瀣煕閵夋垵鍟版禍浼存⒒娴ｇ瓔娼愰柛搴＄－婢规洟顢橀姀鐘宠緢闂佹寧鏌ㄩ～鏇熺濠婂牊鐓涚€广儱鍟俊鍏笺亜閵夛箑鍝洪柡灞剧〒閳ь剨缍嗛崑鍛暦瀹€鍕厸濞达絿鎳撴慨鍫ユ煙椤栨稒顥堥柛鈺佸瀹曟﹢顢旈崘鈺佹灓闂傚倸鍊搁崐鐑芥嚄閸撲礁鍨濇い鏍仜缁犳澘螖閿濆懎鏆欑紒鎰殜閺屸€愁吋鎼粹€崇閻庤鎸风欢姘跺蓟閳ユ剚鍚嬮幖杈剧导缁捇鏌熼崗鍏煎剹闁绘挸鐗撳顐﹀幢濞戞瑧鍘撻悷婊勭矒瀹曟粓鎮㈤悡搴㈡К闂侀€炲苯澧柕鍥у楠炲鎮欓幓鎺懶戦梻渚€鈧偛鑻晶顖涚箾閼碱剙鏋涢柛銊╃畺閺佸啴宕掑鍗炩偓鐐差渻閵堝棗鍧婇柛瀣尵缁辨帡鎮╁畷鍥ｅ闂侀潧娲ょ€氫即鐛Ο鍏煎磯闁烩晜甯囬崕鏌ュΦ閸曨垰绫嶉柍褜鍓欑叅闁绘柨顨庡鏍ㄧ箾瀹割喕绨荤€瑰憡绻傞埞鎴︽偐閹绘帩浠鹃梺闈╂€ラ崘鐐瘜闂侀潧娲︽晶搴ㄥ磻閹剧粯鐓曢悗锝庡亝瀹曞本鎱ㄦ繝鍐┿仢鐎规洘顨婇幃鈩冩償椤旂懓浜炬繝濠傚缁犳儳顭跨捄渚剱缂佲偓鐎ｎ喗鐓曢柍瑙勫劤娴滅偓淇婇悙顏勨偓鏍暜閹烘绐楁慨姗嗗墻閻掍粙鏌熼柇锕€骞樼紒鐘荤畺閺屾稑鈻庤箛锝喰ㄦ繝鈷€鍡曞惈缂佽鲸甯楀蹇涘煛娴ｉ攱鍕冪紓鍌欒兌缁垳鎹㈤崼婵堟殾闁圭儤鍩堥悡銉╂煕閺囥劌澧婚柛鐔锋捣缁辨捇宕掑顑藉亾妞嬪海鐭嗗〒姘ｅ亾妞ゃ垺鐗犲畷濂稿Ψ椤旇姤娅旈梻浣筋潐閸庣厧螞閸曨厾灏电€广儱顦伴悡鏇熴亜閹板墎鎮肩紒鐘成戦妵鍕晜閸濆嫬顫囧┑顔硷攻濡炶棄螞閸愵煁褰掑Χ閸℃瑢濮囬梺鐟板槻閹虫ê顫忚ぐ鎺戠疀妞ゆ帊鑳堕埀顒佸▕濮婂宕掑顑藉亾閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻锝夊箣閿濆憛鎾绘煕婵犲倹鍋ラ柡灞诲姂瀵挳鎮欏ù瀣壕闁告縿鍎虫稉宥夋煛瀹ュ骸骞楅柣鎾存礃閵囧嫰骞囬崜浣荷戠紓浣插亾闁逞屽墰缁辨帡宕滆娴滈箖鎮楃粭娑樻噺瀹曞弶绻涢幋鐑囦緵闁哥喎鎳忛妵鍕籍閸パ冩優闂佺儵鏅涘ù椋庢閹惧瓨濯撮柟缁樺笂婢规洟姊绘担绋款棌闁稿绶氬畷鏇㈠蓟閵夛箑浜楅梺闈涱槴閺呮粓鎮″☉銏＄厱闁靛鍨哄▍鍛归悩宕囩煉闁哄苯绉烽¨渚€鏌涢幘鏉戝摵妤犵偛鍟村畷鎺戭潩閻撳孩顓块梻浣告啞缁嬫垿鏁冮妷锕€鍨旈悗闈涙憸绾惧吋銇勯弽銊р姇缂佲偓閸愵喗鐓涢柛灞绢殔娴滈箖姊婚崒姘偓鐑芥嚄閸撲礁鍨濇い鏍ㄧ箖閹冲矂鏌ｉ悢鍝ョ煁婵犮垺锕㈠畷顖炲箻椤旇　鍋撴笟鈧顕€宕奸锝嗘珖闂備線娼ч悧鍡椕洪敃鍌涙櫖闊洦绋掗埛鎴︽偣閸ワ絺鍋撳畷鍥ｅ亾婵犳碍鐓曢柟鑸妽濞呭懘鏌嶈閸擄箓宕瑰畷鍥潟闁规儳鐡ㄦ刊鎾煣韫囨洘鍤€缂佹绻濆娲倻閳哄倹鐝﹂梺鎼炲妼閻栧ジ骞冩导鎼晩闂佹鍨版禍楣冩煥濠靛棝顎楅柡瀣枛閺屾稒绻濋崒銈囧悑闂佸搫鏈惄顖涗繆閻戠瓔鏁嶆慨妯哄悑閸犳﹢姊洪崫鍕垫Т闁哄懏绮岃灋闁告劦鐓堝鏍磽娴ｈ偂鎴炲垔閺夋垯鈧帒顫濋悡搴ｄ化闂佸憡姊归幃鍌炲蓟閿濆棙鍎熼柕蹇婃噰閺嬫棃姊洪崫鍕櫧濠殿喗鎸抽幃鎯х暋閹佃櫕鏂€闂佸摜濯崰妤€螞閸愩劎鏆︽慨妞诲亾闁糕斁鍓濈换婵嬪礃椤忓棌妫?${index + 1}" data-field="label" data-index="${index}" value="${time.label}" />
      <input aria-label="闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇川绾剧晫鈧箍鍎遍幏鎴︾叕椤掑倵鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝懐顦ч柣蹇撶箲閻楁鈧矮绮欏铏规嫚閺屻儱寮板┑鐐板尃閸曨厾褰炬繝鐢靛Т娴硷綁鏁愭径妯绘櫓闂佸憡鎸嗛崪鍐簥闂傚倷鑳剁划顖炲礉閿曞倸绀堟繛鍡樻尭缁€澶愭煏閸繃宸濈痪鍓ф櫕閳ь剙绠嶉崕閬嶅箯閹达妇鍙曟い鎺戝€甸崑鎾斥枔閸喗鐏堝銈庡幘閸忔﹢鐛崘顔碱潊闁靛牆鎳愰ˇ褔鏌ｈ箛鎾剁闁绘顨堥埀顒佺煯缁瑥顫忛搹瑙勫珰闁哄被鍎卞鏉库攽閻愭澘灏冮柛鏇ㄥ幘瑜扮偓绻濋悽闈浶㈠ù纭风秮閺佹劖寰勫Ο缁樻珦闂備礁鎲￠幐鍡涘椽閸愵亜绨ラ梻鍌氬€烽懗鍓佸垝椤栫偛绀夐柨鏇炲€哥粈鍫熺箾閸℃ɑ灏紒鈧径鎰厪闁割偅绻冨婵堢棯閸撗勬珪闁逞屽墮缁犲秹宕曢柆宥呯闁硅揪濡囬崣鏇熴亜閹烘垵鈧敻宕戦幘鏂ユ灁闁割煈鍠楅悘鍫濐渻閵堝骸骞橀柛蹇旓耿閻涱噣宕橀纰辨綂闂侀潧鐗嗛幊鎰八囪閺岋綀绠涢幘鍓侇唹闂佺粯顨嗛〃鍫ュ焵椤掍胶鐓紒顔界懃椤繘鎼圭憴鍕彴闂佸搫琚崕鍗烆嚕閺夊簱鏀介柣鎰緲鐏忓啴鏌涢弴銊ュ箻鐟滄壆鍋撶换婵嬫偨闂堟刀銏犆圭涵椋庣М闁轰焦鍔栧鍕熺紒妯荤彟闂傚倷绀侀幉锟犲箰閸℃稑妞介柛鎰典簻缁ㄣ儵姊婚崒姘偓宄懊归崶顒夋晪闁哄稁鍘奸崹鍌炲箹濞ｎ剙濡肩紒鈧崘顔界叆婵犻潧妫欓ˉ婊堟煟閿曞倷鎲炬慨濠傤煼瀹曟帒鈻庨幒鎴濆腐婵＄偑鍊戦崹褰掓晝閵堝鐓濈€广儱顦崡鎶芥煏韫囨洖啸妞ゆ柨顦靛娲箹閻愭彃濮堕梺鍛婃尰閻熲晠骞冨鈧獮搴ㄦ嚍閵壯冨箰闂備礁鎲￠崝鎴﹀礉鎼淬垺娅犻柡鍥╁Х绾惧ジ鏌嶈閸撶喎鐣峰鈧崺鐐村緞閸濄儳娉块梻鍌氼煬閸嬪嫬煤閵堝悿褰掓倻閸撳灝娲弫鍐焵椤掑嫭绠掓繝鐢靛Т閿曘倝鎮ц箛娑欏仼婵炲樊浜濋悡娑㈡倶閻愰鍤欏┑鈥炽偢閺屽秶鎲撮崟顐や紝閻庤娲栧畷顒勫煝鎼淬倗鐤€闁规儳顕Σ妤冪磽閸屾艾鈧悂宕愰悜鑺モ挃鐎广儱顦粈澶屸偓鍏夊亾闁告洦鍊犺閺岀喖姊荤€靛壊妲梺钘夊暟閸犳牠寮婚敐澶婃闁割煈鍠楅崐顖炴⒑缁嬪潡顎楅柣顓炲€垮璇测槈濡攱鏂€闂佸憡娲﹂崑鍕叏閵忋倖鍋犳慨妯哄⒔閻ｅ灚鎱ㄦ繝鍕笡闁瑰嘲鎳樺畷銊︾節閸愩劌澹嶉梻鍌欑劍濡炲潡宕㈡總鏉嗗洦娼忛埡鍌ゆ綗闂佺粯鍔曢顓㈡偡瑜版帗鐓冪憸婊堝礈閻旈晲绻嗛悗娑櫳戞刊鎾煕閹惧啿绾х€点倖妞藉娲焻閻愯尪瀚板褍鐡ㄩ〃銉╂倷閹绘帗娈梺瀹狀嚙闁帮綁鐛Ο铏规殾闁搞儴娉涢弲锝呪攽閿涘嫬浜奸柛濠冪墵楠炴劖銈ｉ崘銊╂７闂侀潧顦崕娆忊槈濠婂孩鈻屾繝娈垮枛閿曘倝鈥﹀畡鎵殾闁圭儤鍨熼弸搴ㄦ煙鐎电啸鐎规洖寮剁换婵嬫偨闂堟稐绮ч梺鍛婄墱婵炩偓鐎规洘顨婇幃娆擃敆閸屾顫嶉梻浣哥枃椤曆囨煀閿濆宓侀悗锝庡枟閸婄兘鎮楀☉娆欎緵闁哥偛鐖煎濠氬磼濞嗘埈妲┑鐘亾闂侇剙绉寸壕鍧楁煏閸繍妲堕柍褜鍓欓崯鎾嵁閸ヮ剦鏁婇柛鎾楀本笑闂傚倷绀侀幖顐ょ矓閺屻儱绀夐幖杈剧到婵剟鏌嶈閸撶喎顫忔繝姘＜婵ê宕·鈧┑鐐存尰绾板秹銆冩繝鍌滄殾闁哄洢鍨圭粻娑㈡煟濡も偓閻楀繘宕㈤幖浣光拺闁告稑锕ｇ欢閬嶆煕閻樺啿鍝虹€规洩缍侀崺鈧い鎺戝閳锋垿鏌涘┑鍡楊仾婵犫偓閹殿喚纾奸悗锝庡亜閻忔挳鏌涢埞鍨姕鐎垫澘瀚伴獮鍥敆閸屻倖鏁ら梻鍌欒兌缁垶宕濋弴鐐嶇喐绻濋崒銈囧姺缂傚倷鐒︾湁缂佽妫濋弻锝夊箛閸忓摜鐩庨梺閫炲苯澧柛銊ョ仢閻ｇ兘寮撮姀鐘烘憰闂侀潧顧€缁犳垵鈻撻悙缈犵箚闁靛牆绻掗崚浼存煕閻曚礁浜伴柟顔光偓鎰佹建闁逞屽墴瀵鎮㈢悰鈥充壕闁汇垺顔栭悞鎯归悩宕囩煂缂佽鲸甯￠幃鈺呮濞戞帗鐎版繝娈垮枛閿曘劌鈻嶉敐鍥у灊婵炲棙鎸哥粈宀勬煃閳轰礁鏆為柡鍡欏娣囧﹪鎮欓鍕ㄥ亾閹达箑绀夐悘鐐跺▏濞戞ǚ鏀介悗锝庡墮缁侊箓姊洪崜鎻掍簴闁稿氦椴搁崕顐︽⒒娴ｇ鏆遍柟纰卞亰瀹曟劙骞栨担鍝ュ姦濡炪倖宸婚崑鎾淬亜椤撶姴鍘寸€殿喖顭烽弫鍐焵椤掑啰浜藉┑鐐存尰閸戝綊宕规潏顭戞闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟鐑橆殕閸庡孩銇勯弽銊ュ毈婵炲吋鐗犻弻褑绠涢幘纾嬬缂佺偓鍎抽崥瀣┍婵犲浂鏁嶆慨姗嗗幗閸庢挸顪冮妶搴′簻闂佸府绲介～蹇涙惞閸︻厾鐓撻柣鐘充航閸斿秴危閳ь剟姊绘担渚劸闁挎洏鍎抽幑銏ゅ磼閻愭潙浠奸梺缁樺灱濡嫮绮婚敐澶嬬厽婵妫楁禍婊兠瑰鍫㈢暫闁哄被鍔岄埞鎴﹀幢濞戞墎鍋撳Δ鍛厸閻庯綆鍓欓弸娑㈡煛瀹€瀣М妤犵偞顭囬幑鍕倻濡皷鍋撻悙顒傜闁挎繂鎳忛幖鎰版煥閺囥劋閭柕鍡曠閳藉螣闁垮鏉搁梻浣虹《閸撴繈銆冮崱娑樼？妞ゅ繐鎳愮弧鈧梺姹囧灲濞佳嗏叴闂備胶顭堥鍡涘箰閹间焦绠掗梻浣虹帛閿氭俊顖氾躬瀹曟洟骞囬悧鍫㈠幗闂佽鍎抽崯鍧楀汲閻斿吋鐓欓柤纰卞墻閻掔偓銇勯婊冨鐎规洜鍘ч埞鎴﹀醇椤愶及婵嗏攽閻樺灚鏆╅柛瀣仱瀹曞綊宕滄担鍛婄€抽悗骞垮劚椤︿粙寮崘顔界厾闁诡厽甯掗崝婊堟煕濞嗗繒绠查柟渚垮妼铻栭柍褜鍓欒灋婵°倓鐒﹀▍鐘测攽閻樺磭顣查柣鎾存礋閺屾洟宕煎┑鍥舵！缂備讲鍋撻悗锝庡枟閻撴稓鈧厜鍋撻柍褜鍓熷畷浼村箻閼告娼熼梺鍦劋椤ㄥ懘锝為崨瀛樼厽婵☆垵娅ｉ敍宥吤瑰搴濈凹濞ｅ洤锕幃娆擃敂閸曘劌浜鹃柕鍫濐槸绾惧鏌涢弴銊ョ仩缂佺姷濮甸幈銊ヮ渻鐠囪弓澹曢柣搴㈩問閸犳盯顢氳椤㈡﹢宕楅悡搴ｇ獮婵犵數濮寸€氼剟鐛幇顑芥斀闁绘劘鍩栬ぐ褏绱掗煫顓犵煓妤犵偛顦甸崹楣冨棘閵夛妇浜栭梻浣告惈鐞氼偊宕曢弻銉ョ厱闁瑰濮风壕钘壝归敐鍫殐闁绘帞鏅槐鎺楁偐瀹曞洤鈷岄梺鍝勭焿缁插€熺亙闂佸憡鍔戦崜閬嶅鎺虫禍婊勩亜閹扳晛鐏紒鐘茬－缁辨帗娼忛妸銉х懆闁句紮缍侀弻銈吤圭€ｎ偅鐝曢梺鎼炲€曢惌鍌氼潖缂佹鐟归柍褜鍓熼崺鈧い鎺戝€告禒婊堟煠濞茶鐏￠柡鍛埣楠炴﹢顢欓悾灞藉箞闂備礁鐤囬～澶愬磿閾忣偆顩查柣鎰靛厸缁诲棝鏌ｉ幇鍏哥盎闁逞屽墯閻楁粓寮鈧獮鎺懳旈埀顒傚瑜版帗鐓曟繛鎴烇公閸旂喐銇勯埡鍛暠缂佺粯绻冪换婵嬪磼濠婂喚鏉搁梻浣虹帛閹哥偓鎱ㄩ悽鍨床婵炴垯鍨洪崵鎴澪涢悧鍫㈢畵婵炲牜鍙冨铏规嫚閺屻儳宕紓浣虹帛缁诲牆顕ｆ繝姘櫢闁绘ɑ褰冪粣娑橆渻閵堝棙灏靛┑顔芥尦閹繝鎮㈤懖鐑樻閹晠妫冨☉妤佸媰闂備焦瀵уú蹇涘垂娴犲违濞达絿纭堕弸搴ㄦ煙閻愵剚缍戝ù鐘层偢閺岋綀绠涢弴鐐板摋濠碘槅鍋勭€氼喚鍒掓繝姘ㄩ柕澶堝灪閺傗偓闂備焦瀵х粙鎴犫偓姘煎墯缁傚秵绺介崨濠勫幈婵犵數濮撮崯鐗堟櫠閻㈢鍋撳▓鍨灈妞ゎ參鏀辨穱濠囧箹娴ｅ摜鍘告繛杈剧到瑜般劑寮撮姀锛勫幗闁瑰吋鎯岄崹宕囩矓閻㈠憡鐓曢柣妯虹－婢у崬顭跨憴鍕缂佺粯绻傞～婵嬵敇閻樻彃濡囨繝鐢靛О閸ㄥジ宕洪弽顐ょ煓闁哄稁鍋嗛惌鍡涙倵閿濆簶鍋撻姀銏″殌妞ゎ厹鍔戝畷鐔碱敇閻橀潧甯ㄩ梻鍌欑閹碱偊寮甸鈧叅婵犻潧鐗忔稉宥嗙箾閹存瑥鐏╅崬顖炴偡濠婂啰绠婚柡浣哥Ч閹垽宕楃亸鏍ㄥ闂備浇宕甸崰鎰熆濮椻偓瀵娊鏌嗗鍡椻偓鍨叏濮楀棗浜滅€规挸妫涢埀顒侇問閸犳牠鈥﹂悜钘夌畺闁靛繈鍊曟导鐘绘煏婢诡垰瀚▓鐐烘⒒閸屾瑧顦﹀鐟帮躬閹繝宕奸妷銉х崶闂佸搫绋侀崣蹇曠礊閺嶎厽鐓曢柕澶樺枤娴犳粓鏌￠崘銊у闁稿鍔欏濠氬醇閻旇　妫╃紓渚囧枦濞夋盯鍩為幋锔藉€烽柛娆忣槴閺嬫瑩姊洪崨濠勬噧闁哥喎鐡ㄦ穱濠勨偓娑欘焽閻熷綊鏌嶈閸撴瑩顢氶敐澶樻晪闁逞屽墮閻ｇ兘鎮℃惔妯绘杸闂佺硶鍓濋崺鍐磻閹捐鍨傛い鏃囶潐閺傗偓闂備胶绮崝鏇烆嚕閸泙澶愭倷閻戞鍘遍梺鍝勫暊閸嬫捇鏌ｅΔ浣圭闁糕斂鍨归鍏煎緞婵犲嫷鍞烘繝寰锋澘鈧挾鎷嬮弻銉ョ濠电姵纰嶉埛鎴犵磼鐎ｎ偄顕滄繝鈧导瀛樼厾鐟滅増甯為悾娲煕閳规儳浜炬俊鐐€栫敮濠囨倿閿曞倸纾归柟閭﹀枓閸嬫挾鎲撮崟顒傤槰闂佸憡姊瑰ú鐔煎箖妤ｅ啯鏅搁柣妯垮皺閻ゅ洦绻濋悽闈浶㈤柛濠呭吹缁棃鎼归崗澶婁壕閻熸瑥瀚粈鈧梺缁樼墪閵堟悂濡存担鑲濇梹鎷呴搹鍦闂備礁鎲″ú锕傚储缁嬭娑㈠Ω閿斿墽鐦堥梺姹囧灲濞佳嗏叿闂備焦鎮堕崝搴ㄥ储瑜旈崺銏ゅ棘鎼存挻顫嶉梺鍐茬亪閺備線宕戦幘缁樻櫇闁稿被鍊栭弲銏ゆ⒑閸涘﹥澶勯柛鎾寸懄缁傚秴顭ㄩ崼鐔叉嫼缂備緡鍨卞ú鏍ㄦ櫠閺屻儲瀚呴梺顒€绉甸悡鏇熺箾閸℃绠崇紒鐘冲絻鑿愰柛銉戝秷鍚梺璇″枟閻燂箓鏁嶉幇顑芥斀闁糕剝锕╅崬鍙夌節閻㈤潧浠滈柣掳鍔庨崚鎺楀箻閸撲椒绗夐梺鍝勮癁鐏炲墽绋侀梻浣瑰劤缁绘锝炴径灞稿亾濮橆厼鍝洪柡灞界Ч婵＄兘濡搁敂鎯ф锭闂備浇顕х换瀣濮橆剦娼栭柧蹇撴贡閻瑩鏌熺粙鍨劉鐎规洘濞婂鐑樻姜閹殿噮妲銈庡幘閸忔﹢骞冩导鎼晪闁逞屽墮閻ｅ嘲顫滈埀顒勩€佸▎鎾村殐闁宠桨绀佽倴闂傚倸鍊风粈渚€骞夐敓鐘茬闊洦绋戦悿鐐箾閹存瑥鐏╃紒鈧径鎰厱婵炴垵宕鐐箾閹炬剚鐓奸柡灞炬礋瀹曠厧鈹戦崶鑸碉紒婵＄偑鍊戦崕閬嶆偋閹捐钃熼柍鈺佸暟閻熷綊鏌涢妷鎴濆瑜板酣鏌ｆ惔銈庢綈婵炲弶锕㈠畷褰掑锤濡ゅ啫绁﹀┑鈽嗗灥閸嬫劗澹曢崗闂寸箚妞ゆ牗绮岄崝瀣煟閵堝懎鈧灝顫忕紒妯诲闁惧繒鎳撶粭锟犳⒑閸涘﹥鈷愰柣鐔叉櫊瀹曟椽鍩€椤掍降浜滈柟鍝勭Х閸忓矂鏌曢崱妯烘诞闁哄矉缍侀崺鈩冪瑹閳ь剟宕ｉ崟顒佸弿濠电姴瀚敮娑㈡煙瀹勭増鍤囩€规洏鍔嶇换婵嬪礃閵娿儱顥掓繝鐢靛Х閺佹悂宕戦悩娲绘晪婵犲﹤鎳愭稉宥夋煙閹规劦鍤欐潻婵嬫⒑閸涘﹤濮﹂柛鐘崇墪椤斿繐鈹戦崶銉ょ盎闂佸搫鍟崐钘夘瀶閸涘﹦绠鹃柟缁樺笚閸熺偛菐閸パ嶈含濠碘剝鍎肩粻娑㈠即閻愯尙鍘掗梻鍌欑閹芥粓宕抽妷鈺佸瀭闁割偅娲栭弰銉︾箾閹存瑥鐏╃紒鐙呯秮閺屻劑寮崒娑欑彧闂佸憡锚瀹曨剟鍩為幋锔藉亹缂備焦蓱闁款厼鈹戦埥鍡椾簼妞ゃ劌锕妴渚€寮崼顐ｆ櫆闂佸憡渚楅崹鎶芥儊閸儲鈷戦梺顐ゅ仜閼活垱鏅剁€涙﹩娈介柣鎰皺鏁堝銈冨灪閻熲晛鐣峰鍡╂缂備浇椴搁悡鈥愁潖閾忚瀚氶柟缁樺笒濮ｆ劗绱撻崒姘毙㈡俊顐ｇ箓閻ｇ兘骞嬮敃鈧婵囥亜閹捐泛校婵炲牓绠栭幃妤呭礂婢跺﹣澹曢梻浣告啞濞诧箓宕滃☉銏犲偍闂侇剙绉甸埛鎴︽倵閸︻厼顎屾繛鍏煎姍閺屾稒鎯旈妶鍡欏涧缂備礁鍊哥粔褰掑箖濞嗘搩鏁勯悹鎭掑妿閻ｉ箖姊绘担铏瑰笡闁告棑闄勭粋宥咁煥閸繄鍔﹀銈嗗笂閼宠埖鏅堕柆宥嗙厸濞撴艾娲ゅ▍宥嗩殽閻愭潙绗掗摶鏍归敐鍫綈闁绘繃鐗犲缁樻媴閻熼偊鍤嬮梺鍝勮閸斿秹寮查懜鐢殿浄閻庯綆鍋勯崜褰掓⒑閻熸澘鈷旂紒顕呭灦閸╂盯骞掑Δ浣哄幈濡炪倖鍔戦崐鏇㈠几濞嗘挻鐓冪憸婊堝礂濞戞艾鍨濇繛鍡樻尭缁犳牠鏌ｉ幋锝呅撻柣鎺嶇矙閺屻劑寮埀顒勫磿閸愬樊鍤曢柟鎯板Г閳锋帒霉閿濆牊顏犻柕鍡楋躬閺屾盯骞樼€靛摜鐤勯梺鐐藉劵缁犳挸鐣烽崼鏇ㄦ晢闁逞屽墲缁绘岸姊绘担绛嬫綈濠㈢懓妫欓弲璺何旈崨顔间簵闂佹寧绻傞幃鑳亹閹烘垹顦ч梺鍏肩ゴ閺呮粓宕抽鍓х＝濞达絽澹婂Ο鍫ユ煕閿濆繒绉€殿喖顭烽弫宥夊礋椤忓懎濯伴梻浣风串缁蹭粙鎯堝Δ鍛ㄩ柨鏃囨〃缁ㄥ鎮峰鍐伇婵炲棎鍨归～婵堟崉妤︽寧鎲版繝鐢靛仦閸垶宕归崷顓犱笉濠电姵纰嶉崑锝夋煣韫囨洘鍤€闁告柨顑夐弻锝嗘償閵堝骸娈銈庝簻閸熷瓨淇婇懜鍨劅闁炽儴灏欓惄搴ｇ磽閸屾瑨鍏岀紒顕呭灦瀹曟繂螖閸涱厾鐓戦梺鍛婁緱閸欏骸銆掓繝姘厪闁割偅绻冮崳鐣岀磼閻樺崬宓嗛柟顔筋殔椤繈姊荤€靛憡鏅兼繝纰樷偓鍐茬骇闁告梹鐟ラ悾閿嬬附缁嬪灝宓嗛梺缁樻煥瀵墎鈧艾銈稿缁樻媴閸涘﹤鏆堢紓浣割儐閸ㄥ潡寮崘顔嘉ㄩ柨鏇楀亾缂佸墎鍋ら弻娑㈠即閵娿儳浠梺缁樻尰濞叉﹢骞堥妸銉富閻犲洩寮撴竟鏇犵磽閸屾瑨鍏屽┑顔炬暬閹囧即閵忊€充患閻庣懓瀚竟瀣绩娴犲鍊甸柨婵嗙凹缁ㄨ偐鈧鎸哥粔鎾€旈崘顔嘉ч柛鈩兠弳妤佺節濞堝灝鏋ら柛蹇旓耿瀵偄顓奸崨顏呮杸闁诲函缍嗛崑鈧柟鐤缁辨挻鎷呴崜鎻掑壉闁诲海鐟抽崘鑳偓鍧楁煟濡も偓閻楀﹪宕ｈ箛鏂剧箚妞ゆ牗绮犻悞鎯р攽閳ョ偨鍋㈤柡宀嬬秮閳ワ箓骞嬪┑鍡╂骄缂傚倷娴囨ご鎼佸箲閸パ呮殾闁圭儤鍨熼弸搴ㄦ煙闁箑鏋旈柛瀣耿濮婄粯鎷呴搹骞库偓濠囨煛閸涱喚鐭掗柟顔ㄥ洤鍗抽柕蹇娾偓鍏呮偅婵犵數濞€濞佳囶敄閸涱垳涓嶉柣鐔稿櫞瑜版帗鏅查柛娑卞枟閸犳劙姊烘导娆戞偧闁稿簺鍊楅幑銏犫槈閵忕姷楠囬梺鐟扮摠缁诲啴宕愰鐐粹拺閻犲洠鈧磭浠╅梺娲诲幖閸婃悂顢氶敐澶樻晝闁挎繂娲ㄩ惁鍫ユ⒑閸涘﹥澶勯柛妯圭矙閺佸秷绠涘☉娆屾嫼闂佽崵鍠愬妯何ｆ繝姘厽妞ゆ挾鍋涢埀顒€鐏濋悾鐑筋敃閿旇姤鍎梺绋跨箰椤︻垱绂嶆ィ鍐╃厽闁归偊鍠楅崵鈧梺閫炲苯澧柣妤佹礋閳ユ棃宕橀钘夌檮婵犮垼鍩栬摫缂傚秴楠搁埞鎴︽倷閸欏鏋欐繛瀛樼矋缁诲牓骞冮悙瀵哥瘈婵﹩鍘鹃崢浠嬫⒑瑜版帒浜伴柛銊ゅ嵆閹锋洘绺介崨濠傗偓鍨叏濮楀棗骞楃紒璺哄级閵囧嫰顢橀垾鍐插Х濡炪伇鍌滅獢闁哄本鐩弫鎰疀閺囩姌婊堟倵濞堝灝鏋涙い顓犲厴瀵偊骞囬鐐电獮闁诲函缍嗛崑鍛存偟閹惰姤鈷掑ù锝呮啞閸熺偛銆掑顓ф疁鐎规洏鍨介獮瀣箳閺冣偓濡测偓闂傚倸鍊搁崐椋庣矆娴ｅ浜归柣鎰仛椤洘銇勯弮鈧崕宕囨閵堝悿褰掓偐瀹割喖鍓伴弶鈺傜箞濮婃椽宕烽鐐插闂佺硶鏅涢悧鍡涒€﹂崶顒€鐓涢柛娑卞枤閸樹粙姊虹憴鍕婵炲懏娲熼獮鎴︽晲閸氥倕缍婇幃鈺咁敃閿濆棛褰嬫繝娈垮枛閿曘儱顪冮挊澶屾殾妞ゆ劧绠戠粈瀣亜閹哄棗浜惧┑鐐叉啚閸曨厾鐦堝┑鐐茬墕閻忔繈寮搁悢鍏肩厵闁告稑锕ら埢鏇㈡煕閵娾晝鐣虹€殿噮鍣ｅ畷鐓庘攽閸偅袨濠碉紕鍋戦崐鏍蓟閵娿儙锝夊醇閿濆孩鈻岄梻浣告惈閺堫剟鎯勯鐐叉槬闁告洦鍨扮粈鍐煕閹炬鍟闂傚倸鍊风粈渚€骞夐敓鐘冲仭闁靛鍎欏☉妯锋斀闁糕檧鏅滅紞搴♀攽閻愬弶鈻曞ù婊勭矊椤斿繐鈹戦崱蹇旀杸闂佺粯锚瀵爼宕崇憴鍕╀簻闁靛濡囩粻鎾淬亜椤忓嫬鏆ｅ┑鈥崇埣瀹曞崬螖閸愌勬▕濠碉紕鍋戦崐褏鈧潧鐭傚畷褰掑醇閺囨ǚ鍋撴担鍓叉僵闁肩鐏氬▍婊勭節閵忥絾纭鹃柨鏇畵椤㈡瑩宕ㄧ€涙ǚ鎷洪梺鍏间航閸庡秹顢旈崺璺烘处鐎电厧顫㈤妶鍜佹Ц闁宠鍨归埀顒婄秵閸嬪棝宕㈤悽鍛娾拺缂備焦蓱鐏忣厽绻涚€电鍘存鐐搭殜閹晝绱掑Ο鐓庡箥缂傚倷绀侀鍡涱敄濞嗘挻鍋傞柤娴嬫杹閸嬫挸鈻撻崹顔界彯闂佸憡鎸鹃崰鏍х暦濞差亜鐒垫い鎺嶉檷娴滄粓鏌熼悜妯虹仴妞ゅ浚浜弻宥夋煥鐎ｎ亞鐟ㄩ梻鍥ь樀閺屻劌鈹戦崱娆忣杸濡炪倕绻掓繛鈧柟顔荤矙椤㈡稑鈽夊顓炲灡闂備礁鎼悮顐﹀礉瀹€鍕剁稏婵犻潧顑嗛崵瀣煟閵忋倖娑ф鐐搭殜濮婄粯绻濇惔鈥茬盎濠电偠顕滅粻鎾愁嚕婵犳艾惟闁宠桨妞掔槐鍫曟⒑閹呯闁告ɑ绮撳畷鎴﹀箻閺傘儲鐏侀梺鍓茬厛閸犳鎮樺鍡欑瘈闁汇垽娼ф禒婊堟煥閺囥劋绨婚柣锝呭槻鐓ゆい蹇撴噺濞呫垽姊虹紒妯曟垼銇愰崘顏嗙幓婵炴垶锕╁〒濠氭煏閸繃顥為柍閿嬪姍閺屾稒鎯旈姀鐘灆闂佺粯渚楅崳锝呯暦婵傜唯闁挎棁顫夌€氬ジ姊洪懡銈呅㈡繛璇х畳閵囨劙宕橀鐓庢優闁哄鐗冮弲婵堝閻ｅ备鍋撻獮鍨姎闁瑰啿绻樿棢闁靛繆鎳囬崑鎾舵喆閸曨剛顦ㄧ紓渚囧枛閻倿宕洪姀鈩冨劅闁靛鍎抽悿鈧俊鐐€栧ú鏍箠韫囨洜鐭堟い鎰堕檮閳锋垿鏌涘┑鍡楊伌婵″弶鎮傞弻锝呂旈埀顒勫疮閺夋埈鍤曟い鎺嶈兌閻熷綊鏌嶈閸撴瑩鎮鹃悜钘夌闁挎洍鍋撶紒鐘差煼閺屻倝骞栨担瑙勯敪闂佸搫顑呴崐鍨潖濞差亜宸濆┑鐘插暙椤︹晠姊洪崨濠冨鞍闁烩晩鍨靛Λ鐔兼⒑闂堟冻绱￠柛娑卞灲缁辨娊姊绘担渚劸闁哄牜鍓欓～婵嬪Ω閵壯勬噧闂傚倸鍊烽悞锔锯偓绗涘厾娲晜閻ｅ矈娲稿銈呯箰閹冲秶鎹㈤崱娑欏€垫繛鎴烆伆閹寸偛鍨旈悗闈涙憸绾惧吋銇勯弽銊р姇缂佲偓閸愨斂浜滄い鎰╁灮鏁堝┑顔硷攻濡炶棄螞閸愩劉妲堟慨妯夸含閺嗕即姊绘笟鈧埀顒傚仜閼活垱鏅堕鐐寸厸閻庯綆浜楅崑銏⑩偓瑙勬礃閸ㄥ潡鐛Ο鑲╃＜婵☆垵銆€閸嬫挻绻濆顓犲幘闂佽鍘界敮鎺楀礉閵堝鐓曟俊顖氬悑閺嗏晝绱掓潏銊﹀磳鐎规洘甯掗埢搴ㄥ箣濠靛棭鐎撮梻鍌欑劍鐎笛冾潩閵娧勵潟闁圭儤鍩堝〒濠氭煥閺囨浜惧┑鐐额嚋缁犳捇骞冮敓鐘茬妞ゅ繐鎳庨弸鎴濃攽閻樿宸ラ柣妤€妫涚划鍫ュ醇閵夛妇鍙嗛梺鍝勬川閸嬫盯鍩€椤掍焦鍊愰柟顖氳嫰铻栭柛娑卞枤閸橀亶姊洪柅娑樺祮婵炰匠鍥у嚑婵炴垶姘ㄧ壕濂告煟濡櫣锛嶅褔浜堕弻宥堫檨闁告挻鐩獮濠囧箻閸ㄦ稑浜炬慨姗嗗亜瀹撳棛鈧娲橀崹鍓佹崲濠靛鐐婇柕濞垮劙缁ㄧ敻姊绘笟鈧褔藝椤愶箑鐤炬繝濠傜墛閸嬪倿鏌￠崶鈺佹灁缂佺娀绠栭弻鐔衡偓娑欘焽缁犳捇鏌ょ粙鎸庤础闁逞屽墯椤旀牠宕抽敐鍥╀笉闁哄稁鍘奸拑鐔兼煥閻斿搫孝妤犵偑鍨介弻宥嗘姜閹殿噮妲紓渚囧亜缁夌懓顫忓ú顏勪紶闁告洦鍘鹃崝鍦磽閸屾氨小闁绘帪绠撻獮鍫ュΩ閳轰胶鍔﹀銈嗗笒鐎氼參鎮￠崘顔肩骇闁绘劖娼欓婊堟煕韫囨捁瀚伴棁澶愭煟濞嗗苯浜鹃梺鍛娒妶鎼佸灳閺冨牆绀冩い鏂挎瑜旈弻娑㈠箛閳轰礁顬堝銈庡墮閻楁挸顫忓ú顏勭閹兼番鍨归ˇ鈺傜箾鐎涙鐭ゅù婊庝邯楠炲啯瀵奸幖顓熸櫔闂侀€炲苯澧柣锝呭槻椤粓鍩€椤掑嫨鈧礁鈻庨幘鏉戞疅闂侀潧顧€鐎靛本绂掕濮婂宕掑▎鎺戝帯缂備緡鍣崹鍫曞极鐎ｎ喗鍊垫繛鍫濈仢濞呮﹢鏌涢幘璺烘瀾濞ｅ洤锕獮鏍ㄦ媴閸濄儱骞愰梻浣侯焾閺堫剛鍒掑畝鈧弫顔嘉旈崨顔规嫽婵炶揪绲介幉锟犲疮閻愮數纾奸悹鍥ㄥ絻閳ь剙顭烽崺鈧い鎺嶇閸ゎ剟鏌涢幘璺烘灈鐎规洘妞介崺鈧い鎺嶉檷娴滄粓鏌熼崫鍕棞濞存粍鍎抽—鍐Χ鎼粹€崇闂佹悶鍨洪悡锟犲箖妤ｅ啯鍊婚柦妯侯樈濞煎﹪姊洪棃娑氬閻庢稈鏅犲鎻掝煥閸啿鎷洪梺鍛婃尰瑜板啯绂嶉悙鐑樼厱闁绘棃鏀遍崑銉︻殽閻愯尙绠伴悡銈嗐亜韫囨挻鍣抽柟閿嬫そ濮婃椽宕ㄦ繝鍕ㄦ闂佹寧娲忛崕铏閹间礁绠ユい鏃囨閺嬫垿姊洪崫鍕垫Ц闁诲繑绻堝鎶芥倷閻㈢數锛滈梺绋挎湰濮樸劌鐡梻浣哥枃椤宕归崹顔炬殾濠靛倻顭堥～鍛亜椤愵偄鏋ら幖鏉戯躬濮婄粯鎷呴挊澶婃優婵犳鍠楀娆戝弲闂佹寧娲戦梽宥嗙瑜版帗鐓曢柟浼存涧閺嬫稒鎱ㄧ憴鍕弨闁哄被鍔岄埞鎴﹀幢閳哄倐褔鏌ｆ惔锝嗘毄濠电偐鍋撻梺鍝勭焿缂嶄礁顕ｉ鍕閹兼番鍨归弸鎴犵磽閸屾瑨鍏屽┑鐐╁亾缂備胶濮甸悧鐘差嚕鐠囨祴妲堥柕蹇曞Х閸旀挳姊虹粙璺ㄧ濠殿垼鍘界粋宥夘敂閸繄鐣哄┑顔姐仜閸嬫捇鏌涢埡瀣瘈鐎规洘锕㈤、鏃堝椽閸愵亞顢呴梻鍌氬€峰ù鍥敋閺嶎厼鍨傞幖娣灪婵挳姊婚埀顒勫箛椤掆偓閻忓﹪姊婚崒姘偓宄懊归崶顒夋晪闁哄稁鍘肩粣妤呮煛瀹ュ骸浜炵紒鈧繝鍌楁斀闁绘ɑ褰冮埀顒€顭峰鎶芥晝閸屾稓鍘靛銈嗙墱閸嬫稒绂嶉悧鍫滅箚闁艰壈娉涢崥鍦磼鏉堛劍灏伴柟宄版嚇瀹曨偊宕熼鐐电▏闂傚倷绀侀幉鈥趁哄澶婄柧婵炲棙鍨兼慨鍐测攽閻樺磭顣查柍閿嬪灴濮婂宕奸悢鍓佺箒濠碉紕瀚忛崨顖滐紲闂傚鍋掗崢楣冩儗濞嗘挻鐓欐い鏃€鏋婚懓璺ㄢ偓娈垮枛椤攱淇婇悜鑺ユ櫆闁诡垎鍐唶闂備浇顕ф鎼佸储濠婂牆纾婚柟鍓х帛閸婄敻鏌ㄥ┑鍡涱€楀褌鍗抽弻銊モ槈濮橆剚鐎剧紓浣虹帛缁嬫捇鍩€椤掑倹鏆╂い顓炵墦椤㈡捇骞橀崜浣猴紲闂佺粯顭堝▍鏇炵暦鐏炵虎娈介柣鎰絻閺嗘瑩鏌嶇拠鏌ュ弰妤犵偞鐟╁畷姗€鍩￠崒娑氬綅闂傚倸鍊烽懗鍫曗€﹂崼銏″仏妞ゆ劧绠戠壕褰掓煛瀹ュ啫濡芥繛鍛箻濮婂宕掑顑藉亾瀹勬噴褰掑炊椤掑鏅悷婊冪Ч閿濈偛鈹戠€ｎ偅娅囬梺绋跨焿婵″洨绮欒箛鏃傜瘈闁靛骏绲剧涵楣冩煃椤栨稒绀嬬€规洦鍋婂畷鐔兼偨闂堟稑姹查梻鍌欑婢瑰﹪宕戦崨顖涘床闁稿瞼鍋涚壕鑽も偓骞垮劚椤︿即宕戦埄鍐瘈濠电姴鍊搁顏呫亜閵夈儳澧㈤柍褜鍓濋～澶娒哄Ο渚富濞寸姴顑呯粻鏍ㄧ箾閸℃ɑ灏ù鑲╁█閺屾盯寮撮妸銉ュ闂佸憡鑹鹃幊妯侯潖缂佹ɑ濯撮柣鐔煎亰閸ゅ鈹戦悙鏉戠祷缂佸鎳撻悾鐑藉箣閿曗偓缁犲鏌熺喊鍗炲箺妞ゆ梹妫冨铏圭磼濡搫袝婵炲瓨绮嶇划鎾诲箖濮椻偓瀵濡烽敂鎯у箰闂佽绻掗崑鐔煎疾椤愩儱鈧挳姊绘担绛嬪殐闁哥姵娲熷畷锟犲箮閽樺鐎俊銈忕到閸燁偆绮堥崒鐐寸厱婵炴垵宕鐐繆椤愶絿鐭岀紒杈ㄦ崌瀹曟帒顫濋钘変壕闁归棿绀佺壕鍦偓鐟板閸ｇ銇愰幒鎴犲€為梺闈涱煭缁茶偐鍒掗幘缁樷拺鐟滅増甯楅敍鐔虹磼閳ь剚绗熼埀顒€鐣疯ぐ鎺戠＜闁绘劕顕崢楣冩⒑閸涘﹦缂氶柛搴㈢叀瀵娊鍩￠崨顔惧帗闂佽崵鍠愭竟鍡楃摥闂備礁鐤囬～澶愬垂閸ф绠栭柍鍝勬噹閻顭跨捄渚叕婵℃煡浜跺缁樻媴娓氼垳鍔搁梺鎸庢处娴滎亜顕ｉ妸鈺傜劶鐎广儱鎲橀敃鍌涚厱闁哄洢鍔岄弸銈夋煟閵堝倸浜鹃梻鍌欑濠€閬嶅磻閹捐绀堟慨姗嗗幘椤╃兘姊洪鈧粔鐢稿煕閹寸姷纾奸悗锝庡亽閸庛儵鏌涙惔銏犲闁哄瞼鍠栭弻鍛槈濮樿京宕查梺鑺ド戠换鍫ュ蓟閻旇櫣纾奸柕蹇曞У閻忓秹姊虹紒妯诲鞍闁荤啙鍥х劦妞ゆ帒鍊归崵鈧柣搴㈢煯閸楀啿鐣烽幋鐐电瘈闁搞儜鍜冪吹闂備礁鎼崯顐︽偋婵犲洦鍋傛繛鎴炩棨瑜版帗鏅查柛銉ｅ妼濞堝本绻濆▓鍨灈缂佸鐖奸崺鈧い鎺戝枤濞兼劖绻涢崣澶屽⒌闁诡喓鍎茬缓鐣岀矙閹稿孩袣闂備浇娉曢崰鎾存叏閹绢喗鍊块柛顭戝亖娴滄粓鏌熼悜妯虹仴闁逞屽墲瀹曠數鍒掓繝姘婵炲棗澧介崬鐢告⒑閸忓吋鍊愭繛浣冲嫭鍙忛柛顐犲劜閻撳啴姊洪崹顕呭剰闁诲繑鎸抽弻鐔碱敊閻撳孩些闂佸疇顕у锔剧不濞戙垹绠奸柛鎰屽嫬浜濈紓鍌氬€搁崐椋庢媼閺屻儱纾婚柟鍓х帛閻撴洟鏌熼懜顒€濡介柡澶婃惈闇夋繝濠傚閻帡鏌″畝瀣瘈鐎规洘鍎奸ˇ铏亜閵夛妇鐭嬬紒缁樼〒閹风姾顦叉い鈺婂墴閺屽秷顧侀柛鎾村哺閹虫繃銈ｉ崘銊х枃濠殿喗銇涢崑鎾垛偓娈垮枛椤兘寮幇顓炵窞濠电姴瀚澶愭⒒娴ｈ鍋犻柛搴灦瀹曟洟顢氶埀顒€鐣烽幋锕€绠婚悹鍥皺閸旓箑顪冮妶鍡楃瑨閻庢凹鍙冮幃锟犲即閵忊€斥偓鐢告煥濠靛棝顎楀ù婊勭箘閳ь剝顫夊ú鏍儗閸岀偛钃熼柨婵嗘噳濡插牓鏌涘Δ鍐ㄤ沪闁绘繃绻堥幃妤冩喆閸曨剛顦ョ紓鍌氱Т閿曨亪濡存担绯曟瀻闁圭偓娼欐禍妤呮煙閸忓吋鍎楅柛鐘愁殘缁辩偤骞樼紒妯锋嫽闂佺鏈懝楣冨焵椤掑倸鍘撮柟铏殜瀹曟粍鎷呯粙璺ㄤ喊婵＄偑鍊栭悧婊堝磻閹达箑鐒垫い鎺嗗亾闁哥喐娼欓悾鐑藉础閻愨晜鐎婚棅顐㈡处閹哥偓绂嶆导瀛樼厽閹肩补鈧啿杈呴梺绋款儐閹瑰洭寮诲☉銏犲嵆婵☆垰鎼敮闂備胶顭堥鍡涘箲閸パ屽殨濞寸姴顑呮儫閻熸粌绻橀幆渚€宕奸妷锔规嫼闂佺鍋愰崑娑㈠礉閹绢喗鐓熼煫鍥ㄦ⒒濞叉挳鏌涢埡瀣瘈鐎规洏鍔戦、娆撳箚瑜嶇粭姘舵⒒閸屾瑧顦﹂柟璇х磿閹广垽宕掑┃鎯т壕婵鍘ф晶鎾煕閳规儳浜炬俊鐐€栫敮鎺楀磹瑜版帒姹叉い鎺嶇贰濞堜粙鏌ｉ幇顖氱毢缂佺姳鍗抽幃锟犲Χ閸℃劒绨婚棅顐㈡处閹稿宕抽幎鑺ョ厵闂佸灝顑嗛妵婵囨叏婵犲啯銇濈€规洏鍔嶇换婵嬪礋閵婏富娼旈梻鍌欑劍鐎笛兠洪埡鍐笉闁规崘顕ч弰銉╂煏婢舵稓鐣辩紒鍓佸仱閺岀喖鏌囬敃鈧獮姗€鏌涘▎蹇旑棦婵﹥妞藉畷顐﹀礋椤掆偓椤︹晠姊洪幐搴″摵闁哄本鐩顒傛嫚濞村浜鹃柡鍥ュ灪缁犳帗绻濋悽闈浶㈤柨鏇樺€濆畷顖烆敍閻愯尙鏌堥梺缁樺姉閸庛倝宕愰棃娴㈠綊鏁愰崨顓熸婵炲瓨绮岀紞濠囧蓟瀹ュ牜妾ㄩ梺鍛婃尰濮樸劎鍒掑▎鎾崇婵＄偟鍎甸崑鎾绘晝閸屾氨鍊炲銈嗗坊閸嬫捇鏌涚仦璇插闂囧鏌ｅΟ鐑樷枙闁稿孩鍔欓弻宥夋煥鐎ｎ亞浼岄梺鍝勬湰閻╊垶鐛崶顒夋晢闁逞屽墰閻ヮ亣顦归柡宀€鍠栭、娑橆潩閸楃偐鍙洪梻浣告惈鐞氼偊宕濋幋婵愬殨闁哄鍤﹂悢鐑樺仒闁炽儱鍘栨竟鏇炩攽閻樼粯娑фい鎴濇噽缁寮介妸锕€寮垮┑锛勫仩椤曆勭妤ｅ啯鈷戦悹鍥ｂ偓铏亐闂佸搫鎳忕换鍕ｉ幇鏉跨闁瑰啿纾崰鏍箖閳╁啯鍎熼柨娑樺閸熷牓姊婚崒姘偓鎼佸磹閻戣姤鍊块柨鏃堟暜閸嬫挾绮☉妯诲櫤鐎规洘鐓￠弻娑樼暆閳ь剟宕戝☉姘变笉闁绘顕х粻鍦磼椤旂偓鍤€闁诲繑濞婇弻銊モ攽閸℃﹩妫ょ紓浣叉閸嬫挻绻濆▓鍨灍闁挎洍鏅犲畷銏＄鐎ｎ亜鎯炴繝銏ｅ煐閸旀牠鍩涢幋锔界厱婵犻潧妫楅顐︽煃鐠囧樊妯€闁哄本绋戣灒闁革富鍘鹃悡鎾绘⒑鐠団€虫珯缂佺粯绻傞悾宄邦潨閳ь剟銆侀弮鍫濆窛妞ゆ挾鍠撻埀顒傚亾缁绘繈鎮介棃娴躲垽鏌ㄩ弴妯衡偓婵嬪箖瑜斿畷鍗炩枎閹寸姷鍔堕梻浣稿閸嬩線宕曢弻銉﹀亗闁绘柨鍚嬮悡娑㈡煕鐏炵偓鐨戝ù鐘灲閺岀喖顢欓挊澶屼紝闂佸搫鐭夌换婵嗙暦閵娾晩鏁婇柟顖嗗啰鍝楅梻鍌欑閹碱偊鎯屾径宀€绀婂〒姘ｅ亾闁绘侗鍣ｅ畷鍫曨敆婢跺娅屽┑鐐舵彧缁茶棄顕ｉ崼鏇熷€堕柛鈩冪⊕閳锋帒霉閿濆牊顏犻悽顖涚洴閺岀喓绮欑捄銊ョ厽閻庤娲樺ú鐔煎箖閻ｅ瞼鐭欓柤鎰佸灡閹茬増绻濋悽闈涗沪闁割煈鍨跺畷娲礋椤栨碍鐎梺鍛婂姦閸犳鎮￠妷锔剧瘈闂傚牊绋掗ˉ鐐碘偓鐟版啞缁诲牓寮婚敐澶嬫櫜闁告侗鍋勬禒顔尖攽椤旂》鏀绘俊鐐舵閻ｇ兘濡搁敂鍓х槇闂佸憡鍔楅崑鎾凰夊☉姘辩＝闁稿本鐟ㄩ崗灞解攽椤旂偓鏆€规洖缍婂畷绋课旈埀顒勬倶閹惰姤鐓涢柛鎰╁妿婢ф洜绱掗埀顒勫礃閳瑰じ绨婚梺鍝勫€圭€笛囷綖瀹ュ洦鍠愰柡鍐ㄧ墕閽冪喐绻涢幋娆忕仼闁绘帗妞介弻娑㈠箛椤旈棿澹曢梺浼欑秬濞夋盯鍩為幋锔藉€烽柟缁樺笚閸婎垶姊洪幖鐐插闁诲繑绻堥敐鐐剁疀濞戞瑦鍎梺闈╁瘜閸橀箖鎮￠幘鏂ユ斀闁绘劕寮堕ˉ鐐烘煕鎼淬垹鈻曠€规洘绮撻弻鍡楊吋閸″繑瀚奸梻渚€娼荤€靛矂宕ｆ惔銊﹀€块柣鎰靛厵娴滄粍銇勯幘鍗炵仾闁轰礁宕彁闁搞儜宥堝惈闂佽鍠氶弲顐ゅ垝濞嗘垶宕夋い顓熷灦鏁堟繝纰夌磿閸嬫垿宕愰弽顓熷亱婵°倕鎳忛崵宀勬煙椤栧棗鎳忓▓濂告⒑缁洖澧叉い銊ョ箰閵嗘帗绻濆顓犲帾闂佸壊鍋呯换鍐闯閻ｅ瞼纾奸柣姗€娼ч。鐓幥庨崶褝韬い銏℃礋閺佹劙宕堕崜浣风礃闂傚倷绀佸﹢閬嶆偤閺冨牆纾婚柛鈩冪懄椤洟鏌熼幑鎰靛殭缁炬儳鍚嬮幈銊ヮ潨閸℃骞嬮梺绋款儐閹瑰洭骞冨鍫熷殟闁靛鍎查悾閬嶆⒒娴ｅ憡鍟為柟鎼侇棑缁牊绗熼埀顒€鐣烽悷鎵虫斀闁搞儯鍎扮花濠氭⒑閸濆嫮袪闁告柨閰ｉ幆宀€鈧綆鍏橀崑鎾舵喆閸曨剛顦ㄩ梺缁樻惈缁绘繂顕ｇ拠娴嬫婵☆垰鍚嬪▓鏇㈡⒑闁偛鑻晶瀵糕偓瑙勬礃濞茬喖鐛€ｎ喗鍋愰柣銏☆問濡叉悂姊绘担鍛婃儓缂佸鐓″畷婵囨償閿濆懎袣闂侀€炲苯澧存慨濠傤煼瀹曟帒顫濋崡鐑嗘澑濠电偞鎸荤喊宥夈€冩繝鍌滄殾闁哄洨鍋愬Σ鍫ユ煏韫囥儳纾块柛妯烘啞缁绘稒娼忛崜褍鍩岄梺纭咁嚋缁绘繂鐣烽弶娆炬建闁逞屽墴瀵鍨惧畷鍥ㄦ畷闁诲函缍嗛崜娑溾叺闂佽瀛╅鏍闯椤曗偓瀹曟粓鎮㈤懖鈺佺ウ闂佸綊鍋婇崢浠嬪磿閻斿吋鐓忛煫鍥ㄦ礀鏍￠梺璇查叄缁犳牕顫忓ú顏呭殥闁靛牆鎳忛悗鍓х磽娓氬洤鏋涚紒澶嬫尦閳ワ箓宕归鍛缓闂侀€炲苯澧撮柣娑卞枟瀵板嫰骞囬鐔哥彨闂備礁鎲″ú锕傚礈濞嗘劖鍎熷┑鐘插€甸弨浠嬫煟濡偐甯涙繛鎳峰嫨浜滈柟瀛樼箖椤ャ垻鈧娲橀崹鎸庝繆閹间礁鐓涢柛灞绢殕鐎氫粙姊绘担绋款棌闁稿妫濆畷鐗堟償閵娿儱鐎繛鎾村焹閸嬫捇鏌″畝瀣М妤犵偛娲、娆撴偂鎼粹槅鐎遍梻鍌欒兌缁垶骞愮拠瑁佹椽鎮㈤悡搴ゆ憰闂佸搫娲ㄩ崰鎾剁不閸撗勫枑鐎广儱顦悿顔姐亜閹板墎鎮兼い鈺呮敱閹便劌顪冪拠韫婵犳鍠栭敃銈夊箹椤愶附鍋╅柣鎴ｆ閻愬﹪鏌嶆潪鎷屽厡妞ゆ劕銈稿缁樻媴閸涘﹥鍎撻柣鐐村嚬閸嬪﹤鐣峰┑瀣闁挎洍鍋撻柡鍕╁劦閺屾洘寰勫☉姘辨殸缂備礁澧庨崑銈夊蓟閻斿吋鐒介柨鏇楀亾濠⒀呯帛缁绘盯鎮℃惔顖濆惈濠殿喖锕ュ钘夌暦濮椻偓瀹曪絾寰勭€ｎ亜澹嶉梻鍌欒兌椤牓鏁冮敃鍌氱疇闁规崘顕ч悡婵堚偓骞垮劚椤︻垶鏌嬮崶顒佺厪濠㈣埖绋栭崥鍌炴煙妞嬪海甯涚紒缁樼⊕濞煎繘宕滆閸╁矂姊虹涵鍜佸殝缂佺粯绻傞悾鐑筋敍閻愭潙鈧兘鎮橀悙鎻掆偓鐢稿磻閹捐绠抽柟鎼幗閸嶉潧顪冮妶鍡樺瘷闁告洦鍘藉鎺楁⒑鐠囧弶鍞夋い顐㈩槸鐓ゆ俊顖欒閻斿棙鎱ㄥ璇蹭壕闂佹寧绻勯崑娑㈠煘閹寸姭鍋撻敐搴″鐟滄澘妫楅埞鎴︽倷鐎涙绋囧銈嗗灥閹冲繒绮嬪鍡愬亝闁告劏鏅濋崢鍗炩攽閻愭潙鐏﹂柣鐕傚缁辩偤骞嬮敂鐣屽幗濡炪倖鎸鹃崳銉モ枔閺冣偓閵囧嫰顢橀埄鍐€婇梺鍦嚀鐎氫即骞栬ぐ鎺戞嵍妞ゆ挻绻勭粈鍐⒒閸屾瑦顦风紒槌栧枤缁骞嬮敂钘変罕婵犵數濮寸€氼厼鐣烽崣澶岀瘈闂傚牊渚楅崕鎰版煕鐎ｃ劌濮傛慨濠傤煼瀹曞ジ鎮㈠畡鎵偓顒勬⒑闂堟稓绠為柛濠冪墵閹繝寮撮悙鈺傛杸闂佺粯蓱瑜板啴顢旈锔藉仺妞ゆ牗绋撳ú鎾煛瀹€瀣瘈鐎规洏鍔戦幃褔宕奸～顑藉亾閹扮増鈷戦悗鍦У椤ュ銇勯敃鈧悘姘跺箞閵娾晛鐒垫い鎺戝閻撱儲绻涢幋鐏活亪顢旈埡鍌ゆ闁绘劖鎯屽▓婊勬叏婵犲嫮甯涢柟宄版噽缁數鈧綆鍋嗙粔鐑芥煟鎼淬値娼愭繛鍙夛耿閺佸姊哄畷鍥╁笡闁哄被鍔戦崺銉﹀緞閹邦剦娼婇梺缁樕戣ぐ鍐ㄢ枔閵堝棛绡€闁汇垽娼ф禒锕傛煕椤垵鐏︾€规洜鎳撶叅妞ゅ繐鎳庢禍妤€鈹戦悙鏉戠仸闁糕晛鍟村畷鎴﹀箻鐠囪尙顦ф繝銏ｆ硾閿曪絾绔熼弴銏♀拺閻犲洦褰冮崵杈╃磽瀹ュ懏顥㈢€规洘绮岄埢搴ㄥ箻閾忣偅袣闁诲骸鍘滈崑鎾绘煕閺囥劌澧伴柛娆忓缁绘盯寮堕幋婵囧€梺鑽ゅ暀閸涱垳鐓嬪銈嗘磵閸嬫捇鏌″畝瀣？濞寸媴绠撳畷婊嗩槷婵℃彃鐗撳铏光偓鍦濞兼劙鏌涢妸銉т虎闁伙絿鍏樺畷锟犳倷瀹ュ棙鈷愮紒缁樼箖閹峰懘鎼归惂鍝ュ耿濠电姷鏁告慨鎾儉婢舵劕绾ч幖瀛樻尭娴滅偓淇婇妶鍕妽闁告瑥绻橀弻鈩冨緞鐎ｎ亝顔呭┑鐐叉▕娴滄粍鍎柣鐔哥矊闁帮綁鏁愰悙鍝勫嵆闁靛骏绱曢崢鐢告⒑鐠団€崇€婚柛娑卞枟閸犳牕鈹戦悩鎰佸晱闁搞劋鍗抽幃娲Ω閳轰胶鐤勯梺闈涱焾閸庮噣寮ㄦ禒瀣厱闁斥晛鍟虫竟妯汇亜韫囷絽骞栨い顏勫暣婵″爼宕ㄩ缁㈡炊闂備礁鎲￠敋闁靛牊鎮傚畷娲倷閸濆嫮顓洪梺鎸庢濡嫰鍩€椤掑倸鍘撮柡宀嬬秮楠炲洭顢楅埀顒傛暜閵娾晜鐓曢悗锝庡亝鐏忕敻鏌嶈閸撱劎绱為崱娑樼婵﹩鍓涢弳锕傛煕濞嗗浚妲虹紒鈾€鍋撻梻鍌氬€搁悧濠冪瑹濡ゅ懎纾块柟瀵稿Л閸嬫挾鎲撮崟顒€鐭紓浣藉煐瀹€绋款嚕鐠囨祴妲堥柕蹇曞Х閻も偓闂備礁鐤囧銊х矆娓氣偓钘熼悗锝庡枟閳锋垹绱撴担鑲℃垿鍩涢幒妤佺厱閹煎瓨绋戦埀顒佹礋閹箖鏌ㄧ€ｎ亞绐為梺褰掑亰閸橀箖宕㈤鍛瘈闁汇垽娼ч埀顒夊灦瀹曟﹢鈥﹂幋婊呮／缂傚倸鍊风欢姘堵烽崒鐐茬；濠电姴鍋嗗鏍р攽閻樺疇澹樼痪鎯у悑缁绘盯宕卞Ο铏瑰姼濠碘€虫▕閸ｏ絽顫忓ú顏勬嵍妞ゆ挻绋掔€氭盯姊虹粙娆惧剰闁挎洏鍊濋幃楣冩倻缁涘鏅梺缁樺灥濡瑩寮插┑瀣拺闁圭瀛╃壕鐢告煕鐎ｎ偅灏甸柣銉邯楠炲棜顦抽悹鎰剁節閺岀喖宕ｆ径瀣偓鎰版煙椤斻劌娲ら柋鍥ㄧ節闂堟稓澧㈤柟鍐叉濮婂宕掑顑藉亾閹间礁纾婚柛鈩冪☉閸ㄥ倸霉閻撳海鎽犵紒鐘冲浮濮婄粯鎷呴搹鐟扮闂佺懓鎽滈…鍫ユ箒闂佺粯鍨煎Λ鍕不濞差亝鐓熸俊顖濆亹鐢盯鏌ｉ幘瀛樼闁宠鍨块幃鈺呭箵閹烘繀鐥梻浣告惈濡參宕滈悢鐓庤摕闁绘梻鈷堥弫濠囨煟閹惧啿顒㈡禍娑㈡⒒娴ｅ摜鏋冩い鏇嗗喚娼╅柨鏂垮⒔娑撳秵绻涢幋娆忕仼缂佺姴銈搁弻娑㈠箛鐏炶姤鍣洪柨娑樼箳缁辨捇宕掑顑藉亾閹间礁纾瑰瀣婵ジ鏌＄仦璇插姎缁炬儳顭烽弻鐔煎礈瑜忕敮娑㈡煟閹惧瓨绀嬮柡宀€鍠栧鍫曞垂椤旇棄鈧海绱撴担闈涘闁哄拋鍋婇幆鈧い蹇撶墕缁犳氨鎲哥€ｎ喖纾婚柕蹇嬪€栭悡娆愩亜閺冨洤浜圭紒澶庢閳ь剝顫夊ú鏍偉婵傛悶鈧線寮崼婵堫槹濡炪倖鎸鹃崳銉╁吹閸曨剛绡€闁汇垽娼цⅴ闂佺懓鍢查崯顐︻敇婵傜妞藉ù锝囨嚀閺嬬娀姊婚崒娆戠獢闁逞屽墰閸嬫盯鎳熼娑欐珷妞ゆ牗绋忔禍婊堟煛閸愶絽浜鹃梺缁橆殘婵挳鎮鹃柨瀣嚤闁哄鍨甸崬銊ヮ渻閵堝棙灏扮紒瀣墦瀹曟垿骞樼紒妯绘珖闂佺鏈粙鎾诲矗閸℃稒鐓熼幖鎼灣瀹€娑㈡煛閸涱喚绠樼紒顔款嚙椤繈顢栭懞銉︽澑婵＄偑鍊栧濠氬疾椤愩倗涓嶉柟鍓х帛閻撶喐銇勯幘璺轰户濠⒀勬礋瀹曪繝鏌嗗鍡欏幗闂佺鎻徊鍊燁暱闂備焦濞婇弨閬嶅垂閸︻厽顫曢柟鐑樻煛閸嬫捇鏁愭惔鈥茶埅闂佺绨洪崕鐢稿蓟濞戞瑦鍎熼柕蹇曞Т椤帡姊洪崫鍕伇闁哥姵鐗犻獮鍐倻閼恒儱浜遍梺鍓插亝缁诲啴鎮樻惔銊︾厽閹兼番鍩勯崯蹇涙煕閿濆骸娅嶇€规洘鍨剁换婵嬪炊閳轰胶銈﹂梻浣规偠閸庢椽宕滈敃鍌氭瀬闁搞儺鍓氶悡鐔兼煛閸屾氨浠㈡俊鑼额嚙閳规垿鍩勯崘銊㈡灆濠殿喖锕︾划顖炲箯閸涙潙浼犻柛鏇ㄤ簽缁憋箓姊绘担渚劸閻庢稈鏅犻幃锟犲灳瀹曞洦娈惧┑鐘诧工閸犳艾顭囬埡鍌樹簻闁圭儤鍩堝Σ娲煕閺冨倸鍘存慨濠呮缁辨帒螣閸濆嫅鏇㈡⒑缁嬭法绠茬紒瀣崌楠炴垿濮€閵堝懎鑰垮┑鐐村灦閻熝囧储娴犲鈷戦悷娆忓缁舵煡鏌涘锝呬壕缂傚倷闄嶉崝宀勨€﹂悜钘夎摕鐎广儱鐗滃銊╂⒑閸涘﹥灏扮€光偓閹间礁绠栫憸鏂款嚕閹绢噯缍栨い鏂垮⒔閳笺倝姊绘繝搴′簻婵炶濡囩划娆撳箳濡も偓绾惧鏌ㄩ悢鍝勑ｉ柣鎾寸懇閺屾盯骞囬锝呮疂闂佽　鍋撶紓浣姑肩换鍡涙煟閹邦厼顥嬮柣顓熺懄椤ㄣ儵鎮欓幓鎺撴婵犳鍠掗崑鎾绘⒑闂堟稓澧曟俊顐ｎ殕缁傚秴螖閸涱喚鍘甸梺绋跨箺閸嬫劙寮冲鈧弻娑欑節閸愵亜鈷屽Δ鐘靛仜椤︽壆鈧絻鍋愰埀顒佺⊕鑿ら柟椋庣帛缁绘稒娼忛崜褎鍋ч梺纭呮珪閹瑰洭銆佸顒夌叆闁告侗鍨抽敍婊堟煟閻樺弶澶勭憸鏉垮暣閸┾偓妞ゆ帊鑳堕幗鍐煟韫囨搩鍎忛柍瑙勫灴閹瑩宕ｆ径妯伙紒闂備礁婀遍…鍫ュ箺濠婂嫮鐝堕柡鍥ュ灩闁裤倖淇婇妶鍕厡闁告ü绮欏娲传閸曨偀鍋撻幖浣瑰€舵繝闈涱儏缁犳牠鏌熸潏楣冩闁绘挾鍠栭弻鐔煎箚瑜忛敍宥囩磼閻樺樊鐓奸柡宀嬬秮楠炴瑩宕橀妸銈呮瀳闁诲氦顫夊ú姗€宕曟總鍢庛劑宕掗悙瀵稿幐闂侀€炲苯澧紒缁樼箓椤繈顢橀悩鎻掔疄闂傚倷鐒︾€笛呮崲閸屾娑樷枎閹寸儐鍋ㄩ梺鍝勮閸庢煡鎮￠崘顔藉仭婵炲棗绻愰鈺呮煟韫囨挾鎽犻柕鍥у婵偓闁挎稑瀚崳浼存倵鐟欏嫭绀冩い銊ワ工閻ｅ嘲螖閸涱厾顦ч梺缁樻尭缁ㄥ爼宕戦幘缁樼叆閻庯絺鏅濈粻姘舵⒑缂佹ê濮﹀ù婊勭矒閸┾偓妞ゆ垶鍎抽埀顒佺墱缁顓奸崪浣哄弳闂佸壊鍋呯换鍕蓟閸儲鐓熼幖娣灮閳洟鎯囨径宀€纾奸悹鍥у级椤ャ垽鏌＄仦璇测偓妤冨垝濞嗘垶宕夐柕濞垮€楁す鎶芥⒒娴ｄ警鐒炬繛瀵稿厴瀹曚即寮介鐐舵憰閻庡箍鍎遍ˇ顖氭暜闂備線娼ч敍蹇擃吋閸モ晩妲告繝纰夌磿閸嬫垿宕愰弽褜娼栫憸鐗堝笒缁€澶愭煛瀹ュ骸浜濈€规洖寮剁换婵嬫濞戝崬鍓遍梺绋款儍閸旀垵顫忔繝姘唶闁绘棁銆€濡晝绱撴笟鍥ф灕婵炲鐩崺鐐哄箣閿曗偓閻擄繝鏌涢埄鍐炬畼濞寸姭鏅犲娲箰鎼淬垹顦╂繛瀛樼矋缁捇骞冩ィ鍐╁€婚柤鎭掑劜濞呮粍绻濋姀锝嗙【闁挎洩绠撹棟闁靛鍎哄〒濠氭煏閸繃顥為柍閿嬪姍閺屾稒鎯旈敍鍕剁礊缂備緡鍠栭敃顏堝极閸愵喖纾兼繛鎴炲笚鐎氳偐绱撻崒娆戣窗闁搞劌宕叅闁哄秲鍔嶅▍鐘绘煕濞嗗浚妲跺ù婊勭矒閺屾洘绻涢崹顔煎Б婵犫拃宥咁洭闁逞屽墯椤旀牠宕板Δ浣虹濠电姴鍊婚弳锕傛煕濡ゅ啫浜规俊鎻掔墛缁绘盯宕卞Ο铏逛淮濡ょ姷鍋涢悧鎾愁潖缂佹ɑ濯撮柛娑橈攻閸庢挸鈹戦悙鑼勾闁搞劏妫勯悾宄扳攽閸℃瑦娈曢梺鍛婃处閸嬪棝宕濋敃鈧—鍐Χ閸℃鐟ㄩ梺绋匡攻閹倿鎮楅柨瀣╃箚闁绘劦浜滈埀顑懐涓嶉柟瀛樼箥閸ゆ洟鏌涢锝嗙濡楀懘姊洪崨濠冨闁搞劌銈稿顐﹀炊椤掍胶鍘撻梺瀹犳〃缁€渚€寮抽悢鍏肩厪闁糕剝顨愰煬顒佹叏婵犲啯銇濈€规洜鍏橀、姗€鎮㈤柨瀣殮闂備浇顕х€涒晠宕欒ぐ鎺戝偍闁告挆鍐ㄧ亰濡炪倖鎸堕崹娲磻閸曨厾妫柟宄扮焸閸濇椽鏌￠崪浣稿闁宠鍨块、娆撳棘閵堝嫮杩旈梻浣告啞閹稿鎮烽埡鍕紓闂備浇顫夋竟鍡樻櫠濡ゅ懎鐓曢柟鐑橆殕閻撴洟鎮橀悙鎻掆挃闁瑰啿鎳忛妵鍕晜閼测晝鏆ら梺鍝勭灱閸犳捇骞忛悩渚Ь缂備讲妾ч崑鎾绘⒒娴ｈ姤銆冪紒鈧笟鈧畷顖溾偓娑櫳戦崣蹇涙煃瑜滈崜鐔煎蓟閵娿儮妲堟俊顖欒娴煎苯鈹戦悙鎻掔骇闁诡喖鍊垮濠氭晲婢跺浜归梺缁樺灦鑿ч柍褜鍓欓崯鎾箖瑜版帒鐒垫い鎺戝閺呮繈鏌嶈閸撶喖鍨鹃敃鍌氱倞妞ゆ巻鍋撻柛鎰ㄥ亾闂備線娼ц噹闁告粈绀侀弲顓㈡⒑鐠囧弶鎹ｉ柟铏尰缁旂喐绻濋崶褏鐛ラ梺鍝勬川婵偓鎱ㄩ幎鑺ョ厱闊洦娲﹂崕鐘裁瑰鍕煉闁哄本娲樺鍕醇濠靛棗袘濠电姭鎷冮崟顓溾偓鎺旂磼鏉堛劌绗х紒杈ㄥ笒铻ｉ柛蹇曞帶閸ㄨ鲸淇婇妶鍥ラ柛瀣洴椤㈡牗寰勯幇顒佺€梺鍦濠㈡绮堢€ｎ偁浜滈柟鏉垮閸掍即鏌涢幘鑸垫毈婵﹤顭峰畷鎺戔枎閹搭厽袦闂備浇顫夌粊鎾焵椤掍礁澧繛鍏肩墱閹叉悂鎮ч崼婵堢懆缂備胶濮甸悧鐘诲蓟濞戞矮娌柟顖嗗啯鐦撴繝鐢靛仜閸氬鎮ч悩璇茶摕鐟滄垹绮诲☉銏犵缁炬儳顑囬、鍛存⒒娴ｈ銇熼柛妯圭矙閹兘鍩￠崨顓℃憰濠电偞鍨熼幊鍥焵椤掑﹦鐣垫鐐差儏閳规垿宕堕埡浣芥嫬闂傚倸鍊风粈渚€骞夐敓鐘茶摕闁靛ň鏁￠崶顒€绠ユい鏃囨鎼村﹤鈹戦悩缁樻锭妞ゆ垵妫濆畷鎴﹀Ω閳哄倵鎷婚梺鍓插亞閸犳捇鍩ｉ妷褏纾兼い鏃囧亹閸╋絾鎱ㄦ繝鍐┿仢妤犵偞鍔栭幆鏃堝椤喚鍠橀梻鍌欒兌椤牓鏁冮妷褎宕查柛顐犲劤瀹撲線鏌涢幇闈涙灈缂佺姵姘ㄩ幉姝岀疀濞戞ɑ杈堥柣搴秵閸犳鎮″▎鎾寸厱闁归偊鍨奸崵瀣煛閳ь剛绱掑Ο鍦畾闂佺粯鍔栨竟鍡涙儗濞嗘挻鐓忛柛鈩冩礈缁愭梻鈧鍣崳锝呯暦閻撳簶鏀介柛鈩冪懅瀹曞搫鈹戦敍鍕杭闁稿﹥鐗曢～蹇旂節濮橆剛鏌у銈嗗姂閸庮垱绂嶈ぐ鎺撶厵闂傚倸顕崝宥夋煃闁垮娴柡灞剧〒娴狅箓宕滆閸ｎ噣姊洪崨濠冪叆缂佸缍婂濠氭偄绾拌鲸鏅╅梺鍏肩ゴ閺呮盯鎮￠悢鍏煎€甸悷娆忓缁€鍐╃箾閼碱剙鏋涙鐐诧躬閺佹捇鎮╅崣鍌冨洦鐓曟繛鎴濆船閻忥綁鏌ｉ埄鍐胯€挎慨濠勭帛閹峰懐绮欓幐搴♀偓顖涚箾鐎涙鐭嗙紒顔界懃閻ｇ兘寮撮姀鐘殿唴婵犳鍠楅崝蹇涘磻?${index + 1}" data-field="day" data-index="${index}" type="number" value="${time.day}" />
    `;
    els.timeGrid.appendChild(wrap);
  });
}

function splitLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return [];
  if (trimmed.includes("\t")) return trimmed.split("\t").map((v) => v.trim());
  if (/[;,，；]/.test(trimmed)) return trimmed.split(/[;,，；]/).map((v) => v.trim());
  return trimmed.split(/\s+/).map((v) => v.trim());
}

function toNumber(token) {
  if (token == null) return null;
  const cleaned = String(token)
    .trim()
    .replace(/[闂?]/g, "")
    .replace(/,/g, "");
  if (!cleaned || /^[-+]?$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function findHeaderIndexes(header, timeCount) {
  const normalized = header.map((cell) => String(cell).replace(/\s/g, ""));
  const headerKeyword = String(getMetricConfig().headerKeyword || "").replace(/\s/g, "");
  const indexes = state.times.map((time) => {
    const label = String(time.label).replace(/\s/g, "");
    const aliases = [label, ...(time.aliases || [])].map((alias) => String(alias).replace(/\s/g, ""));
    return normalized.findIndex((cell) => {
      if (headerKeyword && !cell.includes(headerKeyword)) return false;
      return aliases.some((alias) => cell.includes(alias));
    });
  });
  return indexes.every((i) => i >= 0) && indexes.length === timeCount ? indexes : null;
}

function parseRawRows(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const timeCount = state.times.length;
  if (!lines.length) return { rows: [], skipped: 0 };

  const firstTokens = splitLine(lines[0]);
  const headerIndexes = findHeaderIndexes(firstTokens, timeCount);
  const dataLines = headerIndexes ? lines.slice(1) : lines;
  const rows = [];
  let skipped = 0;

  dataLines.forEach((line) => {
    const tokens = splitLine(line);
    let values;

    if (headerIndexes) {
      values = headerIndexes.map((i) => toNumber(tokens[i]));
    } else {
      const numericValues = tokens.map(toNumber).filter((value) => value !== null);
      values =
        numericValues.length >= 6
          ? LEGACY_SIX_POINT_INDEXES.map((i) => numericValues[i])
          : numericValues.slice(0, timeCount);
    }

    if (values.length === timeCount && values.every((value) => value !== null)) {
      rows.push(values);
    } else {
      skipped += 1;
    }
  });

  return { rows, skipped };
}

function mean(values) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function sd(values) {
  if (values.length < 2) return null;
  const m = mean(values);
  const variance = values.reduce((sum, value) => sum + (value - m) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

function sampleVariance(values) {
  if (values.length < 2) return null;
  const m = mean(values);
  return values.reduce((sum, value) => sum + (value - m) ** 2, 0) / (values.length - 1);
}

function logGamma(z) {
  const coefficients = [
    676.5203681218851,
    -1259.1392167224028,
    771.3234287776531,
    -176.6150291621406,
    12.507343278686905,
    -0.13857109526572012,
    9.984369578019572e-6,
    1.5056327351493116e-7,
  ];
  if (z < 0.5) {
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  let x = 0.9999999999998099;
  const adjusted = z - 1;
  for (let i = 0; i < coefficients.length; i += 1) {
    x += coefficients[i] / (adjusted + i + 1);
  }
  const t = adjusted + coefficients.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (adjusted + 0.5) * Math.log(t) - t + Math.log(x);
}

function betaContinuedFraction(a, b, x) {
  const maxIterations = 120;
  const epsilon = 3e-10;
  const fpmin = 1e-30;
  let qab = a + b;
  let qap = a + 1;
  let qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < fpmin) d = fpmin;
  d = 1 / d;
  let h = d;

  for (let m = 1; m <= maxIterations; m += 1) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin) d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) c = fpmin;
    d = 1 / d;
    h *= d * c;

    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin) d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) c = fpmin;
    d = 1 / d;
    const delta = d * c;
    h *= delta;
    if (Math.abs(delta - 1) < epsilon) break;
  }

  return h;
}

function regularizedBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  if (x < (a + 1) / (a + b + 2)) {
    return (bt * betaContinuedFraction(a, b, x)) / a;
  }
  return 1 - (bt * betaContinuedFraction(b, a, 1 - x)) / b;
}

function studentTCdf(t, df) {
  if (!Number.isFinite(t) || !Number.isFinite(df) || df <= 0) return null;
  const x = df / (df + t * t);
  const ib = regularizedBeta(x, df / 2, 0.5);
  return t >= 0 ? 1 - 0.5 * ib : 0.5 * ib;
}

function welchPValue(a, b) {
  const valuesA = a.filter(Number.isFinite);
  const valuesB = b.filter(Number.isFinite);
  if (valuesA.length < 2 || valuesB.length < 2) return null;
  const meanA = mean(valuesA);
  const meanB = mean(valuesB);
  const varianceA = sampleVariance(valuesA);
  const varianceB = sampleVariance(valuesB);
  const termA = varianceA / valuesA.length;
  const termB = varianceB / valuesB.length;
  const se = Math.sqrt(termA + termB);
  if (!Number.isFinite(se) || se === 0) return meanA === meanB ? 1 : 0;
  const numerator = (termA + termB) ** 2;
  const denominator =
    (termA ** 2) / Math.max(1, valuesA.length - 1) + (termB ** 2) / Math.max(1, valuesB.length - 1);
  const df = numerator / denominator;
  const t = Math.abs(meanA - meanB) / se;
  const cdf = studentTCdf(t, df);
  return cdf == null ? null : Math.max(0, Math.min(1, 2 * (1 - cdf)));
}

function calculateStats() {
  return state.times.map((time, index) => {
    const exp = state.expRows.map((row) => row[index]).filter(Number.isFinite);
    const ctrl = state.ctrlRows.map((row) => row[index]).filter(Number.isFinite);
    return {
      time,
      exp: { n: exp.length, mean: mean(exp), sd: sd(exp), values: exp },
      ctrl: { n: ctrl.length, mean: mean(ctrl), sd: sd(ctrl), values: ctrl },
    };
  });
}

function semFromStats(row) {
  return Number.isFinite(row.sd) && row.n > 0 ? row.sd / Math.sqrt(row.n) : null;
}

function errorFromStats(row, style) {
  if (!row || !Number.isFinite(row.sd)) return null;
  if (style.errorType === "sem") return semFromStats(row);
  if (style.errorType === "ci") {
    const semValue = semFromStats(row);
    return Number.isFinite(semValue) ? semValue * 1.96 : null;
  }
  return row.sd;
}

function errorLabel(style) {
  if (style.errorType === "sem") return "SEM";
  if (style.errorType === "ci") return "95% CI";
  return "SD";
}

function baselineMean(key) {
  const first = state.stats[0]?.[key]?.mean;
  return Number.isFinite(first) && first !== 0 ? first : null;
}

function transformValue(value, key, style) {
  if (!Number.isFinite(value)) return null;
  const base = baselineMean(key);
  return style.normalize && base ? (value / base) * 100 : value;
}

function transformError(value, key, style) {
  if (!Number.isFinite(value)) return null;
  const base = baselineMean(key);
  return style.normalize && base ? (value / base) * 100 : value;
}

function seriesStyle(key, style) {
  const isExp = key === "exp";
  return {
    label: isExp ? "PRP+BTX-A" : "PRP",
    visible: isExp ? style.showExp : style.showCtrl,
    color: isExp ? style.expColor : style.ctrlColor,
    lineStyle: isExp ? style.expLineStyle : style.ctrlLineStyle,
    lineWidth: isExp ? style.expLineWidth : style.ctrlLineWidth,
    markerStyle: isExp ? style.expMarkerStyle : style.ctrlMarkerStyle,
    markerSize: isExp ? style.expMarkerSize : style.ctrlMarkerSize,
    errorColor: isExp ? style.expErrorColor : style.ctrlErrorColor,
    errorWidth: isExp ? style.expErrorWidth : style.ctrlErrorWidth,
    errorCap: isExp ? style.expErrorCap : style.ctrlErrorCap,
  };
}

function getSeriesRows(key, style) {
  return state.stats
    .map((row) => {
      const group = row[key];
      const err = errorFromStats(group, style);
      return {
        time: row.time,
        n: group.n,
        rawMean: group.mean,
        mean: transformValue(group.mean, key, style),
        error: transformError(err, key, style),
        values: group.values.map((value) => transformValue(value, key, style)).filter(Number.isFinite),
      };
    })
    .filter((row) => Number.isFinite(row.mean));
}

function getDisplayStats(style = getActiveStyle()) {
  const expRows = getSeriesRows("exp", style);
  const ctrlRows = getSeriesRows("ctrl", style);
  return state.times.map((time, index) => {
    const exp = expRows.find((row) => row.time === time);
    const ctrl = ctrlRows.find((row) => row.time === time);
    const diff = exp && ctrl ? exp.mean - ctrl.mean : null;
    const improvement = exp && ctrl && Number.isFinite(ctrl.mean) && ctrl.mean !== 0 ? (diff / ctrl.mean) * 100 : null;
    return { time, index, exp, ctrl, diff, improvement };
  });
}

function getMaxImprovement(style = getActiveStyle()) {
  return getDisplayStats(style)
    .filter((row) => Number.isFinite(row.diff))
    .sort((a, b) => b.diff - a.diff)[0] || null;
}

function formatNumber(value, digits = 1) {
  return value == null || !Number.isFinite(value) ? "-" : value.toFixed(digits);
}

function clampNumber(value, fallback, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function readText(el, fallback = "") {
  return el ? el.value.trim() : fallback;
}

function readValue(el, fallback) {
  return el ? el.value : fallback;
}

function readChecked(el, fallback = false) {
  return el ? el.checked : fallback;
}

function setInputValue(el, value) {
  if (el) el.value = value;
}

function setInputChecked(el, value) {
  if (el) el.checked = Boolean(value);
}

function getActiveStyle() {
  return state.activeChart === "bar" ? state.barStyle : state.chartStyle;
}

function setActiveStyle(style) {
  if (state.activeChart === "bar") state.barStyle = style;
  else state.chartStyle = style;
}

function getActiveDefaultStyle() {
  return state.activeChart === "bar" ? DEFAULT_BAR_STYLE : DEFAULT_CHART_STYLE;
}

function getActiveLayoutControls() {
  return state.activeChart === "bar"
    ? barEls
    : {
        titleXInput: els.titleXInput,
        titleYInput: els.titleYInput,
        xAxisTitleXInput: els.xAxisTitleXInput,
        xAxisTitleYInput: els.xAxisTitleYInput,
        yAxisTitleXInput: els.yAxisTitleXInput,
        yAxisTitleYInput: els.yAxisTitleYInput,
        legendXInput: els.legendXInput,
        legendYInput: els.legendYInput,
        legendPositionInput: els.legendPositionInput,
      };
}

function persistActiveView() {
  if (state.activeChart === "bar") state.barView = state.view;
  else state.lineView = state.view;
}

function readChartStyleControls() {
  return {
    chartTitle: readText(els.chartTitleInput),
    xAxisTitle: readText(els.xAxisTitleInput),
    yAxisTitle: readText(els.yAxisTitleInput),
    titleSize: clampNumber(readValue(els.titleSizeInput, DEFAULT_CHART_STYLE.titleSize), DEFAULT_CHART_STYLE.titleSize, 10, 32),
    axisSize: clampNumber(readValue(els.axisSizeInput, DEFAULT_CHART_STYLE.axisSize), DEFAULT_CHART_STYLE.axisSize, 9, 24),
    tickSize: clampNumber(readValue(els.tickSizeInput, DEFAULT_CHART_STYLE.tickSize), DEFAULT_CHART_STYLE.tickSize, 8, 20),
    legendSize: clampNumber(readValue(els.legendSizeInput, DEFAULT_CHART_STYLE.legendSize), DEFAULT_CHART_STYLE.legendSize, 8, 22),
    textColor: readValue(els.textColorInput, DEFAULT_CHART_STYLE.textColor),
    expColor: readValue(els.expColorInput, DEFAULT_CHART_STYLE.expColor),
    ctrlColor: readValue(els.ctrlColorInput, DEFAULT_CHART_STYLE.ctrlColor),
    lineWidth: clampNumber(readValue(els.lineWidthInput, DEFAULT_CHART_STYLE.lineWidth), DEFAULT_CHART_STYLE.lineWidth, 1, 8),
    markerSize: clampNumber(readValue(els.markerSizeInput, DEFAULT_CHART_STYLE.markerSize), DEFAULT_CHART_STYLE.markerSize, 4, 18),
    showTitle: readChecked(els.showTitleInput, DEFAULT_CHART_STYLE.showTitle),
    showLegend: readChecked(els.showLegendInput, DEFAULT_CHART_STYLE.showLegend),
    showXAxisTitle: readChecked(els.showXAxisTitleInput, DEFAULT_CHART_STYLE.showXAxisTitle),
    showYAxisTitle: readChecked(els.showYAxisTitleInput, DEFAULT_CHART_STYLE.showYAxisTitle),
    titleX: clampNumber(readValue(els.titleXInput, DEFAULT_CHART_STYLE.titleX), DEFAULT_CHART_STYLE.titleX, 0, 100),
    titleY: clampNumber(readValue(els.titleYInput, DEFAULT_CHART_STYLE.titleY), DEFAULT_CHART_STYLE.titleY, 0, 160),
    xAxisTitleX: clampNumber(readValue(els.xAxisTitleXInput, DEFAULT_CHART_STYLE.xAxisTitleX), DEFAULT_CHART_STYLE.xAxisTitleX, 0, 100),
    xAxisTitleY: clampNumber(readValue(els.xAxisTitleYInput, DEFAULT_CHART_STYLE.xAxisTitleY), DEFAULT_CHART_STYLE.xAxisTitleY, 0, 160),
    yAxisTitleX: clampNumber(readValue(els.yAxisTitleXInput, DEFAULT_CHART_STYLE.yAxisTitleX), DEFAULT_CHART_STYLE.yAxisTitleX, 0, 200),
    yAxisTitleY: clampNumber(readValue(els.yAxisTitleYInput, DEFAULT_CHART_STYLE.yAxisTitleY), DEFAULT_CHART_STYLE.yAxisTitleY, 0, 100),
    legendX: clampNumber(readValue(els.legendXInput, DEFAULT_CHART_STYLE.legendX), DEFAULT_CHART_STYLE.legendX, 0, 2000),
    legendY: clampNumber(readValue(els.legendYInput, DEFAULT_CHART_STYLE.legendY), DEFAULT_CHART_STYLE.legendY, 0, 2000),
    yMin: clampNumber(readValue(els.yMinInput, DEFAULT_CHART_STYLE.yMin), DEFAULT_CHART_STYLE.yMin, -1000, 10000),
    yMax: clampNumber(readValue(els.yMaxInput, DEFAULT_CHART_STYLE.yMax), DEFAULT_CHART_STYLE.yMax, -1000, 10000),
    yStep: clampNumber(readValue(els.yStepInput, DEFAULT_CHART_STYLE.yStep), DEFAULT_CHART_STYLE.yStep, 0.1, 5000),
    axisColor: readValue(els.axisColorInput, DEFAULT_CHART_STYLE.axisColor),
    chartBgColor: readValue(els.chartBgColorInput, DEFAULT_CHART_STYLE.chartBgColor),
    plotBgColor: readValue(els.plotBgColorInput, DEFAULT_CHART_STYLE.plotBgColor),
    plotTop: clampNumber(readValue(els.plotTopInput, DEFAULT_CHART_STYLE.plotTop), DEFAULT_CHART_STYLE.plotTop, 30, 200),
    plotRight: clampNumber(readValue(els.plotRightInput, DEFAULT_CHART_STYLE.plotRight), DEFAULT_CHART_STYLE.plotRight, 10, 240),
    plotBottom: clampNumber(readValue(els.plotBottomInput, DEFAULT_CHART_STYLE.plotBottom), DEFAULT_CHART_STYLE.plotBottom, 30, 200),
    plotLeft: clampNumber(readValue(els.plotLeftInput, DEFAULT_CHART_STYLE.plotLeft), DEFAULT_CHART_STYLE.plotLeft, 30, 240),
    rawPointOpacity: clampNumber(readValue(els.rawPointOpacityInput, DEFAULT_CHART_STYLE.rawPointOpacity), DEFAULT_CHART_STYLE.rawPointOpacity, 0, 1),
    jitter: clampNumber(readValue(els.jitterInput, DEFAULT_CHART_STYLE.jitter), DEFAULT_CHART_STYLE.jitter, 0, 12),
    errorCap: clampNumber(readValue(els.errorCapInput, DEFAULT_CHART_STYLE.errorCap), DEFAULT_CHART_STYLE.errorCap, 0, 30),
    showExp: readChecked(els.showExpInput, DEFAULT_CHART_STYLE.showExp),
    showCtrl: readChecked(els.showCtrlInput, DEFAULT_CHART_STYLE.showCtrl),
    expLineStyle: readValue(els.expLineStyleInput, DEFAULT_CHART_STYLE.expLineStyle),
    ctrlLineStyle: readValue(els.ctrlLineStyleInput, DEFAULT_CHART_STYLE.ctrlLineStyle),
    expLineWidth: clampNumber(readValue(els.expLineWidthInput, DEFAULT_CHART_STYLE.expLineWidth), DEFAULT_CHART_STYLE.expLineWidth, 1, 6),
    ctrlLineWidth: clampNumber(readValue(els.ctrlLineWidthInput, DEFAULT_CHART_STYLE.ctrlLineWidth), DEFAULT_CHART_STYLE.ctrlLineWidth, 1, 6),
    expMarkerStyle: readValue(els.expMarkerStyleInput, DEFAULT_CHART_STYLE.expMarkerStyle),
    ctrlMarkerStyle: readValue(els.ctrlMarkerStyleInput, DEFAULT_CHART_STYLE.ctrlMarkerStyle),
    expMarkerSize: clampNumber(readValue(els.expMarkerSizeInput, DEFAULT_CHART_STYLE.expMarkerSize), DEFAULT_CHART_STYLE.expMarkerSize, 3, 15),
    ctrlMarkerSize: clampNumber(readValue(els.ctrlMarkerSizeInput, DEFAULT_CHART_STYLE.ctrlMarkerSize), DEFAULT_CHART_STYLE.ctrlMarkerSize, 3, 15),
    showRawPoints: readChecked(els.showRawPointsInput, readChecked(els.showPoints, DEFAULT_CHART_STYLE.showRawPoints)),
    showErrorBars: readChecked(els.showErrorBarsInput, readChecked(els.showSd, DEFAULT_CHART_STYLE.showErrorBars)),
    errorType: readValue(els.errorTypeInput, DEFAULT_CHART_STYLE.errorType),
    expErrorColor: readValue(els.expErrorColorInput, DEFAULT_CHART_STYLE.expErrorColor),
    ctrlErrorColor: readValue(els.ctrlErrorColorInput, DEFAULT_CHART_STYLE.ctrlErrorColor),
    expErrorWidth: clampNumber(readValue(els.expErrorWidthInput, DEFAULT_CHART_STYLE.expErrorWidth), DEFAULT_CHART_STYLE.expErrorWidth, 1, 6),
    ctrlErrorWidth: clampNumber(readValue(els.ctrlErrorWidthInput, DEFAULT_CHART_STYLE.ctrlErrorWidth), DEFAULT_CHART_STYLE.ctrlErrorWidth, 1, 6),
    expErrorCap: clampNumber(readValue(els.expErrorCapInput, DEFAULT_CHART_STYLE.expErrorCap), DEFAULT_CHART_STYLE.expErrorCap, 0, 20),
    ctrlErrorCap: clampNumber(readValue(els.ctrlErrorCapInput, DEFAULT_CHART_STYLE.ctrlErrorCap), DEFAULT_CHART_STYLE.ctrlErrorCap, 0, 20),
    xMin: clampNumber(readValue(els.xMinInput, DEFAULT_CHART_STYLE.xMin), DEFAULT_CHART_STYLE.xMin, -1000, 10000),
    xMax: clampNumber(readValue(els.xMaxInput, DEFAULT_CHART_STYLE.xMax), DEFAULT_CHART_STYLE.xMax, -1000, 10000),
    tickDirection: readValue(els.tickDirectionInput, DEFAULT_CHART_STYLE.tickDirection),
    showMajorGrid: readChecked(els.showMajorGridInput, DEFAULT_CHART_STYLE.showMajorGrid),
    showMinorGrid: readChecked(els.showMinorGridInput, DEFAULT_CHART_STYLE.showMinorGrid),
    theme: readValue(els.themeInput, DEFAULT_CHART_STYLE.theme),
    fontFamily: readValue(els.fontFamilyInput, DEFAULT_CHART_STYLE.fontFamily),
    globalFontSize: clampNumber(readValue(els.globalFontSizeInput, DEFAULT_CHART_STYLE.globalFontSize), DEFAULT_CHART_STYLE.globalFontSize, 10, 20),
    legendPosition: readValue(els.legendPositionInput, DEFAULT_CHART_STYLE.legendPosition),
    legendTranslucent: readChecked(els.legendTranslucentInput, DEFAULT_CHART_STYLE.legendTranslucent),
    legendBorder: readChecked(els.legendBorderInput, DEFAULT_CHART_STYLE.legendBorder),
    showValueLabels: readChecked(els.showValueLabelsInput, DEFAULT_CHART_STYLE.showValueLabels),
    smoothCurve: readChecked(els.smoothCurveInput, DEFAULT_CHART_STYLE.smoothCurve),
    smoothness: clampNumber(readValue(els.smoothnessInput, DEFAULT_CHART_STYLE.smoothness), DEFAULT_CHART_STYLE.smoothness, 0, 1),
    normalize: readChecked(els.normalizeInput, DEFAULT_CHART_STYLE.normalize),
    interactionMode: readValue(els.interactionModeInput, DEFAULT_CHART_STYLE.interactionMode),
    showMaxImprovement: readChecked(els.showMaxImprovementInput, DEFAULT_CHART_STYLE.showMaxImprovement),
    showDifference: readChecked(els.showDifferenceInput, DEFAULT_CHART_STYLE.showDifference),
  };
}

function applyChartStyleControls() {
  const style = state.chartStyle;
  setInputValue(els.chartTitleInput, style.chartTitle ?? "");
  setInputValue(els.xAxisTitleInput, style.xAxisTitle ?? "");
  setInputValue(els.yAxisTitleInput, style.yAxisTitle ?? "");
  setInputValue(els.titleSizeInput, style.titleSize);
  setInputValue(els.axisSizeInput, style.axisSize);
  setInputValue(els.tickSizeInput, style.tickSize);
  setInputValue(els.legendSizeInput, style.legendSize);
  setInputValue(els.textColorInput, style.textColor);
  setInputValue(els.expColorInput, style.expColor);
  setInputValue(els.ctrlColorInput, style.ctrlColor);
  setInputValue(els.lineWidthInput, style.lineWidth);
  setInputValue(els.markerSizeInput, style.markerSize);
  setInputChecked(els.showTitleInput, style.showTitle);
  setInputChecked(els.showLegendInput, style.showLegend);
  setInputChecked(els.showXAxisTitleInput, style.showXAxisTitle);
  setInputChecked(els.showYAxisTitleInput, style.showYAxisTitle);
  setInputValue(els.titleXInput, style.titleX);
  setInputValue(els.titleYInput, style.titleY);
  setInputValue(els.xAxisTitleXInput, style.xAxisTitleX);
  setInputValue(els.xAxisTitleYInput, style.xAxisTitleY);
  setInputValue(els.yAxisTitleXInput, style.yAxisTitleX);
  setInputValue(els.yAxisTitleYInput, style.yAxisTitleY);
  setInputValue(els.legendXInput, style.legendX);
  setInputValue(els.legendYInput, style.legendY);
  setInputValue(els.yMinInput, style.yMin);
  setInputValue(els.yMaxInput, style.yMax);
  setInputValue(els.yStepInput, style.yStep);
  setInputValue(els.axisColorInput, style.axisColor);
  setInputValue(els.chartBgColorInput, style.chartBgColor);
  setInputValue(els.plotBgColorInput, style.plotBgColor);
  setInputValue(els.plotTopInput, style.plotTop);
  setInputValue(els.plotRightInput, style.plotRight);
  setInputValue(els.plotBottomInput, style.plotBottom);
  setInputValue(els.plotLeftInput, style.plotLeft);
  setInputValue(els.rawPointOpacityInput, style.rawPointOpacity);
  setInputValue(els.jitterInput, style.jitter);
  setInputValue(els.errorCapInput, style.errorCap);
  setInputChecked(els.showExpInput, style.showExp);
  setInputChecked(els.showCtrlInput, style.showCtrl);
  setInputValue(els.expLineStyleInput, style.expLineStyle);
  setInputValue(els.ctrlLineStyleInput, style.ctrlLineStyle);
  setInputValue(els.expLineWidthInput, style.expLineWidth);
  setInputValue(els.ctrlLineWidthInput, style.ctrlLineWidth);
  setInputValue(els.expMarkerStyleInput, style.expMarkerStyle);
  setInputValue(els.ctrlMarkerStyleInput, style.ctrlMarkerStyle);
  setInputValue(els.expMarkerSizeInput, style.expMarkerSize);
  setInputValue(els.ctrlMarkerSizeInput, style.ctrlMarkerSize);
  setInputChecked(els.showRawPointsInput, style.showRawPoints);
  setInputChecked(els.showErrorBarsInput, style.showErrorBars);
  setInputValue(els.errorTypeInput, style.errorType);
  setInputValue(els.expErrorColorInput, style.expErrorColor);
  setInputValue(els.ctrlErrorColorInput, style.ctrlErrorColor);
  setInputValue(els.expErrorWidthInput, style.expErrorWidth);
  setInputValue(els.ctrlErrorWidthInput, style.ctrlErrorWidth);
  setInputValue(els.expErrorCapInput, style.expErrorCap);
  setInputValue(els.ctrlErrorCapInput, style.ctrlErrorCap);
  setInputValue(els.xMinInput, style.xMin);
  setInputValue(els.xMaxInput, style.xMax);
  setInputValue(els.tickDirectionInput, style.tickDirection);
  setInputChecked(els.showMajorGridInput, style.showMajorGrid);
  setInputChecked(els.showMinorGridInput, style.showMinorGrid);
  setInputValue(els.themeInput, style.theme);
  setInputValue(els.fontFamilyInput, style.fontFamily);
  setInputValue(els.globalFontSizeInput, style.globalFontSize);
  setInputValue(els.legendPositionInput, style.legendPosition);
  setInputChecked(els.legendTranslucentInput, style.legendTranslucent);
  setInputChecked(els.legendBorderInput, style.legendBorder);
  setInputChecked(els.showValueLabelsInput, style.showValueLabels);
  setInputChecked(els.smoothCurveInput, style.smoothCurve);
  setInputValue(els.smoothnessInput, style.smoothness);
  setInputChecked(els.normalizeInput, style.normalize);
  setInputValue(els.interactionModeInput, style.interactionMode);
  setInputChecked(els.showMaxImprovementInput, style.showMaxImprovement);
  setInputChecked(els.showDifferenceInput, style.showDifference);
}

function readBarStyleControls() {
  return {
    ...DEFAULT_BAR_STYLE,
    chartTitle: readText(barEls.chartTitleInput),
    xAxisTitle: readText(barEls.xAxisTitleInput),
    yAxisTitle: readText(barEls.yAxisTitleInput),
    titleSize: clampNumber(readValue(barEls.titleSizeInput, DEFAULT_BAR_STYLE.titleSize), DEFAULT_BAR_STYLE.titleSize, 10, 32),
    axisSize: clampNumber(readValue(barEls.axisSizeInput, DEFAULT_BAR_STYLE.axisSize), DEFAULT_BAR_STYLE.axisSize, 9, 24),
    tickSize: clampNumber(readValue(barEls.tickSizeInput, DEFAULT_BAR_STYLE.tickSize), DEFAULT_BAR_STYLE.tickSize, 8, 20),
    legendSize: clampNumber(readValue(barEls.legendSizeInput, DEFAULT_BAR_STYLE.legendSize), DEFAULT_BAR_STYLE.legendSize, 8, 22),
    textColor: readValue(barEls.textColorInput, DEFAULT_BAR_STYLE.textColor),
    showTitle: readChecked(barEls.showTitleInput, DEFAULT_BAR_STYLE.showTitle),
    showLegend: readChecked(barEls.showLegendInput, DEFAULT_BAR_STYLE.showLegend),
    showXAxisTitle: readChecked(barEls.showXAxisTitleInput, DEFAULT_BAR_STYLE.showXAxisTitle),
    showYAxisTitle: readChecked(barEls.showYAxisTitleInput, DEFAULT_BAR_STYLE.showYAxisTitle),
    titleX: clampNumber(readValue(barEls.titleXInput, DEFAULT_BAR_STYLE.titleX), DEFAULT_BAR_STYLE.titleX, 0, 100),
    titleY: clampNumber(readValue(barEls.titleYInput, DEFAULT_BAR_STYLE.titleY), DEFAULT_BAR_STYLE.titleY, 0, 160),
    xAxisTitleX: clampNumber(readValue(barEls.xAxisTitleXInput, DEFAULT_BAR_STYLE.xAxisTitleX), DEFAULT_BAR_STYLE.xAxisTitleX, 0, 100),
    xAxisTitleY: clampNumber(readValue(barEls.xAxisTitleYInput, DEFAULT_BAR_STYLE.xAxisTitleY), DEFAULT_BAR_STYLE.xAxisTitleY, 0, 160),
    yAxisTitleX: clampNumber(readValue(barEls.yAxisTitleXInput, DEFAULT_BAR_STYLE.yAxisTitleX), DEFAULT_BAR_STYLE.yAxisTitleX, 0, 240),
    yAxisTitleY: clampNumber(readValue(barEls.yAxisTitleYInput, DEFAULT_BAR_STYLE.yAxisTitleY), DEFAULT_BAR_STYLE.yAxisTitleY, 0, 100),
    legendX: clampNumber(readValue(barEls.legendXInput, DEFAULT_BAR_STYLE.legendX), DEFAULT_BAR_STYLE.legendX, 0, 2000),
    legendY: clampNumber(readValue(barEls.legendYInput, DEFAULT_BAR_STYLE.legendY), DEFAULT_BAR_STYLE.legendY, 0, 2000),
    yMin: clampNumber(readValue(barEls.yMinInput, DEFAULT_BAR_STYLE.yMin), DEFAULT_BAR_STYLE.yMin, -1000, 10000),
    yMax: clampNumber(readValue(barEls.yMaxInput, DEFAULT_BAR_STYLE.yMax), DEFAULT_BAR_STYLE.yMax, -1000, 10000),
    yStep: clampNumber(readValue(barEls.yStepInput, DEFAULT_BAR_STYLE.yStep), DEFAULT_BAR_STYLE.yStep, 0.1, 5000),
    xMin: clampNumber(readValue(barEls.xMinInput, DEFAULT_BAR_STYLE.xMin), DEFAULT_BAR_STYLE.xMin, -1000, 10000),
    xMax: clampNumber(readValue(barEls.xMaxInput, DEFAULT_BAR_STYLE.xMax), DEFAULT_BAR_STYLE.xMax, -1000, 10000),
    axisColor: readValue(barEls.axisColorInput, DEFAULT_BAR_STYLE.axisColor),
    chartBgColor: readValue(barEls.chartBgColorInput, DEFAULT_BAR_STYLE.chartBgColor),
    plotBgColor: readValue(barEls.plotBgColorInput, DEFAULT_BAR_STYLE.plotBgColor),
    plotTop: clampNumber(readValue(barEls.plotTopInput, DEFAULT_BAR_STYLE.plotTop), DEFAULT_BAR_STYLE.plotTop, 30, 220),
    plotRight: clampNumber(readValue(barEls.plotRightInput, DEFAULT_BAR_STYLE.plotRight), DEFAULT_BAR_STYLE.plotRight, 10, 240),
    plotBottom: clampNumber(readValue(barEls.plotBottomInput, DEFAULT_BAR_STYLE.plotBottom), DEFAULT_BAR_STYLE.plotBottom, 30, 220),
    plotLeft: clampNumber(readValue(barEls.plotLeftInput, DEFAULT_BAR_STYLE.plotLeft), DEFAULT_BAR_STYLE.plotLeft, 40, 240),
    showExp: readChecked(barEls.showExpInput, DEFAULT_BAR_STYLE.showExp),
    showCtrl: readChecked(barEls.showCtrlInput, DEFAULT_BAR_STYLE.showCtrl),
    expColor: readValue(barEls.expColorInput, DEFAULT_BAR_STYLE.expColor),
    ctrlColor: readValue(barEls.ctrlColorInput, DEFAULT_BAR_STYLE.ctrlColor),
    barWidth: clampNumber(readValue(barEls.barWidthInput, DEFAULT_BAR_STYLE.barWidth), DEFAULT_BAR_STYLE.barWidth, 6, 80),
    barGap: clampNumber(readValue(barEls.barGapInput, DEFAULT_BAR_STYLE.barGap), DEFAULT_BAR_STYLE.barGap, 0, 40),
    barOpacity: clampNumber(readValue(barEls.barOpacityInput, DEFAULT_BAR_STYLE.barOpacity), DEFAULT_BAR_STYLE.barOpacity, 0.1, 1),
    barBorderWidth: clampNumber(readValue(barEls.barBorderWidthInput, DEFAULT_BAR_STYLE.barBorderWidth), DEFAULT_BAR_STYLE.barBorderWidth, 0, 6),
    showRawPoints: readChecked(barEls.showRawPointsInput, DEFAULT_BAR_STYLE.showRawPoints),
    showValueLabels: readChecked(barEls.showValueLabelsInput, DEFAULT_BAR_STYLE.showValueLabels),
    rawPointOpacity: clampNumber(readValue(barEls.rawPointOpacityInput, DEFAULT_BAR_STYLE.rawPointOpacity), DEFAULT_BAR_STYLE.rawPointOpacity, 0, 1),
    jitter: clampNumber(readValue(barEls.jitterInput, DEFAULT_BAR_STYLE.jitter), DEFAULT_BAR_STYLE.jitter, 0, 16),
    showErrorBars: readChecked(barEls.showErrorBarsInput, DEFAULT_BAR_STYLE.showErrorBars),
    errorType: readValue(barEls.errorTypeInput, DEFAULT_BAR_STYLE.errorType),
    expErrorColor: readValue(barEls.expErrorColorInput, DEFAULT_BAR_STYLE.expErrorColor),
    ctrlErrorColor: readValue(barEls.ctrlErrorColorInput, DEFAULT_BAR_STYLE.ctrlErrorColor),
    expErrorWidth: clampNumber(readValue(barEls.expErrorWidthInput, DEFAULT_BAR_STYLE.expErrorWidth), DEFAULT_BAR_STYLE.expErrorWidth, 1, 6),
    ctrlErrorWidth: clampNumber(readValue(barEls.ctrlErrorWidthInput, DEFAULT_BAR_STYLE.ctrlErrorWidth), DEFAULT_BAR_STYLE.ctrlErrorWidth, 1, 6),
    expErrorCap: clampNumber(readValue(barEls.expErrorCapInput, DEFAULT_BAR_STYLE.expErrorCap), DEFAULT_BAR_STYLE.expErrorCap, 0, 30),
    ctrlErrorCap: clampNumber(readValue(barEls.ctrlErrorCapInput, DEFAULT_BAR_STYLE.ctrlErrorCap), DEFAULT_BAR_STYLE.ctrlErrorCap, 0, 30),
    theme: readValue(barEls.themeInput, DEFAULT_BAR_STYLE.theme),
    fontFamily: readValue(barEls.fontFamilyInput, DEFAULT_BAR_STYLE.fontFamily),
    globalFontSize: clampNumber(readValue(barEls.globalFontSizeInput, DEFAULT_BAR_STYLE.globalFontSize), DEFAULT_BAR_STYLE.globalFontSize, 10, 20),
    legendPosition: readValue(barEls.legendPositionInput, DEFAULT_BAR_STYLE.legendPosition),
    legendTranslucent: readChecked(barEls.legendTranslucentInput, DEFAULT_BAR_STYLE.legendTranslucent),
    legendBorder: readChecked(barEls.legendBorderInput, DEFAULT_BAR_STYLE.legendBorder),
    tickDirection: readValue(barEls.tickDirectionInput, DEFAULT_BAR_STYLE.tickDirection),
    showMajorGrid: readChecked(barEls.showMajorGridInput, DEFAULT_BAR_STYLE.showMajorGrid),
    showMinorGrid: readChecked(barEls.showMinorGridInput, DEFAULT_BAR_STYLE.showMinorGrid),
    normalize: readChecked(barEls.normalizeInput, DEFAULT_BAR_STYLE.normalize),
    showMaxImprovement: readChecked(barEls.showMaxImprovementInput, DEFAULT_BAR_STYLE.showMaxImprovement),
  };
}

function applyBarStyleControls() {
  const style = state.barStyle;
  setInputValue(barEls.chartTitleInput, style.chartTitle ?? "");
  setInputValue(barEls.xAxisTitleInput, style.xAxisTitle ?? "");
  setInputValue(barEls.yAxisTitleInput, style.yAxisTitle ?? "");
  setInputValue(barEls.titleSizeInput, style.titleSize);
  setInputValue(barEls.axisSizeInput, style.axisSize);
  setInputValue(barEls.tickSizeInput, style.tickSize);
  setInputValue(barEls.legendSizeInput, style.legendSize);
  setInputValue(barEls.textColorInput, style.textColor);
  setInputChecked(barEls.showTitleInput, style.showTitle);
  setInputChecked(barEls.showLegendInput, style.showLegend);
  setInputChecked(barEls.showXAxisTitleInput, style.showXAxisTitle);
  setInputChecked(barEls.showYAxisTitleInput, style.showYAxisTitle);
  setInputValue(barEls.titleXInput, style.titleX);
  setInputValue(barEls.titleYInput, style.titleY);
  setInputValue(barEls.xAxisTitleXInput, style.xAxisTitleX);
  setInputValue(barEls.xAxisTitleYInput, style.xAxisTitleY);
  setInputValue(barEls.yAxisTitleXInput, style.yAxisTitleX);
  setInputValue(barEls.yAxisTitleYInput, style.yAxisTitleY);
  setInputValue(barEls.legendXInput, style.legendX);
  setInputValue(barEls.legendYInput, style.legendY);
  setInputValue(barEls.yMinInput, style.yMin);
  setInputValue(barEls.yMaxInput, style.yMax);
  setInputValue(barEls.yStepInput, style.yStep);
  setInputValue(barEls.xMinInput, style.xMin);
  setInputValue(barEls.xMaxInput, style.xMax);
  setInputValue(barEls.axisColorInput, style.axisColor);
  setInputValue(barEls.chartBgColorInput, style.chartBgColor);
  setInputValue(barEls.plotBgColorInput, style.plotBgColor);
  setInputValue(barEls.plotTopInput, style.plotTop);
  setInputValue(barEls.plotRightInput, style.plotRight);
  setInputValue(barEls.plotBottomInput, style.plotBottom);
  setInputValue(barEls.plotLeftInput, style.plotLeft);
  setInputChecked(barEls.showExpInput, style.showExp);
  setInputChecked(barEls.showCtrlInput, style.showCtrl);
  setInputValue(barEls.expColorInput, style.expColor);
  setInputValue(barEls.ctrlColorInput, style.ctrlColor);
  setInputValue(barEls.barWidthInput, style.barWidth);
  setInputValue(barEls.barGapInput, style.barGap);
  setInputValue(barEls.barOpacityInput, style.barOpacity);
  setInputValue(barEls.barBorderWidthInput, style.barBorderWidth);
  setInputChecked(barEls.showRawPointsInput, style.showRawPoints);
  setInputChecked(barEls.showValueLabelsInput, style.showValueLabels);
  setInputValue(barEls.rawPointOpacityInput, style.rawPointOpacity);
  setInputValue(barEls.jitterInput, style.jitter);
  setInputChecked(barEls.showErrorBarsInput, style.showErrorBars);
  setInputValue(barEls.errorTypeInput, style.errorType);
  setInputValue(barEls.expErrorColorInput, style.expErrorColor);
  setInputValue(barEls.ctrlErrorColorInput, style.ctrlErrorColor);
  setInputValue(barEls.expErrorWidthInput, style.expErrorWidth);
  setInputValue(barEls.ctrlErrorWidthInput, style.ctrlErrorWidth);
  setInputValue(barEls.expErrorCapInput, style.expErrorCap);
  setInputValue(barEls.ctrlErrorCapInput, style.ctrlErrorCap);
  setInputValue(barEls.themeInput, style.theme);
  setInputValue(barEls.fontFamilyInput, style.fontFamily);
  setInputValue(barEls.globalFontSizeInput, style.globalFontSize);
  setInputValue(barEls.legendPositionInput, style.legendPosition);
  setInputChecked(barEls.legendTranslucentInput, style.legendTranslucent);
  setInputChecked(barEls.legendBorderInput, style.legendBorder);
  setInputValue(barEls.tickDirectionInput, style.tickDirection);
  setInputChecked(barEls.showMajorGridInput, style.showMajorGrid);
  setInputChecked(barEls.showMinorGridInput, style.showMinorGrid);
  setInputChecked(barEls.normalizeInput, style.normalize);
  setInputChecked(barEls.showMaxImprovementInput, style.showMaxImprovement);
}

function updateSummary() {
  const rows = state.stats;
  if (!rows.some((row) => row.exp.n || row.ctrl.n)) {
    els.summaryBody.innerHTML = `<tr class="empty-row"><td colspan="7">闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曚綅閸ヮ剦鏁嶉柣鎰綑娴滆鲸绻濋悽闈浶㈡繛灞傚€楃划缁樺鐎涙鍘甸梻鍌氬€搁顓⑺囬敃鍌涚厽妞ゆ挾鍣ュ▓婊堟煛鐏炲墽娲撮柛鈺佸瀹曟﹢顢旀担璇℃綌闂傚倷鑳堕…鍫㈡偖椤愶箑绀夐柟杈剧畱閽冪喖鏌ㄥ┑鍡╂Ц婵☆偅蓱缁绘盯宕卞▎蹇庡闂佹眹鍊曞ú銈夊煘閹达附鍊烽柟缁樺笚閸婎垰顪冮妶鍐ㄥ闁挎洦浜滈锝嗙節濮橆剛鍔撮梺鍛婂姀閺呮盯顢撻幘缁樷拺闁告稑锕︾粻鎾绘倵濮樺崬鍘寸€殿喗濞婇、姗€濮€閳ユ枼鍋撻悽鍛婂仭婵炲棗绻愰顏堟倶韫囷絽浜炵紒杈ㄥ浮閹虫粍鎷呴崘顭戞闂備椒绱徊鍧楀礂濡绻嗛柣鎴ｅГ閺呮粓鏌﹀Ο渚Ц濠碘剝濞婂缁樼瑹閳ь剙顭囪閹囧幢濞戞鐤囬棅顐㈡处娓氭寮繝鍥ㄧ厱闁靛鍠栨晶顖炴煃闁垮鐏撮柡灞剧☉閳藉顫滈崼鐔告毎闂備胶绮幐楣冨窗閺嶎厼钃熸繛鎴欏灩濡﹢鏌涜椤ㄥ懎顕ｆ导瀛樺€垫繛鍫濈仢濞呮﹢鏌涚€ｎ亷韬柣娑卞枛铻ｉ柛蹇曞帶閻濅即姊洪懖鈹炬嫛闁告搫绠撳畷銉╁川鐎涙ǚ鎷绘繛杈剧到閹芥粎绮斿ú顏呯厱閻庯綆浜烽煬顒傗偓瑙勬磸閸ㄤ粙鐛崱姘兼闂佸吋婢橀悘婵嬫箒闂佺粯锚濡﹪宕曢幇鐗堢厽闁规儳顕幊鍕煏閸パ冾伃妤犵偞甯掗濂稿炊瑜嶉‖澶嬩繆閻愵亜鈧倝宕戦崨娣偓鍐╃節閸パ嗘憰闂佸搫娲㈤崹褰掔嵁閵忊€茬箚闁靛牆鍊告禍楣冩⒑閸濆嫭锛旂紒韫矙閸?/td></tr>`;
    return;
  }
  els.summaryBody.innerHTML = rows
    .map(
      (row) => `
      <tr>
        <td>${row.time.label}</td>
        <td>${row.exp.n || "-"}</td>
        <td>${formatNumber(row.exp.mean)}</td>
        <td>${formatNumber(row.exp.sd)}</td>
        <td>${row.ctrl.n || "-"}</td>
        <td>${formatNumber(row.ctrl.mean)}</td>
        <td>${formatNumber(row.ctrl.sd)}</td>
      </tr>
    `,
    )
    .join("");
}

function buildCurrentDataRows(style = getActiveStyle()) {
  const label = errorLabel(style);
  const rows = [];
  getDisplayStats(style).forEach((row) => {
    if (row.exp) {
      rows.push({
        time: row.time.label,
        group: "PRP+BTX-A",
        n: row.exp.n,
        mean: row.exp.mean,
        errorType: label,
        error: row.exp.error,
        diff: row.diff,
        improvement: row.improvement,
      });
    }
    if (row.ctrl) {
      rows.push({
        time: row.time.label,
        group: "PRP",
        n: row.ctrl.n,
        mean: row.ctrl.mean,
        errorType: label,
        error: row.ctrl.error,
        diff: row.diff,
        improvement: row.improvement,
      });
    }
  });
  return rows;
}

function updateCurrentDataTable() {
  if (!els.currentDataBody) return;
  const rows = buildCurrentDataRows();
  state.currentDataRows = rows;
  if (!rows.length) {
    els.currentDataBody.innerHTML = `<tr class="empty-row"><td colspan="8">闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曚綅閸ヮ剦鏁嶉柣鎰綑娴滆鲸绻濋悽闈浶㈡繛灞傚€楃划缁樺鐎涙鍘甸梻鍌氬€搁顓⑺囬敃鍌涚厽妞ゆ挾鍣ュ▓婊堟煛鐏炲墽娲撮柛鈺佸瀹曟﹢顢旀担璇℃綌闂傚倷鑳堕…鍫㈡偖椤愶箑绀夐柟杈剧畱閽冪喖鏌ㄥ┑鍡╂Ц婵☆偅蓱缁绘盯宕卞▎蹇庡闂佹眹鍊曞ú銈夊煘閹达附鍊烽柟缁樺笚閸婎垰顪冮妶鍐ㄥ闁挎洦浜滈锝嗙節濮橆剛鍔撮梺鍛婂姀閺呮盯顢撻幘缁樷拺闁告稑锕︾粻鎾绘倵濮樺崬鍘寸€殿喗濞婇、姗€濮€閳ユ枼鍋撻悽鍛婂仭婵炲棗绻愰顏堟倶韫囷絽浜炵紒杈ㄥ浮閹虫粍鎷呴崘顭戞闂備椒绱徊鍧楀礂濡绻嗛柣鎴ｅГ閺呮粓鏌﹀Ο渚Ц濠碘剝濞婂缁樼瑹閳ь剙顭囪閹囧幢濞戞鐤囬棅顐㈡处娓氭寮繝鍥ㄧ厱闁靛鍠栨晶顖炴煃闁垮鐏撮柡灞剧☉閳藉顫滈崼鐔告毎闂備胶绮幐楣冨窗閺嶎厼钃熸繛鎴欏灩濡﹢鏌涜椤ㄥ懎顕ｆ导瀛樺€垫繛鍫濈仢濞呮﹢鏌涚€ｎ亷韬柣娑卞枛铻ｉ柛蹇曞帶閻濅即姊洪懖鈹炬嫛闁告搫绠撳畷銉╁川鐎涙ǚ鎷绘繛杈剧到閹芥粎绮斿ú顏呯厱閻庯綆浜烽煬顒傗偓瑙勬礃缁矂鍩ユ径濠庢僵閺夊牃鏅濋崢鐘测攽閻樼粯娑ч柛濠冩倐楠炲鏁撻悩鍐蹭簵闂佸搫娲㈤崹娲偂濞嗘挻鐓欐い鏍ф閹锋垹妲愰悙鐑樼厸鐎广儱绻掔弧鈧┑顔硷攻濡炶棄鐣烽锕€绀嬫い鎺戭槹閿熴儵姊绘担鍛婃喐濠殿喚鏁婚幃褔鎮╃紒妯轰粧濡炪倖娲嶉崑鎾搭殽閻愬樊鍎旈柡浣稿€荤槐鎺懳熺紒妯煎綗闂傚倷娴囧畷鐢稿窗瀹ュ鈷旂€广儱顦壕褰掓煙閻楀牊绶茬痪鎯ь煼閺岀喖骞戦幇闈涙缂備讲鍋撻柛鎰ㄦ杺娴滄粓鏌￠崒娑橆嚋妞?/td></tr>`;
    return;
  }
  els.currentDataBody.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${row.time}</td>
          <td>${row.group}</td>
          <td>${row.n || "-"}</td>
          <td>${formatNumber(row.mean)}</td>
          <td>${row.errorType}</td>
          <td>${formatNumber(row.error)}</td>
          <td>${formatNumber(row.diff)}</td>
          <td>${formatNumber(row.improvement)}</td>
        </tr>
      `,
    )
    .join("");
}

function getCurrentDataTsv() {
  const rows = buildCurrentDataRows();
  const table = [["时间", "组别", "n", "均值", "误差类型", "误差值", "PRP+BTX-A - PRP", "差值百分比"]];
  rows.forEach((row) => {
    table.push([
      row.time,
      row.group,
      row.n,
      formatNumber(row.mean),
      row.errorType,
      formatNumber(row.error),
      formatNumber(row.diff),
      formatNumber(row.improvement),
    ]);
  });
  return table.map((row) => row.join("\t")).join("\n");
}

function getComparisonGroups() {
  return [
    ...state.times.map((time, index) => ({
      label: `PRP+BTX-A ${time.label}`,
      values: state.expRows.map((row) => row[index]).filter(Number.isFinite),
    })),
    ...state.times.map((time, index) => ({
      label: `PRP ${time.label}`,
      values: state.ctrlRows.map((row) => row[index]).filter(Number.isFinite),
    })),
  ];
}

function formatPValue(value) {
  if (value == null || !Number.isFinite(value)) return "-";
  if (value < 0.0001) return "<0.0001";
  return value.toFixed(4);
}

function pValueClass(value) {
  if (value == null || !Number.isFinite(value)) return "";
  if (value < 0.001) return "pvalue-very-significant";
  if (value < 0.01) return "pvalue-highly-significant";
  if (value < 0.05) return "pvalue-significant";
  return "pvalue-not-significant";
}

function buildPValueMatrix() {
  const groups = getComparisonGroups();
  return groups.map((rowGroup, rowIndex) =>
    groups.map((colGroup, colIndex) => {
      if (rowIndex === colIndex) return null;
      return welchPValue(rowGroup.values, colGroup.values);
    }),
  );
}

function updatePValueTable() {
  const groups = getComparisonGroups();
  const matrix = buildPValueMatrix();
  if (!groups.some((group) => group.values.length >= 2)) {
    els.pvalueHead.innerHTML = "";
    els.pvalueBody.innerHTML = `<tr class="empty-row"><td>输入原始数据后自动计算并显示 P 值矩阵。</td></tr>`;
    return;
  }

  els.pvalueHead.innerHTML = `
    <tr>
      <th>比较组</th>
      ${groups.map((group) => `<th>${group.label}</th>`).join("")}
    </tr>
  `;
  els.pvalueBody.innerHTML = groups
    .map(
      (group, rowIndex) => `
        <tr>
          <td>${group.label}</td>
          ${matrix[rowIndex].map((value, colIndex) => (colIndex <= rowIndex ? `<td></td>` : `<td class="${pValueClass(value)}">${formatPValue(value)}</td>`)).join("")}
        </tr>
      `,
    )
    .join("");
}

function getPValueTableTsv() {
  const groups = getComparisonGroups();
  const matrix = buildPValueMatrix();
  const rows = [["比较组", ...groups.map((group) => group.label)]];
  groups.forEach((group, rowIndex) => {
    rows.push([group.label, ...matrix[rowIndex].map((value, colIndex) => (colIndex <= rowIndex ? "" : formatPValue(value)))]);
  });
  return rows.map((row) => row.join("\t")).join("\n");
}

function setupCanvas() {
  const rect = els.chart.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  els.chart.width = Math.max(760, Math.floor(rect.width * dpr));
  els.chart.height = Math.floor(rect.height * dpr);
  const ctx = els.chart.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function drawMarker(ctx, shape, x, y, size, color, alpha = 1) {
  if (shape === "none") return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  if (shape === "square") {
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
  } else if (shape === "diamond") {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
    ctx.fill();
  } else if (shape === "triangle") {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function canvasFont(style, size = style.globalFontSize, weight = 400) {
  return `${weight} ${size}px ${style.fontFamily || "Arial"}, Microsoft YaHei, sans-serif`;
}

function lineDash(pattern, width = 2) {
  if (pattern === "dash") return [8 * width, 5 * width];
  if (pattern === "dot") return [1.5 * width, 4 * width];
  if (pattern === "dashdot") return [8 * width, 4 * width, 1.5 * width, 4 * width];
  return [];
}

function legendItems(style) {
  return ["ctrl", "exp"]
    .map((key) => seriesStyle(key, style))
    .filter((item) => item.visible);
}

function measureLegend(ctx, items, style) {
  ctx.save();
  ctx.font = canvasFont(style, style.legendSize);
  const width = items.reduce((sum, item) => sum + 32 + ctx.measureText(item.label).width + 24, 0);
  ctx.restore();
  return { width: Math.max(0, width - 24), height: Math.max(24, style.legendSize + 12) };
}

function legendOrigin(ctx, items, style, margin, plotW, plotH) {
  if (style.legendPosition === "custom") return { x: style.legendX, y: style.legendY };
  const size = measureLegend(ctx, items, style);
  const pad = 12;
  const positions = {
    "top-left": { x: margin.left + pad, y: margin.top + pad },
    "top-right": { x: margin.left + plotW - size.width - pad, y: margin.top + pad },
    "bottom-right": { x: margin.left + plotW - size.width - pad, y: margin.top + plotH - size.height - pad },
    "bottom-left": { x: margin.left + pad, y: margin.top + plotH - size.height - pad },
    "top-center": { x: margin.left + (plotW - size.width) / 2, y: margin.top + pad },
    "bottom-center": { x: margin.left + (plotW - size.width) / 2, y: margin.top + plotH - size.height - pad },
  };
  return positions[style.legendPosition] || positions["top-left"];
}

function drawCanvasLegend(ctx, style, margin, plotW, plotH) {
  const items = legendItems(style);
  if (!items.length) return null;
  const origin = legendOrigin(ctx, items, style, margin, plotW, plotH);
  const size = measureLegend(ctx, items, style);
  const bounds = { x: origin.x - 8, y: origin.y - 8, width: size.width + 16, height: size.height + 10 };
  ctx.save();
  if (style.legendTranslucent || style.legendBorder) {
    ctx.fillStyle = style.legendTranslucent ? "rgba(255,255,255,0.72)" : style.chartBgColor;
    ctx.strokeStyle = style.axisColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(origin.x - 8, origin.y - 8, size.width + 16, size.height + 10, 6);
    if (style.legendTranslucent) ctx.fill();
    if (style.legendBorder) ctx.stroke();
  }
  ctx.font = canvasFont(style, style.legendSize);
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = style.textColor;
  let cursorX = origin.x;
  const y = origin.y + size.height / 2 - 1;
  items.forEach((item) => {
    ctx.strokeStyle = item.color;
    ctx.lineWidth = item.lineWidth;
    ctx.setLineDash(lineDash(item.lineStyle, item.lineWidth));
    ctx.beginPath();
    ctx.moveTo(cursorX, y);
    ctx.lineTo(cursorX + 22, y);
    ctx.stroke();
    ctx.setLineDash([]);
    drawMarker(ctx, item.markerStyle, cursorX + 11, y, item.markerSize, item.color);
    ctx.fillStyle = style.textColor;
    ctx.fillText(item.label, cursorX + 30, y);
    cursorX += 32 + ctx.measureText(item.label).width + 24;
  });
  ctx.restore();
  return bounds;
}

function drawBarLegend(ctx, style, margin, plotW, plotH) {
  const items = ["ctrl", "exp"]
    .map((key) => barSeriesStyle(key, style))
    .filter((item) => item.visible);
  if (!items.length) return null;
  ctx.save();
  ctx.font = canvasFont(style, style.legendSize);
  const itemWidths = items.map((item) => 22 + ctx.measureText(item.label).width + 24);
  const width = itemWidths.reduce((sum, value) => sum + value, 0);
  const height = style.legendSize + 10;
  const origin = legendOrigin(style, margin, plotW, plotH, { width, height });
  const bounds = { x: origin.x - 8, y: origin.y - 8, width: width + 16, height: height + 10 };
  if (style.legendTranslucent || style.legendBorder) {
    ctx.fillStyle = style.legendTranslucent ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0)";
    ctx.strokeStyle = style.legendBorder ? style.axisColor : "rgba(0,0,0,0)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(bounds.x, bounds.y, bounds.width, bounds.height, 6);
    if (style.legendTranslucent) ctx.fill();
    if (style.legendBorder) ctx.stroke();
  }
  ctx.textBaseline = "middle";
  let cursorX = origin.x;
  const y = origin.y + height / 2 - 1;
  items.forEach((item) => {
    ctx.globalAlpha = style.barOpacity;
    ctx.fillStyle = item.color;
    ctx.fillRect(cursorX, y - 6, 14, 12);
    ctx.globalAlpha = 1;
    ctx.fillStyle = style.textColor;
    ctx.fillText(item.label, cursorX + 22, y);
    cursorX += 22 + ctx.measureText(item.label).width + 24;
  });
  ctx.restore();
  return bounds;
}

function niceRange(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return { min: 0, max: 1, step: 0.2 };
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const span = max - min;
  const padding = span * 0.14;
  const rawMin = min - padding;
  const rawMax = max + padding;
  const stepBase = 10 ** Math.floor(Math.log10((rawMax - rawMin) / 5));
  const step = [1, 2, 5, 10].map((m) => m * stepBase).find((v) => (rawMax - rawMin) / v <= 6) || stepBase;
  return {
    min: Math.floor(rawMin / step) * step,
    max: Math.ceil(rawMax / step) * step,
    step,
  };
}

function barSeriesStyle(key, style) {
  const isExp = key === "exp";
  return {
    label: isExp ? "PRP+BTX-A" : "PRP",
    visible: isExp ? style.showExp : style.showCtrl,
    color: isExp ? style.expColor : style.ctrlColor,
    errorColor: isExp ? style.expErrorColor : style.ctrlErrorColor,
    errorWidth: isExp ? style.expErrorWidth : style.ctrlErrorWidth,
    errorCap: isExp ? style.expErrorCap : style.ctrlErrorCap,
  };
}

function drawChart() {
  const { ctx, width, height } = setupCanvas();
  if (state.activeChart === "bar") {
    renderBarChart(ctx, width, height, state.barStyle, { interactive: true });
  } else {
    renderChart(ctx, width, height, state.chartStyle, { interactive: true });
  }
}

function renderChart(ctx, width, height, style, options = {}) {
  const interactive = options.interactive !== false;
  const margin = {
    top: style.plotTop,
    right: style.plotRight,
    bottom: style.plotBottom,
    left: style.plotLeft,
  };
  if (width - margin.left - margin.right < 140) margin.right = Math.max(10, width - margin.left - 140);
  if (height - margin.top - margin.bottom < 140) margin.bottom = Math.max(10, height - margin.top - 140);
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const visibleRows = ["ctrl", "exp"].flatMap((key) => (seriesStyle(key, style).visible ? getSeriesRows(key, style) : []));
  const hasData = visibleRows.some((row) => Number.isFinite(row.mean));

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = style.chartBgColor;
  ctx.fillRect(0, 0, width, height);
  if (interactive) {
    state.hoverPoints = [];
    state.draggableItems = [];
    state.chartGeometry = null;
  }

  if (!hasData) {
    ctx.fillStyle = style.textColor;
    ctx.font = canvasFont(style, style.globalFontSize + 1);
    ctx.textAlign = "center";
    ctx.fillText("请输入 PRP+BTX-A 和 PRP 原始数据后生成图表", width / 2, height / 2);
    if (interactive) els.subtitle.textContent = "等待输入原始数据";
    return;
  }

  let xDomainMin = state.view?.xMin ?? style.xMin;
  let xDomainMax = state.view?.xMax ?? style.xMax;
  if (xDomainMax <= xDomainMin) xDomainMax = xDomainMin + 1;
  let yMin = state.view?.yMin ?? style.yMin;
  let yMax = state.view?.yMax ?? style.yMax;
  if (yMax <= yMin) yMax = yMin + Math.max(1, style.yStep);
  const yRange = { min: yMin, max: yMax, step: style.yStep };
  const xScale = (day) => margin.left + ((day - xDomainMin) / (xDomainMax - xDomainMin)) * plotW;
  const yScale = (value) => margin.top + (1 - (value - yRange.min) / (yRange.max - yRange.min)) * plotH;
  const xInvert = (x) => xDomainMin + ((x - margin.left) / plotW) * (xDomainMax - xDomainMin);
  const yInvert = (y) => yRange.min + (1 - (y - margin.top) / plotH) * (yRange.max - yRange.min);

  ctx.fillStyle = style.plotBgColor;
  ctx.fillRect(margin.left, margin.top, plotW, plotH);

  drawGrid(ctx, style, margin, plotW, plotH, xScale, yScale, yRange);
  drawAxes(ctx, style, margin, plotW, plotH, width, height, xScale, yScale, yRange, xDomainMin, xDomainMax);

  ctx.save();
  ctx.beginPath();
  ctx.rect(margin.left, margin.top, plotW, plotH);
  ctx.clip();
  drawSeries(ctx, "ctrl", xScale, yScale, style, interactive);
  drawSeries(ctx, "exp", xScale, yScale, style, interactive);
  if (style.showDifference) drawDifferenceTrend(ctx, xScale, margin, plotW, plotH, style);
  if (style.showMaxImprovement) drawMaxImprovementMarker(ctx, xScale, margin, plotW, plotH, style);
  ctx.restore();

  drawAxisTitlesAndLegend(ctx, style, margin, plotW, plotH, width, height, interactive);

  if (state.drag?.active && state.drag.mode === "zoom") {
    drawZoomBox(ctx, state.drag);
  }

  if (interactive) {
    state.chartGeometry = { margin, plotW, plotH, width, height, xDomainMin, xDomainMax, yMin, yMax, xInvert, yInvert };
    els.subtitle.textContent = `PRP+BTX-A ${state.expRows.length} 行，PRP ${state.ctrlRows.length} 行`;
  }
}

function renderBarChart(ctx, width, height, style, options = {}) {
  const interactive = options.interactive !== false;
  const margin = {
    top: style.plotTop,
    right: style.plotRight,
    bottom: style.plotBottom,
    left: style.plotLeft,
  };
  if (width - margin.left - margin.right < 140) margin.right = Math.max(10, width - margin.left - 140);
  if (height - margin.top - margin.bottom < 140) margin.bottom = Math.max(10, height - margin.top - 140);
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const visibleRows = ["ctrl", "exp"].flatMap((key) => (barSeriesStyle(key, style).visible ? getSeriesRows(key, style) : []));
  const hasData = visibleRows.some((row) => Number.isFinite(row.mean));

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = style.chartBgColor;
  ctx.fillRect(0, 0, width, height);
  if (interactive) {
    state.hoverPoints = [];
    state.draggableItems = [];
    state.chartGeometry = null;
  }

  if (!hasData) {
    ctx.fillStyle = style.textColor;
    ctx.font = canvasFont(style, style.globalFontSize + 1);
    ctx.textAlign = "center";
    ctx.fillText("请输入 PRP+BTX-A 和 PRP 原始数据后生成柱状图", width / 2, height / 2);
    if (interactive) els.subtitle.textContent = "等待输入原始数据";
    return;
  }

  let xDomainMin = state.view?.xMin ?? style.xMin;
  let xDomainMax = state.view?.xMax ?? style.xMax;
  if (xDomainMax <= xDomainMin) xDomainMax = xDomainMin + 1;
  let yMin = state.view?.yMin ?? style.yMin;
  let yMax = state.view?.yMax ?? style.yMax;
  if (yMax <= yMin) yMax = yMin + Math.max(1, style.yStep);
  const yRange = { min: yMin, max: yMax, step: style.yStep };
  const xScale = (day) => margin.left + ((day - xDomainMin) / (xDomainMax - xDomainMin)) * plotW;
  const yScale = (value) => margin.top + (1 - (value - yRange.min) / (yRange.max - yRange.min)) * plotH;
  const xInvert = (x) => xDomainMin + ((x - margin.left) / plotW) * (xDomainMax - xDomainMin);
  const yInvert = (y) => yRange.min + (1 - (y - margin.top) / plotH) * (yRange.max - yRange.min);

  ctx.fillStyle = style.plotBgColor;
  ctx.fillRect(margin.left, margin.top, plotW, plotH);
  drawGrid(ctx, style, margin, plotW, plotH, xScale, yScale, yRange);
  drawAxes(ctx, style, margin, plotW, plotH, width, height, xScale, yScale, yRange, xDomainMin, xDomainMax);

  ctx.save();
  ctx.beginPath();
  ctx.rect(margin.left, margin.top, plotW, plotH);
  ctx.clip();
  drawBarSeries(ctx, xScale, yScale, style, margin, plotH, interactive);
  if (style.showMaxImprovement) drawMaxImprovementMarker(ctx, xScale, margin, plotW, plotH, style);
  ctx.restore();

  drawAxisTitlesAndLegend(ctx, style, margin, plotW, plotH, width, height, interactive, drawBarLegend);

  if (interactive) {
    state.chartGeometry = { margin, plotW, plotH, width, height, xDomainMin, xDomainMax, yMin, yMax, xInvert, yInvert };
    els.subtitle.textContent = `闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇川绾剧晫鈧箍鍎遍幏鎴︾叕椤掑倵鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝懐顦ч柣蹇撶箲閻楁鈧矮绮欏铏规嫚閺屻儱寮板┑鐐板尃閸曨厾褰炬繝鐢靛Т娴硷綁鏁愭径妯绘櫓闂佸憡鎸嗛崪鍐簥闂傚倷鑳剁划顖炲礉閿曞倸绀堟繛鍡樻尭缁€澶愭煏閸繃宸濈痪鍓ф櫕閳ь剙绠嶉崕閬嶅箯閹达妇鍙曟い鎺戝€甸崑鎾斥枔閸喗鐏堝銈庡幘閸忔﹢鐛崘顔碱潊闁靛牆鎳愰ˇ褔鏌ｈ箛鎾剁闁绘顨堥埀顒佺煯缁瑥顫忛搹瑙勫珰闁哄被鍎卞鏉库攽閻愭澘灏冮柛鏇ㄥ幘瑜扮偓绻濋悽闈浶㈠ù纭风秮閺佹劖寰勫Ο缁樻珦闂備礁鎲￠幐鍡涘椽閸愵亜绨ラ梻鍌氬€烽懗鍓佸垝椤栫偛绀夐柨鏇炲€哥粈鍫熺箾閸℃ɑ灏紒鈧径鎰厪闁割偅绻冨婵堢棯閸撗勬珪闁逞屽墮缁犲秹宕曢柆宥呯闁硅揪濡囬崣鏇熴亜閹烘垵鈧敻宕戦幘鏂ユ灁闁割煈鍠楅悘鍫濐渻閵堝骸骞橀柛蹇旓耿閻涱噣宕橀纰辨綂闂侀潧鐗嗛幊鎰八囪閺岋綀绠涢幘鍓侇唹闂佺粯顨嗛〃鍫ュ焵椤掍胶鐓紒顔界懃椤繘鎼圭憴鍕彴闂佸搫琚崕鍗烆嚕閺夊簱鏀介柣鎰緲鐏忓啴鏌涢弴銊ュ箻鐟滄壆鍋撶换婵嬫偨闂堟刀銏犆圭涵椋庣М闁轰焦鍔栧鍕熺紒妯荤彟闂傚倷绀侀幉锟犲箰閸℃稑妞介柛鎰典簻缁ㄣ儵姊婚崒姘偓宄懊归崶顒夋晪闁哄稁鍘奸崹鍌炲箹濞ｎ剙濡肩紒鈧崘顔界叆婵犻潧妫欓ˉ婊堟煟閿曞倷鎲炬慨濠傤煼瀹曟帒鈻庨幒鎴濆腐婵＄偑鍊戦崹褰掓晝閵堝鐓濈€广儱顦崡鎶芥煏韫囨洖啸妞ゆ柨顦靛娲箹閻愭彃濮堕梺鍛婃尰閻熲晠骞冨鈧獮搴ㄦ嚍閵壯冨箰闂備礁鎲￠崝鎴﹀礉鎼淬垺娅犻柡鍥╁Х绾惧ジ鏌嶈閸撶喎鐣峰鈧崺鐐村緞閸濄儳娉块梻鍌氼煬閸嬪嫬煤閵堝悿褰掓倻閸撳灝娲弫鍐焵椤掑嫭绠掓繝鐢靛Т閿曘倝鎮ц箛娑欏仼婵炲樊浜濋悡娑㈡倶閻愰鍤欏┑鈥炽偢閺屽秶鎲撮崟顐や紝閻庤娲栧畷顒勫煝鎼淬倗鐤€闁规儳顕Σ妤冪磽閸屾艾鈧悂宕愰悜鑺モ挃鐎广儱顦粈澶屸偓鍏夊亾闁告洦鍊犺閺岀喖姊荤€靛壊妲梺钘夊暟閸犳牠寮婚敐澶婃闁割煈鍠楅崐顖炴⒑缁嬪潡顎楅柣顓炲€垮璇测槈濡攱鏂€闂佸憡娲﹂崑鍕叏閵忋倖鍋犳慨妯哄⒔閻ｅ灚鎱ㄦ繝鍕笡闁瑰嘲鎳樺畷銊︾節閸愩劌澹嶉梻鍌欑劍濡炲潡宕㈡總鏉嗗洦娼忛埡鍌ゆ綗闂佺粯鍔曢顓㈡偡瑜版帗鐓冪憸婊堝礈閻旈晲绻嗛悗娑櫳戞刊鎾煕閹惧啿绾х€点倖妞藉娲焻閻愯尪瀚板褍鐡ㄩ〃銉╂倷閹绘帗娈梺瀹狀嚙闁帮綁鐛Ο铏规殾闁搞儴娉涢弲锝呪攽閿涘嫬浜奸柛濠冪墵楠炴劖銈ｉ崘銊╂７闂侀潧顦崕娆忊槈濠婂孩鈻屾繝娈垮枛閿曘倝鈥﹀畡鎵殾闁圭儤鍨熼弸搴ㄦ煙鐎电啸鐎规洖寮剁换婵嬫偨闂堟稐绮ч梺鍛婄墱婵炩偓鐎规洘顨婇幃娆擃敆閸屾顫嶉梻浣哥枃椤曆囨煀閿濆宓侀悗锝庡枟閸婄兘鎮楀☉娆欎緵闁哥偛鐖煎濠氬磼濞嗘埈妲┑鐘亾闂侇剙绉寸壕鍧楁煏閸繍妲堕柍褜鍓欓崯鎾嵁閸ヮ剦鏁婇柛鎾楀本笑闂傚倷绀侀幖顐ょ矓閺屻儱绀夐幖杈剧到婵剟鏌嶈閸撶喎顫忔繝姘＜婵ê宕·鈧┑鐐存尰绾板秹銆冩繝鍌滄殾闁哄洢鍨圭粻娑㈡煟濡も偓閻楀繘宕㈤幖浣光拺闁告稑锕ｇ欢閬嶆煕閻樺啿鍝虹€规洩缍侀崺鈧い鎺戝閳锋垿鏌涘┑鍡楊仾婵犫偓閹殿喚纾奸悗锝庡亜閻忔挳鏌涢埞鍨姕鐎垫澘瀚伴獮鍥敆閸屻倖鏁ら梻鍌欒兌缁垶宕濋弴鐐嶇喐绻濋崒銈囧姺缂傚倷鐒︾湁缂佽妫濋弻锝夊箛閸忓摜鐩庨梺閫炲苯澧柛銊ョ仢閻ｇ兘寮撮姀鐘烘憰闂侀潧顧€缁犳垵鈻撻悙缈犵箚闁靛牆绻掗崚浼存煕閻曚礁浜伴柟顔光偓鎰佹建闁逞屽墴瀵鎮㈢悰鈥充壕闁汇垺顔栭悞鎯归悩宕囩煂缂佽鲸甯￠幃鈺呮濞戞帗鐎版繝娈垮枛閿曘劌鈻嶉敐鍥у灊婵炲棙鎸哥粈宀勬煃閳轰礁鏆為柡鍡欏娣囧﹪鎮欓鍕ㄥ亾閹达箑绀夐悘鐐跺▏濞戞ǚ鏀介悗锝庡墮缁侊箓姊洪崜鎻掍簴闁稿氦椴搁崕顐︽⒒娴ｇ鏆遍柟纰卞亰瀹曟劙骞栨担鍝ュ姦濡炪倖宸婚崑鎾淬亜椤撶姴鍘寸€殿喖顭烽弫鍐焵椤掑啰浜藉┑鐐存尰閸戝綊宕规潏顭戞闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟鐑橆殕閸庡孩銇勯弽銊ュ毈婵炲吋鐗犻弻褑绠涢幘纾嬬缂佺偓鍎抽崥瀣┍婵犲浂鏁嶆慨姗嗗幗閸庢挸顪冮妶搴′簻闂佸府绲介～蹇涙惞閸︻厾鐓撻柣鐘充航閸斿秴危閳ь剟姊绘担渚劸闁挎洏鍎抽幑銏ゅ磼閻愭潙浠奸梺缁樺灱濡嫮绮婚敐澶嬬厽婵妫楁禍婊兠瑰鍫㈢暫闁哄被鍔岄埞鎴﹀幢濞戞墎鍋撳Δ鍛厸閻庯綆鍓欓弸娑㈡煛瀹€瀣М妤犵偞顭囬幑鍕倻濡皷鍋撻悙顒傜闁挎繂鎳忛幖鎰版煥閺囥劋閭柕鍡曠閳藉螣闁垮鏉搁梻浣虹《閸撴繈銆冮崱娑樼？妞ゅ繐鎳愮弧鈧梺姹囧灲濞佳嗏叴闂備胶顭堥鍡涘箰閹间焦绠掗梻浣虹帛閿氭俊顖氾躬瀹曟洟骞囬悧鍫㈠幗闂佽鍎抽崯鍧楀汲閻斿吋鐓欓柤纰卞墻閻掔偓銇勯婊冨鐎规洜鍘ч埞鎴﹀醇椤愶及婵嗏攽閻樺灚鏆╅柛瀣仱瀹曞綊宕滄担鍛婄€抽悗骞垮劚椤︿粙寮崘顔界厾闁诡厽甯掗崝婊堟煕濞嗗繒绠查柟渚垮妼铻栭柍褜鍓欒灋婵°倓鐒﹀▍鐘测攽閻樺磭顣查柣鎾存礋閺屾洟宕煎┑鍥舵！缂備讲鍋撻悗锝庡枟閻撴稓鈧厜鍋撻柍褜鍓熷畷浼村箻閼告娼熼梺鍦劋椤ㄥ懘锝為崨瀛樼厽婵☆垵娅ｉ敍宥吤瑰搴濈凹濞ｅ洤锕幃娆擃敂閸曘劌浜鹃柕鍫濐槸绾惧鏌涢弴銊ョ仩缂佺姷濮甸幈銊ヮ渻鐠囪弓澹曢柣搴㈩問閸犳盯顢氳椤㈡﹢宕楅悡搴ｇ獮婵犵數濮寸€氼剟鐛幇顑芥斀闁绘劘鍩栬ぐ褏绱掗煫顓犵煓妤犵偛顦甸崹楣冨棘閵夛妇浜栭梻浣告惈鐞氼偊宕曢弻銉ョ厱闁瑰濮风壕钘壝归敐鍫殐闁绘帞鏅槐鎺楁偐瀹曞洤顫х紓浣虹帛閻╊垶骞婇悩娲绘晢闁逞屽墴瀵憡鎯旈～顑跨盎濡炪倖鍔戦崹鑽ょ不瀹曞洨纾奸弶鍫涘妼缁楁帡鎽堕敐澶嬪仯闁搞儜鍕ㄦ灆闂侀€炲苯澧柟鐟版搐椤繐煤椤忓懎娈熼梺闈涱槸閸犳碍绂嶉鍫濇瀬鐎广儱鎷嬮崥瀣熆鐠虹尨鍔熸い鏃€甯炵槐鎾诲磼濞嗘垵濡藉銈庡幖濞差厼鐣烽敐澶婂耿婵＄偟绮弬鈧俊鐐€栧褰掑几缂佹鐟规繛鎴欏灪閻撴洘淇婇娑卞劌婵炲吋鍔楃槐鎺楀磼濮樻瘷銏°亜椤撴粌濮傜€规洖銈搁幃銏ゅ传閸曨偅杈堥梻鍌氬€风粈渚€骞栭锕€鐤い鎰ㄦ寣瑜版帒纾奸柣鎰絻閹偛鈹戦悙鍙夘棡闁圭顭烽幃锟犳偄閼测晛褰勯梺鎼炲劘閸庨亶宕濋妶鍥╂／闁硅鍔栫涵鍓佺磼鏉堛劌绗氭繛鐓庣箻婵℃悂濡烽敃浣烘闂佽瀛╅鏍闯椤曗偓瀹曟娊鏁愰崨顖涙闂佸湱鍎ら崺鍫濐焽閳哄倶浜滈柟鎹愭硾灏忛梻渚囧弾閸ㄤ即鍩為幋鐐茬疇闂佺锕ラ〃鍡涘箞閵娾晜鍊婚柦妯侯槺閿涙盯姊虹紒妯哄闁诲繑宀稿鍐差煥閸喓鍙嗛梺缁樻煥閹碱偄鏆╅柣搴ゎ潐閹搁娆㈠璺虹畺婵°倕鎳忛弲鏌ュ箹缁懓澧查柣蹇撶墢缁辨挻绗熼崶褌绨荤紓浣割槸缂嶅﹤顕ｇ拠宸悑闁割偒鍋呴鍥⒒娴ｅ憡鍟為柟鎼佺畺瀹曠増鎯旈…鎴炴櫔闂佹寧绻傞ˇ浠嬪极閸℃稒鐓曢柡鍥ュ妼娴滅偤鏌涢弮鎾剁暠妞ゎ亜鍟存俊鍫曞幢濡ゅ啰鎳嗛梺璇插閸戝綊宕ｉ崘顔兼槬婵炴垯鍨圭粻鎶芥煙閻愯棄濡肩紓宥咃躬瀵偊骞囬弶鍧楀敹闂佺粯娲戝鎺楀传濡ゅ懏鈷戞慨鐟版搐閻掓椽鏌涢妸鈺€鎲鹃柟顖氬椤㈡盯鎮欓懠鑸垫啺婵犵數鍋為崹顖炲垂閸︻厾灏电€广儱顦伴悡鍐喐濠婂牆绀堥柣鏃傚帶閺嬩線鏌涢幇闈涙灈妞ゎ偄鎳橀弻锝呂熼搹閫涚驳濠电偛鐗婇崕鎶藉煘閹达附鍊烽柛娆忣槴閺嬫瑦绻涚€涙鐭嬬紒顔芥尭閻ｅ嘲顫滈埀顒勫春閳ь剚銇勯幒鍡椾壕濡炪値浜滈崯瀛樹繆閸洖骞㈡俊銈呭暕濞ｎ噣鏌ｉ悢鍝ョ煁濠㈢懓妫濆畷鎴濃槈濞嗘劖鐝″┑鐘茬棄閺夊簱鍋撻弴銏犵疇闊洦绋戠壕濠氭煃閳轰礁鏆熺紒鈾€鍋撳┑鐘垫暩婵挳宕愰幖浣告辈闁绘棁娅ｇ壕濂告煟濡厧鍔嬮柣婵愪簻鑿愰柛銉戝秷鍚悗瑙勬穿缁叉儳顕ラ崟顒傜瘈闁稿被鍊栫紞鎺戔攽鎺抽崐妤佹叏閻戣棄纾婚柣鎰仛閺嗘粓鏌熼悜妯荤濞存粍鐟ラ埞鎴︽倷閼搁潧娑х紓浣藉紦缁瑩鐛径鎰櫢闁绘瑢鍋撻柡浣告搐閳规垿鎮╁畷鍥舵殹闂佹娊鏀辩敮鎺楁箒闂佹寧绻傞幊蹇涘箚閸儲鍋ㄦい鏍ㄦ皑閸╋綁鏌″畝鈧崰鎾诲箯閻樹警妲剧紓浣叉閸嬫挻淇婇悙顏勨偓鎴﹀垂濞差亝鍋￠柍杞扮贰閸ゆ洖霉閻樺樊鍎岄柍褜鍓氶悧鐘汇€佸Δ浣瑰闁绘垶锚閸ㄩ亶鏌ｆ惔銈庢綈婵炲弶绮撳畷浼村冀椤撴壕鍋撴担绯曟婵☆垶鏀遍～宥夋⒑閸︻厼鍔嬮柟鍛婃倐椤㈡棁銇愰幒鎾嫽闂佺鏈悷褔藝閿旂晫绡€闁逞屽墴閺屽棗顓兼担鎻掍壕闁挎洖鍊搁柋鍥煃閸ㄦ稒娅呭ù婊呭亾缁绘盯骞嬮悙鑼懖濠电偛鎳庡ú銈夆€︾捄銊﹀枂闁告洦鍓涢ˇ鏉课旈悩闈涗沪闁绘顨婇獮蹇涘川閺夋垶宓嶅銈嗘尵閸嬫稓绮婚悙鐑樷拻闁稿本鐟х粣鏃€绻涙担鍐叉礌閳ь剨绠撳畷濂稿Ψ閵壯嶇串婵犲痉鏉库偓鏇㈠箠韫囨稑纾挎俊銈勮兌缁犻箖鏌涢埄鍏狀亪鎮樺澶嬬厱閻庯綆鍋呯亸顓㈡煃缂佹ɑ宕岀€规洖缍婇、娆撴偩鐏炲ジ鍋楁繝纰夌磿閸嬫垿宕愰妶澶婂偍濠靛倻顭堟惔濠囨煛鐏炶鍔滈柛瀣ф櫊閺岋綁骞嬮敐鍡╂缂佺虎鍘搁崑鎾绘⒒娴ｈ櫣甯涢柛鏃€娲滅划鏃堟濞戣鲸缍庨梺闈╁瘜閸樿棄鐣烽崣澶岀瘈闂傚牊渚楅崕蹇曠棯閹冩倯缂佺粯鐩獮瀣倷閸愨晛鍝虹€规洘鍨块獮妯好虹紒妯绘珫闂備胶绮崝妤冩偘閵夆晛绠紓浣诡焽缁犻箖寮堕崼婵嗏挃闁告帊鍗抽弻鐔烘嫚瑜忕弧鈧悗瑙勬处閸ㄥ爼骞冨▎鎾村€绘俊顖滃帶楠炲牓姊绘担鍛婃儓闁稿﹤顭峰畷鎴濃槈閵忕姷鐤囬柟鑹版彧缁查箖顢曟禒瀣厪闁割偅绻嶅Σ褰掓煟閹捐泛鈻堥柡宀€鍠栭、姗€鎮㈡搴ｆ噯闂備礁鎲￠弻锝夊磹閺嶎厼桅闁告洦鍨伴悡娑㈡煕鐏炵偓鐨戠紒浣哄厴閺屟呯磼濡厧鈷岄梺鍝勮閸斿矂鍩為幋锕€骞㈡俊顖滃劋椤忕娀姊绘担鍛婃儓婵☆偅鐩畷鎴﹀Χ婢跺﹨鎽曢梺鎸庣箓椤︻垳绮绘繝姘€垫繛鎴炵懐閻掕姤銇勯敂鍝勫缂佽鲸鎸婚幏鍛存惞閻熸壆顐奸梻浣哄劦閺呪晠宕归崼鏇熷仒妞ゆ棃鏁崑鎾绘晲鎼粹剝鐏嶉梺绋匡功閸忔﹢寮诲☉鈶┾偓锕傚箣濠靛懐鐩庢繝鐢靛仜閹冲繘銆冮崼銏☆潟闁规崘顕х壕鍏兼叏濮楀棗鍘撮柛瀣崌瀹曨偊濡疯閻撳姊哄Ч鍥х伄妞ゎ厼鐗撳畷褰掑磼閻愬鍘遍悷婊冮叄閵嗗啴宕ㄧ€涙ê鐝旈梺缁樻煥閸氬鎮￠妷锔剧瘈闂傚牊绋掗敍宥嗕繆椤栨氨澧﹂柡灞稿墲閹峰懘宕ㄦ繝鍌涚亷闂備礁鎼惌澶岀礊娴ｅ壊鍤曢柡澶嬪焾濞尖晠鏌涘Δ鍐ㄤ粶妞ゎ剙顦靛缁樻媴妞嬪簼瑕嗙紓鍌氱М閸嬫挸鈹戦悙宸Ч闁烩晩鍨堕崹楣冨籍閸繄顦ㄥ銈嗘煥濡插牐顦规鐐寸墱閸掓帡宕楁径濠佸閻庤娲栧ú銈夊箺鐎ｎ亖鏀介柣妯虹仛閺嗏晠鏌涚€ｎ偆娲撮挊婵嬫煛婢跺绱╂繛宸簼閸嬪嫰鏌ゅù瀣珔缂佷緤绠撳铏规兜閸涱喖娑х紓浣哄У閸ㄥ湱鍒掗崼鈶╁亾閿濆骸浜栧ù婊勭矒閺屸€愁吋閸愩劌顬嬮梺鎰佸灡濞茬喖寮诲☉娆愬劅妞ゆ柨顭烽崑妤€鈹戦纭锋敾婵＄偘绮欓獮濠囨晸閻樺弬褔鏌涘☉鍗炴灓濞存粠浜缁樻媴娓氼垳鍔稿銈嗗灥閹虫﹢寮崘顕呮晜闁告洟娼у▓銊╂⒑閻熸澘顣抽柣鈩冩瀵偊宕掗悙瀵稿幈闂佹枼鏅涢崯浼村箠閸涘瓨鐓ユ繛鎴炵懅缁犵偞鎱ㄦ繝鍛仩缂侇喗鐟╅獮鎰償閵忊€愁伆闂傚倷娴囧畷鐢稿疮閸ф鐤炬繛鎴旀噰閳ь剚鐗楃换婵嬪炊閵娿儮鍋撴繝姘厾闁诡厽甯掗崝銈夋煕濮椻偓娴滆泛顫忓ú顏勪紶闁告洦鍋€閸嬫捇鎸婃径鍡樼亙闂佸搫娲㈤崹娲磹閸ф鐓欓梻鍌氼嚟閸斿秹鏌ｉ幘鍐叉殻闁哄本娲樺鍕熼搹閫涘寲闂備椒绱紞浣圭閸洖钃熼柨婵嗩槹閺呮煡鐓崶銊︾闁伙箑鐗撳娲传閸曨喖顏┑鐐叉▕閸欏啫顕ｉ锕€纾奸柣鎰綑娴犲ジ鎮楅崗澶婁壕闂侀€炲苯澧撮柛鈹垮灪瀵板嫭绻涢悙顒佹澑闂備胶绮敋闁诲繑宀稿鎶藉煛閸涱喚鍘遍柣搴秵閸嬪棝鍩ユ径鎰嚉闁挎繂鎳夐弨浠嬫煟濡绲婚柡鍡欏枑閵囧嫰鍩℃担鍝ラ獓缂備胶绮换鍫澪涢崘銊㈡闁告鍋涙竟鍫㈢磽娴ｅ搫浜鹃柛搴㈠▕閳ワ箓鎮滈挊澶庢憰闂侀潧艌閺呮粓宕戦崟顖涚厱婵犻潧妫楅悵鏃堟煥濠靛棭妲归柣鎾跺枛閺岀喖骞戦幇顓犮€愰梺鍝勵儐閸ㄤ絻褰侀梺鎼炲劀瀹ュ牆鎯堝┑鐘殿暯閳ь剙纾崺锝団偓瑙勬礃鐢帡锝炲┑瀣垫晝闁靛繆鏅滈ˉ锟犳⒒閸屾艾鈧悂宕愰悜鑺ュ殑闁告挷绀侀崹婵囥亜閺嶎偄浜奸柍褜鍓欓崯鏉戠暦閵娧€鍋撳☉娅虫垵鈻嶉崶褜娓婚柕鍫濇噽缁犱即鎮楀鐓庢珝鐎殿喗濞婇弫鍐磼濞戞艾骞愰梻浣规偠閸庮垶宕曢柆宥嗗€堕柍鍝勫暟绾惧ジ鏌ｅΟ鐑樷枙闁绘挸銈搁弻锛勪沪閸撗勫垱濡ょ姷鍋為敃銏ゅ箠閻樺灚宕夐柛婵嗗閼垫劙姊婚崒娆戝妽閻庣瑳鍛煓闁圭儤姊瑰畷鏌ユ煕閹板吀绨肩€规洖寮剁换娑㈠箣閻愬灚鍣紓鍌氱Т濞差參寮诲☉銏犵婵°倐鍋撻柛鐕佸亰閹繝宕掑锝嗘杸闂佺粯锕╅崰鏍倶椤曗偓閺岀喖鎼归锝呯３闂佽桨绀侀崯瀛樹繆閸洖宸濇い鎾跺О閸嬫帡姊婚崒姘偓椋庣矆娴ｈ櫣绀婂┑鐘蹭迹濞戙垹閿ゆ俊銈勭閳ь剙娼￠弻銊╁即閻愭祴鍋撹ぐ鎺戠；闁稿瞼鍋為悡鐔兼煛閸屾氨浠㈤柟顔藉灴閺岋綁骞樼€垫悶鈧帡鏌嶈閸撴瑧绮诲澶婄？閺夊牜鐓堝▓浠嬫煕濞戞﹫鍔熸い鈺佸级缁绘繃绻濋崒婊冾杸闂佺顑冮崝宥夊Φ閸曨垰鍐€闁靛濡囧▓銈夋⒑缁洘娅旂紓宥勭窔瀵鍨惧畷鍥ㄦ畷闁诲函缍嗛崜娑溾叺闂傚倷娴囧銊╂倿閿曞倸绀夋繛鍡楃箳閺嗭箓鏌曟繛鐐珦闁轰礁娲弻锝夊籍閳ь剚绔熼弴銏犵柧闁绘ê妯婂鏍煣韫囨挸甯ㄩ柛瀣崌瀹曠兘顢橀悜鍡忓亾鐏炲墽绠鹃柛蹇曞帶婵秹鏌＄仦鍓ф创濠碘剝鎮傛俊鐤槺闁惧繐閰ｅ鐑樺濞嗘垶鍋ч梺绋跨箲閿曘垹顕ｆ繝姘耿婵°倕锕ら幃鎴︽⒑閸涘﹣绶遍柛銊ゅ嵆閻涱噣骞囬鑺ユ杸闂佺粯鍔橀崺鏍亹瑜忕槐鎺楀箵閹烘挸浠村Δ鐘靛仜閿曨亪鐛Ο鍏煎珰闁肩⒈鍓欐慨锔戒繆閻愵亜鈧牜鏁幒妞濆洭顢涢悙鏉戔偓鍫曟煟濡偐甯涢柣鎾冲暣閹嘲鈻庤箛鎿冧患闂佽绻戦幐鎶藉蓟閻旂⒈鏁婇悷娆忓閻濇艾顪冮妶鍐ㄧ仾闁荤啿鏅犻獮濠囧冀椤撶偟鍘搁梺閫炲苯澧版俊鍙夊姇铻ｉ柤濮愬€楅惁鍫ユ⒑濮瑰洤鐏叉繛浣冲嫮顩锋繝濠傚娴滄粓鏌ㄩ弬璺ㄤ虎鐎规挸妫濋弻鐔碱敍濮橆剦浼冨銈冨灪閻╊垶骞冨▎鎿冩晜濞达綁鏅叉竟鏇熺箾閹炬潙鐒归柛瀣尵閳ь剚顔栭崰鏇犲垝濞嗘挶鈧礁顫滈埀顒勫箖濞嗘挻顥堟繛鎴炲笒娴滈箖鏌ｉ幇顒佲枙婵炴挸顭烽弻鏇㈠醇濠靛浂妫為梺绉嗗喛韬柡灞剧〒閳ь剨缍嗛崑鍛暦瀹€鍕厸閻忕偛澧介妴鎺懨归悪鍛洭闁归濞€楠炴捇骞掑┑鍥╃У闂傚倸鍊风粈渚€骞栭锕€瀚夋い鎺戝€婚惌娆撴煙鏉堝墽鎮煎ù婊勭懇濮婄粯鎷呴崨濠傛殘闂佸憡姊归崹鍨暦濠靛牃鍋撻敐搴樺亾椤栧棗鍚橀弮鍫濆窛妞ゆ棁顫夌€氬ジ姊洪懡銈呬沪缂佸鐗撻崺鈧い鎺嗗亾闁告ɑ鐗楃粩鐔煎即閻愨晜鏂€闂佺粯鍔曞Ο濠囧吹閻斿皝鏀芥い鏃囧Г鐏忥附銇勯姀锛勫⒌鐎规洖宕埥澶娾枎韫囧海鏆楅梻鍌欒兌缁垶寮婚妸鈺佽Е閻庯綆鍠楅崑鍌涚箾閸℃ɑ灏伴柍閿嬪灦閵囧嫰骞橀崡鐐差瀷闂佷紮绲藉畷顒勨€﹂懗顖ｆ闂佸摜濮靛銊ノｉ幇鏉跨婵°倓绀佹禍鐓庘攽閻愬弶顥滅紒缁樺姍椤㈡棃濡烽妷鍐嚀椤劑宕熼鐘靛帨闂備礁鎼張顒€煤濡警鍤楅柛鏇ㄥ亐濡插牊鎱ㄥΔ鈧Λ娆撳窗濮椻偓濮婄粯鎷呯憴鍕╀户闂佸憡锚閵堟悂骞嗘径鎰殐闁冲搫鍋嗗鐔兼⒑閸︻厼鍔嬮柟姝屽吹缁辩偤宕堕浣哄帾婵犵數鍋涢悘婵嬪礉閵堝棎浜滈柟瀛樼箓閳ь剝宕靛Σ鎰板箻鐎涙ê顎撴繛瀵稿Т椤戝懘骞楅悽鍛婄厽闁靛繆鏅涢悘锟犳偨椤栨粌鏋涢柟顔斤耿楠炴帒螖娴ｅ弶瀚奸梻浣筋嚃閸ㄥ酣宕ㄩ锝呮櫏濠碉紕鍋戦崐鏍哄鈧幃褔鎮╅懠顒佹闂佸搫娲ㄩ崑鐔煎汲閸℃稒鐓冪憸婊堝礈濞戞锝夊箛閺夎法顔掗柣鐘叉穿鐏忔瑩鏁嶅鍐ｆ斀闁绘劕寮堕ˉ鐐烘煕閵娿劌浜圭紒顕嗙到铻栭柛娑卞枓閹锋椽姊洪崨濠勭細闁稿氦椴搁悧搴㈢節濞堝灝鏋熼懣褔鏌涢弮鈧崹鐢告偩瀹勯偊娼╅悹楦挎椤斿﹤鈹戞幊閸婃洟鏁冮妷鈺佺柧妞ゆ巻鍋撻柍瑙勫灴閹晝鎷犺娴兼劙鏌ｆ惔銏犲毈闁告挻宀搁獮鍡涘籍閳ь剛鎹㈠┑瀣＜婵°倓鐒﹂弶鎼佹⒒娴ｈ櫣甯涙い顓炴川閸掓帡顢涘锝嗩潔閻熸粌瀛╃粚杈ㄧ節閸ヨ埖鏅濆銈嗗姂閸ㄥ湱绮婚悷閭︽富闁靛牆楠搁獮鏍ㄧ箾瀹割喖寮€规洘妞介弫鎾绘偐閼碱剨绱叉繝纰樻閸ㄦ澘锕㈤柆宥嗗剮閹兼番鍔嶉埛鎺懨归敐鍥╂憘婵炲吋鍔楅埀顒冾潐濞叉﹢鏁嬮梺宕囩帛閺屻劑鍩ユ径濞㈢喖宕楅崗鐓庢珣婵犵數濮撮惀澶愬级鎼存挸浜炬俊銈勭劍閸欏繘鏌ｉ幋锝嗩棄缁炬儳顭烽弻锝夊箛椤掍焦鍎撶紓浣插亾濠㈣泛顑囩粻楣冩煕閳╁叐鎴犱焊椤撱垺鐓㈤柛鎰典簻閺嬫盯鏌＄仦璇插闁宠鍨垮畷鍗烆潨閸℃﹫绱掗梻鍌欒兌椤牆霉閻戣棄绐楅柡宥庡幖閽冪喓鈧箍鍎遍ˇ顖氭暜闂備線娼чˇ顓㈠磿閹绘崼鎺楀箛閻楀牏鍘告繝銏ｆ硾閿曪附鏅堕弴銏＄厵闁惧浚鍊嬮鍫稏闊洦绋掗幆鐐烘煕閿旇骞橀柣鎾存尭閳规垿鎮欓崣澶樻！闂佺瀛╂繛濠傜暦濠婂牊鐒肩€广儱妫岄幏娲⒑闂堚晛鐦滈柛妯圭矙瀹曠敻鍩€椤掆偓閳规垿鎮欓崣澶嗘灆闂佸憡锚閵堟悂銆佸鑸垫櫜闁搞儯鍔岄悵浼存倵閻熸澘顥忛柛鐘崇墵楠炲啴骞嬮敂瑙ｆ嫼闂佸憡鎸昏ぐ鍐╃娴犲鐓曢悗锝庝簼閸ゅ洦銇勯姀鈩冨磳鐎规洖鐖奸、妤佹媴閸欏顏烘繝鐢靛仩閹活亞寰婃禒瀣疅闁跨喓濮撮悿顕€鏌ｉ幇顔煎妺闁绘挻鐟╅弻鐔兼⒒绾惧鍘￠梺浼欑秬濞咃綁鍩€椤掑喚娼愭繛鍙夌矋閺呰泛螖閸涱厾鐣鹃梺鍝勫暙閻楀棙鍎梻浣瑰濞插秹宕戦幘瓒佸綊鎮╃仦鍌氫划濠殿喖锕︾划顖炲箯閸涙潙浼犻柕澶堝€涘鍛婁繆閻愵亜鈧牠宕归悽绋跨疇婵せ鍋撻柕鍡曠椤繈鎳滈悽闈涘Ц闁诲骸绠嶉崕鍗炍涘☉銏犲偍闁告稑锕︾弧鈧梺闈涢獜缁插墽娑甸悙顑句簻闁瑰瓨绻冮崵鍥煙椤旀枻鑰垮┑锛勫厴閸╋繝宕掑鍐ㄧ疄闂傚倷鑳剁划顖炲礉閿旂晫顩叉繝濠傚閸欏繘鏌涘畝鈧崑鐐烘偂濞嗘劑浜滈柡鍐ㄥ€哥敮鑸典繆閼碱剛甯涢柕鍥у椤㈡ê顭ㄩ崘顭戞綆闁诲氦顫夊ú婊堝窗閺嶎厹鈧礁顫滈埀顒勫箖閳哄懏顥堟繛鎴烆焽閻熴垹鈹戦悩娈挎殰缂佽鲸娲熷畷鎴﹀箣閿曗偓绾惧綊鏌曢崼婵愭Ц闁稿被鍔戦弻锝夊箻瀹曞洨妲忓┑鐐叉▕娴滃爼寮崶顒佺厽闁瑰瓨绻冮ˉ婊勭箾閸稑濡界紒缁樼〒閳ь剛鏁搁…鍫濈摥婵＄偑鍊栭崹鍫曞礉濞嗗浚鍤曟い鎰剁畱閻愬﹥銇勯幒宥堝厡闁告ü绮欏娲传閸曨偀鍋撻崷顓涘亾缁楁稑娲ょ粻姘舵煕椤愩倕娅忔繛鍫滅矙閺岋綁骞囬鐣屽帾濡炪倕绻愰悧鍡涙偂濮椻偓閺岀喐娼忔ィ鍐╊€嶉梺绋款儐閸旀瑩寮婚悢闈╃矗濞达絼璀﹀Σ顕€姊洪崫鍕殗濞存粏娉涢～蹇撁洪鍕炊闂侀潧顦崕娑㈡晲閸℃劒绨婚梺闈涱焾閸庤顔忛妷鈺傜厽闁挎繂鎳庡Σ濠氭煃鐟欏嫬鐏╅柍褜鍓ㄧ紞鍡樼濠婂啰鏆ら柛鈩冪⊕閳锋垿姊婚崼鐔恒€掔紒鐘插暱閳规垿顢欓幆褍骞嬮悗瑙勬礃缁诲牓寮崘顔肩劦妞ゆ帒瀚ч埀顒佹瀹曟﹢顢欓崲澹洦鐓曢柍鈺佸枤濞堟﹢鏌ｉ悢绋垮缂佽鲸鎸婚幏鍛村箵閹哄秴顥氭繝鐢靛仩閹活亞绱為埀顒併亜椤愩埄妯€鐎规洩缍€缁犳盯寮村Δ鈧禍鐐殽閻愯尙浠㈤柛鏃€纰嶇换娑㈡嚑椤掆偓閳诲牏鈧娲橀崹鍧楃嵁濮椻偓閹虫粓妫冨☉娆戔偓顓㈡⒒娴ｅ憡鍟炴繛璇х畵瀹曟粌鈽夐埗鍝勬喘婵℃悂鍩￠崒妤佸闂備胶顢婇崑鎰板磻濞戞瑤绻嗛柛蹇氬亹缁犲墽鐥銏╂缂佲檧鍋撻梻浣筋嚃閸犳洟宕￠幎濮愨偓浣糕枎閹惧啿绨ユ繝銏ｆ硾閼活垶寮稿☉銏＄厵闁惧浚鍋嗘晶鐢告煕閳哄绡€鐎规洘顭囬幑鍕Ω閵壯冩惛婵犵數濮烽弫鍛婃叏閻㈠壊鏁婇柡宥庡幖缁愭淇婇妶鍛櫡闁逞屽墮閸熸潙鐣烽妸鈺婃晣闁搞儯鍔庨埥澶愭煃鐠囨煡鍙勬鐐疵濂稿椽娴ｅ厜鏋呴柣搴ゎ潐濞叉牠濡堕幖浣哥畺闁靛繈鍊栭幆鐐烘煕閿旇骞楁い顐㈢焸濮婂宕掑▎鎴濆闂佹椿浜滅紞濠傜暦瑜版帗瀵犲鑸殿焽閸旂兘鎮峰鍐╂崳缂侇喖顑夐獮鎺懳旀担瑙勭彇闂備胶顭堥張顒傜矙閹捐鍌ㄩ梺顒€绉甸埛鎴︽⒒閸喍绶遍柣鎺楃畺閺屾稒鎯旈姀鐘灆閻庤娲樺浠嬪极閹邦厼绶為悗锝庡墮楠炴劕鈹戦悙鑸靛涧缂佹彃娼￠垾锕傚醇閵夈儲杈堥梺鎸庣箓椤︿即鎮￠弴銏＄厓閻熸瑥瀚崝銈咁熆瑜庨悡锟犲蓟閻旈鏆嬮柣妤€鐗嗗▓妤呮倵鐟欏嫭绀堥柛鐘崇墵閵嗕礁螖閸涱厾锛滃┑鈽嗗灠閸㈠弶绂嶆ィ鍐╃厵闁绘垶锚濞堫喚鎲搁悧鍫濈瑲闁稿鍨块弻娑樷槈閸楃偛瀛ｅ┑鐐叉▕閸欏啫顫忓ú顏呭仭闁哄娉曟鍥⒑閻熺増鍟炲┑鐐诧工椤曪綁顢曢敃鈧粻娑㈡煛婢跺﹦浠㈤柤鏉跨仢閳规垿鍩ラ崱妤冧化缂備緡鍣崹鍐测枎閵忋値鏁冮柨鏃囆掗幏濠氭⒑缁嬫寧婀伴柤褰掔畺閸┾偓妞ゆ帒鍊搁崢鎾煙閾忣偒娈滅€规洖銈稿鎾倷绾板骞㈤梻鍌欑窔濞佳嗗闂佸搫鎳忕粙鎾寸珶閺囥垹閿ゆ俊銈勮兌閸樺憡绻濋姀锝嗙【妞ゆ垵鎳橀幃妯侯吋婢跺鍘搁柣搴秵娴滅偞鏅ラ梻浣告惈閻鎹㈠┑鍡欐殾闁割偅娲栧敮闂侀潧锛忛崒娑樹簼闂傚倸鍊烽懗鍓佸垝椤栫偛绠伴柤濮愬€栧畷鏌ユ煕椤愮姴鍔氶柦鍐枛閺屻劑鎮㈤崫鍕戙垽鏌ｉ幇顒婅含闁哄本娲樺鍕醇濠靛棗袘濠电偛顕繛鈧紒鐘崇墪椤繘鎼归崷顓狅紲濠碘槅鍨甸褔妫勫鍛斀闁绘劘娉涢惃娲煕閻樺磭澧い鏇稻缁绘繂顫濋鈹炬櫊閺屾洘寰勯崼婵堜痪闂佸搫鍊甸崑鎾绘⒒閸屾瑨鍏岀痪顓炵埣瀹曟粌鈹戠€ｎ偄浠悷婊勬閵嗕礁鈻庨幇顔剧槇闂佹悶鍎崝澶愬箯濞差亝鈷戦柛娑橈功閳藉鏌ㄩ弴妯衡偓妤冨垝椤撯槅妲诲銈庡弨閸庡藝閾忣偁浜滈柕濞垮劵閺€璇睬?闂?PRP ${state.ctrlRows.length} 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇川绾剧晫鈧箍鍎遍幏鎴︾叕椤掑倵鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝懐顦ч柣蹇撶箲閻楁鈧矮绮欏铏规嫚閺屻儱寮板┑鐐板尃閸曨厾褰炬繝鐢靛Т娴硷綁鏁愭径妯绘櫓闂佸憡鎸嗛崪鍐簥闂傚倷鑳剁划顖炲礉閿曞倸绀堟繛鍡樻尭缁€澶愭煏閸繃宸濈痪鍓ф櫕閳ь剙绠嶉崕閬嶅箯閹达妇鍙曟い鎺戝€甸崑鎾斥枔閸喗鐏堝銈庡幘閸忔﹢鐛崘顔碱潊闁靛牆鎳愰ˇ褔鏌ｈ箛鎾剁闁绘顨堥埀顒佺煯缁瑥顫忛搹瑙勫珰闁哄被鍎卞鏉库攽閻愭澘灏冮柛鏇ㄥ幘瑜扮偓绻濋悽闈浶㈠ù纭风秮閺佹劖寰勫Ο缁樻珦闂備礁鎲￠幐鍡涘椽閸愵亜绨ラ梻鍌氬€烽懗鍓佸垝椤栫偛绀夐柨鏇炲€哥粈鍫熺箾閸℃ɑ灏紒鈧径鎰厪闁割偅绻冮ˉ鐘电磼閳锯偓閸嬫捇姊绘笟鈧埀顒傚仜閼活垱鏅堕幘顔界厸閻忕偠濮らˉ婊勩亜閹剧偨鍋㈢€规洏鍔戦、娑橆潩椤戭偅娲栭埞鎴︽晬閸曨偂鏉梺绋匡攻閻楁粓寮鈧獮鎺懳旈埀顒傚閸︻厽鍠愰柣妤€鐗嗙粭鎺楁煕濮橆剛绉洪柡灞界Х椤т線鏌涢幘璺烘灈鐎殿喖顭烽弫鎰板幢濡搫濡抽梻渚€娼х换鎺撴叏閺夋嚩鎺楀醇閵夛腹鎷洪梺鍛婄☉閿曪箓骞婇崘顔界厱闁绘洑绀佹禍浼存煙椤旇棄鍔ら柣锝忕節楠炲秹顢欓懞銉晭闂傚倷鐒﹂幃鍫曞磿濠婂懍娌紓浣靛灪閿涘懘姊婚崒娆愮グ妞ゆ泦鍥х闁伙絽鑻欢銈呪攽閻樺疇澹樼紒鈧径鎰€甸柨婵嗙岸閸嬫捇顢涢崱妤€鎮╅柡鍐ㄧ墕瀹告繃銇勯弮鍥舵綈閻庢艾銈稿缁樼瑹閳ь剙顭囬懡銈傚亾闂堟稓鐒哥€规洏鍨虹缓鐣岀矙鐠侯煈妲烽梺璇插嚱缂嶅棝宕板Δ鍛亗闁哄洢鍨洪悡蹇撯攽閻愯尙浠㈤柛鏂诲€楃槐鎺撳緞鎼淬埄浠╅梺閫炲苯澧叉い顐㈩槸鐓ゆ慨妞诲亾鐎规洘绻傞埢搴ㄥ箻瀹曞洨鏆繝鐢靛仜濡瑩骞愭繝姘９缂備焦眉缁诲棙銇勯弽銊х畺闁靛棗鍟撮弻锝夊閵忋垹绗＄紓浣虹帛缁诲牓骞冩禒瀣棃婵炵缈伴崹浠嬪蓟閵娾晛鍗虫俊顖濄€€閸嬫挸鈹戦崱娆愭濡炪倖鐗滈崑娑氱不閵夛负浜滈柡鍌氱仢缂嶆牜绱掑Δ鈧ˇ闈涱潖濞差亝鍋傞幖鎼枟缂嶆姊虹粙鍖℃敾闁告梹鐟ラ悾鐑藉箣閿曗偓缁犲鏌￠崒妯哄姕闁诲繋绶氬娲礈閼碱剙甯ラ梺鍝ュУ椤ㄥ﹪骞冨Ο渚悑闁糕剝鐟ч惁鍫ユ⒑濮瑰洤鐏叉繛浣冲嫮顩锋繝濠傜墛閻撱儵鏌￠崶銉ュ缂併劎绮妵鍕即椤忓棛袦濡炪們鍨哄ú鐔煎极閸愵喖鐒垫い鎺戝€婚惌鍡涙煕閹般劍鏉哄ù婊勭矒閺岋繝宕橀妸锔芥倷婵炲瓨绮岀紞濠囧蓟閵娿儮妲堟繛鍡樺灩閻撯偓闂備礁鐤囬～澶愬垂閸ф绠栨繛鍡樻尭缁狙囨煙鐎电小婵℃鎹囧缁樻媴閸濆嫬浠樼紓鍌氱Т閿曪妇鍒掓繝姘唨妞ゆ挾鍠庢禒鎺戭渻閵堝棙鐓ユ俊鎻掔墦瀵噣宕煎┑鍡欑崺婵＄偑鍊栧Λ渚€锝炴径灞稿亾濮樿櫕顥夐柍瑙勫灴閹瑧鈧稒锚闂夊秹姊虹化鏇熸珔闁哥喐娼欓悾鐑藉箣閿曗偓缁犲鎮楅棃娑欐喐妞ゆ梹娲樼换娑欐綇閸撗冨煂闂佸摜鍠庡锟犵嵁婵犲懐鐤€闁规崘鍩栧▓楣冩⒑閸濆嫯顫﹂柛搴㈢叀閹繝寮撮悢缈犵盎闂佸綊鍋婇崰鏍х摥闂備礁鎲″鐟扮暆閹间礁钃熼柨鐔哄Т缁€瀣煃鏉炴壆顦﹀┑顕嗙畵濮婃椽宕崟顒佹嫳闂佺儵鏅╅崹浼搭敋閿濆绠绘い鏂挎閳哄懏鐓忓璇″灠閸婂寮ィ鍐┾拻闁稿本鐟ㄩ崗灞俱亜椤撶偟澧﹂柡浣稿暣婵″爼宕担鍝勫Ш闂備浇娉曢崰鎾存叏閹绢喗瀚呴柣鏂挎憸缁犻箖鏌熺€涙鎳冮柣蹇婃櫇缁辨帡鎮╅悽闈涚婵烇絽娲ら敃顏呬繆閸洖纾兼慨姗嗗亜椤ユ岸姊婚崒娆掑厡闁硅櫕鎹囧畷顖滄崉閵婏箑搴婂┑顔姐仜閸嬫挾鈧鍣崑鍕敇婵傜閱囬柕蹇嬪灪濠㈡垶绻濋悽闈涗沪闁搞劌鐖奸幃鐑藉閵堝懐顔嗗┑鐐叉▕娴滄繈鎮￠悢鍏肩厽婵☆垰鎼痪褏绱掗埀顒€鐣濋崟顒傚帗閻熸粍绮撳畷婊冣枎閹存繍妫滃銈嗘尪閸ㄥ綊鎮為崹顐犱簻闁圭儤鍨甸弳娆撴煕濮橆剛绉洪柡灞界Х椤т線鏌涢幘瀵告噰鐎规洏鍨归…銊╁醇濠靛牞绱遍梻浣烘嚀婢х晫鍒掗鐐村亗闁告劦浜濋崰鎰節婵犲倻澧曠紒鈧崼銉︾厽闁哄啫鐗滃Λ鎴︽煛閸☆厾鐣甸柡灞炬礃缁旂喖顢涘Δ鈧禍楣冩⒑缁嬫鍎愰柟鐟版喘瀵偊骞囬鐔峰妳闂佹枼鏅涢崯鐗堢閸洘鈷掑ù锝囨嚀閳绘洟鏌￠埀顒勬焼瀹ュ懎鐎梺绉嗗嫷娈旈柦鍐枑缁绘盯骞嬮悙鍐╁哺瀵劍绂掔€ｎ偆鍘遍梺鏂ユ櫅閸犳艾鈻撻姀鐘嗗湱浜搁弽褌澹曢梻鍌氬€搁崐鐑芥嚄閸撲礁鍨濇い鏍ㄧ矋閺嗘粓鏌ｉ弬璺ㄦ闁哄鐗犻弻锟犲炊閳轰絿锝嗐亜椤愶絾绀嬮柡宀€鍠栭幃娆擃敆閳ь剚鏅堕鐐寸厱婵﹩鍓﹂崕鏃堟煛鐏炲墽娲寸€殿喗鎸虫俊鎼佸Ψ閵壯屽晪闂傚倷鑳剁划顖滅矙韫囨稑鍨傞柦妯侯樈濞兼牠鏌ц箛鎾磋础缁炬儳鍚嬫穱濠囶敍濮橆叀纭€缂備浇顔婄欢姘潖濞差亝顥堥柍鍝勫暟鑲栫紓鍌欐祰瀵挾鍒掑▎鎾崇畺濡わ絽鍟崐濠氭煢濡警妯€闁哥偛鐖煎娲传閸曨剙鍋嶉梺鍛婃煥缁夌懓顕ｉ弻銉ヮ潊闁挎稑瀚惁鍫ユ⒑闂堟盯鐛滅紒鎻掑⒔濞戠敻鎮欓鍙ョ盎闂佺懓鐡ㄧ换鍐夊鍫熺厓閻犲洩灏欐晥濡ょ姷鍋為…鍥╂閹烘嚦鐔兼煥鐎ｎ亶浼滃┑鐘垫暩閸嬬娀骞撻鍡楃筏闁秆勩仜閳ь剨绠撳畷濂稿Ψ閵壯呮毇闂備胶鎳撻悺銊ф閻戣姤鍋￠梺顓ㄥ閸欏棝姊洪柅鐐茶嫰婢т即鏌涢幒鎾崇瑨闁宠姘︾粻娑㈠即閻斿壊鍟庨梻鍌欑閹碱偄煤閵忋倕鍨傜憸鐗堝笚鐎氬懘鏌ｉ弬鍨倯闁绘挸绻愰…鍧楁嚋閻㈢偣鈧帡鏌ｉ敐澶夋喚闁哄本鐩獮姗€宕￠悙宸綆闂備礁鎼惉濂稿窗閺嵮呮殾婵°倕鎳忛崵鍐煃閸濆嫬鈧綊顢欓崘顔解拻濞达絽鎲￠崯鐐烘煛鐏炶濡跨紒顔芥閵囨劙骞掗幋鐐葱氭繝鐢靛仦閸垶宕归崷顓犱笉闁规儼濮ら悡娆撴煟閹邦垱顥夊┑陇鍋愮槐鎾愁吋閸滃啳鍚悗娈垮櫘閸嬪﹪鐛崶顒€绾ч柛褎顨呴弫瑙勪繆閻愵亜鈧牠宕濊瀵板﹦鎹勯妸褏鐓嬮梺缁樺灱婵倝鍩涢幒鎴欌偓鎺戭潩閿濆懍澹曟繝鐢靛仒閸栫娀宕楅悩铏仢濠碘剝鎮傞崺鈩冩媴閾忕懓鐐婇梻鍌欑閹碱偆绮欐笟鈧畷銏＄附閸涘﹤鐝旈梺缁樻煥閹芥粎绮绘ィ鍐╃厵閻庣數顭堥崜閬嶆煟閹烘挻鍊愰柡宀嬬秮瀵噣宕掑顑跨帛闂備礁婀遍、濠囧春閺嶎厼桅闁告洦鍨扮粻濠氭偣閾忚纾柕澶嗘櫆閻撴洘鎱ㄥΔ鈧Λ妤呮倶閿旇姤鍙忓┑鐘插鐢盯鏌熷畡鐗堝櫧缂侇喚鏁搁埀顒婄秵娴滄繈鎮炬导瀛樷拻濞达絽鎲￠幉绋库攽椤曗偓濞佳囨偩濠靛牏鐭欓悹鎭掑妽濞堟儳鈹戞幊閸婃劙宕戦幘娣簻妞ゆ劧绲块惌鎺楁煕閳规儳浜炬俊鐐€栧濠氬磻閹剧粯鐓熼柨婵嗘噹濡插鎮￠妶鍡愪簻闊洦鎸婚崳鐑樼箾閸涱偄鐏叉慨濠呮缁辨帒螣閺囩喎鐏遍柕鍥ㄥ姍瀹曟﹢顢旈崱娆忕婵犵數鍋為崹鍫曟晝閳轰降鈧帗绻濆顓犲帾闂佸壊鍋呯换鍐夐悙鐑樺€堕煫鍥ь儏婵倿鏌＄仦鍓ф创妤犵偞顭囬埀顒勬涧閹芥粓鎮块崟顐嬫棃鎮╅棃娑楃捕濡炪倧闄勬竟鍡涘焵椤戣法绁烽柛瀣姍閸┾偓妞ゆ帊鑳堕埊鏇㈡嚕閵堝鐓欏瀣捣鐢稓绱掔紒妯尖姇婵炵厧绻樺畷婊嗩槾鐞氾絾绻濋悽闈涗粶闁归攱鍨瑰濠囧锤濡も偓閺嬩焦銇勯弬璺ㄦ癁婵℃彃鐗撻弻鏇＄疀閵壯咃紵闂佸憡蓱閹倿寮婚敐鍫㈢杸闁哄洨鍋橀崫妤€顪冮妶鍡樿偁闁告洦鍓欏鍧楁⒑缁嬫寧婀板〒姘殔閳绘挻绂掔€ｎ偆鍘介梺褰掑亰閸撴岸鍩㈤弴鐔剁箚妞ゆ牗顨呮禍楣冩⒒閸屾瑦绁版俊妞煎妿缁牊鎷呴搹鍦厠闂佽崵鍠愭竟鍡涘汲閿曞倹鐓熼柡鍐ㄥ€甸幏锟犳煛娴ｅ憡鍠橀柡宀嬬到閳诲海浠﹂幋鎺戭棜濠电姷顣介埀顒€鍟跨痪褔鏌熼鐓庘偓鎼侊綖韫囨洜纾兼俊顖濐嚙椤庢捇鏌ｉ悢鍝ユ噧閻庢凹鍓氱粋鎺楀煛閸涱喒鎷虹紓浣割儏閻忔繈顢楅姀鈥茬箚闁绘劖澹嗛惌娆愵殽閻愭彃鏆欓摶锝夋偠濞戞帒澧叉い顐㈢Ч濮婃椽妫冨☉姘鳖唺婵犳鍠氶崗姗€骞嗛崼銉ョ妞ゆ牗绋堥幏娲⒑閸涘﹥灏扮憸鏉垮暞缁傚秹鎮欓悜妯煎幈闂佺粯锚閸熸寧鎱ㄩ崶顒佺厓閻犲洩灏欏瓭濡炪値鍘归崝鎴濈暦婵傚憡鍋勯柛娆忣槸椤忓綊姊婚崒娆戭槮闁硅绱曠划娆撳箣閿旇姤娅囬梺鎸庣箓濞诧箓顢曟禒瀣拺妞ゆ巻鍋撶紒澶屾暬閹繝寮撮悢鍓佺畾濡炪倖鐗楃粙鎴︻敋濠婂嫨浜滈柕澶堝労濡偓闂佸搫鑻粔鍓佹閹烘嚦鐔烘嫚閼碱剨绱﹀┑掳鍊楁慨鐑藉磻閻愬搫绠查柛銉墰瀹撲線鏌熼悜妯虹亶闁衡偓娴犲鐓曢柕澶嬪灥閹冲繗顣鹃梻鍌氬€搁崐鎼佸磹妞嬪孩顐芥慨姗嗗墻閻掔晫鎲搁弮鍫濈畺鐟滄柨鐣烽崡鐐╂婵☆垵鍋愰弸鍐╃節濞堝灝鏋熼柕鍥ㄧ洴瀹曟垿骞樺ǎ顑跨盎闂侀潧绻嗛崜婵堜焊椤撱垺鎳氶柡宥庡幗閻撴洟鏌熼弶鍨倎缂併劋绮欓弻銊モ槈濞嗘垹鐓佺紓浣虹帛缁诲牊鎱ㄩ埀顒勬煥濠靛棙顥犻柕鍡樺姍濮婃椽宕崟顓炩拡闂佸憡鎸鹃崰搴ㄦ偩閻戣姤鍋ㄧ紒瀣硶閸旓箑顪冮妶鍡楀潑闁稿鎸婚妵鍕敂閸曨偅娈绘繝寰枫倕鐓愰柟顖涙閸ㄩ箖鎳犻鍌涙櫒缂傚倸鍊搁崐鐑芥嚄閸撲礁鍨濇い鏍仦閺呮繈鏌曡箛瀣偓妤€鐣垫笟鈧弻鈥愁吋鎼粹€冲箥婵炲瓨绮岀紞濠囧蓟閻斿吋鍊绘俊顖濇娴犳悂鎮楃憴鍕碍缂佸鎸抽垾鏃堝礃椤斿槈褔鏌涢埄鍏狀亪寮冲Δ浣虹瘈婵炲牆鐏濋弸銈夋煕韫囨枂顏堟偩閻戣棄顫呴柕鍫濆閺咁剟姊虹紒妯哄閻炴稏鍎甸獮蹇曠磼濡偐顔曢柡澶婄墕婢т粙骞冮崗绗轰簻妞ゆ挾鍋熸晶锕傛寠閻旇偐鍙撻柛銉ｅ妿閳洟鏌ｉ幘璺烘灈闁哄瞼鍠栭獮鍡氼槾闁挎稑绉撮…鑳檪濠碘€虫喘閸┾偓妞ゆ帒鍠氬鎰箾閸欏＃鎴犳崲濞戞瑧绡€闁搞儯鍎崑鎾存媴閸撳弶鍍甸柣鐘荤細濞咃綁宕濋敃鈧—鍐Χ閸℃娼戦梺绋款儐閹瑰洭寮婚敐澶嬫櫜闁告侗鍘戒簺闂備礁鐤囬～澶愬垂閸喚鏆﹂柟顖炲亰濡插墽绱撴担鐟板闁稿鍋熼幑銏犫攽鐎ｎ偄浠洪梻鍌氱墛閸掆偓闁靛繈鍊栭崐鍨箾閹寸偛绗氭繛鍛喘閺屽秷顧侀柛鎾跺枎椤洩顦归柟顖氱焸瀹曟帒顫濋崗鑲╃▉婵犵數鍋涘Ο濠冪濠靛瑤澶愬醇閻旇櫣顔曢梺鐟邦嚟閸嬬姵绔熷Ο姹囦簻闁挎繂妫欓妵婵囨叏婵犲啯銇濈€规洦鍋婃俊鐑藉Ψ閿旀儳缍戦梻鍌欒兌椤牓顢栭崨鏉戠疇闊洦娲滈惌姘跺级閸稑濡跨紒鈾€鍋撻梻浣告啞閸旓附绂嶉鍕电€舵い鏇楀亾婵﹥妞藉畷銊︾節閸曘劍顫嶉梻浣瑰濞测晝绮婚幘宕囨殾闁靛繈鍊栭崑銊╂煕濞戞☉鍫ュ箯濞差亝鈷戦悹鍥ｂ偓宕団偓濠氭煕閺囥劌寮炬繛鎻掔埣濮婄粯鎷呮笟顖滃姼濡炪倖鍨靛Λ婵嬬嵁閹达箑鐐婃い鎺嗗亾缂佺姷濞€閺岀喖骞戦幇闈涙闂備浇锟ラ崐鏍ㄧ┍婵犲洤围闁告洦鍠栭崢锟犳⒑閸涘鑰垮ù婊嗘硾椤繐煤椤忓拋妫冨┑鐐寸暘閸庨亶鎮ч幘鎰佸殨闁圭粯宸婚弨浠嬫倵閿濆骸浜滃ù鐘靛帶閳规垿鎮欓崣澶嗘灆婵炲瓨绮嶇换鍫ュ箖閳ユ枼妲堟俊顖氱箰缂嶅﹪寮幇鏉跨倞闁告挷绀佹慨濂告⒒娓氣偓閳ь剛鍋涢懟顖涙櫠椤旂晫绠剧痪顓㈩棑缁♀偓闂佺粯渚楅崳锝呯暦濮椻偓婵℃悂濮€閿涘嫧鍋撴繝姘拺闁荤喐澹嗘禒銏ゆ煕閻曚礁鐏︾€殿喗鐓℃慨鈧柕鍫濇閹锋椽姊绘笟鍥т簽闁稿鐩幊鐔碱敍濞戞瑦鐝烽梺鍝勵槹椤戞瑩鎮㈤崱娑欏仭婵炲棗绻愰顏嗙磼閳ь剛鈧綆鍋佹禍婊堟煏韫囥儳纾挎繛鍙夋尦閺岀喖顢欓悾灞惧櫘闂佸憡甯楃敮鐐哄箟閹绢喖绀嬫い鎰靛亗缁鳖亪姊婚崒姘偓鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵稿妽闁稿顑呴埞鎴︽偐閹绘帗娈堕梺鑽ゅ枙椤绌辨繝鍥ч柛娑卞枛濞呫倝姊虹粙娆惧剰闁稿﹤缍婃俊鐢稿礋椤栨氨顔掗柣鐘烘濞插懘濡疯濡垶鏌熼鍡曠娴狀噣姊洪崫鍕効缂佹彃鈧喓浜介梻浣告啞缁诲倻鈧凹鍘艰闁规壆澧楅埛鎴︽偣閸ヮ亜鐨虹紒鐘冲哺閺岋繝宕ㄩ鐐垱闂佺偨鍎绘俊鍥箲閸曨垰惟闁挎洍鍋撻柡瀣€垮娲川婵犲啫顦╅梺鍛婃尰閻╊垵妫熼梺鍝勵槹椤戞瑥銆掓繝姘厪闁割偅绻傞弳娆撴煟韫囷絼閭柡宀嬬秮閸┾剝绻濋崒婊€妗撴俊銈囧Х閸嬫盯宕锕€鐓濋幖娣妼缁狅絾绻濋棃娑欘棤濞存粈鍗冲娲嚒閵堝懏鐎鹃梺鑽ゅ枂閸庢娊鍩€椤掍礁鍤柛鎾跺枛閵嗕線寮崼婵囧祶濡炪倖鎸炬慨鐑芥晬濠靛鈷戠紒瀣濠€浼存煠瑜版帞鐣洪柛鈹惧亾濡炪倖甯婇悞锕傚磹閹邦喒鍋撶憴鍕闁告梹鐟╅獮鍐煥閸喎娈熼梺闈涱槶閸庮噣宕戦幘璇查敜婵°倓鑳堕崣鍡涙⒑閸濆嫭宸濋柛瀣洴閸┾偓妞ゆ巻鍋撶紓宥咃工椤曪綁寮婚妷顔芥櫆闂佸壊鍋嗛崯鍧楀箯缂佹绠鹃弶鍫濆⒔閹ジ鏌ｉ埄鍐╊棃鐎规洟娼ч埢搴☆嚗椤愶絾顥堥柟顔规櫊閹崇娀顢楅崒銈呮暯缂傚倸鍊风欢锟犲窗閺嶎厸鈧箓鎮滈悾灞界ウ濠碘槅鍨伴崥瀣偓姘哺閺屻倗鍠婇崡鐐测拻闂佸摜鍋熼弫璇差潖缂佹ɑ濯村〒姘煎灡閺侇垶姊虹憴鍕仧濞存粠浜滈～蹇旂鐎ｎ亞顦板銈嗙墬缁嬫垿鍩€椤掆偓濞硷繝寮婚妶鍚ゅ湱鈧綆鍋呭鎺楁⒑缁嬫鍎愰柟鐟版喘閹即顢氶埀顒€鐣疯ぐ鎺濇晩闁绘挸瀵掑娑樷攽閻樻鏆俊鎻掓嚇瀹曟垿宕ㄧ€涙ê鍓銈嗙墬濮樸劑寮抽敃鍌涚厪闊洤顑呴埀顒佺墵瀹曟垿濡搁埡鍌滃幈濠电偞鍨堕敃顐㈩啅閵夆晜鐓冪憸婊堝礈濞戙垹鏋佸┑鐘宠壘閽冪喖鏌ㄥ┑鍡╂Ч闁稿瀚伴弻娑樷槈濮楀牆濮涢梺鍛婂灍閳ь剚鍓氬〒濠氭煏閸繃鍣虹紒鍌氼儏闇夋繝濠傚缁犳﹢鏌熼獮鍨仼闁宠鍨归埀顒婄秵娴滆泛顭囨繝鍥ㄢ拺閻庡湱濮甸ˉ澶愭煙閾忣偅宕岄柛鈹惧亾濡炪倖宸婚崑鎾寸箾绾绡€鐎殿喖顭烽幃銏ゅ礂閸忕厧鍔掓俊鐐€栭崝鎴﹀磹濡ゅ懏鍋傞柛宀€鍋為埛鎴︽煟閻斿憡绶茬紒鐙欏洦鐓欑紒瀣仢閺嗛亶鏌ｉ敐鍥у幋闁诡喓鍨介幃鈩冩償閿濆懎绠伴梻鍌欑窔閳ь剛鍋涢懟顖涙櫠娴煎瓨鐓犲Δ锕€銇橀崥顐︽煙妞嬪骸孝妞ゆ柨绻橀、娆撴寠婢跺本袙闂傚倸鍊风欢姘焽瑜旈幃褔宕卞☉妯肩枃闂佸綊鍋婇崰姘▔瀹ュ悿褰掓偂鎼达絾鎲奸梺绋匡工閻忔岸骞堥妸銉庣喖鎮℃惔鈥茬帛濠电姭鎷冮崘鎯ф闂侀€炲苯澧い鏃€鐗犲畷鏉课旀担铏诡啎婵犵數濮村ú銈夊几娓氣偓閺岀喖鎮ч崼鐔哄嚒閻庣懓鎲＄换鍐Φ閸曨喚鐤€闁圭偓娼欏▍銈夋⒑閸濆嫷妲归柟顔煎€搁～蹇旂節濮橆剛锛滃┑顔斤供閸擄附绂掗悡搴樻斀闁绘劕寮堕埢鏇㈡煕濡亽鍋㈤柟顔藉劤閻ｏ繝骞婃繝鍐┿仢妞ゃ垺妫冨畷鐔碱敃閵忊剝娈㈡繝纰夌磿閸嬫垿宕愰弽顓炵濡わ絽鍟壕濠氭煟閺傚灝鎮戦柛瀣ф櫅铻栭柨婵嗘噹閺嗙偤鏌嶉柨瀣伌闁哄本绋戦埞鎴﹀幢濡ゅ﹣鎮ｉ梻浣告惈濡瑩鎮烽埡鍛摕闁挎繂鎲橀弮鍫濈劦妞ゆ巻鍋撻摶鐐寸節闂堟侗鍎忕紒鐘崇墬閹便劌顪冪拠韫婵°倗濮烽崑娑㈡煀閿濆绠犻柣鎰惈鍞悷婊冪Ч閻涱喖螣閼测晝锛濇繛杈剧到閹碱偅绂嶉悙顒傜瘈闁靛繆鍩楅鍫熷仼闁绘垹鐡旈弫鍡椕归敐鍫綈闁绘繂鍢查—鍐Χ閸℃锛曢梺绋款儐閹瑰洭寮婚敍鍕勃闁告挆鍕灡濠电姴鐥夐妶鍛帿闂佽鍨卞Λ鍐垂妤ｅ啫绠涘ù锝夆偓娑欏攭闂傚倸鍊搁崐椋庣矆娓氣偓閹潡宕堕濠勭◤婵犮垼鍩栭崝鏇㈠垂閸岀偞鐓曠憸搴ㄣ€冮崨顖滀笉闁哄稁鍘介悡鍐煕濠靛棗顏柛锝呯秺閺屾盯濡搁妷銉㈠亾瑜版帒桅闁告洦鍨扮粻娑㈡煕閹捐尪鍏岄拑閬嶆⒒娴ｉ涓茬紒鐘冲灴閺屽﹪鏁愰崪浣圭稁缂傚倷鐒﹁摫濠殿垱娼欓妴鎺戭潩閻撳海浠梺鍛婃⒒椤牓鈥旈崘顔嘉ч柛鈩冾殘娴犳潙鈹戦埥鍡椾簼缂佸鎹囧畷姘跺箳閹存梹鐎婚梺瑙勫劤绾绢參顢樺ú顏呪拺闁圭瀛╅埛鎺旂磼椤曞懎鐏︾€殿喗鐓￠、鏃堝醇閻斿弶瀚奸梻浣告贡椤牆霉妞嬪海涓嶉柟鐐暘娴滄粓鏌ㄩ弮鍥跺殭闁诲骏绠撻弻锛勪沪缁涘鍓堕悗瑙勬礀閻栧ジ銆佸Δ浣瑰闁告繂瀚粻浼存⒒閸屾瑧鍔嶉柟顔肩埣瀹曟洟顢涢悙鑼槷婵犵數濮撮崯浼淬€呴柨瀣瘈濠电姴鍊绘晶娑㈡煟閹惧瓨绀嬮柟顔筋殜閺佹劖鎯旈垾鑼嚬闁诲氦顫夊ú鏍儗閸岀偛钃熼柍鈺佸暞婵绱掔€ｎ偄顕滄繛鍫濐煼閹鎲撮崟顒傤槰闁汇埄鍨辩敮锟犳晲閻愭祴鏀介悗锝庝簽椤㈠懘姊虹紒妯哄闁哄懏绋掔粋宥嗐偅閸愨晝鍘介梺褰掑亰閸撴岸鍩㈤弴鐔虹闁圭偓鍓氶悡濂告煛鐏炵偓绀嬬€规洜鍘ч埞鎴﹀炊閼告妫ч梻鍌欒兌椤宕橀懗顖氭儓闂備礁鎼張顒傜矙閹捐鐒垫い鎺戯功缁夌敻鏌涚€ｎ亝鍣藉ù婊勬倐閹粙鎮介悽纰夌床闂佸搫顦悧鍕礉鐏炵煫褰掝敋閳ь剟寮婚悢纰辨晩閻熸瑥瀚悵鏃堟⒑娴兼瑧鎮奸柛蹇斆悾鐑藉箚闁附些缂傚倸鍊风拋鏌ュ疾閻樺樊娼栫紓浣股戞刊鎾煕濞戞﹫鏀婚柛搴㈡崌濮婃椽宕崟顓炩拡闂佸憡鎸婚悷褔宕ｉ崨顓涙斀闁绘绮☉褔鏌ｅΔ鈧换鎴犵矙婢跺鍚嬮柛鈩冪懅椤旀洟姊洪悷鎵憼闁荤喆鍎甸幃姗€鍩￠崨顔惧幈濠德板€撶粈渚€鍩㈤弴銏＄厸鐎光偓鐎ｎ剛袦濡ょ姷鍋涘ú顓€佸鈧幃娆忣啅椤旂晫绉鹃梻鍌氬€烽懗鍫曞磿閻㈢鐤鹃柍鍝勬噹閸ㄥ倿鎮规潪鎷岊劅闁搞倖娲栭埞鎴︽偐瀹曞浂鏆￠梺鍝勬噺閹倿寮婚敐鍛傜喖宕归鐐嚄闂備礁鎲″Λ鎴犵不閹达腹鈧棃宕橀鍢壯囨煕閳╁喚娈橀柣鐔稿姍濮婃椽鎮℃惔鈩冩瘣闂佺粯鐗曢妶鍛婁繆閹绢喖宸濋悗娑櫭埀顒€顭烽弻銈夊箒閹烘垵濮庨梺閫炲苯澧伴柡浣割煼瀵濡搁妷銏℃杸闂佺硶鍓濇笟妤呭焵椤掍緡娈旈棁澶嬬節婵犲倸顏柣顓熷浮閺岋紕浠﹂悾灞濄儲銇勮缁舵岸寮诲☉銏犵閻庨潧鎲￠崚娑㈡倵濞堝灝娅橀柛瀣噽閹广垹鈹戦崱鈺傚兊濡炪倖甯掗崯顖炲箟娴煎瓨鈷掑〒姘ｅ亾婵炰匠鍥ｂ偓锕傚醇閵夈儳锛熷銈嗘磵閸嬫挾鈧鍠撻崝宥囩矉閹烘柡鍋撻敐搴′簽闁告﹢浜跺娲棘閵夛附鐝旈梺鍝ュ枍閸楁娊鐛繝鍥х妞ゆ梻鏅崢閬嶆⒑闂堟稓澧曞Δ鐘叉啞閺呭爼骞嶉鍓э紲闁哄鐗勯崝宥囦焊娴煎瓨鐓欑€瑰嫮澧楅崵鍥ㄤ繆椤愩垹鏆欓柍钘夘槸椤粓宕卞Ο鑲┬熼梻鍌欐祰椤曆冾潩閿曞偊缍栧璺衡姇閸濆嫷鐓ラ柛顐ｇ箖閻庮剚绻濋悽闈浶ｉ柤褰掔畺瀵即濡烽埡鍌滃帗閻熸粍绮撳畷婊冾潩鐠轰綍锕傛煕閺囥劌鐏犵紒鐘冲▕閺岀喓鈧稒顭囩粻鏍煟韫囨梹灏柍瑙勫灴閹瑩骞撻幒鎾斥偓顖炴⒑閸涘﹥鈷愰柣鐔叉櫅椤曪絾绻濆顓炰簻闂佺粯鎸哥花鑲╂閸洘鈷戦梻鍫熶緱濡牓鏌涢悩鍐插摵鐎规洘绻堥獮鏍ㄦ媴閸︻厼寮伴梻浣哄帶椤洟宕愰弴鐔侯浄闁挎柨澧界壕鑲╃磽娴ｈ鐒界紒鐘靛仦娣囧﹪顢曢姀鐘虫闂佸疇妫勯ˇ顖炲煝鎼粹檧鏋庨柟瀵稿濡插憡绻濋悽闈浶ラ柡浣规倐瀹曟垵鈽夐姀鐘盒曢柣搴秵閸犳宕戠€ｎ喗鐓熸俊顖涱儥閸ゆ瑩鏌﹂崘顏勬灁闁瑰弶鎮傞獮瀣偐閸忓摜鐟濇繝鐢靛仦閸垶宕归崷顓犱笉闁煎鍊楀Λ顖炴煙椤栧棗鑻崜鍐差渻閵堝啫鐏╅柟铏姉濡叉劙骞樼€涙ê顎撻梺鍛婄箓鐎氼亝绔熼弴銏♀拺缂佸鐏濋銏犫攽閻愯宸ラ柣锝囧厴婵＄柉顦柛瀣崌閺佹劖鎯旈垾鑼晼闂備礁纾幊鎾剁矓閹绢喖鐓橀柟杈鹃檮閸嬫劙鏌涘▎蹇ｆШ闁靛牃鏅犲鐑樻姜閹殿噮妲紓浣割槺閺佸鐛崼銉ノ╅柕澶樺枟瀵ゆ椽姊虹化鏇炲⒉妞ゃ劌鎳愮划璇裁洪鍛嫼缂備礁顑呴悘婵嬵敆閵忋倖鐓欓柛娑橈攻閸婃劙鏌嶉妷锔筋棃鐎规洘锕㈤、娆撳床婢诡垰娲ょ粻鍦磼椤旂厧甯ㄩ柛瀣崌閹崇娀顢楅崒娑欐珤缂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾閽樻繃銇勯弽銊х煂缂佲偓婵犲倵鏀介柣妯哄级瀹告繄鈧鎸风欢姘跺蓟濞戙垹绠涢柍杞扮椤姊洪崫鍕棞妞ゆ垵顦～蹇撁洪宥嗘櫍闂侀潧顭堥崕鍝劽洪銏♀拺闁告稑锕﹂幊鍐╀繆椤愶絿绠撴い顐㈢箰鐓ゆい蹇撳缁愭稒绻濋悽闈浶㈤柛鐕佸亰钘濋柍鍝勬噺閳锋垿鏌涘☉姗堟敾閻忓繋鍗抽弻锝夊煛婵犲倻浠╅梺浼欑到閸㈡煡鍩㈡惔銊ョ閻庢稒蓱椤忕喖姊绘担铏瑰笡閽冮亶鏌＄€ｎ亗鍋㈡鐐茬箰鐓ゆい蹇撴噳閹锋椽姊洪崨濠勨槈闁挎洩濡囩槐鎾愁潩閼哥數鍘遍柟鑲╄ˉ閳ь剙鐤囬崺鐐烘⒑鐎圭媭鍤欑紒澶愵棑缁鈽夊Ο閿嬵潔濠电偛妫欓崹鐢哥嵁閸儲鈷掑〒姘ｅ亾婵炰匠鍥ｂ偓锕傚醇閵夈儳锛熼梺瑙勫劶婵倝寮查鍌楀亾楠炲灝鍔氭い锔垮嵆閹繝寮撮姀锛勫幍闂佺粯鍨惰摫閻忓浚鍘界换娑㈠箹椤撶偞鐝濋梺鍝勬湰閻╊垶宕洪敍鍕ㄥ亾閿濆骸澧伴柣锕€鐗撻幃妤冩喆閸曨剛锛橀梺鍛婃⒐閸ㄥ潡濡存担绯曟瀻闁瑰墽琛ラ幏濠氭煟鎼淬劍娑ч柟鑺ョ矊閳绘棃宕稿Δ浣叉嫽?BTX-A ${state.expRows.length} 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇川绾剧晫鈧箍鍎遍幏鎴︾叕椤掑倵鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝懐顦ч柣蹇撶箲閻楁鈧矮绮欏铏规嫚閺屻儱寮板┑鐐板尃閸曨厾褰炬繝鐢靛Т娴硷綁鏁愭径妯绘櫓闂佸憡鎸嗛崪鍐簥闂傚倷鑳剁划顖炲礉閿曞倸绀堟繛鍡樻尭缁€澶愭煏閸繃宸濈痪鍓ф櫕閳ь剙绠嶉崕閬嶅箯閹达妇鍙曟い鎺戝€甸崑鎾斥枔閸喗鐏堝銈庡幘閸忔﹢鐛崘顔碱潊闁靛牆鎳愰ˇ褔鏌ｈ箛鎾剁闁绘顨堥埀顒佺煯缁瑥顫忛搹瑙勫珰闁哄被鍎卞鏉库攽閻愭澘灏冮柛鏇ㄥ幘瑜扮偓绻濋悽闈浶㈠ù纭风秮閺佹劖寰勫Ο缁樻珦闂備礁鎲￠幐鍡涘椽閸愵亜绨ラ梻鍌氬€烽懗鍓佸垝椤栫偛绀夐柨鏇炲€哥粈鍫熺箾閸℃ɑ灏紒鈧径鎰厪闁割偅绻冮ˉ鐘电磼閳锯偓閸嬫捇姊绘笟鈧埀顒傚仜閼活垱鏅堕幘顔界厸閻忕偠濮らˉ婊勩亜閹剧偨鍋㈢€规洏鍔戦、娑橆潩椤戭偅娲栭埞鎴︽晬閸曨偂鏉梺绋匡攻閻楁粓寮鈧獮鎺懳旈埀顒傚閸︻厽鍠愰柣妤€鐗嗙粭鎺楁煕濮橆剛绉洪柡灞界Х椤т線鏌涢幘璺烘灈鐎殿喖顭烽弫鎰板幢濡搫濡抽梻渚€娼х换鎺撴叏閺夋嚩鎺楀醇閵夛腹鎷洪梺鍛婄☉閿曪箓骞婇崘顔界厱闁绘洑绀佹禍浼存煙椤旇棄鍔ら柣锝忕節楠炲秹顢欓懞銉晭闂傚倷鐒﹂幃鍫曞磿濠婂懍娌紓浣靛灪閿涘懘姊婚崒娆愮グ妞ゆ泦鍥х闁伙絽鑻欢銈呪攽閻樺疇澹樼紒鈧径鎰€甸柨婵嗙岸閸嬫捇顢涢崱妤€鎮╅柡鍐ㄧ墕瀹告繃銇勯弮鍥舵綈閻庢艾銈稿缁樼瑹閳ь剙顭囬懡銈傚亾闂堟稓鐒哥€规洏鍨虹缓鐣岀矙鐠侯煈妲烽梺璇插嚱缂嶅棝宕板Δ鍛亗闁哄洢鍨洪悡蹇撯攽閻愯尙浠㈤柛鏂诲€楃槐鎺撳緞鎼淬埄浠╅梺閫炲苯澧叉い顐㈩槸鐓ゆ慨妞诲亾鐎规洘绻傞埢搴ㄥ箻瀹曞洨鏆繝鐢靛仜濡瑩骞愭繝姘９缂備焦眉缁诲棙銇勯弽銊х畺闁靛棗鍟撮弻锝夊閵忋垹绗＄紓浣虹帛缁诲牓骞冩禒瀣棃婵炵缈伴崹浠嬪蓟閵娾晛鍗虫俊顖濄€€閸嬫挸鈹戦崱娆愭濡炪倖鐗滈崑娑氱不閵夛负浜滈柡鍌氱仢缂嶆牜绱掑Δ鈧ˇ闈涱潖濞差亝鍋傞幖鎼枟缂嶆姊虹粙鍖℃敾闁告梹鐟ラ悾鐑藉箣閿曗偓缁犲鏌￠崒妯哄姕闁诲繋绶氬娲礈閼碱剙甯ラ梺鍝ュУ椤ㄥ﹪骞冨Ο渚悑闁糕剝鐟ч惁鍫ユ⒑濮瑰洤鐏叉繛浣冲嫮顩锋繝濠傜墛閻撱儵鏌￠崶銉ュ缂併劎绮妵鍕即椤忓棛袦濡炪們鍨哄ú鐔煎极閸愵喖鐒垫い鎺戝€婚惌鍡涙煕閹般劍鏉哄ù婊勭矒閺岋繝宕橀妸锔芥倷婵炲瓨绮岀紞濠囧蓟閵娿儮妲堟繛鍡樺灩閻撯偓闂備礁鐤囬～澶愬垂閸ф绠栨繛鍡樻尭缁狙囨煙鐎电小婵℃鎹囧缁樻媴閸濆嫬浠樼紓鍌氱Т閿曪妇鍒掓繝姘唨妞ゆ挾鍠庢禒鎺戭渻閵堝棙鐓ユ俊鎻掔墦瀵噣宕煎┑鍡欑崺婵＄偑鍊栧Λ渚€锝炴径灞稿亾濮樿櫕顥夐柍瑙勫灴閹瑧鈧稒锚闂夊秹姊虹化鏇熸珔闁哥喐娼欓悾鐑藉箣閿曗偓缁犲鎮楅棃娑欐喐妞ゆ梹娲樼换娑欐綇閸撗冨煂闂佸摜鍠庡锟犵嵁婵犲懐鐤€闁规崘鍩栧▓楣冩⒑閸濆嫯顫﹂柛搴㈢叀閹繝寮撮悢缈犵盎闂佸綊鍋婇崰鏍х摥闂備礁鎲″鐟扮暆閹间礁钃熼柨鐔哄Т缁€瀣煃鏉炴壆顦﹀┑顕嗙畵濮婃椽宕崟顒佹嫳闂佺儵鏅╅崹浼搭敋閿濆绠绘い鏂挎閳哄懏鐓忓璇″灠閸婂寮ィ鍐┾拻闁稿本鐟ㄩ崗灞俱亜椤撶偟澧﹂柡浣稿暣婵″爼宕担鍝勫Ш闂備浇娉曢崰鎾存叏閹绢喗瀚呴柣鏂挎憸缁犻箖鏌熺€涙鎳冮柣蹇婃櫇缁辨帡鎮╅悽闈涚婵烇絽娲ら敃顏呬繆閸洖纾兼慨姗嗗亜椤ユ岸姊婚崒娆掑厡闁硅櫕鎹囧畷顖滄崉閵婏箑搴婂┑顔姐仜閸嬫挾鈧鍣崑鍕敇婵傜閱囬柕蹇嬪灪濠㈡垶绻濋悽闈涗沪闁搞劌鐖奸幃鐑藉閵堝懐顔嗗┑鐐叉▕娴滄繈鎮￠悢鍏肩厽婵☆垰鎼痪褏绱掗埀顒€鐣濋崟顒傚帗閻熸粍绮撳畷婊冣枎閹存繍妫滃銈嗘尪閸ㄥ綊鎮為崹顐犱簻闁圭儤鍨甸弳娆撴煕濮橆剛绉洪柡灞界Х椤т線鏌涢幘瀵告噰鐎规洏鍨归…銊╁醇濠靛牞绱遍梻浣烘嚀婢х晫鍒掗鐐村亗闁告劦浜濋崰鎰節婵犲倻澧曠紒鈧崼銉︾厽闁哄啫鐗滃Λ鎴︽煛閸☆厾鐣甸柡灞炬礃缁旂喖顢涘Δ鈧禍楣冩⒑缁嬫鍎愰柟鐟版喘瀵偊骞囬鐔峰妳闂佹枼鏅涢崯鐗堢閸洘鈷掑ù锝囨嚀閳绘洟鏌￠埀顒勬焼瀹ュ懎鐎梺绉嗗嫷娈旈柦鍐枑缁绘盯骞嬮悙鍐╁哺瀵劍绂掔€ｎ偆鍘遍梺鏂ユ櫅閸犳艾鈻撻姀鐘嗗湱浜搁弽褌澹曢梻鍌氬€搁崐鐑芥嚄閸撲礁鍨濇い鏍ㄧ矋閺嗘粓鏌ｉ弬璺ㄦ闁哄鐗犻弻锟犲炊閳轰絿锝嗐亜椤愶絾绀嬮柡宀€鍠栭幃娆擃敆閳ь剚鏅堕鐐寸厱婵﹩鍓﹂崕鏃堟煛鐏炲墽娲寸€殿喗鎸虫俊鎼佸Ψ閵壯屽晪闂傚倷鑳剁划顖滅矙韫囨稑鍨傞柦妯侯樈濞兼牠鏌ц箛鎾磋础缁炬儳鍚嬫穱濠囶敍濮橆叀纭€缂備浇顔婄欢姘潖濞差亝顥堥柍鍝勫暟鑲栫紓鍌欐祰瀵挾鍒掑▎鎾崇畺濡わ絽鍟崐濠氭煢濡警妯€闁哥偛鐖煎娲传閸曨剙鍋嶉梺鍛婃煥缁夌懓顕ｉ弻銉ヮ潊闁挎稑瀚惁鍫ユ⒑闂堟盯鐛滅紒鎻掑⒔濞戠敻鎮欓鍙ョ盎闂佺懓鐡ㄧ换鍐夊鍫熺厓閻犲洩灏欐晥濡ょ姷鍋為…鍥╂閹烘嚦鐔兼煥鐎ｎ亶浼滃┑鐘垫暩閸嬬娀骞撻鍡楃筏闁秆勩仜閳ь剨绠撳畷濂稿Ψ閵壯呮毇闂備胶鎳撻悺銊ф閻戣姤鍋￠梺顓ㄥ閸欏棝姊洪柅鐐茶嫰婢т即鏌涢幒鎾崇瑨闁宠姘︾粻娑㈠即閻斿壊鍟庨梻鍌欑閹碱偄煤閵忋倕鍨傜憸鐗堝笚鐎氬懘鏌ｉ弬鍨倯闁绘挸绻愰…鍧楁嚋閻㈢偣鈧帡鏌ｉ敐澶夋喚闁哄本鐩獮姗€宕￠悙宸綆闂備礁鎼惉濂稿窗閺嵮呮殾婵°倕鎳忛崵鍐煃閸濆嫬鈧綊顢欓崘顔解拻濞达絽鎲￠崯鐐烘煛鐏炶濡跨紒顔芥閵囨劙骞掗幋鐐葱氭繝鐢靛仦閸垶宕归崷顓犱笉闁规儼濮ら悡娆撴煟閹邦垱顥夊┑陇鍋愮槐鎾愁吋閸滃啳鍚悗娈垮櫘閸嬪﹪鐛崶顒€绾ч柛褎顨呴弫瑙勪繆閻愵亜鈧牠宕濊瀵板﹦鎹勯妸褏鐓嬮梺缁樺灱婵倝鍩涢幒鎴欌偓鎺戭潩閿濆懍澹曟繝鐢靛仒閸栫娀宕楅悩铏仢濠碘剝鎮傞崺鈩冩媴閾忕懓鐐婇梻鍌欑閹碱偆绮欐笟鈧畷銏＄附閸涘﹤鐝旈梺缁樻煥閹芥粎绮绘ィ鍐╃厵閻庣數顭堥崜閬嶆煟閹烘挻鍊愰柡宀嬬秮瀵噣宕掑顑跨帛闂備礁婀遍、濠囧春閺嶎厼桅闁告洦鍨扮粻濠氭偣閾忚纾柕澶嗘櫆閻撴洘鎱ㄥΔ鈧Λ妤呮倶閿旇姤鍙忓┑鐘插鐢盯鏌熷畡鐗堝櫧缂侇喚鏁搁埀顒婄秵娴滄繈鎮炬导瀛樷拻濞达絽鎲￠幉绋库攽椤曗偓濞佳囨偩濠靛牏鐭欓悹鎭掑妽濞堟儳鈹戞幊閸婃劙宕戦幘娣簻妞ゆ劧绲块惌鎺楁煕閳规儳浜炬俊鐐€栧濠氬磻閹剧粯鐓熼柨婵嗘噹濡插鎮￠妶鍡愪簻闊洦鎸婚崳鐑樼箾閸涱偄鐏叉慨濠呮缁辨帒螣閺囩喎鐏遍柕鍥ㄥ姍瀹曟﹢顢旈崱娆忕婵犵數鍋為崹鍫曟晝閳轰降鈧帗绻濆顓犲帾闂佸壊鍋呯换鍐夐悙鐑樺€堕煫鍥ь儏婵倿鏌＄仦鍓ф创妤犵偞顭囬埀顒勬涧閹芥粓鎮块崟顐嬫棃鎮╅棃娑楃捕濡炪倧闄勬竟鍡涘焵椤戣法绁烽柛瀣姍閸┾偓妞ゆ帊鑳堕埊鏇㈡嚕閵堝鐓欏瀣捣鐢稓绱掔紒妯尖姇婵炵厧绻樺畷婊嗩槾鐞氾絾绻濋悽闈涗粶闁归攱鍨瑰濠囧锤濡も偓閺嬩焦銇勯弬璺ㄦ癁婵℃彃鐗撻弻鏇＄疀閵壯咃紵闂佸憡蓱閹倿寮婚敐鍫㈢杸闁哄洨鍋橀崫妤€顪冮妶鍡樿偁闁告洦鍓欏鍧楁⒑缁嬫寧婀板〒姘殔閳绘挻绂掔€ｎ偆鍘介梺褰掑亰閸撴岸鍩㈤弴鐔剁箚妞ゆ牗顨呮禍楣冩⒒閸屾瑦绁版俊妞煎妿缁牊鎷呴搹鍦厠闂佽崵鍠愭竟鍡涘汲閿曞倹鐓熼柡鍐ㄥ€甸幏锟犳煛娴ｅ憡鍠橀柡宀嬬到閳诲海浠﹂幋鎺戭棜濠电姷顣介埀顒€鍟跨痪褔鏌熼鐓庘偓鎼侊綖韫囨洜纾兼俊顖濐嚙椤庢捇鏌ｉ悢鍝ユ噧閻庢凹鍓氱粋鎺楀煛閸涱喒鎷虹紓浣割儏閻忔繈顢楅姀鈥茬箚闁绘劖澹嗛惌娆愵殽閻愭彃鏆欓摶锝夋偠濞戞帒澧叉い顐㈢Ч濮婃椽妫冨☉姘鳖唺婵犳鍠氶崗姗€骞嗛崼銉ョ妞ゆ牗绋堥幏娲⒑閸涘﹥灏扮憸鏉垮暞缁傚秹鎮欓悜妯煎幈闂佺粯锚閸熸寧鎱ㄩ崶顒佺厓閻犲洩灏欏瓭濡炪値鍘归崝鎴濈暦婵傚憡鍋勯柛娆忣槸椤忓綊姊婚崒娆戭槮闁硅绱曠划娆撳箣閿旇姤娅囬梺鎸庣箓濞诧箓顢曟禒瀣拺妞ゆ巻鍋撶紒澶屾暬閹繝寮撮悢鍓佺畾濡炪倖鐗楃粙鎴︻敋濠婂嫨浜滈柕澶堝労濡偓闂佸搫鑻粔鍓佹閹烘嚦鐔烘嫚閼碱剨绱﹀┑掳鍊楁慨鐑藉磻閻愬搫绠查柛銉墰瀹撲線鏌熼悜妯虹亶闁衡偓娴犲鐓曢柕澶嬪灥閹冲繗顣鹃梻鍌氬€搁崐鎼佸磹妞嬪孩顐芥慨姗嗗墻閻掔晫鎲搁弮鍫濈畺鐟滄柨鐣烽崡鐐╂婵☆垵鍋愰弸鍐╃節濞堝灝鏋熼柕鍥ㄧ洴瀹曟垿骞樺ǎ顑跨盎闂侀潧绻嗛崜婵堜焊椤撱垺鎳氶柡宥庡幗閻撴洟鏌熼弶鍨倎缂併劋绮欓弻銊モ槈濞嗘垹鐓佺紓浣虹帛缁诲牊鎱ㄩ埀顒勬煥濠靛棙顥犻柕鍡樺姍濮婃椽宕崟顓炩拡闂佸憡鎸鹃崰搴ㄦ偩閻戣姤鍋ㄧ紒瀣硶閸旓箑顪冮妶鍡楀潑闁稿鎸婚妵?
  }
}

function drawBarSeries(ctx, xScale, yScale, style, margin, plotH, interactive = true) {
  const keys = ["ctrl", "exp"].filter((key) => barSeriesStyle(key, style).visible);
  if (!keys.length) return;
  const zeroY = Math.min(margin.top + plotH, Math.max(margin.top, yScale(0)));
  keys.forEach((key, seriesIndex) => {
    const s = barSeriesStyle(key, style);
    const rows = getSeriesRows(key, style);
    const offset = (seriesIndex - (keys.length - 1) / 2) * (style.barWidth + style.barGap);
    rows.forEach((row, rowIndex) => {
      const centerX = xScale(Number(row.time.day)) + offset;
      const topY = yScale(row.mean);
      const rectX = centerX - style.barWidth / 2;
      const rectY = Math.min(topY, zeroY);
      const rectH = Math.abs(zeroY - topY);
      ctx.save();
      ctx.globalAlpha = style.barOpacity;
      ctx.fillStyle = s.color;
      ctx.fillRect(rectX, rectY, style.barWidth, rectH);
      ctx.globalAlpha = 1;
      if (style.barBorderWidth > 0) {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = style.barBorderWidth;
        ctx.strokeRect(rectX, rectY, style.barWidth, rectH);
      }
      ctx.restore();

      if (style.showRawPoints) {
        const rawSize = Math.max(2, Math.min(5, style.barWidth * 0.14));
        row.values.forEach((value, i) => {
          const jitter = (((i + rowIndex) % 9) - 4) * (style.jitter / 4);
          drawMarker(ctx, "circle", centerX + jitter, yScale(value), rawSize, s.color, style.rawPointOpacity);
        });
      }

      if (style.showErrorBars && Number.isFinite(row.error)) {
        const y1 = yScale(row.mean - row.error);
        const y2 = yScale(row.mean + row.error);
        ctx.save();
        ctx.strokeStyle = s.errorColor;
        ctx.lineWidth = s.errorWidth;
        ctx.beginPath();
        ctx.moveTo(centerX, y1);
        ctx.lineTo(centerX, y2);
        ctx.moveTo(centerX - s.errorCap, y1);
        ctx.lineTo(centerX + s.errorCap, y1);
        ctx.moveTo(centerX - s.errorCap, y2);
        ctx.lineTo(centerX + s.errorCap, y2);
        ctx.stroke();
        ctx.restore();
      }

      if (style.showValueLabels) {
        ctx.fillStyle = style.textColor;
        ctx.font = canvasFont(style, Math.max(10, style.globalFontSize - 1));
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(formatNumber(row.mean), centerX, rectY - 5);
      }

      if (interactive) {
        state.hoverPoints.push({
          x: centerX,
          y: rectY,
          radius: Math.max(10, style.barWidth / 2),
          bounds: { x: rectX, y: rectY, width: style.barWidth, height: Math.max(8, rectH) },
          label: s.label,
          time: row.time.label,
          mean: row.mean,
          error: row.error,
          errorLabel: errorLabel(style),
          n: row.n,
          color: s.color,
        });
      }
    });
  });
}

function drawGrid(ctx, style, margin, plotW, plotH, xScale, yScale, yRange) {
  ctx.save();
  if (style.showMinorGrid) {
    ctx.strokeStyle = "rgba(150, 165, 180, 0.18)";
    ctx.lineWidth = 1;
    const minorStep = yRange.step / 2;
    for (let y = yRange.min + minorStep, count = 0; y < yRange.max && count < 400; y += minorStep, count += 1) {
      const py = yScale(y);
      ctx.beginPath();
      ctx.moveTo(margin.left, py);
      ctx.lineTo(margin.left + plotW, py);
      ctx.stroke();
    }
  }
  if (style.showMajorGrid) {
    ctx.strokeStyle = "rgba(120, 140, 160, 0.32)";
    ctx.lineWidth = 1;
    for (let y = yRange.min, count = 0; y <= yRange.max + yRange.step / 2 && count < 200; y += yRange.step, count += 1) {
      const py = yScale(y);
      ctx.beginPath();
      ctx.moveTo(margin.left, py);
      ctx.lineTo(margin.left + plotW, py);
      ctx.stroke();
    }
    state.times.forEach((time) => {
      const px = xScale(Number(time.day));
      if (px < margin.left || px > margin.left + plotW) return;
      ctx.beginPath();
      ctx.moveTo(px, margin.top);
      ctx.lineTo(px, margin.top + plotH);
      ctx.stroke();
    });
  }
  ctx.restore();
}

function drawAxes(ctx, style, margin, plotW, plotH, width, height, xScale, yScale, yRange, xDomainMin, xDomainMax) {
  const tickInside = style.tickDirection === "in";
  const yTickEnd = tickInside ? margin.left + 6 : margin.left - 6;
  const xTickEnd = tickInside ? height - margin.bottom - 6 : height - margin.bottom + 6;
  ctx.save();
  ctx.strokeStyle = style.axisColor;
  ctx.lineWidth = 1;
  ctx.fillStyle = style.textColor;
  ctx.font = canvasFont(style, style.tickSize);
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  const tickDigits = yRange.step < 1 ? 2 : Number.isInteger(yRange.step) ? 0 : 1;
  for (let y = yRange.min, count = 0; y <= yRange.max + yRange.step / 2 && count < 200; y += yRange.step, count += 1) {
    const py = yScale(y);
    ctx.beginPath();
    ctx.moveTo(margin.left, py);
    ctx.lineTo(yTickEnd, py);
    ctx.stroke();
    ctx.fillText(formatNumber(y, tickDigits), margin.left - 10, py);
  }

  ctx.beginPath();
  ctx.moveTo(margin.left, margin.top);
  ctx.lineTo(margin.left, height - margin.bottom);
  ctx.lineTo(width - margin.right, height - margin.bottom);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  state.times.forEach((time) => {
    const day = Number(time.day);
    if (day < xDomainMin || day > xDomainMax) return;
    const px = xScale(day);
    ctx.beginPath();
    ctx.moveTo(px, height - margin.bottom);
    ctx.lineTo(px, xTickEnd);
    ctx.stroke();
    ctx.fillText(time.label, px, height - margin.bottom + (tickInside ? 8 : 12));
  });
  ctx.restore();
}

function addDraggableItem(type, bounds) {
  if (!bounds) return;
  state.draggableItems.push({ type, ...bounds });
}

function drawAxisTitlesAndLegend(ctx, style, margin, plotW, plotH, width, height, interactive = true, legendRenderer = drawCanvasLegend) {
  if (style.showYAxisTitle && style.yAxisTitle) {
    ctx.save();
    ctx.font = canvasFont(style, style.axisSize);
    const textWidth = ctx.measureText(style.yAxisTitle).width;
    ctx.restore();
    const cx = style.yAxisTitleX;
    const cy = margin.top + plotH * (style.yAxisTitleY / 100);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = style.textColor;
    ctx.font = canvasFont(style, style.axisSize);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(style.yAxisTitle, 0, 0);
    ctx.restore();
    if (interactive) {
      addDraggableItem("yAxisTitle", {
        x: cx - style.axisSize / 2 - 10,
        y: cy - textWidth / 2 - 10,
        width: style.axisSize + 20,
        height: textWidth + 20,
      });
    }
  }
  if (style.showXAxisTitle && style.xAxisTitle) {
    const x = margin.left + plotW * (style.xAxisTitleX / 100);
    const y = height - style.xAxisTitleY;
    ctx.fillStyle = style.textColor;
    ctx.font = canvasFont(style, style.axisSize);
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    const textWidth = ctx.measureText(style.xAxisTitle).width;
    ctx.fillText(style.xAxisTitle, x, y);
    if (interactive) {
      addDraggableItem("xAxisTitle", {
        x: x - textWidth / 2 - 8,
        y: y - style.axisSize - 8,
        width: textWidth + 16,
        height: style.axisSize + 16,
      });
    }
  }
  if (style.showTitle && style.chartTitle) {
    const x = width * (style.titleX / 100);
    const y = style.titleY;
    ctx.fillStyle = style.textColor;
    ctx.font = canvasFont(style, style.titleSize, 700);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const textWidth = ctx.measureText(style.chartTitle).width;
    ctx.fillText(style.chartTitle, x, y);
    if (interactive) {
      addDraggableItem("chartTitle", {
        x: x - textWidth / 2 - 8,
        y: y - 6,
        width: textWidth + 16,
        height: style.titleSize + 14,
      });
    }
  }
  if (style.showLegend) {
    const bounds = legendRenderer(ctx, style, margin, plotW, plotH);
    if (interactive) addDraggableItem("legend", bounds);
  }
}

function drawSmoothLine(ctx, points, smoothness) {
  if (points.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  if (points.length === 2 || smoothness <= 0) {
    points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
    return;
  }
  const tension = 0.08 + smoothness * 0.42;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
}

function drawSeries(ctx, key, xScale, yScale, style, interactive = true) {
  const s = seriesStyle(key, style);
  if (!s.visible) return;
  const rows = getSeriesRows(key, style);
  if (!rows.length) return;
  const rawMarkerSize = Math.max(2, s.markerSize * 0.46);

  if (style.showRawPoints) {
    rows.forEach((row) => {
      row.values.forEach((value, i) => {
        const jitter = ((i % 7) - 3) * style.jitter;
        drawMarker(ctx, s.markerStyle, xScale(Number(row.time.day)) + jitter, yScale(value), rawMarkerSize, s.color, style.rawPointOpacity);
      });
    });
  }

  if (style.showErrorBars) {
    ctx.save();
    ctx.strokeStyle = s.errorColor;
    ctx.lineWidth = s.errorWidth;
    rows.forEach((row) => {
      if (!Number.isFinite(row.error)) return;
      const x = xScale(Number(row.time.day));
      const y1 = yScale(row.mean - row.error);
      const y2 = yScale(row.mean + row.error);
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.moveTo(x - s.errorCap, y1);
      ctx.lineTo(x + s.errorCap, y1);
      ctx.moveTo(x - s.errorCap, y2);
      ctx.lineTo(x + s.errorCap, y2);
      ctx.stroke();
    });
    ctx.restore();
  }

  const points = rows.map((row) => ({ row, x: xScale(Number(row.time.day)), y: yScale(row.mean) }));
  if (points.length > 1) {
    ctx.save();
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.lineWidth;
    ctx.setLineDash(lineDash(s.lineStyle, s.lineWidth));
    drawSmoothLine(ctx, points, style.smoothCurve ? style.smoothness : 0);
    ctx.stroke();
    ctx.restore();
  }

  rows.forEach((row) => {
    const x = xScale(Number(row.time.day));
    const y = yScale(row.mean);
    drawMarker(ctx, s.markerStyle, x, y, s.markerSize, s.color);
    if (style.showValueLabels) {
      ctx.fillStyle = style.textColor;
      ctx.font = canvasFont(style, Math.max(10, style.globalFontSize - 1));
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(formatNumber(row.mean), x, y - s.markerSize - 5);
    }
    if (interactive) {
      state.hoverPoints.push({
        x,
        y,
        radius: s.markerSize + 8,
        label: s.label,
        time: row.time.label,
        mean: row.mean,
        error: row.error,
        errorLabel: errorLabel(style),
        n: row.n,
        color: s.color,
      });
    }
  });
}

function drawMaxImprovementMarker(ctx, xScale, margin, plotW, plotH, style) {
  const best = getMaxImprovement(style);
  if (!best || !Number.isFinite(best.diff)) return;
  const x = xScale(Number(best.time.day));
  if (x < margin.left || x > margin.left + plotW) return;
  ctx.save();
  ctx.strokeStyle = "#f0a202";
  ctx.fillStyle = "#f0a202";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(x, margin.top);
  ctx.lineTo(x, margin.top + plotH);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = canvasFont(style, style.globalFontSize + 8, 700);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("*", x, margin.top + 4);
  ctx.restore();
}

function drawDifferenceTrend(ctx, xScale, margin, plotW, plotH, style) {
  const rows = getDisplayStats(style).filter((row) => Number.isFinite(row.diff));
  if (rows.length < 2) return;
  const diffs = rows.map((row) => row.diff);
  let min = Math.min(...diffs);
  let max = Math.max(...diffs);
  if (min === max) {
    min -= 1;
    max += 1;
  }
  const bandH = Math.max(46, plotH * 0.18);
  const top = margin.top + plotH - bandH - 8;
  const bottom = margin.top + plotH - 8;
  const y = (value) => bottom - ((value - min) / (max - min)) * bandH;
  ctx.save();
  ctx.strokeStyle = "rgba(111, 66, 193, 0.85)";
  ctx.fillStyle = "rgba(111, 66, 193, 0.08)";
  ctx.fillRect(margin.left, top, plotW, bandH);
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 3]);
  ctx.beginPath();
  rows.forEach((row, index) => {
    const x = xScale(Number(row.time.day));
    const py = y(row.diff);
    if (index === 0) ctx.moveTo(x, py);
    else ctx.lineTo(x, py);
  });
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.font = canvasFont(style, Math.max(10, style.globalFontSize - 1), 700);
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "rgba(111, 66, 193, 0.95)";
  ctx.fillText("均值差异趋势", margin.left + 8, top + 5);
  ctx.restore();
}

function drawZoomBox(ctx, drag) {
  const x = Math.min(drag.startX, drag.currentX);
  const y = Math.min(drag.startY, drag.currentY);
  const w = Math.abs(drag.currentX - drag.startX);
  const h = Math.abs(drag.currentY - drag.startY);
  ctx.save();
  ctx.fillStyle = "rgba(36, 99, 179, 0.12)";
  ctx.strokeStyle = "rgba(36, 99, 179, 0.85)";
  ctx.setLineDash([5, 4]);
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

function updateAll() {
  persistActiveMetricInputs();
  const exp = parseRawRows(els.expInput.value);
  const ctrl = parseRawRows(els.ctrlInput.value);
  state.expRows = exp.rows;
  state.ctrlRows = ctrl.rows;
  state.stats = calculateStats();
  els.expStatus.textContent = exp.rows.length + " 行" + (exp.skipped ? "，已跳过 " + exp.skipped + " 列不匹配数据" : "");
  els.ctrlStatus.textContent = ctrl.rows.length + " 行" + (ctrl.skipped ? "，已跳过 " + ctrl.skipped + " 列不匹配数据" : "");
  updateSummary();
  updatePValueTable();
  updateCurrentDataTable();
  drawChart();
  saveState();
}

function normalizeSavedEffect(effect, defaultStyle = DEFAULT_CHART_STYLE) {
  if (!effect || typeof effect !== "object" || !effect.chartStyle || typeof effect.chartStyle !== "object") {
    return null;
  }
  const view = effect.view && typeof effect.view === "object" ? {
    xMin: Number(effect.view.xMin),
    xMax: Number(effect.view.xMax),
    yMin: Number(effect.view.yMin),
    yMax: Number(effect.view.yMax),
  } : null;
  const hasValidView =
    view &&
    Number.isFinite(view.xMin) &&
    Number.isFinite(view.xMax) &&
    Number.isFinite(view.yMin) &&
    Number.isFinite(view.yMax) &&
    view.xMax > view.xMin &&
    view.yMax > view.yMin;
  return {
    chartStyle: { ...defaultStyle, ...effect.chartStyle },
    view: hasValidView ? view : null,
  };
}

function makeCurrentEffect() {
  return {
    chartStyle: structuredClone(getActiveStyle()),
    view: state.view ? { ...state.view } : null,
  };
}

function setMetricStyleDefaults(metricKey = state.activeMetric) {
  ensureMetricState(metricKey);
}

function loadMetricPreset(metricKey = state.activeMetric, options = {}) {
  const { forcePreset = false } = options;
  const metricState = ensureMetricState(metricKey);
  const hasStoredExp = typeof metricState.expInput === "string";
  const hasStoredCtrl = typeof metricState.ctrlInput === "string";
  if (!forcePreset && (hasStoredExp || hasStoredCtrl)) {
    els.expInput.value = hasStoredExp ? metricState.expInput : "";
    els.ctrlInput.value = hasStoredCtrl ? metricState.ctrlInput : "";
    return true;
  }
  const preset = getMetricPreset(metricKey);
  if (!preset) return false;
  els.expInput.value = preset.exp || "";
  els.ctrlInput.value = preset.ctrl || "";
  metricState.expInput = els.expInput.value;
  metricState.ctrlInput = els.ctrlInput.value;
  return true;
}

function saveState() {
  persistActiveView();
  persistActiveMetricInputs();
  ensureMetricState().activeChart = state.activeChart;
  const metricStates = {};
  METRIC_ORDER.forEach((metricKey) => {
    const metricState = ensureMetricState(metricKey);
    metricStates[metricKey] = {
      expInput: metricState.expInput ?? "",
      ctrlInput: metricState.ctrlInput ?? "",
      chartStyle: metricState.chartStyle,
      barStyle: metricState.barStyle,
      lineView: metricState.lineView,
      barView: metricState.barView,
      savedEffect: metricState.savedEffect,
      savedBarEffect: metricState.savedBarEffect,
      activeChart: metricState.activeChart === "bar" ? "bar" : "line",
    };
  });
  const payload = {
    version: STORAGE_VERSION,
    activeMetric: state.activeMetric,
    activeChart: state.activeChart,
    times: state.times,
    metricStates,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function restoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const savedTimesAreCurrent =
      Array.isArray(saved.times) &&
      saved.times.length === DEFAULT_TIMES.length &&
      saved.times.every((time, index) => time.label === DEFAULT_TIMES[index].label);
    if (savedTimesAreCurrent) state.times = saved.times;

    state.metricStates = {};

    if (saved.metricStates && typeof saved.metricStates === "object") {
      METRIC_ORDER.forEach((metricKey) => {
        state.metricStates[metricKey] = createMetricState(metricKey, saved.metricStates[metricKey] || {});
      });
    } else {
      const legacyActiveMetric = saved.activeMetric && METRIC_CONFIG[saved.activeMetric] ? saved.activeMetric : "density";
      const legacyChartStyle = saved.chartStyle && typeof saved.chartStyle === "object" ? saved.chartStyle : {};
      const legacyBarStyle = saved.barStyle && typeof saved.barStyle === "object" ? saved.barStyle : {};
      const legendMoved =
        legacyChartStyle.legendX !== undefined &&
        legacyChartStyle.legendY !== undefined &&
        (legacyChartStyle.legendX !== DEFAULT_CHART_STYLE.legendX || legacyChartStyle.legendY !== DEFAULT_CHART_STYLE.legendY);
      const legacyLegendSettings = !saved.version || saved.version < 4;
      if (legacyLegendSettings && legendMoved && legacyChartStyle.legendPosition !== "custom") {
        legacyChartStyle.legendPosition = "custom";
      }
      METRIC_ORDER.forEach((metricKey) => {
        state.metricStates[metricKey] = createMetricState(metricKey, {
          chartStyle: {
            ...legacyChartStyle,
            chartTitle: getMetricLineDefaults(metricKey).chartTitle,
            yAxisTitle: getMetricLineDefaults(metricKey).yAxisTitle,
          },
          barStyle: {
            ...legacyBarStyle,
            chartTitle: getMetricBarDefaults(metricKey).chartTitle,
            yAxisTitle: getMetricBarDefaults(metricKey).yAxisTitle,
          },
          lineView: saved.lineView,
          barView: saved.barView,
          savedEffect: saved.savedEffect,
          savedBarEffect: saved.savedBarEffect,
          activeChart: saved.activeChart,
        });
      });
      if (typeof saved.expInput === "string") state.metricStates[legacyActiveMetric].expInput = saved.expInput;
      if (typeof saved.ctrlInput === "string") state.metricStates[legacyActiveMetric].ctrlInput = saved.ctrlInput;
    }

    state.activeMetric = saved.activeMetric && METRIC_CONFIG[saved.activeMetric] ? saved.activeMetric : "density";
    const metricState = ensureMetricState(state.activeMetric);
    state.activeChart = saved.activeChart === "bar" ? "bar" : metricState.activeChart;
    metricState.activeChart = state.activeChart;
    state.view = state.activeChart === "bar" ? metricState.barView : metricState.lineView;
    loadMetricPreset(state.activeMetric);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    state.metricStates = {};
  }
}


function exportCsv() {
  const rows = [
    ["时间", "横轴", "PRP+BTX-A n", "PRP+BTX-A 均值", "PRP+BTX-A SD", "PRP n", "PRP 均值", "PRP SD"],
    ...state.stats.map((row) => [
      row.time.label,
      row.time.day,
      row.exp.n,
      formatNumber(row.exp.mean),
      formatNumber(row.exp.sd),
      row.ctrl.n,
      formatNumber(row.ctrl.mean),
      formatNumber(row.ctrl.sd),
    ]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => "\"" + String(cell).replace(/"/g, "\"\"") + "\"").join(","))
    .join("\n");
  downloadBlob(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }), "hair_density_summary.csv");
}


function exportPng() {
  drawChart();
  els.chart.toBlob((blob) => {
    if (blob) downloadBlob(blob, state.activeChart === "bar" ? "hair_density_bar.png" : "hair_density_curve.png");
  }, "image/png");
}

function exportPng300() {
  const rect = els.chart.getBoundingClientRect();
  const scale = 300 / 96;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(rect.width * scale);
  canvas.height = Math.round(rect.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  if (state.activeChart === "bar") {
    renderBarChart(ctx, rect.width, rect.height, state.barStyle, { interactive: false });
  } else {
    renderChart(ctx, rect.width, rect.height, state.chartStyle, { interactive: false });
  }
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, state.activeChart === "bar" ? "hair_density_bar_300dpi.png" : "hair_density_curve_300dpi.png");
  }, "image/png");
}

function svgEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function svgMarker(shape, x, y, size, color) {
  if (shape === "none") return "";
  if (shape === "square") {
    return '<rect x="' + (x - size / 2) + '" y="' + (y - size / 2) + '" width="' + size + '" height="' + size + '" fill="' + color + '" />';
  }
  if (shape === "diamond") {
    return '<path d="M ' + x + ' ' + (y - size / 2) + ' L ' + (x + size / 2) + ' ' + y + ' L ' + x + ' ' + (y + size / 2) + ' L ' + (x - size / 2) + ' ' + y + ' Z" fill="' + color + '" />';
  }
  if (shape === "triangle") {
    return '<path d="M ' + x + ' ' + (y - size / 2) + ' L ' + (x + size / 2) + ' ' + (y + size / 2) + ' L ' + (x - size / 2) + ' ' + (y + size / 2) + ' Z" fill="' + color + '" />';
  }
  return '<circle cx="' + x + '" cy="' + y + '" r="' + (size / 2) + '" fill="' + color + '" />';
}

function exportSvg() {
  const rect = els.chart.getBoundingClientRect();
  const width = Math.max(760, Math.round(rect.width));
  const height = Math.max(420, Math.round(rect.height));
  drawChart();
  const pngDataUrl = els.chart.toDataURL("image/png");
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
    width +
    '" height="' +
    height +
    '" viewBox="0 0 ' +
    width +
    " " +
    height +
    '">' +
    '<image href="' +
    pngDataUrl +
    '" width="' +
    width +
    '" height="' +
    height +
    '" />' +
    "</svg>";
  downloadBlob(
    new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
    state.activeChart === "bar" ? "hair_density_bar.svg" : "hair_density_curve.svg",
  );
}

function exportBarSvg() {
  exportSvg();
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    textarea.remove();
  }
  return copied;
}

function onCanvasMove(event) {
  const rect = els.chart.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const hit = state.hoverPoints.find((point) => {
    if (point.bounds) {
      return x >= point.bounds.x && x <= point.bounds.x + point.bounds.width && y >= point.bounds.y && y <= point.bounds.y + point.bounds.height;
    }
    return Math.hypot(point.x - x, point.y - y) <= point.radius;
  });
  if (!hit) {
    els.tooltip.hidden = true;
    return;
  }
  els.tooltip.innerHTML =
    "<strong>" + hit.label + " · " + hit.time + "</strong><br>" +
    "均值: " + formatNumber(hit.mean) + "<br>" +
    hit.errorLabel + ": " + formatNumber(hit.error) + "<br>" +
    "n: " + hit.n;
  els.tooltip.style.left = hit.x + "px";
  els.tooltip.style.top = hit.y + "px";
  els.tooltip.hidden = false;
}

function canvasPoint(event) {
  const rect = els.chart.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function findDraggableItem(point) {
  for (let i = state.draggableItems.length - 1; i >= 0; i -= 1) {
    const item = state.draggableItems[i];
    if (
      point.x >= item.x &&
      point.x <= item.x + item.width &&
      point.y >= item.y &&
      point.y <= item.y + item.height
    ) {
      return item;
    }
  }
  return null;
}

function syncLayoutPositionControls() {
  const style = getActiveStyle();
  const controls = getActiveLayoutControls();
  setInputValue(controls.titleXInput, formatNumber(style.titleX, 0));
  setInputValue(controls.titleYInput, formatNumber(style.titleY, 0));
  setInputValue(controls.xAxisTitleXInput, formatNumber(style.xAxisTitleX, 0));
  setInputValue(controls.xAxisTitleYInput, formatNumber(style.xAxisTitleY, 0));
  setInputValue(controls.yAxisTitleXInput, formatNumber(style.yAxisTitleX, 0));
  setInputValue(controls.yAxisTitleYInput, formatNumber(style.yAxisTitleY, 0));
  setInputValue(controls.legendXInput, formatNumber(style.legendX, 0));
  setInputValue(controls.legendYInput, formatNumber(style.legendY, 0));
  setInputValue(controls.legendPositionInput, style.legendPosition);
}

function startLabelDrag(item, point, event) {
  const g = state.chartGeometry;
  const style = getActiveStyle();
  state.labelDrag = {
    active: true,
    type: item.type,
    startX: point.x,
    startY: point.y,
    chartWidth: g?.width || els.chart.getBoundingClientRect().width,
    chartHeight: g?.height || els.chart.getBoundingClientRect().height,
    margin: g?.margin,
    plotW: g?.plotW,
    plotH: g?.plotH,
    style: {
      titleX: style.titleX,
      titleY: style.titleY,
      xAxisTitleX: style.xAxisTitleX,
      xAxisTitleY: style.xAxisTitleY,
      yAxisTitleX: style.yAxisTitleX,
      yAxisTitleY: style.yAxisTitleY,
      legendX: style.legendX,
      legendY: style.legendY,
      legendPosition: style.legendPosition,
    },
  };
  els.chart.setPointerCapture?.(event.pointerId);
  els.tooltip.hidden = true;
}

function updateLabelDrag(point) {
  const drag = state.labelDrag;
  if (!drag?.active) return;
  const dx = point.x - drag.startX;
  const dy = point.y - drag.startY;
  const style = getActiveStyle();
  const margin = drag.margin || { top: 0, left: 0 };
  const plotW = Math.max(1, drag.plotW || drag.chartWidth);
  const plotH = Math.max(1, drag.plotH || drag.chartHeight);

  if (drag.type === "chartTitle") {
    const startX = (drag.style.titleX / 100) * drag.chartWidth;
    style.titleX = clamp(((startX + dx) / drag.chartWidth) * 100, 0, 100);
    style.titleY = clamp(drag.style.titleY + dy, 0, drag.chartHeight);
  } else if (drag.type === "xAxisTitle") {
    const startX = margin.left + plotW * (drag.style.xAxisTitleX / 100);
    style.xAxisTitleX = clamp(((startX + dx - margin.left) / plotW) * 100, 0, 100);
    style.xAxisTitleY = clamp(drag.style.xAxisTitleY - dy, 0, drag.chartHeight);
  } else if (drag.type === "yAxisTitle") {
    const startY = margin.top + plotH * (drag.style.yAxisTitleY / 100);
    style.yAxisTitleX = clamp(drag.style.yAxisTitleX + dx, 0, drag.chartWidth);
    style.yAxisTitleY = clamp(((startY + dy - margin.top) / plotH) * 100, 0, 100);
  } else if (drag.type === "legend") {
    style.legendPosition = "custom";
    style.legendX = clamp(drag.style.legendX + dx, 0, 2000);
    style.legendY = clamp(drag.style.legendY + dy, 0, 2000);
  }

  syncLayoutPositionControls();
  drawChart();
}

function pointInPlot(point) {
  const g = state.chartGeometry;
  if (!g) return false;
  return point.x >= g.margin.left && point.x <= g.margin.left + g.plotW && point.y >= g.margin.top && point.y <= g.margin.top + g.plotH;
}

function syncChartModeUi() {
  const isBar = state.activeChart === "bar";
  els.lineChartTab?.classList.toggle("active", !isBar);
  els.barChartTab?.classList.toggle("active", isBar);
  if (els.lineControlPanel) els.lineControlPanel.hidden = isBar;
  if (els.barControlPanel) els.barControlPanel.hidden = !isBar;
  if (els.chartPanelTitle) els.chartPanelTitle.textContent = isBar ? "闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇川绾剧晫鈧箍鍎遍幏鎴︾叕椤掑倵鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝懐顦ч柣蹇撶箲閻楁鈧矮绮欏铏规嫚閺屻儱寮板┑鐐板尃閸曨厾褰炬繝鐢靛Т娴硷綁鏁愭径妯绘櫓闂佸憡鎸嗛崪鍐簥闂傚倷鑳剁划顖炲礉閿曞倸绀堟繛鍡樻尭缁€澶愭煏閸繃宸濈痪鍓ф櫕閳ь剙绠嶉崕閬嶅箯閹达妇鍙曟い鎺戝€甸崑鎾斥枔閸喗鐏堝銈庡幘閸忔﹢鐛崘顔碱潊闁靛牆鎳愰ˇ褔鏌ｈ箛鎾剁闁绘顨堥埀顒佺煯缁瑥顫忛搹瑙勫珰闁哄被鍎卞鏉库攽閻愭澘灏冮柛鏇ㄥ幘瑜扮偓绻濋悽闈浶㈠ù纭风秮閺佹劖寰勫Ο缁樻珦闂備礁鎲￠幐鍡涘椽閸愵亜绨ラ梻鍌氬€烽懗鍓佸垝椤栫偛绀夐柨鏇炲€哥粈鍫熺箾閸℃ɑ灏紒鈧径鎰厪闁割偅绻冨婵堢棯閸撗勬珪闁逞屽墮缁犲秹宕曢柆宥呯闁硅揪濡囬崣鏇熴亜閹烘垵鈧敻宕戦幘鏂ユ灁闁割煈鍠楅悘鍫濐渻閵堝骸骞橀柛蹇旓耿閻涱噣宕橀纰辨綂闂侀潧鐗嗛幊鎰八囪閺岋綀绠涢幘鍓侇唹闂佺粯顨嗛〃鍫ュ焵椤掍胶鐓紒顔界懃椤繘鎼圭憴鍕彴闂佸搫琚崕鍗烆嚕閺夊簱鏀介柣鎰緲鐏忓啴鏌涢弴銊ュ箻鐟滄壆鍋撶换婵嬫偨闂堟刀銏犆圭涵椋庣М闁轰焦鍔栧鍕熺紒妯荤彟闂傚倷绀侀幉锟犲箰閸℃稑妞介柛鎰典簻缁ㄣ儵姊婚崒姘偓宄懊归崶顒夋晪闁哄稁鍘奸崹鍌炲箹濞ｎ剙濡肩紒鈧崘顔界叆婵犻潧妫欓ˉ婊堟煟閿曞倷鎲炬慨濠傤煼瀹曟帒鈻庨幒鎴濆腐婵＄偑鍊戦崹褰掓晝閵堝鐓濈€广儱顦崡鎶芥煏韫囨洖啸妞ゆ柨顦靛娲箹閻愭彃濮堕梺鍛婃尰閻熲晠骞冨鈧獮搴ㄦ嚍閵壯冨箰闂備礁鎲￠崝鎴﹀礉鎼淬垺娅犻柡鍥╁Х绾惧ジ鏌嶈閸撶喎鐣峰鈧崺鐐村緞閸濄儳娉块梻鍌氼煬閸嬪嫬煤閵堝悿褰掓倻閸撳灝娲弫鍐焵椤掑嫭绠掓繝鐢靛Т閿曘倝鎮ц箛娑欏仼婵炲樊浜濋悡娑㈡倶閻愰鍤欏┑鈥炽偢閺屽秶鎲撮崟顐や紝閻庤娲栧畷顒勫煝鎼淬倗鐤€闁规儳顕Σ妤冪磽閸屾艾鈧悂宕愰悜鑺モ挃鐎广儱顦粈澶屸偓鍏夊亾闁告洦鍊犺閺岀喖姊荤€靛壊妲梺钘夊暟閸犳牠寮婚敐澶婃闁割煈鍠楅崐顖炴⒑缁嬪潡顎楅柣顓炲€垮璇测槈濡攱鏂€闂佸憡娲﹂崑鍕叏閵忋倖鍋犳慨妯哄⒔閻ｅ灚鎱ㄦ繝鍕笡闁瑰嘲鎳樺畷銊︾節閸愩劌澹嶉梻鍌欑劍濡炲潡宕㈡總鏉嗗洦娼忛埡鍌ゆ綗闂佺粯鍔曢顓㈡偡瑜版帗鐓冪憸婊堝礈閻旈晲绻嗛悗娑櫳戞刊鎾煕閹惧啿绾х€点倖妞藉娲焻閻愯尪瀚板褍鐡ㄩ〃銉╂倷閹绘帗娈梺瀹狀嚙闁帮綁鐛Ο铏规殾闁搞儴娉涢弲锝呪攽閿涘嫬浜奸柛濠冪墵楠炴劖銈ｉ崘銊╂７闂侀潧顦崕娆忊槈濠婂孩鈻屾繝娈垮枛閿曘倝鈥﹀畡鎵殾闁圭儤鍨熼弸搴ㄦ煙鐎电啸鐎规洖寮剁换婵嬫偨闂堟稐绮ч梺鍛婄墱婵炩偓鐎规洘顨婇幃娆擃敆閸屾顫嶉梻浣哥枃椤曆囨煀閿濆宓侀悗锝庡枟閸婄兘鎮楀☉娆欎緵闁哥偛鐖煎濠氬磼濞嗘埈妲┑鐘亾闂侇剙绉寸壕鍧楁煏閸繍妲堕柍褜鍓欓崯鎾嵁閸ヮ剦鏁婇柛鎾楀本笑闂傚倷绀侀幖顐ょ矓閺屻儱绀夐幖杈剧到婵剟鏌嶈閸撶喎顫忔繝姘＜婵ê宕·鈧┑鐐存尰绾板秹銆冩繝鍌滄殾闁哄洢鍨圭粻娑㈡煟濡も偓閻楀繘宕㈤幖浣光拺闁告稑锕ｇ欢閬嶆煕閻樺啿鍝虹€规洩缍侀崺鈧い鎺戝閳锋垿鏌涘┑鍡楊仾婵犫偓閹殿喚纾奸悗锝庡亜閻忔挳鏌涢埞鍨姕鐎垫澘瀚伴獮鍥敆閸屻倖鏁ら梻鍌欒兌缁垶宕濋弴鐐嶇喐绻濋崒銈囧姺缂傚倷鐒︾湁缂佽妫濋弻锝夊箛閸忓摜鐩庨梺閫炲苯澧柛銊ョ仢閻ｇ兘寮撮姀鐘烘憰闂侀潧顧€缁犳垵鈻撻悙缈犵箚闁靛牆绻掗崚浼存煕閻曚礁浜伴柟顔光偓鎰佹建闁逞屽墴瀵鎮㈢悰鈥充壕闁汇垺顔栭悞鎯归悩宕囩煂缂佽鲸甯￠幃鈺呮濞戞帗鐎版繝娈垮枛閿曘劌鈻嶉敐鍥у灊婵炲棙鎸哥粈宀勬煃閳轰礁鏆為柡鍡欏娣囧﹪鎮欓鍕ㄥ亾閹达箑绀夐悘鐐跺▏濞戞ǚ鏀介悗锝庡墮缁侊箓姊洪崜鎻掍簴闁稿氦椴搁崕顐︽⒒娴ｇ鏆遍柟纰卞亰瀹曟劙骞栨担鍝ュ姦濡炪倖宸婚崑鎾淬亜椤撶姴鍘寸€殿喖顭烽弫鍐焵椤掑啰浜藉┑鐐存尰閸戝綊宕规潏顭戞闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟鐑橆殕閸庡孩銇勯弽銊ュ毈婵炲吋鐗犻弻褑绠涢幘纾嬬缂佺偓鍎抽崥瀣┍婵犲浂鏁嶆慨姗嗗幗閸庢挸顪冮妶搴′簻闂佸府绲介～蹇涙惞閸︻厾鐓撻柣鐘充航閸斿秴危閳ь剟姊绘担渚劸闁挎洏鍎抽幑銏ゅ磼閻愭潙浠奸梺缁樺灱濡嫮绮婚敐澶嬬厽婵妫楁禍婊兠瑰鍫㈢暫闁哄被鍔岄埞鎴﹀幢濞戞墎鍋撳Δ鍛厸閻庯綆鍓欓弸娑㈡煛瀹€瀣М妤犵偞顭囬幑鍕倻濡皷鍋撻悙顒傜闁挎繂鎳忛幖鎰版煥閺囥劋閭柕鍡曠閳藉螣闁垮鏉搁梻浣虹《閸撴繈銆冮崱娑樼？妞ゅ繐鎳愮弧鈧梺姹囧灲濞佳嗏叴闂備胶顭堥鍡涘箰閹间焦绠掗梻浣虹帛閿氭俊顖氾躬瀹曟洟骞囬悧鍫㈠幗闂佽鍎抽崯鍧楀汲閻斿吋鐓欓柤纰卞墻閻掔偓銇勯婊冨鐎规洜鍘ч埞鎴﹀醇椤愶及婵嗏攽閻樺灚鏆╅柛瀣仱瀹曞綊宕滄担鍛婄€抽悗骞垮劚椤︿粙寮崘顔界厾闁诡厽甯掗崝婊堟煕濞嗗繒绠查柟渚垮妼铻栭柍褜鍓欒灋婵°倓鐒﹀▍鐘测攽閻樺磭顣查柣鎾存礋閺屾洟宕煎┑鍥舵！缂備讲鍋撻悗锝庡枟閻撴稓鈧厜鍋撻柍褜鍓熷畷浼村箻閼告娼熼梺鍦劋椤ㄥ懘锝為崨瀛樼厽婵☆垵娅ｉ敍宥吤瑰搴濈凹濞ｅ洤锕幃娆擃敂閸曘劌浜鹃柕鍫濐槸绾惧鏌涢弴銊ョ仩缂佺姷濮甸幈銊ヮ渻鐠囪弓澹曢柣搴㈩問閸犳盯顢氳椤㈡﹢宕楅悡搴ｇ獮婵犵數濮寸€氼剟鐛幇顑芥斀闁绘劘鍩栬ぐ褏绱掗煫顓犵煓妤犵偛顦甸崹楣冨棘閵夛妇浜栭梻浣告惈鐞氼偊宕曢弻銉ョ厱闁瑰濮风壕钘壝归敐鍫殐闁绘帞鏅槐鎺楁偐瀹曞洤顫х紓浣虹帛閻╊垶骞婇悩娲绘晢闁逞屽墴瀵憡鎯旈～顑跨盎濡炪倖鍔戦崹鑽ょ不瀹曞洨纾奸弶鍫涘妼缁楁帡鎽堕敐澶嬪仯闁搞儜鍕ㄦ灆闂侀€炲苯澧柟鐟版搐椤繐煤椤忓懎娈熼梺闈涱槸閸犳碍绂嶉鍫濇瀬鐎广儱鎷嬮崥瀣熆鐠虹尨鍔熸い鏃€甯炵槐鎾诲磼濞嗘垵濡藉銈庡幖濞差厼鐣烽敐澶婂耿婵＄偟绮弬鈧俊鐐€栧褰掑几缂佹鐟规繛鎴欏灪閻撴洘淇婇娑卞劌婵炲吋鍔楃槐鎺楀磼濮樻瘷銏°亜椤撴粌濮傜€规洖銈搁幃銏ゅ传閸曨偅杈堥梻鍌氬€风粈渚€骞栭锕€鐤い鎰ㄦ寣瑜版帒纾奸柣鎰絻閹偛鈹戦悙鍙夘棡闁圭顭烽幃锟犳偄閼测晛褰勯梺鎼炲劘閸庨亶宕濋妶鍥╂／闁硅鍔栫涵鍓佺磼鏉堛劌绗氭繛鐓庣箻婵℃悂濡烽敃浣烘闂佽瀛╅鏍闯椤曗偓瀹曟娊鏁愰崨顖涙闂佸湱鍎ら崺鍫濐焽閳哄倶浜滈柟鎹愭硾灏忛梻渚囧弾閸ㄤ即鍩為幋鐐茬疇闂佺锕ラ〃鍡涘箞閵娾晜鍊婚柦妯侯槺閿涙盯姊虹紒妯哄闁诲繑宀稿鍐差煥閸喓鍙嗛梺缁樻煥閹碱偄鏆╅柣搴ゎ潐閹搁娆㈠璺虹畺婵°倕鎳忛弲鏌ュ箹缁懓澧查柣蹇撶墢缁辨挻绗熼崶褌绨荤紓浣割槸缂嶅﹤顕ｇ拠宸悑闁割偒鍋呴鍥⒒娴ｅ憡鍟為柟鎼佺畺瀹曠増鎯旈…鎴炴櫔闂佹寧绻傞ˇ浠嬪极閸℃稒鐓曢柡鍥ュ妼娴滅偤鏌涢弮鎾剁暠妞ゎ亜鍟存俊鍫曞幢濡ゅ啰鎳嗛梺璇插閸戝綊宕ｉ崘顔兼槬婵炴垯鍨圭粻鎶芥煙閻愯棄濡肩紓宥咃躬瀵偊骞囬弶鍧楀敹闂佺粯娲戝鎺楀传濡ゅ懏鈷戞慨鐟版搐閻掓椽鏌涢妸鈺€鎲鹃柟顖氬椤㈡盯鎮欓懠鑸垫啺婵犵數鍋為崹顖炲垂閸︻厾灏电€广儱顦伴悡鍐喐濠婂牆绀堥柣鏃傚帶閺嬩線鏌涢幇闈涙灈妞ゎ偄鎳橀弻锝呂熼搹閫涚驳濠电偛鐗婇崕鎶藉煘閹达附鍊烽柛娆忣槴閺嬫瑦绻涚€涙鐭嬬紒顔芥尭閻ｅ嘲顫滈埀顒勫春閳ь剚銇勯幒鍡椾壕濡炪値浜滈崯瀛樹繆閸洖骞㈡俊銈呭暕濞ｎ噣鏌ｉ悢鍝ョ煁濠㈢懓妫濆畷鎴濃槈濞嗘劖鐝″┑鐘茬棄閺夊簱鍋撻弴銏犵疇闊洦绋戠壕濠氭煃閳轰礁鏆熺紒鈾€鍋撳┑鐘垫暩婵挳宕愰幖浣告辈闁绘棁娅ｇ壕濂告煟濡厧鍔嬮柣婵愪簻鑿愰柛銉戝秷鍚悗瑙勬穿缁叉儳顕ラ崟顒傜瘈闁稿被鍊栫紞鎺戔攽鎺抽崐妤佹叏閻戣棄纾婚柣鎰仛閺嗘粓鏌熼悜妯荤濞存粍鐟ラ埞鎴︽倷閼搁潧娑х紓浣藉紦缁瑩鐛径鎰櫢闁绘瑢鍋撻柡浣告搐閳规垿鎮╁畷鍥舵殹闂佹娊鏀辩敮鎺楁箒闂佹寧绻傞幊蹇涘箚閸儲鍋ㄦい鏍ㄦ皑閸╋綁鏌″畝鈧崰鎾诲箯閻樹警妲剧紓浣叉閸嬫挻淇婇悙顏勨偓鎴﹀垂濞差亝鍋￠柍杞扮贰閸ゆ洖霉閻樺樊鍎岄柍褜鍓氶悧鐘汇€佸Δ浣瑰闁绘垶锚閸ㄩ亶鏌ｆ惔銈庢綈婵炲弶绮撳畷浼村冀椤撴壕鍋撴担绯曟婵☆垶鏀遍～宥夋⒑閸︻厼鍔嬮柟鍛婃倐椤㈡棁銇愰幒鎾嫽闂佺鏈悷褔藝閿旂晫绡€闁逞屽墴閺屽棗顓兼担鎻掍壕闁挎洖鍊搁柋鍥煃閸ㄦ稒娅呭ù婊呭亾缁绘盯骞嬮悙鑼懖濠电偛鎳庡ú銈夆€︾捄銊﹀枂闁告洦鍓涢ˇ鏉课旈悩闈涗沪闁绘顨婇獮蹇涘川閺夋垶宓嶅銈嗘尵閸嬫稓绮婚悙鐑樷拻闁稿本鐟х粣鏃€绻涙担鍐叉礌閳ь剨绠撳畷濂稿Ψ閵壯嶇串婵犲痉鏉库偓鏇㈠箠韫囨稑纾挎俊銈勮兌缁犻箖鏌涢埄鍏狀亪鎮樺澶嬬厱閻庯綆鍋呯亸顓㈡煃缂佹ɑ宕岀€规洖缍婇、娆撴偩鐏炲ジ鍋楁繝纰夌磿閸嬫垿宕愰妶澶婂偍濠靛倻顭堟惔濠囨煛鐏炶鍔滈柛瀣ф櫊閺岋綁骞嬮敐鍡╂缂佺虎鍘搁崑鎾绘⒒娴ｈ櫣甯涢柛鏃€娲滅划鏃堟濞戣鲸缍庨梺闈╁瘜閸樿棄鐣烽崣澶岀瘈闂傚牊渚楅崕蹇曠棯閹冩倯缂佺粯鐩獮瀣倷閸愨晛鍝虹€规洘鍨块獮妯好虹紒妯绘珫闂備胶绮崝妤冩偘閵夆晛绠紓浣诡焽缁犻箖寮堕崼婵嗏挃闁告帊鍗抽弻鐔烘嫚瑜忕弧鈧悗瑙勬处閸ㄥ爼骞冨▎鎾村€绘俊顖滃帶楠炲牓姊绘担鍛婃儓闁稿﹤顭峰畷鎴濃槈閵忕姷鐤囬柟鑹版彧缁查箖顢曟禒瀣厪闁割偅绻嶅Σ褰掓煟閹捐泛鈻堥柡宀€鍠栭、姗€鎮㈡搴ｆ噯闂備礁鎲￠弻锝夊磹閺嶎厼桅闁告洦鍨伴悡娑㈡煕鐏炵偓鐨戠紒浣哄厴閺屟呯磼濡厧鈷岄梺鍝勮閸斿矂鍩為幋锕€骞㈡俊顖滃劋椤忕娀姊绘担鍛婃儓婵☆偅鐩畷鎴﹀Χ婢跺﹨鎽曢梺鎸庣箓椤︻垳绮绘繝姘€垫繛鎴炵懐閻掕姤銇勯敂鍝勫缂佽鲸鎸婚幏鍛存惞閻熸壆顐奸梻浣哄劦閺呪晠宕归崼鏇熷仒妞ゆ棃鏁崑鎾绘晲鎼粹剝鐏嶉梺绋匡功閸忔﹢寮诲☉鈶┾偓锕傚箣濠靛懐鐩庢繝鐢靛仜閹冲繘銆冮崼銏☆潟闁规崘顕х壕鍏兼叏濮楀棗鍘撮柛瀣崌瀹曨偊濡疯閻撳姊哄Ч鍥х伄妞ゎ厼鐗撳畷褰掑磼閻愬鍘遍悷婊冮叄閵嗗啴宕ㄧ€涙ê鐝旈梺缁樻煥閸氬鎮￠妷锔剧瘈闂傚牊绋掗敍宥嗕繆椤栨氨澧﹂柡灞稿墲閹峰懘宕ㄦ繝鍌涚亷闂備礁鎼惌澶岀礊娴ｅ壊鍤曢柡澶嬪焾濞尖晠鏌涘Δ鍐ㄤ粶妞ゎ剙顦靛缁樻媴妞嬪簼瑕嗙紓鍌氱М閸嬫挸鈹戦悙宸Ч闁烩晩鍨堕崹楣冨籍閸繄顦ㄥ銈嗘煥濡插牐顦规鐐寸墱閸掓帡宕楁径濠佸閻庤娲栧ú銈夊箺鐎ｎ亖鏀介柣妯虹仛閺嗏晠鏌涚€ｎ偆娲撮挊婵嬫煛婢跺绱╂繛宸簼閸嬪嫰鏌ゅù瀣珔缂佷緤绠撳铏规兜閸涱喖娑х紓浣哄У閸ㄥ湱鍒掗崼鈶╁亾閿濆骸浜栧ù婊勭矒閺屸€愁吋閸愩劌顬嬮梺鎰佸灡濞茬喖寮诲☉娆愬劅妞ゆ柨顭烽崑妤€鈹戦纭锋敾婵＄偘绮欓獮濠囨晸閻樺弬褔鏌涘☉鍗炴灓濞存粠浜缁樻媴娓氼垳鍔稿銈嗗灥閹虫﹢寮崘顕呮晜闁告洟娼у▓銊╂⒑閻熸澘顣抽柣鈩冩瀵偊宕掗悙瀵稿幈闂佹枼鏅涢崯浼村箠閸涘瓨鐓ユ繛鎴炵懅缁犵偞鎱ㄦ繝鍛仩缂侇喗鐟╅獮鎰償閵忊€愁伆闂傚倷娴囧畷鐢稿疮閸ф鐤炬繛鎴旀噰閳ь剚鐗楃换婵嬪炊閵娿儮鍋撴繝姘厾闁诡厽甯掗崝銈夋煕濮椻偓娴滆泛顫忓ú顏勪紶闁告洦鍋€閸嬫捇鎸婃径鍡樼亙闂佸搫娲㈤崹娲磹閸ф鐓欓梻鍌氼嚟閸斿秹鏌ｉ幘鍐叉殻闁哄本娲樺鍕熼搹閫涘寲闂備椒绱紞浣圭閸洖钃熼柨婵嗩槹閺呮煡鐓崶銊︾闁伙箑鐗撳娲传閸曨喖顏┑鐐叉▕閸欏啫顕ｉ锕€纾奸柣鎰綑娴犲ジ鎮楅崗澶婁壕闂侀€炲苯澧撮柛鈹垮灪瀵板嫭绻涢悙顒佹澑闂備胶绮敋闁诲繑宀稿鎶藉煛閸涱喚鍘遍柣搴秵閸嬪棝鍩ユ径鎰嚉闁挎繂鎳夐弨浠嬫煟濡绲婚柡鍡欏枑閵囧嫰鍩℃担鍝ラ獓缂備胶绮换鍫澪涢崘銊㈡闁告鍋涙竟鍫㈢磽娴ｅ搫浜鹃柛搴㈠▕閳ワ箓鎮滈挊澶庢憰闂侀潧艌閺呮粓宕戦崟顖涚厱婵犻潧妫楅悵鏃堟煥濠靛棭妲归柣鎾跺枛閺岀喖骞戦幇顓犮€愰梺鍝勵儐閸ㄤ絻褰侀梺鎼炲劀瀹ュ牆鎯堝┑鐘殿暯閳ь剙纾崺锝団偓瑙勬礃鐢帡锝炲┑瀣垫晝闁靛繆鏅滈ˉ锟犳⒒閸屾艾鈧悂宕愰悜鑺ュ殑闁告挷绀侀崹婵囥亜閺嶎偄浜奸柍褜鍓欓崯鏉戠暦閵娧€鍋撳☉娅虫垵鈻嶉崶褜娓婚柕鍫濇噽缁犱即鎮楀鐓庢珝鐎殿喗濞婇弫鍐磼濞戞艾骞愰梻浣规偠閸庮垶宕曢柆宥嗗€堕柍鍝勫暟绾惧ジ鏌ｅΟ鐑樷枙闁绘挸銈搁弻锛勪沪閸撗勫垱濡ょ姷鍋為敃銏ゅ箠閻樺灚宕夐柛婵嗗閼垫劙姊婚崒娆戝妽閻庣瑳鍛煓闁圭儤姊瑰畷鏌ユ煕閹板吀绨肩€规洖寮剁换娑㈠箣閻愬灚鍣紓鍌氱Т濞差參寮诲☉銏犵婵°倐鍋撻柛鐕佸亰閹繝宕掑锝嗘杸闂佺粯锕╅崰鏍倶椤曗偓閺岀喖鎼归锝呯３闂佽桨绀侀崯瀛樹繆閸洖宸濇い鎾跺О閸嬫帡姊婚崒姘偓椋庣矆娴ｈ櫣绀婂┑鐘蹭迹濞戙垹閿ゆ俊銈勭閳ь剙娼￠弻銊╁即閻愭祴鍋撹ぐ鎺戠；闁稿瞼鍋為悡鐔兼煛閸屾氨浠㈤柟顔藉灴閺岋綁骞樼€垫悶鈧帡鏌嶈閸撴瑧绮诲澶婄？閺夊牜鐓堝▓浠嬫煕濞戞﹫鍔熸い鈺佸级缁绘繃绻濋崒婊冾杸闂佺顑冮崝宥夊Φ閸曨垰鍐€闁靛濡囧▓銈夋⒑缁洘娅旂紓宥勭窔瀵鍨惧畷鍥ㄦ畷闁诲函缍嗛崜娑溾叺闂傚倷娴囧銊╂倿閿曞倸绀夋繛鍡楃箳閺嗭箓鏌曟繛鐐珦闁轰礁娲弻锝夊籍閳ь剚绔熼弴銏犵柧闁绘ê妯婂鏍煣韫囨挸甯ㄩ柛瀣崌瀹曠兘顢橀悜鍡忓亾鐏炲墽绠鹃柛蹇曞帶婵秹鏌＄仦鍓ф创濠碘剝鎮傛俊鐤槺闁惧繐閰ｅ鐑樺濞嗘垶鍋ч梺绋跨箲閿曘垹顕ｆ繝姘耿婵°倕锕ら幃鎴︽⒑閸涘﹣绶遍柛銊ゅ嵆閻涱噣骞囬鑺ユ杸闂佺粯鍔橀崺鏍亹瑜忕槐鎺楀箵閹烘挸浠村Δ鐘靛仜閿曨亪鐛Ο鍏煎珰闁肩⒈鍓欐慨锔戒繆閻愵亜鈧牜鏁幒妞濆洭顢涢悙鏉戔偓鍫曟煟濡偐甯涢柣鎾冲暣閹嘲鈻庤箛鎿冧患闂佽绻戦幐鎶藉蓟閻旂⒈鏁婇悷娆忓閻濇艾顪冮妶鍐ㄧ仾闁荤啿鏅犻獮濠囧冀椤撶偟鍘搁梺閫炲苯澧版俊鍙夊姇铻ｉ柤濮愬€楅惁鍫ユ⒑濮瑰洤鐏叉繛浣冲嫮顩锋繝濠傚娴滄粓鏌ㄩ弬璺ㄤ虎鐎规挸妫濋弻鐔碱敍濮橆剦浼冨銈冨灪閻╊垶骞冨▎鎿冩晜濞达綁鏅叉竟鏇熺箾閹炬潙鐒归柛瀣尵閳ь剚顔栭崰鏇犲垝濞嗘挶鈧礁顫滈埀顒勫箖濞嗘挻顥堟繛鎴炲笒娴滈箖鏌ｉ幇顒佲枙婵炴挸顭烽弻鏇㈠醇濠靛浂妫為梺绉嗗喛韬柡灞剧〒閳ь剨缍嗛崑鍛暦瀹€鍕厸閻忕偛澧介妴鎺懨归悪鍛洭闁归濞€楠炴捇骞掑┑鍥╃У闂傚倸鍊风粈渚€骞栭锕€瀚夋い鎺戝€婚惌娆撴煙鏉堝墽鎮煎ù婊勭懇濮婄粯鎷呴崨濠傛殘闂佸憡姊归崹鍨暦濠靛牃鍋撻敐搴樺亾椤栧棗鍚橀弮鍫濆窛妞ゆ棁顫夌€氬ジ姊洪懡銈呬沪缂佸鐗撻崺鈧い鎺嗗亾闁告ɑ鐗楃粩鐔煎即閻愨晜鏂€闂佺粯鍔曞Ο濠囧吹閻斿皝鏀芥い鏃囧Г鐏忥附銇勯姀锛勫⒌鐎规洖宕埥澶娾枎韫囧海鏆楅梻鍌欒兌缁垶寮婚妸鈺佽Е閻庯綆鍠楅崑鍌涚箾閸℃ɑ灏伴柍閿嬪灦閵囧嫰骞橀崡鐐差瀷闂佷紮绲藉畷顒勨€﹂懗顖ｆ闂佸摜濮靛銊ノｉ幇鏉跨婵°倓绀佹禍鐓庘攽閻愬弶顥滅紒缁樺姍椤㈡棃濡烽妷鍐嚀椤劑宕熼鐘靛帨闂備礁鎼張顒€煤濡警鍤楅柛鏇ㄥ亐濡插牊鎱ㄥΔ鈧Λ娆撳窗濮椻偓濮婄粯鎷呯憴鍕╀户闂佸憡锚閵堟悂骞嗘径鎰殐闁冲搫鍋嗗鐔兼⒑閸︻厼鍔嬮柟姝屽吹缁辩偤宕堕浣哄帾婵犵數鍋涢悘婵嬪礉閵堝棎浜滈柟瀛樼箓閳ь剝宕靛Σ鎰板箻鐎涙ê顎撴繛瀵稿Т椤戝懘骞楅悽鍛婄厽闁靛繆鏅涢悘锟犳偨椤栨粌鏋涢柟顔斤耿楠炴帒螖娴ｅ弶瀚奸梻浣筋嚃閸ㄥ酣宕ㄩ锝呮櫏濠碉紕鍋戦崐鏍哄鈧幃褔鎮╅懠顒佹闂佸搫娲ㄩ崑鐔煎汲閸℃稒鐓冪憸婊堝礈濞戞锝夊箛閺夎法顔掗柣鐘叉穿鐏忔瑩鏁嶅鍐ｆ斀闁绘劕寮堕ˉ鐐烘煕閵娿劌浜圭紒顕嗙到铻栭柛娑卞枓閹锋椽姊洪崨濠勭細闁稿氦椴搁悧搴㈢節濞堝灝鏋熼懣褔鏌涢弮鈧崹鐢告偩瀹勯偊娼╅悹楦挎椤斿﹤鈹戞幊閸婃洟鏁冮妷鈺佺柧妞ゆ巻鍋撻柍瑙勫灴閹晝鎷犺娴兼劙鏌ｆ惔銏犲毈闁告挻宀搁獮鍡涘籍閳ь剛鎹㈠┑瀣＜婵°倓鐒﹂弶鎼佹⒒娴ｈ櫣甯涙い顓炴川閸掓帡顢涘锝嗩潔閻熸粌瀛╃粚杈ㄧ節閸ヨ埖鏅濆銈嗗姂閸ㄥ湱绮婚悷閭︽富闁靛牆楠搁獮鏍ㄧ箾瀹割喖寮€规洘妞介弫鎾绘偐閼碱剨绱叉繝纰樻閸ㄦ澘锕㈤柆宥嗗剮閹兼番鍔嶉埛鎺懨归敐鍥╂憘婵炲吋鍔楅埀顒冾潐濞叉﹢鏁嬮梺宕囩帛閺屻劑鍩ユ径濞㈢喖宕楅崗鐓庢珣婵犵數濮撮惀澶愬级鎼存挸浜炬俊銈勭劍閸欏繘鏌ｉ幋锝嗩棄缁炬儳顭烽弻锝夊箛椤掍焦鍎撶紓浣插亾濠㈣泛顑囩粻楣冩煕閳╁叐鎴犱焊椤撱垺鐓㈤柛鎰典簻閺嬫盯鏌＄仦璇插闁宠鍨垮畷鍗烆潨閸℃﹫绱掗梻鍌欒兌椤牆霉閻戣棄绐楅柡宥庡幖閽冪喓鈧箍鍎遍ˇ顖氭暜闂備線娼чˇ顓㈠磿閹绘崼鎺楀箛閻楀牏鍘告繝銏ｆ硾閿曪附鏅堕弴銏＄厵闁惧浚鍊嬮鍫稏闊洦绋掗幆鐐烘煕閿旇骞橀柣鎾存尭閳规垿鎮欓崣澶樻！闂佺瀛╂繛濠傜暦濠婂牊鐒肩€广儱妫岄幏娲⒑闂堚晛鐦滈柛妯圭矙瀹曠敻鍩€椤掆偓閳规垿鎮欓崣澶嗘灆闂佸憡锚閵堟悂銆佸鑸垫櫜闁搞儯鍔岄悵浼存倵閻熸澘顥忛柛鐘崇墵楠炲啴骞嬮敂瑙ｆ嫼闂佸憡鎸昏ぐ鍐╃娴犲鐓曢悗锝庝簼閸ゅ洦銇勯姀鈩冨磳鐎规洖鐖奸、妤佹媴閸欏顏烘繝鐢靛仩閹活亞寰婃禒瀣疅闁跨喓濮撮悿顕€鏌ｉ幇顔煎妺闁绘挻鐟╅弻鐔兼⒒绾惧鍘￠梺浼欑秬濞咃綁鍩€椤掑喚娼愭繛鍙夌矋閺呰泛螖閸涱厾鐣鹃梺鍝勫暙閻楀棙鍎梻浣瑰濞插秹宕戦幘瓒佸綊鎮╃仦鍌氫划濠殿喖锕︾划顖炲箯閸涙潙浼犻柕澶堝€涘鍛婁繆閻愵亜鈧牠宕归悽绋跨疇婵せ鍋撻柕鍡曠椤繈鎳滈悽闈涘Ц闁诲骸绠嶉崕鍗炍涘☉銏犲偍闁告稑锕︾弧鈧梺闈涢獜缁插墽娑甸悙顑句簻闁瑰瓨绻冮崵鍥煙椤旀枻鑰垮┑锛勫厴閸╋繝宕掑鍐ㄧ疄闂傚倷鑳剁划顖炲礉閿旂晫顩叉繝濠傚閸欏繘鏌涘畝鈧崑鐐烘偂濞嗘劑浜滈柡鍐ㄥ€哥敮鑸典繆閼碱剛甯涢柕鍥у椤㈡ê顭ㄩ崘顭戞綆闁诲氦顫夊ú婊堝窗閺嶎厹鈧礁顫滈埀顒勫箖閳哄懏顥堟繛鎴烆焽閻熴垹鈹戦悩娈挎殰缂佽鲸娲熷畷鎴﹀箣閿曗偓绾惧綊鏌曢崼婵愭Ц闁稿被鍔戦弻锝夊箻瀹曞洨妲忓┑鐐叉▕娴滃爼寮崶顒佺厽闁瑰瓨绻冮ˉ婊勭箾閸稑濡界紒缁樼〒閳ь剛鏁搁…鍫濈摥婵＄偑鍊栭崹鍫曞礉濞嗗浚鍤曟い鎰剁畱閻愬﹥銇勯幒宥堝厡闁告ü绮欏娲传閸曨偀鍋撻崷顓涘亾缁楁稑娲ょ粻姘舵煕椤愩倕娅忔繛鍫滅矙閺岋綁骞囬鐣屽帾濡炪倕绻愰悧鍡涙偂濮椻偓閺岀喐娼忔ィ鍐╊€嶉梺绋款儐閸旀瑩寮婚悢闈╃矗濞达絼璀﹀Σ顕€姊洪崫鍕殗濞存粏娉涢～蹇撁洪鍕炊闂侀潧顦崕娑㈡晲閸℃劒绨婚梺闈涱焾閸庤顔忛妷鈺傜厽闁挎繂鎳庡Σ濠氭煃鐟欏嫬鐏╅柍褜鍓ㄧ紞鍡樼濠婂啰鏆ら柛鈩冪⊕閳锋垿姊婚崼鐔恒€掔紒鐘插暱閳规垿顢欓幆褍骞嬮悗瑙勬礃缁诲牓寮崘顔肩劦妞ゆ帒瀚ч埀顒佹瀹曟﹢顢欓崲澹洦鐓曢柍鈺佸枤濞堟﹢鏌ｉ悢绋垮缂佽鲸鎸婚幏鍛村箵閹哄秴顥氭繝鐢靛仩閹活亞绱為埀顒併亜椤愩埄妯€鐎规洩缍€缁犳盯寮村Δ鈧禍鐐殽閻愯尙浠㈤柛鏃€纰嶇换娑㈡嚑椤掆偓閳诲牏鈧娲橀崹鍧楃嵁濮椻偓閹虫粓妫冨☉娆戔偓顓㈡⒒娴ｅ憡鍟炴繛璇х畵瀹曟粌鈽夐埗鍝勬喘婵℃悂鍩￠崒妤佸闂備胶顢婇崑鎰板磻濞戞瑤绻嗛柛蹇氬亹缁犲墽鐥銏╂缂佲檧鍋撻梻浣筋嚃閸犳洟宕￠幎濮愨偓浣糕枎閹惧啿绨ユ繝銏ｆ硾閼活垶寮稿☉銏＄厵闁惧浚鍋嗘晶鐢告煕閳哄绡€鐎规洘顭囬幑鍕Ω閵壯冩惛婵犵數濮烽弫鍛婃叏閻㈠壊鏁婇柡宥庡幖缁愭淇婇妶鍛櫡闁逞屽墮閸熸潙鐣烽妸鈺婃晣闁搞儯鍔庨埥澶愭煃鐠囨煡鍙勬鐐疵濂稿椽娴ｅ厜鏋呴柣搴ゎ潐濞叉牠濡堕幖浣哥畺闁靛繈鍊栭幆鐐烘煕閿旇骞楁い顐㈢焸濮婂宕掑▎鎴濆闂佹椿浜滅紞濠傜暦瑜版帗瀵犲鑸殿焽閸旂兘鎮峰鍐╂崳缂侇喖顑夐獮鎺懳旀担瑙勭彇闂備胶顭堥張顒傜矙閹捐鍌ㄩ梺顒€绉甸埛鎴︽⒒閸喍绶遍柣鎺楃畺閺屾稒鎯旈姀鐘灆閻庤娲樺浠嬪极閹邦厼绶為悗锝庡墮楠炴劕鈹戦悙鑸靛涧缂佹彃娼￠垾锕傚醇閵夈儲杈堥梺鎸庣箓椤︿即鎮￠弴銏＄厓閻熸瑥瀚崝銈咁熆瑜庨悡锟犲蓟閻旈鏆嬮柣妤€鐗嗗▓妤呮倵鐟欏嫭绀堥柛鐘崇墵閵嗕礁螖閸涱厾锛滃┑鈽嗗灠閸㈠弶绂嶆ィ鍐╃厵闁绘垶锚濞堫喚鎲搁悧鍫濈瑲闁稿鍨块弻娑樷槈閸楃偛瀛ｅ┑鐐叉▕閸欏啫顫忓ú顏呭仭闁哄娉曟鍥⒑閻熺増鍟炲┑鐐诧工椤曪綁顢曢敃鈧粻娑㈡煛婢跺﹦浠㈤柤鏉跨仢閳规垿鍩ラ崱妤冧化缂備緡鍣崹鍐测枎閵忋値鏁冮柨鏃囆掗幏濠氭⒑缁嬫寧婀伴柤褰掔畺閸┾偓妞ゆ帒鍊搁崢鎾煙閾忣偒娈滅€规洖銈稿鎾倷绾板骞㈤梻鍌欑窔濞佳嗗闂佸搫鎳忕粙鎾寸珶閺囥垹閿ゆ俊銈勮兌閸樺憡绻濋姀锝嗙【妞ゆ垵鎳橀幃妯侯吋婢跺鍘搁柣搴秵娴滅偞鏅ラ梻浣告惈閻鎹㈠┑鍡欐殾闁割偅娲栧敮闂侀潧锛忛崒娑樹簼闂傚倸鍊烽懗鍓佸垝椤栫偛绠伴柤濮愬€栧畷鏌ユ煕椤愮姴鍔氶柦鍐枛閺屻劑鎮㈤崫鍕戙垽鏌ｉ幇顒婅含闁哄本娲樺鍕醇濠靛棗袘濠电偛顕繛鈧紒鐘崇墪椤繘鎼归崷顓狅紲濠碘槅鍨甸褔妫勫鍛斀闁绘劘娉涢惃娲煕閻樺磭澧い鏇稻缁绘繂顫濋鈹炬櫊閺屾洘寰勯崼婵堜痪闂佸搫鍊甸崑鎾绘⒒閸屾瑨鍏岀痪顓炵埣瀹曟粌鈹戠€ｎ偄浠悷婊勬閵嗕礁鈻庨幇顔剧槇闂佹悶鍎崝澶愬箯濞差亝鈷戦柛娑橈功閳藉鏌ㄩ弴妯衡偓妤冨垝椤撯槅妲诲銈庡弨閸庡藝閾忣偁浜滈柕濞垮劵閺€璇睬? : "闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇川绾剧晫鈧箍鍎遍幏鎴︾叕椤掑倵鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝懐顦ч柣蹇撶箲閻楁鈧矮绮欏铏规嫚閺屻儱寮板┑鐐板尃閸曨厾褰炬繝鐢靛Т娴硷綁鏁愭径妯绘櫓闂佸憡鎸嗛崪鍐簥闂傚倷鑳剁划顖炲礉閿曞倸绀堟繛鍡樻尭缁€澶愭煏閸繃宸濈痪鍓ф櫕閳ь剙绠嶉崕閬嶅箯閹达妇鍙曟い鎺戝€甸崑鎾斥枔閸喗鐏堝銈庡幘閸忔﹢鐛崘顔碱潊闁靛牆鎳愰ˇ褔鏌ｈ箛鎾剁闁绘顨堥埀顒佺煯缁瑥顫忛搹瑙勫珰闁哄被鍎卞鏉库攽閻愭澘灏冮柛鏇ㄥ幘瑜扮偓绻濋悽闈浶㈠ù纭风秮閺佹劖寰勫Ο缁樻珦闂備礁鎲￠幐鍡涘椽閸愵亜绨ラ梻鍌氬€烽懗鍓佸垝椤栫偛绀夐柨鏇炲€哥粈鍫熺箾閸℃ɑ灏紒鈧径鎰厪闁割偅绻冨婵堢棯閸撗勬珪闁逞屽墮缁犲秹宕曢柆宥呯闁硅揪濡囬崣鏇熴亜閹烘垵鈧敻宕戦幘鏂ユ灁闁割煈鍠楅悘鍫濐渻閵堝骸骞橀柛蹇旓耿閻涱噣宕橀纰辨綂闂侀潧鐗嗛幊鎰八囪閺岋綀绠涢幘鍓侇唹闂佺粯顨嗛〃鍫ュ焵椤掍胶鐓紒顔界懃椤繘鎼圭憴鍕彴闂佸搫琚崕鍗烆嚕閺夊簱鏀介柣鎰緲鐏忓啴鏌涢弴銊ュ箻鐟滄壆鍋撶换婵嬫偨闂堟刀銏犆圭涵椋庣М闁轰焦鍔栧鍕熺紒妯荤彟闂傚倷绀侀幉锟犲箰閸℃稑妞介柛鎰典簻缁ㄣ儵姊婚崒姘偓宄懊归崶顒夋晪闁哄稁鍘奸崹鍌炲箹濞ｎ剙濡肩紒鈧崘顔界叆婵犻潧妫欓ˉ婊堟煟閿曞倷鎲炬慨濠傤煼瀹曟帒鈻庨幒鎴濆腐婵＄偑鍊戦崹褰掓晝閵堝鐓濈€广儱顦崡鎶芥煏韫囨洖啸妞ゆ柨顦靛娲箹閻愭彃濮堕梺鍛婃尰閻熲晠骞冨鈧獮搴ㄦ嚍閵壯冨箰闂備礁鎲￠崝鎴﹀礉鎼淬垺娅犻柡鍥╁Х绾惧ジ鏌嶈閸撶喎鐣峰鈧崺鐐村緞閸濄儳娉块梻鍌氼煬閸嬪嫬煤閵堝悿褰掓倻閸撳灝娲弫鍐焵椤掑嫭绠掓繝鐢靛Т閿曘倝鎮ц箛娑欏仼婵炲樊浜濋悡娑㈡倶閻愰鍤欏┑鈥炽偢閺屽秶鎲撮崟顐や紝閻庤娲栧畷顒勫煝鎼淬倗鐤€闁规儳顕Σ妤冪磽閸屾艾鈧悂宕愰悜鑺モ挃鐎广儱顦粈澶屸偓鍏夊亾闁告洦鍊犺閺岀喖姊荤€靛壊妲梺钘夊暟閸犳牠寮婚敐澶婃闁割煈鍠楅崐顖炴⒑缁嬪潡顎楅柣顓炲€垮璇测槈濡攱鏂€闂佸憡娲﹂崑鍕叏閵忋倖鍋犳慨妯哄⒔閻ｅ灚鎱ㄦ繝鍕笡闁瑰嘲鎳樺畷銊︾節閸愩劌澹嶉梻鍌欑劍濡炲潡宕㈡總鏉嗗洦娼忛埡鍌ゆ綗闂佺粯鍔曢顓㈡偡瑜版帗鐓冪憸婊堝礈閻旈晲绻嗛悗娑櫳戞刊鎾煕閹惧啿绾х€点倖妞藉娲焻閻愯尪瀚板褍鐡ㄩ〃銉╂倷閹绘帗娈梺瀹狀嚙闁帮綁鐛Ο铏规殾闁搞儴娉涢弲锝呪攽閿涘嫬浜奸柛濠冪墵楠炴劖銈ｉ崘銊╂７闂侀潧顦崕娆忊槈濠婂孩鈻屾繝娈垮枛閿曘倝鈥﹀畡鎵殾闁圭儤鍨熼弸搴ㄦ煙鐎电啸鐎规洖寮剁换婵嬫偨闂堟稐绮ч梺鍛婄墱婵炩偓鐎规洘顨婇幃娆擃敆閸屾顫嶉梻浣哥枃椤曆囨煀閿濆宓侀悗锝庡枟閸婄兘鎮楀☉娆欎緵闁哥偛鐖煎濠氬磼濞嗘埈妲┑鐘亾闂侇剙绉寸壕鍧楁煏閸繍妲堕柍褜鍓欓崯鎾嵁閸ヮ剦鏁婇柛鎾楀本笑闂傚倷绀侀幖顐ょ矓閺屻儱绀夐幖杈剧到婵剟鏌嶈閸撶喎顫忔繝姘＜婵ê宕·鈧┑鐐存尰绾板秹銆冩繝鍌滄殾闁哄洢鍨圭粻娑㈡煟濡も偓閻楀繘宕㈤幖浣光拺闁告稑锕ｇ欢閬嶆煕閻樺啿鍝虹€规洩缍侀崺鈧い鎺戝閳锋垿鏌涘┑鍡楊仾婵犫偓閹殿喚纾奸悗锝庡亜閻忔挳鏌涢埞鍨姕鐎垫澘瀚伴獮鍥敆閸屻倖鏁ら梻鍌欒兌缁垶宕濋弴鐐嶇喐绻濋崒銈囧姺缂傚倷鐒︾湁缂佽妫濋弻锝夊箛閸忓摜鐩庨梺閫炲苯澧柛銊ョ仢閻ｇ兘寮撮姀鐘烘憰闂侀潧顧€缁犳垵鈻撻悙缈犵箚闁靛牆绻掗崚浼存煕閻曚礁浜伴柟顔光偓鎰佹建闁逞屽墴瀵鎮㈢悰鈥充壕闁汇垺顔栭悞鎯归悩宕囩煂缂佽鲸甯￠幃鈺呮濞戞帗鐎版繝娈垮枛閿曘劌鈻嶉敐鍥у灊婵炲棙鎸哥粈宀勬煃閳轰礁鏆為柡鍡欏娣囧﹪鎮欓鍕ㄥ亾閹达箑绀夐悘鐐跺▏濞戞ǚ鏀介悗锝庡墮缁侊箓姊洪崜鎻掍簴闁稿氦椴搁崕顐︽⒒娴ｇ鏆遍柟纰卞亰瀹曟劙骞栨担鍝ュ姦濡炪倖宸婚崑鎾淬亜椤撶姴鍘寸€殿喖顭烽弫鍐焵椤掑啰浜藉┑鐐存尰閸戝綊宕规潏顭戞闂傚倸鍊烽悞锔锯偓绗涘懐鐭欓柟鐑橆殕閸庡孩銇勯弽銊ュ毈婵炲吋鐗犻弻褑绠涢幘纾嬬缂佺偓鍎抽崥瀣┍婵犲浂鏁嶆慨姗嗗幗閸庢挸顪冮妶搴′簻闂佸府绲介～蹇涙惞閸︻厾鐓撻柣鐘充航閸斿秴危閳ь剟姊绘担渚劸闁挎洏鍎抽幑銏ゅ磼閻愭潙浠奸梺缁樺灱濡嫮绮婚敐澶嬬厽婵妫楁禍婊兠瑰鍫㈢暫闁哄被鍔岄埞鎴﹀幢濞戞墎鍋撳Δ鍛厸閻庯綆鍓欓弸娑㈡煛瀹€瀣М妤犵偞顭囬幑鍕倻濡皷鍋撻悙顒傜闁挎繂鎳忛幖鎰版煥閺囥劋閭柕鍡曠閳藉螣闁垮鏉搁梻浣虹《閸撴繈銆冮崱娑樼？妞ゅ繐鎳愮弧鈧梺姹囧灲濞佳嗏叴闂備胶顭堥鍡涘箰閹间焦绠掗梻浣虹帛閿氭俊顖氾躬瀹曟洟骞囬悧鍫㈠幗闂佽鍎抽崯鍧楀汲閻斿吋鐓欓柤纰卞墻閻掔偓銇勯婊冨鐎规洜鍘ч埞鎴﹀醇椤愶及婵嗏攽閻樺灚鏆╅柛瀣仱瀹曞綊宕滄担鍛婄€抽悗骞垮劚椤︿粙寮崘顔界厾闁诡厽甯掗崝婊堟煕濞嗗繒绠查柟渚垮妼铻栭柍褜鍓欒灋婵°倓鐒﹀▍鐘测攽閻樺磭顣查柣鎾存礋閺屾洟宕煎┑鍥舵！缂備讲鍋撻悗锝庡枟閻撴稓鈧厜鍋撻柍褜鍓熷畷浼村箻閼告娼熼梺鍦劋椤ㄥ懘锝為崨瀛樼厽婵☆垵娅ｉ敍宥吤瑰搴濈凹濞ｅ洤锕幃娆擃敂閸曘劌浜鹃柕鍫濐槸绾惧鏌涢弴銊ョ仩缂佺姷濮甸幈銊ヮ渻鐠囪弓澹曢柣搴㈩問閸犳牠鈥﹂悜钘夋瀬闁圭増婢樺钘壝归敐鍥ㄥ殌缂傚倹鎹囧缁樼瑹閳ь剟鍩€椤掑倸浠滈柤娲诲灡閺呭爼顢欐慨鎰盎濡炪倖鎸鹃崑鐐电矚閹稿簺浜滈柨鏇楀亾缂傚秴锕濠氭晲閸涱亝顫嶉梺鍛婎殘閸嬬偤鎮靛┑瀣€甸悷娆忓缁€鈧梺闈涚墛閹倿鐛崘顔碱潊闁靛牆妫欓崕顏堟⒑闂堚晛鐦滈柛妯圭矙閿濈偟浠︾憴锝嗘杸闂佺粯锚閻忔岸寮抽埡鍛厱閻庯綆鍋嗗ú鎾煙椤斻劌娲ら獮銏＄箾閹寸偟鎳冮柍褜鍓濋崺鏍崲濠靛顥堟繛鎴濆船閸撲即姊洪崨濠傜仼濠电偐鍋撻梺鍝勭焿缂嶄礁顕ｉ鍕瀭妞ゆ棁妫勯埀顒夊灦濮婅櫣绱掑Ο璇茶敿闂佺娴烽弫璇差嚕婵犳碍鏅搁柣妯垮皺閸婄偛顪冮妶搴″箺闁搞劌鐖奸幃鎯х暋閹佃櫕鏂€闂佺粯鍔曞鍫曞闯瑜版帗鐓ラ柡鍥朵簽閻ｇ敻鏌涢埞鎯т壕婵＄偑鍊栫敮鎺楀窗濮橆剦鐒介柟閭﹀幘缁犻箖鏌熺紒妯虹缂佺姾宕甸埀顒冾潐濞叉牜绱炴繝鍥х鐟滅増甯掗幑鑸点亜閹捐泛啸闁告柨缍婂缁樻媴閸涘﹨纭€闂佺绨洪崐婵嗩嚕婵犳碍鏅搁柣妯垮皺閿涙盯姊洪悷鏉库挃缂侇噮鍨跺鏌ュ蓟閵夈儳顔愰柣搴㈢⊕閳笺倝顢旈崨顖ｆ锤闂佺粯鍔﹂崗娆愮濠婂牊鐓欓柟顖嗗啳鍩炴繝娈垮枛閸婅绌辨繝鍕＜闁靛繒濮甸悘鎾剁磽娴ｄ粙鍝洪悽顖滃仧濡叉劙骞掗幊宕囧枛閹虫牠鍩￠崘鈺傜钒婵犵數濮烽。钘壩ｉ崨鏉戠；闁告洦鍨伴悿顔姐亜閹板墎鐣遍柣鎾偓鎰佺唵闁兼悂娼ф慨鍥╃棯椤撴稑浜鹃梻鍌欒兌缁垶宕濋弽顑句汗闁告劦鍟熸径瀣劅闁靛鑵归幏濠氭⒑缁嬫寧婀伴柣鐔村姂瀹曟鐣濋埀顒傛閹烘鏁嬮柛娑卞幘娴犵螖閻橀潧浠﹂柛鏃€顨婇獮蹇涙偐閸偄鏅虫繛杈剧秬椤濡靛┑瀣厵妞ゆ柨鎼悘鏌ユ煙椤旂懓澧查柟顖涙婵″爼宕卞Ο鐑樻瘒闂傚倷娴囬褎顨ラ崫銉т笉鐎广儱顦壕鍧楁⒑椤掆偓閸楁洟宕堕澶嬫櫖濠电偞鍨堕敃鈺呭吹閵堝鈷戠紓浣癸供閻掔晫绱掗鍛仸闁诡噯绻濆鎾閿涘嫬骞愰梻浣规偠閸庮垶宕曢柆宥嗗€舵い蹇撴噽缁犻箖鏌熼崘鎻掓Щ婵炶绠撻幃锟犲即閵忥紕鍘甸梺璇″瀻閸滃啰绀婇梻浣瑰缁嬫垹绮旈崜浣诡潟闁圭儤鎸荤紞鍥煏婵犲繒鐣遍梻澶婄Ч濮婃椽鎮烽弶鎸幮╅梺纭呮珪閿氶柣锝囧厴閺佹劙宕卞Δ鍐嵁婵犵妲呴崹浼村床閸欏顩插Δ锝呭暞閻撴洟鏌嶉埡浣告殶闁愁垱娲熼弻锝夊箻鐎涙顦伴梺璇″枟椤ㄥ﹪寮幇顓熷劅闁炽儴灏欓崙褰掓煟鎼淬値娼愭繛鍙夌墵閹矂宕掗悙鑼舵憰闂佺偨鍎辩壕顓㈠汲閸℃稒鍊甸柨婵嗛婢т即鎷戦柆宥嗏拻濞达絿鐡旈崵鍐煕閵娿儱鑸归摶鐐烘煕閹般劍娅冪紒璇叉閺屻倗绮欑捄銊ょ驳闂佺娴烽崰鏍蓟閺囷紕鐤€閻庯綆浜炴导鍕煕閻旈攱鍟炵紒缁樼箞閹粙妫冨ù韬插劦閺屸剝鎷呯憴鍕偓鎰偓瑙勬礃閸ㄧ敻鍩ユ径濠庢建闁糕剝顨嗛鍧楁⒒娴ｇ顥忛柛瀣噹鐓ゆ慨妞诲亾鐎殿喗褰冮埞鎴犫偓锝庡亞閸橆亪妫呴銏℃悙妞ゆ垵鎳橀崺鈧い鎺嶇劍缁€瀣煙椤旀枻鑰挎鐐查叄閹崇偤濡疯瀵娊姊绘担鍛婃儓婵炲眰鍔戝畷鎴濃槈閵忕姷鍔﹀銈嗗笂閻掞箓宕愰幇鐗堢厸閻忕偟鐡旈崕鏃傗偓瑙勬礀閻栧ジ銆佸Δ浣瑰闁告繂瀚俊鍥ㄧ節閻㈤潧袨闁搞劎鍘ч埢鏂库槈閳垛斁鍋撻敃鍌ゆ晢闁告洦鍋嗛敍鐔兼椤愩垺澶勬慨濠呭吹缁宕滆閸嬫捇鎮烽弶娆炬闂佸摜濮甸悧鏇㈩敋閿濆鏁嬮柍褜鍓熷濠氭晲閸涱亝顫嶉梺鍛婎殘閸嬬偤鎮橀崼婵愭富闁靛牆楠告禍婵堢磼椤旇姤宕岀€规洘妞介崺鈧い鎺嶉檷娴滄粓鏌熼悜妯虹仴妞ゅ繈鍎甸弻宥堫檨闁稿繑绋撶划鍫熺瑹閳ь剟宕洪姀鈩冨劅闁靛鍎抽鎺楁⒑閸濆嫷妲归柛銊﹀▕楠炲啴鏁愭径瀣ф嫼闁荤姴娲╃亸娆戠不閹惰姤鐓曢悗锝庡墮瀛濋柧鑽ゅ仱閺屾盯寮撮妸銉ョ婵炴垶鎸哥粔褰掑蓟閿濆绠涙い鏃傚帶婵℃椽姊洪幎鑺ユ暠閻㈩垽绻濆璇测槈濮橆偅鍕冮梺鍛婃寙閸曨偅鐝紓鍌氬€峰鎺楁嚄閼稿灚娅犳俊銈呮噹妗呴梺鍛婃处閸ㄥジ寮崘顔界厪闊洤锕ュ▍鍡涙煃鐠囪尙澧﹂柟顔筋殘閹叉挳宕熼鍌ゆО婵犵數鍋犵亸娆撳窗鎼淬劍鍋╃€瑰嫰鍋婂銊╂煃瑜滈崜鐔肩嵁婵犲洦鍋愭繛鑼帛閺呫垺绻涙潏鍓хК妞ゆ洘鐗犲畷顖涙償閳锯偓閺€浠嬫煥濞戞ê顏╁ù婊冦偢閺屾稒绻濋崘顏勨拡闂佽桨绶￠崰妤冩崲濠靛纾奸柕鍫濇閻︽粓姊绘担鍛婅础闁稿簺鍊曢～蹇涙偡閹殿喗娈鹃梺鍝勮閸庢煡鎮￠弴銏＄厓闁宠桨绀侀弳鏂棵归悩宕囩煉闁哄矉绻濋崺鈧い鎺嶈兌椤╃兘鎮楅敐搴′簽闁告﹢浜堕弻锝堢疀閺囩偘绮舵繝鈷€鍌滅煓闁靛棗鍊垮濠氬Ψ閿旀儳骞堥梻浣虹帛閺屻劑骞栭锝囶浄闂侇剙绉甸悡娑氣偓鍏夊亾閻庯綆鍓涜ⅵ婵°倗濮烽崑鐐烘晝閵忕姷鏆︽慨妞诲亾鐎规洩绲惧鍕偓锝夋涧閺咁亪姊婚崒姘偓宄懊归崶顒夋晪闁哄稁鍘肩粣妤呮煛瀹ュ骸骞栭幖鏉戯躬閺岋紕浠︾拠鎻掑闂佺粯鎸荤换鍫ョ嵁閺嶎灔搴敆閳ь剟鍩€椤掍緡娈滈柟顔兼健閸┾偓妞ゆ帒瀚埛鎴︽煟閻旂顥嬪ù鐘灲閺屾盯鎮㈤崣澶嬬彋濡ょ姷鍋涢崯鎾极閹邦厼绶為悗锛卞嫬顏烘繝鐢靛仩閹活亞寰婇崸妤佸仱闁哄啫鐗嗛崥瑙勭箾閸℃ê鐏╃痪鎹愬亹缁辨挻鎷呮慨鎴邯閹鈧稒锕╁▓浠嬫煟閹邦厽缍戝┑顔肩У椤ㄣ儵鎮欓弻銉ュ及闂佸湱顭堥敃銉ヮ嚗閸曨剚鍎熼柕蹇娾偓铏瘒闂傚倸鍊搁崐鐑芥嚄閸撲礁鍨濇い鏍ㄥ嚬濞兼牕鈹戦悩瀹犲闁绘挻娲熼弻娑㈩敃閻樻彃濮庨梺鍝勵儎缁€渚€鍩為幋锔藉亹闁告瑥顦ˇ鈺呮⒑缂佹ɑ灏甸柛鐘崇墵瀵濡搁妷銏℃杸闂佺硶鍓濋敋婵炲懌鍊曢埞鎴︽偐椤愵澀澹曞┑鐐差嚟閸樠囨偤閵娾晜鍋傞柡鍥ュ灪閻撱儲绻濋棃娑欘棞妞ゅ繆鏅濋埀顒冾潐閹哥螞濠靛钃熼柣鏃傗拡閺佸﹦绱掑☉姗嗗剱闁伙絽銈稿娲偡閺夎法楠囬梺鍦焾閸熷潡鎮鹃悜鑺ュ亜缁炬媽椴搁弲銏ゆ⒑缁嬫寧婀版い銊ユ瀵煡顢楅崒婊咃紳闂佺鏈懝楣冨焵椤掑嫷妫戠紒顔肩墛閹峰懘宕滈幓鎺擃吙闂備礁澹婇崑鍛洪弽顐㈩棜闁秆勵殕閻撴瑩鏌涢幘鑼跺厡闁硅棄鍊块弻鈩冩媴閸撴彃鍓堕梺鍝勬湰濞叉ê顕ラ崟顖氬耿婵☆垵宕佃ぐ鍛磽閸屾瑨顔夐柛瀣崌閹鏁愭惔鈥茬按婵炲瓨绮嶇划鎾诲蓟閻斿吋鐒介柨鏇楀亾濠⒀冾煼閺屾稒鎯旈姀鐘典紝闂佸搫鏈惄顖炲箖閳哄懎绀冮柟缁樺俯濞兼洟姊绘笟鈧埀顒傚仜閼活垱鏅舵导瀛樼厸濞达綀顫夐崐鎰偓瑙勬磸閸ㄥジ藝瑜版帗鐓曢柍鐟扮仢閻忣亪鏌熼娑欘棃濠碘剝鎮傛俊鐤檨闁告艾鎳樺缁樻媴閾忕懓绗￠梺鑽ゅ枂閸庣敻鐛繝鍥х疀妞ゆ挾鍠庨崝鍛節閻㈤潧孝婵炶绠撻崺娑㈠箳濡や胶鍘遍柣蹇曞仦瀹曟ɑ绔熷鈧弻宥堫檨闁告挻宀搁獮鍐磼濮樿鲸娈鹃梺鍦濠㈡绮婚悷鎳婂綊鏁愰崨顔藉枑闂佹寧绋掗悷鈺侇潖妤﹁￥浜归柟鐑樻惈缁辩數绱撴担鎻掍壕婵炶揪绲介幖顐λ夊杈ㄥ枑闁绘鐗嗙粭姘舵煟閹捐泛鏋涢柡宀€鍠愬蹇涘礈瑜嶉崺宀勬偠濮橆厼鍝烘慨濠冩そ楠炴牠鎮欏ù瀣壕闁哄洨濮崑鎾愁潩椤愩垹绁悗娈垮枦椤曆囧煡婢舵劕顫呴柍鍝勫€瑰▍鍥⒒娴ｇ懓顕滅紒璇插€歌灋婵炴垟鎳為崶顒€唯鐟滃繒澹曢挊澹濆綊鏁愰崨顔藉創闁哥喎鎲＄换婵嬫偨闂堟稐姹楅梺绋款儐閹瑰洤顫忓ú顏勪紶闁告洦鍘炬导鍥⒑閸濄儱校闁绘濞€閹即顢氶埀顒勭嵁鐎ｎ喗鏅濋柍褜鍓涚划璇测槈閵忊檧鎷婚梺鍓插亞閸犳捇鍩婇弴鐔翠簻闁哄倸鐏濋顐ょ磼鏉堛劍宕岀€规洘甯掗埢搴ㄥ箳閹存繂鑵愭繝鐢靛У椤旀牠宕板璺虹婵☆垵娅ｉ弳锕€霉閸忓吋缍戦柛鎰ㄥ亾婵＄偑鍊栭幐楣冨磻閻樿绠洪柡鍥ュ灪閳锋垿姊婚崼鐔峰礋闁割偁鍎遍悿鐐節婵犲倻澧曠痪鎯ь煼閺屾盯寮撮妸銉т画闂佺粯鎸诲ú妯兼崲濠靛顥堟繛鎴炵懐濡偤姊虹紒妯肩畺婵☆偄鍟村濠氬即閿涘嫮鏉搁柣搴秵娴滅偞瀵奸崟顓犵＜闁绘劦鍓欓崝銈夋煏閸喐鍊愮€殿喖顭烽弫鎰板川閸屾粌鏋涢柟鐓庣秺閹倿宕妷褜妲稿┑鐘垫暩婵參骞忛崘顔煎窛妞ゆ棁濮ら惁鎾绘⒒娴ｅ憡鎯堥柣顓烆槺濡叉劙寮撮悢渚祫闂佹寧娲栭崐鍝ョ矆閸垺鍠愰悗锝庡枛閻掑灚銇勯幒宥囶槮缂佹甯″Λ浣瑰緞閹邦厾鍘藉┑鐐叉缁绘垿宕虫禒瀣厽闁挎繂娲﹂弳顒勬煛瀹€鈧崰鏍€佸▎鎾村仼閻忕偞鍎冲▍姘繆閻愵亜鈧垿宕瑰ú顏傗偓鍐╃節閸屾粍娈鹃梺鍦劋閸ㄧ喎危閸儲鐓曟俊銈呭暙娴狅箓鏌涙繝鍕枅婵﹤顭峰畷鎺戭潩椤戣棄浜鹃柟闂寸绾剧懓顪冪€ｎ亝鎹ｉ柣顓炴閵嗘帒顫濋敐鍛婵°倗濮烽崑鐐烘偋閻樻眹鈧線寮撮姀鐘靛幀闂佸吋浜介崕鎶藉Υ閹烘鐓冪憸婊堝礈閻斿鐒界憸鏃堢嵁濡も偓椤劑宕熼娑欑亙闁诲骸绠嶉崕閬嵥囨导瀛樺亗婵炲棙鎸婚悡娆撴偡濞嗗繐顏╁┑顕嗙畵閺屾盯濡堕崱娆愬櫚闂佸搫鐭夌粻鎾崇暦濮椻偓椤㈡棃宕熼鍌欓偗闂傚倷绀侀幖顐︽儗婢跺本宕叉繝闈涙閺嗭箓鏌涢锝嗙闁绘挻绋戦湁闁挎繂鎳忕拹锟犳煃瑜滈崜婵嗙暦閻㈠灚顫曢柟鎯х摠婵绱掔€ｎ偒鍎ラ柡鍡愬灲濮婅櫣绮欏▎鎯у壄闂佺锕ョ换鍌烆敋閿濆洦瀚氭繛鏉戭儐椤秹姊洪棃娑氱畾闁哄懏绮撳鎻掆攽鐎ｎ偀鎷洪梺鍦焾濞撮绮婚幘瀵哥閻忕偛鍊告慨鍌炴煙椤曗偓缁犳牠骞冩禒瀣窛濠电姴瀚獮宥嗕繆閻愵亜鈧牠鎮уΔ鍐ㄥ灊鐎光偓閸曨偄鍤戦柟鍏肩暘閸斿秹鎮￠崘顔藉仭婵炲棗绻愰鈺呮煟韫囨梹灏﹂柡宀€鍠栭、娆撴偩鐏炴儳娅氶梻浣烘嚀绾绢厽绻涢埀顒併亜閵忊槅娈曢柟宄版嚇閹兘鎮ч崼顫偗缂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣椤愪粙鏌ㄩ悢鍝勑㈢紒鎰殜閺屸€愁吋鎼粹€崇闂佺瀛╁Λ鍐蓟閵堝悿鍦偓锝庡亝閻濇洖顪冮妶搴′簼婵炶尙鍠栧濠氭晲婢跺﹦鐤€濡炪倖甯掗ˇ顖氣枔閸撲胶纾藉ù锝呭级椤庡棝鏌涚€ｎ偅宕屾慨濠勭帛閹峰懐鎲撮崟顐″摋闂備胶顭堢€涒晝鍒掗幘宕囨殾闁告鍊ｉ悢鐑樺珰闁告瑥顦伴惁鎺楁⒒閸屾艾鈧悂宕愰幖浣哥９闁绘垼濮ら崵鍕煕閹捐尙顦﹂柛銊︾箖閵囧嫰寮介顫捕闂佽棄鍟伴崰鏍蓟閺囩喓绠鹃柣鎰靛墯閻濇棃鏌ｉ悢鍝ユ嚂缂佺姵鎹囬獮鍐ㄎ旈崨顔芥珳闁硅偐琛ラ崜婵嬫倶閸垻纾奸柣鎰靛墮閸斻倖绻濋埀顒佹綇閳哄偆娼熼梺瑙勫劤閻°劍鍒婇弶鎴旀斀妞ゆ棁妫勯悘閬嶆煕鐎ｎ偄濮嶆鐐村灴婵偓闁靛牆鎳庨懓鍨攽閳藉棗鐏﹂柡鍛板皺閼鸿鲸绻濆顓涙嫼闂佸憡绻傜€氼喛鈪归梻浣告啞閺屻劌霉妞嬪骸鍨濆┑鐘宠壘閸愨偓闂侀潧顭徊鑲╄姳婵犳碍顥婃い鎰╁灪婢跺嫭绻涢崣澶屽ⅹ闁烩槅鍙冨濠氬磼濮橆厽鎮欏銈忓閺佽顕ｆ繝姘櫜闁告粈鐒﹀娲⒑闁偛鑻晶顔姐亜椤撶偞绌挎い锔芥尦閺屸剝绗熼崶褎鐝濋梺纭呮珪缁捇骞冨▎鎾寸劵婵炴垶姘ㄥ▔鍨攽閿涘嫬浜奸柛濠冩礈閹广垽骞囬鐟颁壕婵鍘ф晶瀵糕偓娈垮枟婵炲﹪寮幇鏉垮窛妞ゅ繐鎳忛弶鎼佹⒒娴ｅ搫浠洪柛搴や含婢规洟顢橀姀鐘虫К闂佹寧绻傚ú鐘诲磻閹捐埖鍠嗛柛鏇ㄥ墰椤︺儵鎮楃憴鍕闁告挻绻堥幃姗€骞掑Δ浣叉嫽婵炶揪绲介幗婊勭閵徛颁簻闁瑰瓨绻冮崵鍥ㄣ亜閵忊剝顥堟鐐寸墬閹峰懘宕楁径瀣伜闂傚倷鑳堕…鍫ュ嫉椤掑嫭鍋＄憸鏃囨闂佹寧娲栭崐褰掓偂濞嗘劗绠鹃柡澶嬪焾閸庡矂鏌涚€ｎ偅宕屾鐐叉处閹峰懘宕烽鐘瀱闂傚倸鍊峰ù鍥х暦閻㈢绐楅柟鐗堟緲闂傤垶鏌℃径瀣婵炲樊浜堕弫鍌炴煕濞戝崬骞掔紒銊ヮ煼濮婄粯鎷呴搹鐟扮闂佸湱顭堥幗婊堝焵椤掍胶鈻撻柡鍛☉瀹撳嫬顪冮妶鍡楃瑨閻庢凹鍙冮崺娑㈠箣閻樼數锛濇繛杈剧到椤牠顢旈崨顔煎伎闂佹悶鍎洪崜姘舵偂濞嗘垹妫柡澶婄仢閼哥懓霉濠婂懎浠х紒杈ㄥ浮椤㈡瑧鍠婃潏鈺佹倯闂備浇妗ㄩ悞锕傚礉閺嵮屽殫闁告洦鍘搁崑鎾绘晲鎼粹€愁潻閻庢鍠楁繛濠傤潖缂佹ɑ濯撮柛娑橈攻閸庢捇姊洪崫銉ユ珡闁稿瀚崣鍛存⒑閹稿孩绀€濞村吋鐗楀鍕偓锝庝簽缁愮偤姊鸿ぐ鎺戜喊闁告﹢绠栧畷銏ゅ箻缂佹ê浠┑鐘诧工鐎氼噣鎯岄幒鏂哄亾鐟欏嫭绀冪紒顔肩焸閸┿垺鎯旈妸銉ь啋濡炪倖鐗楅〃鍛妤ｅ啯鐓ラ柡鍥╁仜閳ь剙缍婂畷鎰節濮橆厾鍙冨┑鈽嗗灟鐠€锕€危婵傚憡鐓欓柤鎭掑劜缁€鈧梺瀹狀潐閸ㄥ潡骞冨▎鎾崇骇闁瑰濮抽幋鐑芥⒒娴ｈ鍋犻柛鏂块叄楠炲﹪骞樼拠鍙夌€銈嗘磵閸嬫挻鎱ㄦ繝鍕笡缂佹鍠栭崺鈧い鎺嗗亾妞ゎ厼娲╅ˇ鎾煙楠炲灝鐏茬€规洖宕埥澶娢熺喊杈ㄐゅ┑鐘垫暩婵炩偓婵炰匠鍥舵晞闁糕剝绋戠壕濠氭煟閺傚灝鎮戦柣鎾寸〒閳ь剙绠嶉崕杈殽閹间胶宓佹俊銈呮噺閻撶喖鏌熼幆褜鍤熼柕鍡樺浮閺屽秷顧侀柛鎾寸懅缁顓兼径濠勶紵闁哄鐗冮弲婊冪暦閺屻儲鐓欓柣鎴炆戦悡銉モ攽椤曞懎澧撮柡灞界Х椤т線鏌涢幘瀵告噰闁糕晝鍋ら獮瀣晜缂佹ɑ娅撶紓浣鸿檸閸樺ジ宕查崣澶嬪弿婵炴垶姘ㄧ壕钘夈€掑顒佹悙婵炲懏锕㈤弻娑㈠Ω閵壯冪厽闂佺粯渚楅崰娑氱不濞戞ǚ妲堟俊顖濇閻涒晠姊绘担鍛婃儓妞わ缚鍗冲畷褰掓偨閻㈢數骞撳┑鐐村灦閻熝呭姬閳ь剟姊哄Ч鍥х伈婵炰匠鍐懃闂傚倷鑳堕…鍫ユ晝閿曞倸绠犻柟鎹愵嚙閻撴繈鏌熼悙顒€澧繛绗哄姂閺屽秷顧侀柛鎾寸懇閿濈偠绠涢弴鐘碉紲濠碘槅鍨甸褔顢撻幘缁樷拺闁告稑锕﹂埥澶愭煥閺囨ê濡挎繛鎴犳暬閸┾偓妞ゆ帊妞掔换鍡涙煟閹板吀绨婚柍褜鍏欓崐婵嗙暦閵忥紕闄勯柛娑橈工娴滈亶姊虹憴鍕妞ゆ泦鍥ㄥ€堕柟鎯板Г閻撱儵鏌￠崶鈺佷粶闁逞屽墮缂嶅﹤鐣烽幇顓犵瘈婵﹩鍘鹃崣鍐ㄢ攽閳藉棗鐏熼悹鈧敃鈧嵄婵炲樊浜濋悡鐔兼煥濠靛棙顥為柕鍥ㄧ箖閹便劍绻濋崨顕呬哗缂備浇椴哥敮鎺曠亽闂佹儳绻橀埀顒佺〒缁€鍐╃節閻㈤潧校妞ゆ梹鐗犲畷浼村箻鐠囪尙锛欏┑鐘绘涧濡參宕甸弴銏＄厵缂備焦锚娣囶垶鏌ｉ幘鍗炲姦闁哄本鐩、鏇㈠Χ閸涱喚浜栭梻浣告啞鐪夌紒顔界懃椤繐煤椤忓嫮顔囬柟鑹版彧缁插潡鎮鹃悽鍛娾拺闁荤喐婢橀弳閬嶆⒑鐢喚绉俊顐ゅ枎椤啴濡堕崱妤冪懆闁诲孩鍑归崣鍐箖閳ユ枼妲堥柕蹇ョ磿閸樻捇鎮峰鍕煉鐎规洘绮撻幃銏ゆ偂鎼达綆鍟囬柣鐔哥矌婢ф鏁埡鍛瀬闁告劦鍠楅悡蹇涙煕椤愶絿绠栫€瑰憡绻冩穱濠囧箵閹烘挸鏋犲┑顔硷功缁垶骞忛崨鏉戞嵍妞ゆ挾鍠曞鎾⒒娴ｈ鍋犻柛鏂跨箰铻為柛鏇ㄥ灙閳ь剨绠撳畷鍫曨敂瀹ュ柊鈺呮⒒娴ｅ搫鍔︽俊鎻掓嚇瀹曪綁宕橀…鎴炵稁缂傚倷鐒﹁摫濠殿垱鎸抽弻娑樷槈濮楀牊鏁鹃梺鍝ュУ閸旀瑥顫忓ú顏勪紶闁靛鍎涢姀銏㈢＜濠㈣泛鏈崵鈧梺浼欑悼閸忔﹢寮幘缁樺亹闁肩⒈鍓﹀Σ浼存煟鎼达絾鍤€濠㈢懓锕畷鏉课旈崘顏嗩槸闁瑰吋鐣崹鑽ょ不妤ｅ啯鍊甸柣銏☆問閻掑墽鈧稒绻傞—鍐Χ閸℃浠撮梺纭呮珪閸旀宕氶幒妤€閱囬柍鍨涙櫅娴滈箖鏌ㄥ┑鍡涱€楀ù婊勭墪闇夋繝濠傚閻帡鏌＄仦绯曞亾閹颁礁鎮戦梺鍛婂姂閸斿矂鈥栫€ｎ喗鈷戦梻鍫熺⊕椤ョ偤鎮介銈囩瘈鐎殿喛顕ч埥澶娢熷鍛灈鐎规洦鍋婂畷鐔碱敊閼测晛骞嬮梻鍌氬€风粈渚€鎮块崶顒婄稏濠㈣埖鍔曢崹鍌炴煕瑜庨〃鍛不閺嶃劎绠鹃柛鈩兩戠亸顓犵磼閻欐瑥娲﹂悡娆撴倵閻㈡鐒剧亸蹇撯攽閳╁喚娈曢柟鐟版搐椤繒绱掑Ο璇差€撻梺鑽ゅ枛閸嬪﹪宕电€ｎ亖鏀介柣鎰邦杺閸ゅ绱掗悩铏碍闁伙絿鍏橀獮瀣倷閻㈢數妲囬梻浣侯焾閺堫剛鍒掑鍛灁闁诡垎鈧弨浠嬫煟濡偐甯涙繛鎳峰嫨浜滈柟瀛樼箖椤ャ垻鈧娲橀崹鍨暦閻旂⒈鏁嶆繛鎴炶壘楠炲牓姊绘繝搴′簻婵炶绠撻幊婵嬫倷椤掑偆娲搁悷婊呭鐢鎮?;
}

function setActiveMetric(metricKey) {
  persistActiveView();
  persistActiveMetricInputs();
  ensureMetricState().activeChart = state.activeChart;
  const next = METRIC_CONFIG[metricKey] ? metricKey : "density";
  state.activeMetric = next;
  const metricState = ensureMetricState(next);
  state.activeChart = metricState.activeChart === "bar" ? "bar" : "line";
  state.view = state.activeChart === "bar" ? metricState.barView : metricState.lineView;
  setMetricStyleDefaults(next);
  applyChartStyleControls();
  applyBarStyleControls();
  setMetricTitles();
  renderMetricNav();
  loadMetricPreset(next);
  state.drag = null;
  state.labelDrag = null;
  syncChartModeUi();
  updateAll();
  saveState();
}

function setActiveChart(type) {
  const next = type === "bar" ? "bar" : "line";
  if (state.activeChart === next) {
    syncChartModeUi();
    drawChart();
    return;
  }
  persistActiveView();
  persistActiveMetricInputs();
  state.activeChart = next;
  ensureMetricState().activeChart = next;
  state.view = next === "bar" ? ensureMetricState().barView : ensureMetricState().lineView;
  state.drag = null;
  state.labelDrag = null;
  syncChartModeUi();
  updateCurrentDataTable();
  drawChart();
  saveState();
}

function onCanvasPointerDown(event) {
  const point = canvasPoint(event);
  if (state.layoutUnlocked) {
    const hit = findDraggableItem(point);
    if (hit) {
      startLabelDrag(hit, point, event);
      return;
    }
  }
  if (!state.layoutUnlocked) {
    state.drag = null;
    return;
  }
  if (state.activeChart === "bar") {
    state.drag = null;
    return;
  }
  if (!pointInPlot(point)) return;
  const g = state.chartGeometry;
  const mode = state.chartStyle.interactionMode;
  state.drag = {
    active: true,
    mode,
    startX: point.x,
    startY: point.y,
    currentX: point.x,
    currentY: point.y,
    view: {
      xMin: g.xDomainMin,
      xMax: g.xDomainMax,
      yMin: g.yMin,
      yMax: g.yMax,
    },
  };
  els.chart.setPointerCapture?.(event.pointerId);
  els.tooltip.hidden = true;
}

function onCanvasPointerMove(event) {
  if (state.labelDrag?.active) {
    updateLabelDrag(canvasPoint(event));
    return;
  }
  if (!state.drag?.active) {
    if (state.layoutUnlocked) {
      const hit = findDraggableItem(canvasPoint(event));
      els.chart.style.cursor = hit ? "move" : "default";
      if (hit) {
        els.tooltip.hidden = true;
        return;
      }
    } else {
      els.chart.style.cursor = "";
    }
    onCanvasMove(event);
    return;
  }
  const point = canvasPoint(event);
  state.drag.currentX = Math.max(state.chartGeometry.margin.left, Math.min(state.chartGeometry.margin.left + state.chartGeometry.plotW, point.x));
  state.drag.currentY = Math.max(state.chartGeometry.margin.top, Math.min(state.chartGeometry.margin.top + state.chartGeometry.plotH, point.y));
  if (state.drag.mode === "pan") {
    const g = state.chartGeometry;
    const dx = ((state.drag.currentX - state.drag.startX) / g.plotW) * (state.drag.view.xMax - state.drag.view.xMin);
    const dy = ((state.drag.currentY - state.drag.startY) / g.plotH) * (state.drag.view.yMax - state.drag.view.yMin);
    state.view = {
      xMin: state.drag.view.xMin - dx,
      xMax: state.drag.view.xMax - dx,
      yMin: state.drag.view.yMin + dy,
      yMax: state.drag.view.yMax + dy,
    };
  }
  drawChart();
}

function onCanvasPointerUp(event) {
  if (state.labelDrag?.active) {
    state.labelDrag = null;
    els.chart.releasePointerCapture?.(event.pointerId);
    saveState();
    drawChart();
    return;
  }
  if (!state.drag?.active) return;
  const drag = state.drag;
  if (drag.mode === "zoom") {
    const w = Math.abs(drag.currentX - drag.startX);
    const h = Math.abs(drag.currentY - drag.startY);
    if (w > 10 && h > 10 && state.chartGeometry) {
      const g = state.chartGeometry;
      const x1 = g.xInvert(Math.min(drag.startX, drag.currentX));
      const x2 = g.xInvert(Math.max(drag.startX, drag.currentX));
      const y1 = g.yInvert(Math.max(drag.startY, drag.currentY));
      const y2 = g.yInvert(Math.min(drag.startY, drag.currentY));
      state.view = { xMin: x1, xMax: x2, yMin: y1, yMax: y2 };
    }
  }
  state.drag = null;
  els.chart.releasePointerCapture?.(event.pointerId);
  drawChart();
}

function resetView() {
  state.drag = null;
  state.labelDrag = null;
  const savedEffect = state.activeChart === "bar"
    ? normalizeSavedEffect(state.savedBarEffect, DEFAULT_BAR_STYLE)
    : normalizeSavedEffect(state.savedEffect, DEFAULT_CHART_STYLE);
  if (savedEffect) {
    if (state.activeChart === "bar") {
      state.savedBarEffect = savedEffect;
      state.barStyle = savedEffect.chartStyle;
      applyBarStyleControls();
    } else {
      state.savedEffect = savedEffect;
      state.chartStyle = savedEffect.chartStyle;
      applyChartStyleControls();
    }
    state.view = savedEffect.view;
    updateCurrentDataTable();
    drawChart();
    saveState();
    return;
  }
  state.view = null;
  drawChart();
}

function saveChartEffect() {
  if (state.activeChart === "bar") {
    state.barStyle = readBarStyleControls();
    state.savedBarEffect = makeCurrentEffect();
  } else {
    state.chartStyle = readChartStyleControls();
    state.savedEffect = makeCurrentEffect();
  }
  saveState();
  if (!els.saveChartEffect) return;
  const originalText = els.saveChartEffect.textContent;
  els.saveChartEffect.textContent = "闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮缁炬儳缍婇弻鐔兼⒒鐎靛壊妲紒鐐劤缂嶅﹪寮婚悢鍏尖拻閻庨潧澹婂Σ顔剧磼閻愵剙鍔ょ紓宥咃躬瀵鎮㈤崗灏栨嫽闁诲酣娼ф竟濠偽ｉ鍓х＜闁绘劦鍓欓崝銈囩磽瀹ュ拑韬€殿喖顭烽幃銏ゅ礂鐏忔牗瀚介梺璇查叄濞佳勭珶婵犲伣锝夘敊閸撗咃紲闂佺粯鍔﹂崜娆撳礉閵堝洨纾界€广儱鎷戦煬顒傗偓娈垮枛椤兘骞冮姀銈呯閻忓繑鐗楃€氫粙姊虹拠鏌ュ弰婵炰匠鍕彾濠电姴浼ｉ敐澶樻晩闁告挆鍜冪床闂備胶绮崝锕傚礈濞嗘挸绀夐柕鍫濇川绾剧晫鈧箍鍎遍幏鎴︾叕椤掑倵鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝懐顦ч柣蹇撶箲閻楁鈧矮绮欏铏规嫚閺屻儱寮板┑鐐板尃閸曨厾褰炬繝鐢靛Т娴硷綁鏁愭径妯绘櫓闂佸憡鎸嗛崪鍐簥闂傚倷鑳剁划顖炲礉閿曞倸绀堟繛鍡樻尭缁€澶愭煏閸繃顥犵紒鈾€鍋撻梻渚€鈧偛鑻晶鎾煛鐏炶姤顥滄い鎾炽偢瀹曘劑顢涘顑洖鈹戦敍鍕杭闁稿﹥鐗滈弫顕€骞掑Δ鈧壕鍦喐閻楀牆绗掗柛姘秺閺屽秷顧侀柛鎾跺枛瀵鏁愰崱妯哄妳闂侀潧绻掓慨鏉懶掗崼銉︹拺闁告稑锕﹂幊鍐煕閻曚礁浜伴柟顔藉劤閻ｏ繝骞嶉鑺ヮ啎闂備焦鎮堕崕婊呬沪缂併垺锛呴梻鍌欐祰椤曆囧礄閻ｅ苯绶ゅ┑鐘宠壘缁€澶愭倵閿濆簶鍋撻鍡楀悩閺冨牆宸濇い鏃囶潐鐎氬ジ姊绘笟鈧鑽も偓闈涚焸瀹曘垺绺界粙璺槷闁诲函缍嗛崰妤呮偂閺囥垺鐓忓┑鐐茬仢閸斻倗绱掓径搴㈩仩闁逞屽墲椤煤濮椻偓瀹曟繂鈻庨幘宕囩暫濠电偛妫楀ù姘跺疮閸涱喓浜滈柡鍐ㄦ处椤ュ鏌ｉ敂鐣岀煉婵﹦绮粭鐔煎焵椤掆偓椤洩顦归柟顔ㄥ洤骞㈡俊鐐灪缁嬫垼鐏冮梺鍛婂姦娴滅偤鎮鹃崼鏇熲拺闁革富鍘奸崝瀣煙濮濆苯鐓愮紒鍌氱Т椤劑宕奸悢鍝勫汲闂備礁鎼崐钘夆枖閺囩喓顩烽柕蹇婃噰閸嬫挾鎲撮崟顒€纰嶅┑鈽嗗亝閻╊垶宕洪埀顒併亜閹哄秶璐伴柛鐔风箻閺屾盯鎮╅幇浣圭杹闂佽鍣换婵嬪极閹剧粯鍋愭い鏃傛嚀娴滄儳銆掑锝呬壕閻庢鍣崳锝呯暦閻撳簶鏀介悗锝庝簼閺嗩亪姊婚崒娆掑厡缂侇噮鍨拌灋濞达絾鎮堕埀顒佸笩閵囨劙骞掗幘鍏呯紦缂傚倸鍊烽悞锕傗€﹂崶鈺佸К闁逞屽墴濮婂搫效閸パ呬紙濠电偘鍖犻崘顏呮噧闂傚倸鍊烽悞锔锯偓绗涘厾楦跨疀濞戞锛欏┑鐘绘涧濡盯寮抽敂濮愪簻闁哄稁鍋勬禒锕傛煕鐎ｎ亶鍎旈柡灞剧洴椤㈡洟濡堕崨顔锯偓楣冩⒑缂佹绠扮紒缁樼箓椤繑绻濆顒傦紲濠殿喗锕╅崗姗€宕戦幘缁樺€婚柤鎭掑劚閳ь剙娼￠弻銊╁籍閸喐娈伴梺绋款儐閹稿墽鍒掗鐐╂婵☆垵顕у▍銈夋倵鐟欏嫭绀冮柣鎿勭節瀵鈽夐姀鐘插祮闂侀潧顭堥崕铏閳哄啰纾奸柟顖嗗啠鎸冪紓渚囧櫘閸ㄦ娊骞戦姀鐘闁靛繒濮烽鍝勨攽閻愬弶顥滅紒缁樺笚缁傛帗绺介崨濞炬嫼缂傚倷鐒﹁摫閻忓繋鍗抽弻銊╁即濡櫣浼堥悗娈垮枛椤兘骞冮姀銏″仒闁炽儱鍘栨竟鏇㈡⒑濮瑰洤鐏い鏃€鐗犻幃鐐哄礈瑜庨崑鏍煏婢跺棙娅嗛柍閿嬪灩缁辨帞鈧綆鍋掗崕銉╂煕鎼淬垹濮嶉柡宀€鍠栭幃鐑芥偋閸繃鐏庨柣搴㈩問閸ｎ噣宕戞繝鍥╁祦闁搞儺鍓﹂弫鍥煟閺傚灝妲诲┑鈩冨▕濮婄粯鎷呴崫鍕紦闂佺楠搁顓熺缁嬪簱鏋庨柟鎯х－椤︹晠鏌ｉ悢鍝ユ噧閻庢凹鍠氬褔鍩€椤掑嫭鈷戞慨鐟版搐閻忓弶绻涙担鍐插椤╅攱绻濇繝鍌滃闁绘挻鐟╅弻娑㈠箛椤撶姴寮ㄥ銈呭椤ㄥ﹪骞冮敓鐘参ч柛鈩冨姃缁ㄥ姊虹憴鍕婵炲鐩畷婊勬綇閵娧咁啎闂佺绻楅崑鎰櫠閻㈠憡鐓涢悘鐐靛枎濡盯鎮块埀顒勬⒑閻熸澘鈷旀い銉﹀姉濞戠敻鍩€椤掑嫭鈷掑ù锝堫潐閵囩喖鏌涘Ο鍦煓闁诡喚鍏橀崺锟犲川椤撶姷鏆柣鐔哥矌婢ф鏁幒鏃備笉闁圭儤顨嗛悡娆撴煟閹寸伝顏堟倶閵夛负浜滄い鎺嗗亾妞ゆ垵顦～蹇撁洪鍕獩婵犵數濮撮崰姘潖閸噮娓婚柕鍫濋娴滄粍銇勯敃鍌欐喚妤犵偞鍨挎慨鈧柣姗嗗亝閺傗偓闂備礁澹婇崑鍛崲閸愵喗鍊甸柛鎰ゴ閺€浠嬫煃閽樺顥滈柣蹇曞█閺屾盯濮€閻樿尙楠囩紓浣稿€哥粔鐢稿Χ閿濆绀冮柍鍝勫暙瀵即姊绘繝搴′簻婵炴潙瀚濠囨嚍閵壯屾锤濠电姴锕ら幊鎰婵傚憡鐓欓梺顓ㄧ畱楠炴﹢鏌曢崱妯虹缂佽鲸甯楀蹇涘Ω閿曗偓闂夊秶绱撴担璇℃畼闁哥姵鐗曢悾鐑藉箚闁附歇闂備浇顕х换鎰矓閻熼偊娼栨繛宸簼閸ゆ帡鏌曢崼婵囧櫤闁诲寒鍙冨娲川婵犲啰鍙嗗┑鐐差嚟閸忔ê鐣峰璺虹闁哄啠鍋撻悗姘缁绘盯寮堕幋顓炲壉濡炪値鍋勭粔鐟邦潖濞差亝顥堟繛鎴炴皑椤斿﹥绻濆▓鍨灓闁稿繑锕㈤獮鍡涘醇閵夈儳顦板銈嗙墬缁嬪牓骞忛搹鍦＝濞达絽澹婇崕鎰版倵缁楁稑鍠涢懓鍧楁煙濞堝灝鏋ょ痪鎯у悑閵囧嫰寮憗銈呬划濡炪倕瀛╅〃濠傜暦閿熺姵鐒肩€广儱妫涢崢閬嶆⒑闂堟侗妯堥柛鐘崇墬閺呭爼顢涢悙瀵稿帗闂備礁鐏濋鍛箔閹烘鐓忛柛鈩兠粭鎺撱亜椤愶絿绠為柡浣瑰姍瀹曘劑顢楅埀顒勊夊顑芥斀闁绘ê鐏氶弳鈺呮煕鐎ｎ偓鑰跨€规洜濞€閹晝鎷犻懠顒夋Ч闂備礁澹婇悡鍫ュ磻閹烘鐤€广儱顦伴埛鎺戔攽閻樻煡顎楀ù婊勭矋缁绘稓鎷犺閻ｉ亶鎮￠妶澶嬬厸鐎广儱楠告禍婵囥亜閹邦亞鐭欓柡灞炬礋瀹曠厧鈹戦崶褌鐥柣鐔哥矌婢ф鏁Δ鍛；闁归偊鍠掗崑鎾绘偡閺夋妫岄梺鍝ュУ閻楃姴鐣峰鍫熺劶鐎广儱妫岄幏铏圭磽娴ｅ壊鍎愭い鎴炵懇瀹曟洝绠涘☉娆戝幈婵犵數濮撮崐褰掑磻閵壯€鍋撳▓鍨灈妞ゎ厾鍏橀獮鍐閵堝棗浜楅柟鑹版彧缂嶅棝宕ョ€ｎ偂绻嗛柣鎰典簻閳ь剚鐗曢～蹇旂節濮橆剛鍘遍梺鍓插亖閸庡崬效閸欏浜滈柟鎯у船閻忣亪鏌嶉柨瀣仼缂佽鲸鎸婚幏鍛存嚃閳╁啫鐏╁ù婊勬倐閹囧醇閵忋埄鍟庨梻浣藉亹閳峰牓宕滃▎鎾冲嚑婵炴垶鍩冮崑鎾斥枔閸喗鐏堝銈庡幘閸忔ê顕ｉ锕€绠荤紓浣姑禍褰掓⒑閼测斁鎷￠柛鎿勭畱鍗卞ù鐓庣摠閳锋帒霉閿濆洦鍤€妞ゆ洘绮庣槐鎺旀嫚閹绘巻鍋撻崸妤冨祦濠电姴鍋嗛崥瀣煕閳╁啰鎳呯憸浼寸畺濮婃椽宕崟顒€鍋嶉梺鎼炲妽濡炰粙宕哄☉銏犵闁圭偨鍔岀紞濠囧极閹版澘閱囬柣鏇氭閸濇姊哄Ч鍥х労闁搞劏浜划娆撳箳濡も偓妗呴梺鍛婃处閸ㄧ増鍎梻渚€娼ч敍蹇涘礃閻愵剚绶梻鍌氬€风欢姘跺焵椤掍胶銆掗柍瑙勫浮閺屾盯寮埀顒勫垂閸ф鍋樻い鏃傗拡濞笺劑鏌嶈閸撶喖濡存担绯曟瀻闁圭偓娼欓惂鍕節閵忥絾纭炬い锔垮嵆瀹曟垿宕ㄧ€涙ǚ鎷婚梺绋挎湰閻熴劑宕楀畝鈧槐鎺楊敋閸涱厾浠搁悗瑙勬礀缂嶅﹪骞冮敓鐘靛祦妞ゆ帊鑳跺ú瀵糕偓瑙勬礈閸犳牠銆佸鈧幃鈺傛綇閳哄啯鍠掗梻鍌氬€烽悞锔锯偓绗涘懏宕查柛宀€鍊涢崶銊ヮ嚤閻庢稒锚娴滄姊洪棃娑辨Т闁哄懏绮撻幃鈥斥槈閵忥紕鍘遍梺闈涱樈閸犳岸宕㈠☉娆戠闁割偆鍠愰悡銉╂婢跺绡€濠电姴鍊绘晶銏ゆ煟閿濆棙銇濋柡宀嬬磿娴狅箓宕滆閸掓稒绻濈喊澶岀？闁稿繑蓱娣囧﹪鎮块锝喰梻浣侯攰鐏忣亪宕戦幇顔筋潟闁规儳鐡ㄦ刊鎾煣韫囨洘鍤€缂佹绱曠槐鎾存媴缁涘娈梺缁橆殔閿曨亪鐛崼銉ノ╅柍杞拌兌閸旓箑顪冮妶鍡楃瑨閻庢凹鍙冮幃锟犲Ψ閿斿墽鐦堥梻鍌氱墛缁嬫帡藟閻愭番浜滈柕澹啠鏋呴梺鍝勬湰濞茬喎鐣烽崡鐐嶇喖宕崟鍨秼濠碉紕鍋戦崐銈嗙濠婂牆鐤悗娑櫭肩换鍡涙煕椤愶絾绀€妤犵偑鍨烘穱濠囧Χ閸涱厽娈ㄥ┑鐑囩秵閸犳鎹㈠┑瀣仺闂傚牊绋愮划璺衡攽閳藉棗鐏犻柨鏇ㄤ簻閻ｇ兘濮€閿涘嫰妾梺鍛婄☉閿曘倖绂掓總鍛娾拺缂備焦锚閻忚鲸淇婇銏狀伃闁挎繄鍋ゅ畷銊р偓娑欘焽閸橆亪姊洪崜鎻掍簼缂佽鍟村畷鎶芥嚍閵夛絼绨婚梺鍝勫暊閸嬫捇鏌涢弮鈧悧婊堝箲閵忕姭妲堟繛鍡樺姉缁夊爼姊洪崨濠冨瘷闁告劑鍔庨崢鎺楁⒒閸屾瑧顦﹂柟鐚溿倖鎳岀紓鍌欑贰閸犳骞戦崶顒佸仒妞ゆ棁娉曢悿鈧梺鐟板綖閻掞箑顪冩禒瀣ㄢ偓渚€寮崼婵嗙獩濡炪倕绻愰幊搴敂閸︻厾纾介柛灞剧懆閸忓矂鏌ц箛鎾诲弰鐎规洏鍨虹缓鐣岀矙鐠恒劎鏋冮梺鐟板悑閻ｎ亪宕规繝姘モ偓鍛存嚑椤掍礁鏋戦梺缁橆殔閻楀棛绮鑸电厽闁规儳鐡ㄧ粈瀣煙椤旂瓔娈滈柡浣瑰姈閹棃鍨鹃懠顒佹櫦濠电姷鏁搁崑鐐躲亹閸愵噮鏁嬫い鎾卞灩閻掑灚銇勯幒鎴濇灓婵炲吋鍔栫换娑㈠矗婢舵鍔烽梺鐟扮畭閸ㄨ棄鐣烽幒鎴旀斀闁割偅绮庨懗娲⒒閸屾艾鈧绮堟笟鈧獮澶愬焺閸愵亞鎳濆┑掳鍊曢幊搴ｇ玻濡や焦鍙忔俊顖涘绾箖鏌涚仦璇插闁哄瞼鍠栧鑽も偓鐢殿焾婵′粙姊洪幎鑺ユ暠闁搞劌娼″璇测槈濡攱顫嶅┑顔筋殔閻楀﹪銆傞懖鈺冪＝濞达絽鎽滈崺锝吤瑰鍐煟鐎殿喛顕ч埥澶愬閳ュ厖姹楅梺璇查濠€杈ㄦ叏閹绢啟澶娾攽鐎ｎ偆鍘介梺瑙勫劤瀹曨剟鍩€椤掍胶绠炴鐐插暙铻栭柛娑卞枛娴犳椽姊哄Ч鍥х伄闁稿缍侀崺鈧い鎺嗗亾闁挎洦浜璇测槈濮橈絽浜鹃柨婵嗛娴滄繈鎮樿箛鏇熸毈闁哄瞼鍠栧畷锝嗗緞鐎ｎ亜鏀柣搴ゎ潐濞叉粓宕伴弽顓溾偓浣肝旈崨顓狅紲闂侀潧鐗嗛弻濠囨倷閻㈢數锛濋梺绋挎湰閼归箖鍩€椤掑嫷妫戞繛鍡愬灲閺佹捇鎮╅懠顒傚炊婵犲痉鏉库偓鏇㈠箠鎼达絿涓嶉柡灞诲劜閻撴洟鏌曟径瀣仴闁兼椿鍨伴埢鎾诲Ω閿斿墽鐦堥梺姹囧灲濞佳勭墡闂備胶鍘х紞濠勭不閺嶎厽鍋樻い鏇楀亾濠殿喒鍋撻梺鐐藉劥鐏忔瑧绮诲鑸碘拺闂傚牊绋撴晶鏇㈡煙闁垮鐏ユい鏂跨箻婵＄兘鍩￠崒婊冨箥婵＄偑鍊栧Λ浣肝涢崟顖涘€堕悗娑櫳戦崣蹇撯攽閻樺弶鍣烘い蹇曞█閺屾盯寮介妸褍鈷岄悗娈垮枟閹告娊骞冨▎寰濆湱鈧綆鍋勯悵鍫曟⒒閸屾艾鈧嘲霉閸パ呮殾闁汇垻顭堢粣妤呮煕閳╁啰鈽夌痪鎯ф健閺岋綁濮€閻樺啿鏆堥梺绋款儐钃遍柕鍥у瀵潙螖閳ь剚绂嶆ィ鍐╁€甸悷娆忓缁€鈧梺闈涚墕閹测剝绌辨繝鍥ㄥ€婚柤鎭掑劜濞呭棝鏌ｉ悢鍝ユ噧閻庢凹鍓熼、鏃堟倻濡偐鐦堥梺姹囧灲濞佳勭閿曞倹鐓欑紒瀣儥閻撹偐鈧娲樺钘夌暦濮椻偓椤㈡瑩鎳栭埡瀣耿闂傚倷娴囬～澶愬磿閹剁瓔鏁嬫い鎾跺Х娑撳秹鏌熼锝囦汗鐟滅増甯楅弲鏌ユ煕濞戝崬骞楁慨锝嗗姇閳规垿鎮欐０婵嗘疂缂備胶濮甸幐鎼佹偩閻戣棄绠ｉ柣姗嗗亜娴滈箖鏌ㄥ┑鍡涱€楅柡瀣枛閺岋綁骞樼€涙顦伴梺鍝勮嫰缁夊綊宕洪埄鍐╁闁告稑锕ラ鎯р攽閻愯尙鎽犵紒顔肩Ч閵嗗啴宕卞▎鎰簥濠电偞鍨崹鍦不閿濆鐓熼柟閭﹀墮閺嗙偟鈧厜鍋撶紒瀣儥閸ゆ洟鏌涘☉姗堟敾闁稿海鍠栭弻鏇熺節韫囨搩娲梺鍛婎焽閺佸寮婚敐鍡樺劅闁挎繂妫欏В鍕渻閵堝骸骞栭柣妤€妫濆鎶藉煛閸涱喒鎷绘繛杈剧秬濞咃絿鏁☉銏″仺妞ゆ牗绋戝ù顔尖攽閳ュ磭鍩ｆ鐐寸墬閹峰懎顫㈢仦鐐暫闂傚倷鐒︾€笛呮崲閸屾娑樷枎閹惧磭锛熼梺缁樻⒐閹埖绂嶅鍫熺厸鐎广儱鍟俊鍧楁煟椤撶偟鐒哥€殿喕绮欓弫鎾绘偐閺傘儲瀚藉┑鐐舵彧缁蹭粙骞夐敓鐘茬疅缂佸绨遍弨鑺ャ亜閺冨倸浜鹃柡鍡╁墴閺屾洟宕卞Δ鈧弳鐐电磼缂佹绠炵€规洘鍎奸ˇ鎾煟閿濆棙銇濇慨濠冩そ閹瑩鎸婃径濠傤潥闂備礁鎼鍥储瑜嶅畵鍕⒑閸撴彃浜為柛鐘冲姍瀹曪綀绠涢弮鈧崣蹇斾繆閵堝倸浜鹃梺缁橆殔缁绘ê鐣峰璺虹骇婵☆偆鏁搁幊鎾烩€﹂妸鈺侀唶闁靛繈鍨哄В鍥⒒娴ｅ憡鎯堥柡鍫墰缁瑩寮介銈勭瑝濠电偞鍨崹鍦不婵傚憡鐓曢柟鑸妽閺嗘洟鏌ㄩ弮鍌涙珪缂佺娀绠栭幃妤€鈽夊▎妯煎姺闂佹椿鍘界敮鐐垫閹烘鍋愮€规洖娲ら埅鐟邦渻閵堝骸浜滅紒缁樺姉閸欏懎顪冮妶鍛闁硅櫕鍔欏畷婵嬫偨閸涘ň鎷虹紓鍌欑劍閿氬┑顔肩焸閹绠涢敐鍕晼闂侀€炲苯澧痪鏉跨Т椤灝顫滈埀顒勫灳閿曞倹鍤勬い鏍电稻浜涘┑锛勫亼閸婃牕煤閿曞倸鐭楅柛鎰靛枛閺勩儵鏌嶈閸撴岸濡甸崟顖氱闁瑰瓨绻冮悘鎾斥攽閻愭彃鎮戦柛鏃€鐗滈幑銏犫槈閵忕姷鐓戞繝銏ｆ硾閿曪附瀵煎畝鍕€甸悷娆忓缁岃法绱掔紒妯肩畵闁伙絽鍢茶灒濞撴凹鍨伴弲鐘差渻閵堝棙鐓ラ柛姘儔椤㈡﹢宕归瑙勬杸闂佺粯鍔曞Ο濠囧吹閻斿皝鏀芥い鏃囧Г鐏忥附銇勯姀锛勫⒌妤犵偛娲鍫曞箰鎼达絺鍋撻鍕拺闁硅偐鍋涢崝鎾煕閹炬潙鍝洪柟顕嗙節閹垽姊归幇顔剧暰婵＄偑鍊栭悧妤€顫濋妸锔绢浄闁靛繈鍊栭悡鐔兼煏婵犲繘妾柕鍥ㄧ箞閺岋紕浠﹂悙顒傤槹閻庤娲栭妶鎼併€佸Δ鍛＜婵犲﹤瀚鎾斥攽閻樻剚鍟忛柛鐘崇墵閺佸啴鏁傞幆褍鐏婂銈嗙墱閸嬫稓绮婚鐐寸厱婵炴垵宕弸銈夋煟閻旀椿娼愰柕鍥у瀵粙濡歌婵洭姊洪崫鍕棤闁稿鍊曢～蹇曠磼濡顎撶紓浣圭☉椤戝棛绱為崼婵冩斀闁挎稑瀚禒锕傛倵缁楁稑鎳愰惌澶屸偓骞垮劚椤︿即宕愰悜鑺モ拻闁割偆鍠撻埥澶愭煟韫囨搫鏀荤紒缁樼箞閹粙妫冨ù璁圭秮閺屻倝鎮烽弶搴撴寖缂備緡鍠栭…鐑藉极閹邦厼绶為悗锝庡墮楠炴绻濈喊妯活潑闁搞劋鍗抽獮鏍敃閿曗偓缁犳牕霉閿濆牊顏犵痪鎯у悑娣囧﹪濡堕崒姘婵＄偑鍊х€靛矂宕归崼鏇炴槬闁绘劕鎼粻锝夋煥閺冨洦顥夐柍褜鍓涢崗姗€寮婚埄鍐ㄧ窞閻庯綆浜炴禒鍏肩箾鐎电校闁诡喖鍊搁～蹇撁洪鍛闂侀潧鐗嗛幊蹇涙偟閵忋垻纾藉ù锝囨嚀缁茶顭胯閺咁偊宕氶幒鏂哄亾閿濆簼鎲鹃柛姘儔閺屾稑顭ㄩ埀顒勬嚄閸洖鐭楅柛鈩冪⊕閳锋垿鏌涢幘鏉戠祷濞存粎鍋ら弻娑㈡偐閾忣偄纾抽悗瑙勬磸閸ㄤ粙骞冩禒瀣窛濠电偟鍋撶€氳偐绱撻崒姘偓鐑芥倿閿曞倹鏅梻浣筋嚙妤犲繒绮婚幘璇茶摕闁靛鍎哄鈺呮煠閸濄儲鏆╅柛妯圭矙濡懘顢曢姀鈩冩倷濡炪倖鍨甸幊妯虹暦濠靛鏅濋柛灞剧〒閸樻悂鏌ｈ箛鏇炰户闁哄拋鍋勯弳鈺備繆閻愵亙绱橀柛灞剧矌閻涖垽姊洪崫鍕拱闁烩晩鍨堕悰顔嘉熺亸鏍т壕闂傚牊绋掗崯鐐烘煕閿濆棙绶查摶鏍煟濮椻偓濞佳勭閿斿浜滈柕濞垮劜閸ゅ洭鏌嶉妷顖滅暤濠碘剝鎮傞崺鈩冪瑹閳ь剟宕捄琛℃斀闁绘绮☉褎绻涚仦鍌氬闁糕斁鍋撳銈嗗笒椤︻垱鏅堕濮愪簻妞ゅ繐瀚弳锝呪攽閳ュ磭鍩ｇ€规洖宕灒缁绢參顥撶粚鍧楁⒒閸屾瑨鍏屾い顓炵墦椤㈡牠宕卞☉妯碱唶婵°倧绲介崯顐︽倿閸偁浜滈柟鐑樺灥閺嬨倖绻涢崗鐓庡缂佺粯鐩畷锝嗗緞瀹€鈧悡澶愭⒑閻愯棄鍔电紒鐘虫尭閻ｉ攱绺介崨濠冩珳闂佹悶鍎绘俊鍥嚄閸濆嫧鏀介柣妯虹仛閺嗏晠鏌涚€ｎ剙鈻堟鐐存崌椤㈡棃宕卞Δ鍐摌濠电偛顕慨鎾敄閸涱垳涓嶉悷娆忓娴滄粓鏌熼幏灞剧【妞も晩鍓涢埀顒冾潐閹哥兘鎮為敂鐣屸攳濠电姴娲ゅ洿闂佸憡渚楅崰鏍р枍閵堝鈷戦柟鎯板Г閺侀亶鏌涢妸銉﹀仴鐎殿喖顭烽弫鎰緞鐎ｎ亙绨婚梻浣告啞缁嬫垿鏁冮敃鍌氱闁跨喓濮甸埛鎴︽偣閸ワ絺鍋撻搹顐や憾闂備焦鎮堕崝灞筋焽閳ユ剚鍤曞┑鐘崇閺呮彃顭跨捄渚剱婵炲懏绮撻弻鐔兼偂鎼达絾鎲肩紓浣筋嚙閻楁挸鐣烽幋婢棃宕ㄩ灏栧亾閻㈠憡鍋℃繛鍡楃箰椤忣亞绱掗埀顒勫礃椤旂晫鍘遍梺鍝勫暊閸嬫捇鏌ｉ悤鍌炴缂佸矁椴哥换婵嬪炊瑜旈崬鍫曟⒑閸濆嫭宸濋柛瀣仱婵￠潧鈹戦崶鈺冾啎闁哄鐗嗘晶浠嬪礆娴煎瓨鐓欑痪鏉垮船娴滄繈鏌熸笟鍨閻撱倖銇勮箛鎾村櫝闁归绮换娑欐綇閸撗冨煂闂佺濮ょ划搴ｅ垝閺傛５娲敂閸涱垰骞堥梺璇插嚱缂嶅棙绂嶉悜鐣屽彆妞ゆ帒鍊甸崑鎾舵喆閸曨剛锛橀梺鎼炲姀濡嫰鎮惧畡閭︾叆闁糕檧鏅滈瀷婵犵數鍋為崹鍫曞箰閸濄儳鐭撶痪鎯ь儑娴滄瑩姊绘担鐟邦嚋缂佽鍊块獮濠冩償閵娿儲杈堥梺缁樺姉閸庛倝鎮￠悢鍏肩厵闁诡垎鍛喖缂備讲鍋撻柛鎰典簽绾捐偐绱撴担璇＄劷婵炴彃顕埀顒冾潐濞叉牕鐣烽鍐簷濠电偠鎻徊鑲╂媰閿曗偓鐓ら柤鍝ユ暩缁♀偓缂佸墽澧楅敋濠⒀嗗皺閹叉悂寮堕崹顔芥濡ょ姷鍋為悧鐘汇€侀弴銏℃櫆闁稿繐顦禍楣冩煥閺囩偛鈧綊宕甸崟顑句簻闁哄秶鏁哥粙缁樸亜鎼粹剝鎼愰柍瑙勫灴閹瑩鎳犻浣瑰枛缂傚倷绶￠崰鏍矓閸洖绠查柕蹇嬪€曢柋鍥煟閺傚灝顣崇紒鐘冲哺濮婂搫效閸パ呬紕濡炪値鍘奸悧蹇曞垝閸懇鍋撻敐搴′簴濞存粍绮撻弻鈥愁吋閸愩劌顫呮繝銏ｎ潐椤洭鍩€椤掑喚娼愰柟鍝ヮ焾铻炴俊銈呮噳閳ь剚妫冨畷姗€顢欓崲澹洦鐓曟繛鎴濆船閻忥絾銇勯弬鎸庢悙闁宠鍨块崺銉╁幢濡炲墽鍑圭紓鍌欑椤戝棝鎮ч悩璇叉槬闁告稑鐡ㄩ崑銊╂煕濞戞☉鍫ュ箯濞差亝鐓熼柣妯哄级閹兼劗鈧鍠栭悥鐓庣暦椤掍礁绶為悗锝冨妺缁ㄨ顪冮妶鍡楀闁糕晛瀚嵄闁归棿鐒﹂崑鍌炴煏閸繍妲归柣鎾寸〒閳ь剙绠嶉崕杈殽閹间胶宓侀柡宥庡幖閻愬﹪鎮楅棃娑欐喐缁炬崘妫勯湁闁挎繂鎳庨ˉ蹇涙煕鎼淬垹濮堥柕鍥у楠炲鎮欓崹顐㈡珰闁诲氦顫夊ú婊堝极鐠囧樊鍤曢柟缁㈠枛椤懘鏌ㄥ☉妯侯仼妤犵偛绉剁槐鎾诲磼濮橆兘鍋撻悜鑺モ挃鐎广儱顦崹鍌滄喐閻楀牆绗掗柛鎴犲█閺岋綁寮崹顔藉€梺缁樻尰濞叉牠鍩為幋锔藉亹闁圭粯甯╂禒濂告⒑閸涘鎴﹀箰閹惰棄钃熼柍銉ョ－閺嗗棝鎮楅敐搴″鐞氾箑鈹戦悩鎰佸晱闁哥姵甯″畷鎴﹀箻缂佹ǚ鎷虹紓鍌欑劍閳笺倝顢旈崼婵娦曢梺閫炲苯澧扮紒杈ㄥ浮椤㈡岸鍩€椤掆偓椤洩顦归柛鈺冨仱楠炲鏁傞挊澶夋睏婵＄偑鍊栧Λ渚€宕戦幇顓狀浄濡わ絽鍟埛鎴犵磽娴ｇ櫢渚涙繛鍫熋埞鎴︻敊閼恒儱鍞夐梺鎸庣箘閸嬬姷绮诲☉銏犵睄闁稿本绮庡Σ鍥ㄧ節濞堝灝鏋熼柨鏇楁櫊瀹曟粌鈽夐姀鈩冩珫濠电姴锕ら崯鐘诲绩娴犲鐓熼柟閭﹀墮缁狙勩亜閵壯冧槐闁哄本鐩俊鎼佸Ψ瑜忔闂備浇顕栭崰鏇㈠础閾忣偅鍙忛柍褜鍓熼弻锝咁潨閸℃ぞ绨奸梺鍝勫€甸崑鎾绘⒒閸屾瑨鍏岀紒顕呭灦瀹曟繈寮借閻斿棙淇婇鐐达紵闁绘帒锕弻娑㈠箛闂堟稒鐏嶉梺缁樻尰濞茬喖寮婚弴鐔风窞婵☆垵娅ｆ禒顖炴倵閸忓浜惧┑鐐村灟閸ㄦ椽鎮￠弴銏″€甸柨婵嗛娴滄繄鈧娲栭惌鍌炲蓟閳╁啯濯寸紒瀣濞堝鎮楃憴鍕閻㈩垱甯￠敐鐐测攽閸喎纾梺缁樺灦钃辨慨锝呮濮婂宕掑顑藉亾妞嬪孩顐芥慨姗嗗墻閻掔晫鎲搁弮鍥棨婵＄偑鍊栭幐鍫曞垂閸︻厼顥氶柛褎顨嗛悡娆撴煙椤栨稒绶茬悮姘舵⒑閸濆嫭濯奸柛鎾跺枛瀵鏁愭径濠冾棟闁荤姵浜介崝宥夘敊閸儲鈷戦悶娑掆偓鍏呭濠电偛顕慨鎾敄閸℃稒鍋傞柣鏂垮悑閻撴瑩姊洪銊х暠濠⒀屽枤缁辨帡鎮▎蹇擃仴濞存粍绮撻弻鏇熺珶椤栨艾鏆曟俊鍙夊姍濮婃椽宕崟顓犱紘闂佸摜濮甸幐楣冨礆閹烘垟鏋庨煫鍥э攻閻庡姊洪崨濠冨瘷闁告劏鏅涢埀顒夊灦濮婅櫣鎷犻崣澶婃敪濡炪値鍋勯ˇ顖滃弲濠殿喗銇涢崑鎾垛偓瑙勬礀缂嶅﹤鐣疯ぐ鎺濇晩闁绘劦鍓氶鏇㈡⒒娴ｈ櫣甯涙慨濠傤煼閸╂盯宕奸妷銉︾€悗骞垮劚濡稓绮绘ィ鍐╃厵閻庣數顭堟禒鈺侇熆鐟欏媶鎴︺€冮妷鈺傚€烽柟纰卞幗閻や礁鈹戦纭峰姛缂侇噮鍨堕獮蹇涘川鐎涙ê鈧粯淇婇婊冨妺闁伙綆鍓氭穱濠囨倷椤忓嫧鍋撻弽顬℃椽鏁冮崒姘亶闂佷紮绲芥径鍥磻閹剧粯鍋ㄩ梻鍫熺☉娴犳﹢姊虹€圭媭娼愰柛銊ョ秺閸┾偓妞ゆ帒锕﹂崚浼存煟韫囨柨鍝虹€殿喗褰冮…銊╁醇閻斿弶瀚奸梻浣告啞閹告槒銇愰崘鈺冾洸闁绘劗鍎ら悡鏇㈡煟濡绲绘い鎺嬪灮缁辨帡宕掑☉妯碱儎濡炪倧绠戠壕顓犳閹烘梻纾兼俊顖滎儠閳ь剚甯￠弻宥堫檨闁告挻鐩顐﹀箹娴ｆ祴鍋撻敃鍌氶唶闁靛繆鍓濆▓浼存⒑閸撴彃浜濇繛鍙夛耿閹繝鎮㈤悡搴ｎ唺闂佽鍎煎Λ鍕矆婢舵劖鐓欓悗娑欘焽缁犳﹢鏌￠崱顓犵暤闁哄瞼鍠栭獮宥夘敊绾拌鲸姣夐梻浣侯焾椤戝啴宕濋幋锕€钃熸繛鎴炃氬Σ鍫熸叏濡も偓閻楀棙鎱ㄥ☉銏♀拺闁告稑鈯曢懖鈺佸灊婵炲棗娴氬鏍煣韫囨挻璐＄痪鎯у悑娣囧﹪顢涘┑鍡楁優闂佸憡鐟ュΛ婵嗩潖閾忚鍏滈柛婊€绀佸▓婵堢磽娴ｄ粙鍝烘繛鍙夌墵閸┿垺鎯旈妸銉綂闂侀潧鐗嗛幊鎰版偂閹寸偟绡€闁靛骏绲剧涵楣冩煟濡も偓閹虫劙鎳炴潏銊х瘈婵﹩鍘搁幏娲⒒閸屾氨澧涘〒姘殔鍗遍柛顐ｆ礃閻撴洟骞栨潏鍓х？闁挎稑绉剁槐鎺楊敊閸撗冪缂備胶绮换鍌烇綖濠靛鏁囬柣妯诲絻缁犱即姊绘担绛嬪殭缂佺粯甯″畷鎴濃槈濞嗘劖鐝烽梺鑺ッˉ銏犆洪鍕啋濡炪倖姊婚弲顐﹀储闂堟侗娓婚柕鍫濇椤ュ棙銇勯銏╂Ц闁宠绉电换婵嬪礃閻愵剦鍟嶉梻浣虹帛閸旀洖顕ｉ懜闈涚窞闁告洦鍨遍悡娆戔偓鐟板婢ф宕甸崶鈹惧亾鐟欏嫭绀堥柛蹇旓耿閵嗕礁顫滈埀顒勫箖閵忋倕绀堥柟缁樺笚濞呮牠姊婚崒姘偓鎼佸磹閹间礁纾归柟闂寸绾剧懓顪冪€ｎ亝鎹ｉ柣顓炴闇夐柨婵嗘噺閹牊銇勯妷锔绢暡闁靛洤瀚伴獮妯兼崉閻╂帇鍨介弻娑㈠Ω閿斿墽鐣洪梺闈涙搐鐎氭澘顕ｆ禒瀣垫晝妞ゎ偒鍘鹃幑鏇犵磽閸屾瑨鍏屽┑顔藉▕瀹曪繝骞庨挊澶庢憰濠电偞鍨惰彜闁衡偓娴犲鐓曢柡鍥ュ妼娴滄粌鈹戦濂稿弰闁诡喗顨呴埢鎾诲垂椤旂晫浜柣搴㈩問閸犳盯宕洪弽顐ょ煔閺夊牄鍔庣弧鈧梺鎼炲劘閸斿矂鍩€椤掑嫭鏁遍柕鍥у缁犳盯骞橀幇浣锋闂備胶顭堥鍡涘箲閸パ屽殨闁圭虎鍠楅崑鎰版煕閹邦厼绲荤紒銊ｅ劦濮婄粯鎷呴崨濠呯婵犫拃鍕垫當妞ゎ厼鐏濊灒闁兼祴鏅欑粭澶愭⒑缂佹◤顏勎熸繝鍥ㄥ亜闁糕剝绋掗悡鐘绘煙闂傚鍔嶆繛鎳峰啠鏀芥い鏂垮悑瀹告繄绱?;
  window.setTimeout(() => {
    els.saveChartEffect.textContent = originalText;
  }, 1400);
}

function setLayoutUnlocked(unlocked) {
  state.layoutUnlocked = unlocked;
  state.labelDrag = null;
  state.drag = null;
  els.lockLayout?.classList.toggle("active", !unlocked);
  els.unlockLayout?.classList.toggle("active", unlocked);
  els.chart.classList.toggle("layout-unlocked", unlocked);
  els.chart.style.cursor = unlocked ? "move" : "";
  drawChart();
}

const THEME_PRESETS = {
  sci: {
    chartBgColor: "#ffffff",
    plotBgColor: "#ffffff",
    textColor: "#384b5c",
    axisColor: "#aab8c5",
    expColor: "#2463b3",
    ctrlColor: "#c84a42",
  },
  dark: {
    chartBgColor: "#111827",
    plotBgColor: "#0f172a",
    textColor: "#e5e7eb",
    axisColor: "#94a3b8",
    expColor: "#60a5fa",
    ctrlColor: "#fb7185",
  },
  warm: {
    chartBgColor: "#fff8e7",
    plotBgColor: "#fffdf4",
    textColor: "#3f3a2f",
    axisColor: "#b8a982",
    expColor: "#1d6f78",
    ctrlColor: "#b04a3f",
  },
  contrast: {
    chartBgColor: "#ffffff",
    plotBgColor: "#ffffff",
    textColor: "#000000",
    axisColor: "#000000",
    expColor: "#0050ff",
    ctrlColor: "#ff0000",
  },
};

function applyThemePreset(name) {
  const preset = THEME_PRESETS[name];
  if (!preset) return;
  setInputValue(els.chartBgColorInput, preset.chartBgColor);
  setInputValue(els.plotBgColorInput, preset.plotBgColor);
  setInputValue(els.textColorInput, preset.textColor);
  setInputValue(els.axisColorInput, preset.axisColor);
  setInputValue(els.expColorInput, preset.expColor);
  setInputValue(els.ctrlColorInput, preset.ctrlColor);
  setInputValue(els.expErrorColorInput, preset.expColor);
  setInputValue(els.ctrlErrorColorInput, preset.ctrlColor);
}

function applyBarThemePreset(name) {
  const preset = THEME_PRESETS[name];
  if (!preset) return;
  setInputValue(barEls.chartBgColorInput, preset.chartBgColor);
  setInputValue(barEls.plotBgColorInput, preset.plotBgColor);
  setInputValue(barEls.textColorInput, preset.textColor);
  setInputValue(barEls.axisColorInput, preset.axisColor);
  setInputValue(barEls.expColorInput, preset.expColor);
  setInputValue(barEls.ctrlColorInput, preset.ctrlColor);
  setInputValue(barEls.expErrorColorInput, preset.expColor);
  setInputValue(barEls.ctrlErrorColorInput, preset.ctrlColor);
}

function handleChartControlChange(event) {
  const isBarControl = Boolean(event?.target?.closest?.(".bar-control-panel"));
  if (isBarControl) {
    if (event?.target === barEls.themeInput) applyBarThemePreset(barEls.themeInput.value);
    if (event?.target === barEls.legendXInput || event?.target === barEls.legendYInput) {
      setInputValue(barEls.legendPositionInput, "custom");
    }
    if (event?.target === barEls.globalFontSizeInput) {
      const size = clampNumber(barEls.globalFontSizeInput.value, DEFAULT_BAR_STYLE.globalFontSize, 10, 20);
      setInputValue(barEls.titleSizeInput, Math.min(32, size + 3));
      setInputValue(barEls.axisSizeInput, Math.min(24, size + 1));
      setInputValue(barEls.tickSizeInput, size);
      setInputValue(barEls.legendSizeInput, size);
    }
    if ([barEls.xMinInput, barEls.xMaxInput, barEls.yMinInput, barEls.yMaxInput].includes(event?.target)) {
      state.barView = null;
      if (state.activeChart === "bar") state.view = null;
    }
    state.barStyle = readBarStyleControls();
  } else {
    if (event?.target === els.themeInput) applyThemePreset(els.themeInput.value);
    if (event?.target === els.legendXInput || event?.target === els.legendYInput) {
      setInputValue(els.legendPositionInput, "custom");
    }
    if (event?.target === els.globalFontSizeInput) {
      const size = clampNumber(els.globalFontSizeInput.value, DEFAULT_CHART_STYLE.globalFontSize, 10, 20);
      setInputValue(els.titleSizeInput, Math.min(32, size + 3));
      setInputValue(els.axisSizeInput, Math.min(24, size + 1));
      setInputValue(els.tickSizeInput, size);
      setInputValue(els.legendSizeInput, size);
    }
    if ([els.xMinInput, els.xMaxInput, els.yMinInput, els.yMaxInput].includes(event?.target)) {
      state.lineView = null;
      if (state.activeChart === "line") state.view = null;
    }
    state.chartStyle = readChartStyleControls();
  }
  updateCurrentDataTable();
  drawChart();
  saveState();
}

if (els.timeGrid) {
  els.timeGrid.addEventListener("input", (event) => {
    const input = event.target;
    const index = Number(input.dataset.index);
    const field = input.dataset.field;
    if (!Number.isInteger(index) || !field) return;
    state.times[index][field] = field === "day" ? Number(input.value) : input.value.trim() || DEFAULT_TIMES[index]?.label || "";
    updateAll();
  });
}

[els.expInput, els.ctrlInput].forEach((el) => {
  el.addEventListener("input", updateAll);
  el.addEventListener("change", updateAll);
});

document.querySelectorAll(".global-control-panel input, .global-control-panel select").forEach((el) => {
  el.addEventListener("input", handleChartControlChange);
  el.addEventListener("change", handleChartControlChange);
});

els.loadExample.addEventListener("click", () => {
  if (!loadMetricPreset(state.activeMetric, { forcePreset: true })) {
    els.expInput.value = EXAMPLE_EXP;
    els.ctrlInput.value = EXAMPLE_CTRL;
    persistActiveMetricInputs();
  }
  updateAll();
});

els.clearAll.addEventListener("click", () => {
  els.expInput.value = "";
  els.ctrlInput.value = "";
  persistActiveMetricInputs();
  state.times = structuredClone(DEFAULT_TIMES);
  renderTimeInputs();
  updateAll();
});

els.exportCsv.addEventListener("click", exportCsv);
els.exportPng.addEventListener("click", exportPng);
els.exportPng300?.addEventListener("click", exportPng300);
els.exportSvg?.addEventListener("click", exportSvg);
els.resetView?.addEventListener("click", resetView);
els.barResetView?.addEventListener("click", resetView);
els.barExportPng300?.addEventListener("click", exportPng300);
els.barExportSvg?.addEventListener("click", exportSvg);
els.saveChartEffect?.addEventListener("click", saveChartEffect);
els.lineChartTab?.addEventListener("click", () => setActiveChart("line"));
els.barChartTab?.addEventListener("click", () => setActiveChart("bar"));
els.lockLayout?.addEventListener("click", () => setLayoutUnlocked(false));
els.unlockLayout?.addEventListener("click", () => setLayoutUnlocked(true));
els.copyCurrentData?.addEventListener("click", async () => {
  const tsv = getCurrentDataTsv();
  let copied = false;
  try {
    await navigator.clipboard.writeText(tsv);
    copied = true;
  } catch {
    copied = copyTextFallback(tsv);
  }
  if (copied) {
    els.copyCurrentData.textContent = "已复制当前数据";
    window.setTimeout(() => {
      els.copyCurrentData.textContent = "复制当前数据表";
    }, 1400);
  } else {
    downloadBlob(new Blob(["\ufeff" + tsv], { type: "text/tab-separated-values;charset=utf-8" }), "hair_density_current_data.tsv");
  }
});
els.copyPValues.addEventListener("click", async () => {
  const tsv = getPValueTableTsv();
  let copied = false;
  try {
    await navigator.clipboard.writeText(tsv);
    copied = true;
  } catch {
    copied = copyTextFallback(tsv);
  }
  if (copied) {
    els.copyPValues.textContent = "已复制 P 值表";
    window.setTimeout(() => {
      els.copyPValues.textContent = "复制 P 值表";
    }, 1400);
  } else {
    downloadBlob(new Blob(["\ufeff" + tsv], { type: "text/tab-separated-values;charset=utf-8" }), "hair_density_p_values.tsv");
  }
});
els.chart.addEventListener("pointerdown", onCanvasPointerDown);
els.chart.addEventListener("pointermove", onCanvasPointerMove);
els.chart.addEventListener("pointerup", onCanvasPointerUp);
els.chart.addEventListener("pointercancel", onCanvasPointerUp);
els.chart.addEventListener("mouseleave", () => {
  state.drag = null;
  state.labelDrag = null;
  els.tooltip.hidden = true;
  drawChart();
});
window.addEventListener("resize", drawChart);

restoreState();
const pageParams = new URLSearchParams(window.location.search);
if (pageParams.get("metric") && METRIC_CONFIG[pageParams.get("metric")]) {
  state.activeMetric = pageParams.get("metric");
}
if (pageParams.get("chart") === "bar") {
  state.activeChart = "bar";
  ensureMetricState().activeChart = "bar";
}
setMetricStyleDefaults(state.activeMetric);
applyChartStyleControls();
applyBarStyleControls();
if (pageParams.has("example")) {
  if (!loadMetricPreset(state.activeMetric, { forcePreset: true })) {
    els.expInput.value = EXAMPLE_EXP;
    els.ctrlInput.value = EXAMPLE_CTRL;
    persistActiveMetricInputs();
  }
} else if (!els.expInput.value.trim() && !els.ctrlInput.value.trim()) {
  loadMetricPreset(state.activeMetric);
}
renderTimeInputs();
setMetricTitles();
renderMetricNav();
syncChartModeUi();
updateAll();
setLayoutUnlocked(false);

