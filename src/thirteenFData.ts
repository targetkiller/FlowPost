export type ThirteenFTone = "berkshire" | "bridgewater" | "citadel" | "renaissance" | "pershing" | "scion" | "alphabet" | "nvidia" | "amd";

export type ThirteenFCardData = {
  id: string;
  code: string;
  name: string;
  chineseName: string;
  tone: ThirteenFTone;
  status: "已披露" | "无本季报告" | "个人估算";
  eyebrow?: string;
  valueLabel?: string;
  filedLabel?: string;
  period: string;
  filed: string;
  value: string;
  summary: string;
  increases: string[];
  reductions: string[];
  opened: string[];
  exited: string[];
  topHoldings: string[];
  note: string;
  extraLabel?: string;
  extraItems?: string[];
  holdingsTiers?: Array<{
    label: string;
    weight: string;
    items: Array<{ name: string; ticker: string }>;
  }>;
  sourceUrl?: string;
  sourceLabel?: string;
  comparisonUrl?: string;
};

export const thirteenFCards: ThirteenFCardData[] = [
  {
    id: "berkshire-hathaway",
    code: "BRK",
    name: "Berkshire Hathaway",
    chineseName: "伯克希尔·哈撒韦",
    tone: "berkshire",
    status: "已披露",
    period: "2026 Q2",
    filed: "2026.08.14",
    value: "$299.25B",
    summary: "重仓加码 Alphabet，同时继续削减银行、钢铁与消费持仓。",
    increases: ["GOOGL", "GOOG", "DAL", "LEN", "M", "NYT", "LEN.B"],
    reductions: ["BAC", "COF", "KR", "NUE", "DVA", "ALLY"],
    opened: ["DHI"],
    exited: ["STZ"],
    topHoldings: ["AAPL", "AXP", "KO", "GOOGL", "BAC"],
    note: "GOOGL 增持约 45%，GOOG 增持约 658%；DHI 仅 3,564 股，属于极小仓位。",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1067983/000119312526352200/0001193125-26-352200-index.html",
    comparisonUrl: "https://www.sec.gov/Archives/edgar/data/1067983/000119312526226661/0001193125-26-226661-index.html",
  },
  {
    id: "bridgewater-associates",
    code: "BW",
    name: "Bridgewater Associates",
    chineseName: "桥水基金",
    tone: "bridgewater",
    status: "已披露",
    period: "2026 Q2",
    filed: "2026.08.14",
    value: "$24.38B",
    summary: "增配大盘 ETF 与公用事业，显著降低半导体和 AI 链暴露。",
    increases: ["SPY", "IVV", "VOO", "PCG", "SHEL", "PBR"],
    reductions: ["MU", "AMZN", "MRVL", "TSM", "AMD", "GEV"],
    opened: ["ES", "APP", "ED", "NI", "NOW", "DUK"],
    exited: ["CSCO", "ASX", "CRWV", "PRIM", "BN", "AAOI"],
    topHoldings: ["SPY", "IVV", "NVDA", "AVGO", "AMZN"],
    note: "组合正在从高波动科技股向指数和防御型公用事业再平衡。",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1350694/000135069426000003/0001350694-26-000003-index.html",
    comparisonUrl: "https://www.sec.gov/Archives/edgar/data/1350694/000135069426000002/0001350694-26-000002-index.html",
  },
  {
    id: "citadel-advisors",
    code: "CITADEL",
    name: "Citadel Advisors",
    chineseName: "城堡投资",
    tone: "citadel",
    status: "已披露",
    period: "2026 Q2",
    filed: "2026.08.14",
    value: "$875.10B*",
    summary: "普通股增配 IVV、医药和科技；期权账本仍以指数与半导体对冲为主。",
    increases: ["IVV", "LLY", "KLAC", "ABBV", "AMZN", "STX"],
    reductions: ["MU", "TSM", "DIA", "NVDA", "SNDK", "MAR"],
    opened: ["SPCX", "CBRS", "MAIR", "QNT", "Alphabet Dep.", "HONA"],
    exited: ["WDC CB", "IEF", "LYV CB", "CTRA", "CWAN", "TERN"],
    topHoldings: ["IVV", "AMZN", "NVDA", "AAPL", "MSFT"],
    note: "*含大量期权标的名义价值，不能视为净资产或净多头。",
    extraLabel: "最大申报头寸（含期权）",
    extraItems: ["SPY Call", "QQQ Put", "QQQ Call", "SPY Put", "MU Put"],
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1423053/000110465926097200/0001104659-26-097200-index.html",
    comparisonUrl: "https://www.sec.gov/Archives/edgar/data/1423053/000110465926062477/0001104659-26-062477-index.html",
  },
  {
    id: "renaissance-technologies",
    code: "RENTEC",
    name: "Renaissance Technologies",
    chineseName: "文艺复兴科技",
    tone: "renaissance",
    status: "已披露",
    period: "2026 Q2",
    filed: "2026.08.13",
    value: "$72.62B",
    summary: "从存储链撤退，转向大市值 AI、互联网与高弹性成长股。",
    increases: ["META", "NVDA", "GOOGL", "GOOG", "NFLX", "TSLA"],
    reductions: ["MU", "SNDK", "AAPL", "WDC", "UNH", "LIN"],
    opened: ["CRWD", "AMZN", "MDT", "COP", "SHEL", "INTU"],
    exited: ["APP", "SMH", "XLF", "UBER", "NOW", "UPS"],
    topHoldings: ["NVDA", "META", "INTC", "UTHR", "PLTR"],
    note: "MU 减仓约 90%，SNDK 减仓约 99%；META、NVDA 与 Alphabet 成为主要增持方向。",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1037389/000103738926000059/0001037389-26-000059-index.html",
    comparisonUrl: "https://www.sec.gov/Archives/edgar/data/1037389/000103738926000033/0001037389-26-000033-index.html",
  },
  {
    id: "pershing-square",
    code: "PS",
    name: "Pershing Square",
    chineseName: "潘兴广场 · Bill Ackman",
    tone: "pershing",
    status: "已披露",
    period: "2026 Q2",
    filed: "2026.08.14",
    value: "$19.47B",
    summary: "退出 Alphabet，建立支付、金融数据与流媒体的新组合。",
    increases: ["HHH", "META", "MSFT", "QSR", "UBER"],
    reductions: ["AMZN", "BN", "HTZ"],
    opened: ["MA", "NFLX", "PSUS", "SPGI", "V"],
    exited: ["GOOGL", "GOOG"],
    topHoldings: ["UBER", "BN", "MSFT", "AMZN", "HHH"],
    note: "本季改由上市母公司 Pershing Square Inc. 汇总披露；已校正申报主体迁移造成的假性新建仓。",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/2026053/000117266126003790/0001172661-26-003790-index.html",
    comparisonUrl: "https://www.sec.gov/Archives/edgar/data/1336528/000117266126002336/0001172661-26-002336-index.html",
  },
  {
    id: "michael-burry-personal",
    code: "BURRY",
    name: "Michael Burry",
    chineseName: "个人持仓估计 · 非 Scion Asset Management",
    tone: "scion",
    status: "个人估算",
    eyebrow: "PERSONAL PORTFOLIO · NOT SEC 13F",
    period: "截至 2026.08.13",
    filed: "2026.08.13",
    filedLabel: "AS OF",
    valueLabel: "外界估算总资产",
    value: "$200–350M",
    summary: "这是 Michael Burry 个人投资组合的外界估计，不代表 Scion，也不是 SEC 13F 披露。",
    increases: [],
    reductions: [],
    opened: [],
    exited: [],
    topHoldings: [],
    note: "仓位比例与总资产规模均为外界粗略估算，没有官方准确数据；请勿将本卡视作 Scion 或 SEC 申报记录。",
    extraLabel: "披露性质",
    extraItems: ["Michael Burry Personal", "Unofficial Estimate", "Not Scion", "Not SEC 13F"],
    holdingsTiers: [
      {
        label: "第一梯队",
        weight: "约 8% 左右",
        items: [
          { name: "Adobe", ticker: "ADBE" },
          { name: "MercadoLibre", ticker: "MELI" },
          { name: "Zoetis", ticker: "ZTS" },
          { name: "JD.com", ticker: "JD" },
        ],
      },
      {
        label: "第二梯队",
        weight: "约 7%",
        items: [
          { name: "Lululemon", ticker: "LULU" },
          { name: "PayPal", ticker: "PYPL" },
          { name: "Veeva", ticker: "VEEV" },
          { name: "Flutter", ticker: "FLUT" },
          { name: "Molina Healthcare", ticker: "MOH" },
          { name: "HCA Healthcare", ticker: "HCA" },
        ],
      },
      {
        label: "第三梯队",
        weight: "约 5%",
        items: [
          { name: "Fannie Mae", ticker: "FNMA" },
          { name: "Freddie Mac", ticker: "FMCC" },
          { name: "Sprouts", ticker: "SFM" },
        ],
      },
    ],
    sourceLabel: "基于用户提供资料整理 · 非官方披露",
  },
  {
    id: "alphabet",
    code: "GOOGL",
    name: "Alphabet",
    chineseName: "Google 战略投资组合",
    tone: "alphabet",
    status: "已披露",
    period: "2026 Q2",
    filed: "2026.08.07",
    value: "$99.08B",
    summary: "SpaceX 上市后首次进入 13F，并占据申报组合约 95%。",
    increases: [],
    reductions: ["LIFE", "GLUE", "RLAY", "RVMD"],
    opened: ["SPCX", "PBLS", "FRVO"],
    exited: ["TNYA"],
    topHoldings: ["SPCX", "PL", "ASTS", "CME", "ARM"],
    note: "SPCX 首次申报 5.512 亿股、价值约 941.8 亿美元；更可能是原有私募持股上市后首次纳入披露。",
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1652044/000165204426000073/0001652044-26-000073-index.html",
    comparisonUrl: "https://www.sec.gov/Archives/edgar/data/1652044/000165204426000051/0001652044-26-000051-index.html",
  },
  {
    id: "nvidia",
    code: "NVDA",
    name: "NVIDIA",
    chineseName: "英伟达战略投资组合",
    tone: "nvidia",
    status: "已披露",
    period: "2026 Q2",
    filed: "2026.08.14",
    value: "$63.44B",
    summary: "新增披露 SpaceX；其余七项持仓的股份数量全部与上季一致。",
    increases: [],
    reductions: [],
    opened: ["SPCX"],
    exited: [],
    topHoldings: ["INTC", "SPCX", "CRWV", "COHR", "NOK"],
    note: "INTC 仍为第一大持仓，约 2.148 亿股；SPCX 首次申报约 1.228 亿股。",
    extraLabel: "其余持仓",
    extraItems: ["SNPS", "NBIS", "Generate Biomedicines"],
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000065/0001045810-26-000065-index.html",
    comparisonUrl: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000042/0001045810-26-000042-index.html",
  },
  {
    id: "amd",
    code: "AMD",
    name: "Advanced Micro Devices",
    chineseName: "AMD 战略投资组合",
    tone: "amd",
    status: "已披露",
    period: "2026 Q2",
    filed: "2026.08.14",
    value: "$1.31B",
    summary: "新增 SpaceX、Nutanix 与 Cerebras，集中指向 AI 基础设施和替代算力。",
    increases: [],
    reductions: [],
    opened: ["SPCX", "NTNX", "CBRS"],
    exited: ["MRVL"],
    topHoldings: ["SPCX", "SANM", "NTNX", "CBRS", "ABSI"],
    note: "SANM、ABSI、XNDU 股数与上季相同；MRVL 的 65,516 股已全部退出。",
    extraLabel: "量子计算持仓",
    extraItems: ["XNDU · 200,000 shares"],
    sourceUrl: "https://www.sec.gov/Archives/edgar/data/2488/000119312526352454/0001193125-26-352454-index.html",
    comparisonUrl: "https://www.sec.gov/Archives/edgar/data/2488/000119312526219769/0001193125-26-219769-index.html",
  },
];
