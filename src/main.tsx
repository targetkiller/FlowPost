import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { getFontEmbedCSS, toPng } from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import {
  X,
  Activity,
  FileText,
  Highlighter,
  ImageDown,
  Link,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Type,
} from "lucide-react";
import "./styles.css";

const storageKey = "flowpost:last-input";

type CaptureResult = {
  dataUrl: string;
  width: number;
  height: number;
};

const sampleText = `财报还能 beat，但市场已经不只买 GPU 增长了

汇丰继续看多英伟达，把目标价从 295 美元上调到 325 美元，但这份报告真正有意思的地方不是上调目标价，而是它明确承认：NVDA 下一轮重估，需要新叙事，不是单纯再来一次 beat and raise。

1/ 财报层面还是很强

HSBC 预计 NVDA 这次 1QFY27 收入 811 亿美元，高于公司指引和市场预期。

2QFY27 收入预计 911 亿美元，也高于市场共识的 856 亿美元。

FY28 EPS 被上调 27% 到 13.01 美元，比市场共识高 16%。

简单说：业绩没坏，甚至还在继续上修。

2/ 但市场的问题是：beat 已经不够性感了

过去几年，NVDA 每一轮大涨，靠的不是单纯业绩好，而是业绩上修 + 新叙事共振。

ChatGPT 带来 A100/H100 需求爆发。
Blackwell 带来新平台预期。
NVL rack 带来整柜架构想象。
Sovereign AI / neocloud 又把客户池子扩大了一轮。

但现在的问题是，自从 sovereign AI 和 neocloud 之后，市场暂时没有看到足够大的新故事。所以即使 NVDA 连续财报 beat、连续 GTC 讲产品，过去 6 个月依然跑输 SOX。

3/ HSBC 的核心判断：NVDA 不能只讲 GPU 了

CSP capex 还在涨，但这笔钱已经不是 NVDA 一个人吃。

现在 AI capex 要分给：

- Memory
- AI networking
- Server CPU
- ASIC / 自研芯片
- 光模块 / 光通信链条

这也是为什么最近市场会更喜欢 CPU、内存、网络这些扩散方向。

NVDA 如果要重新估值扩张，需要证明自己不是单一 GPU 公司，而是能继续扩大 TAM 的 full-stack AI infrastructure company。

4/ 新叙事可能来自三个方向

第一，客户从传统 hyperscaler 扩出去。
OpenAI、Anthropic、CoreWeave、Nebius、IREN、主权 AI，都属于这个方向。市场想看的是：NVDA 的需求是否还能从 Microsoft / Google / Amazon / Meta 这些传统云厂商之外继续扩张。

第二，Agentic AI 带来的 server CPU 机会。
报告特别提到 Vera CPU，意思是 NVDA 想从 GPU provider 变成 datacenter platform company。Agentic AI 不是只吃 GPU，也会拉动 CPU、内存、网络、存储，NVDA 必须参与这部分增量。

第三，光通信 / optics。
报告提到 NVDA 对 Lumentum、Coherent、Corning 这类 optics 产业链的合作，说明 NVDA 也在提前卡位 AI datacenter 从铜连接走向光连接的趋势。

5/ 1 万亿美元 GPU 收入，HSBC 觉得有点太乐观

黄仁勋在 GTC 提到 Blackwell + Rubin 2026–2027 年可能有 1 万亿美元收入可见度。

但 HSBC 认为这条路有两个约束：

- CoWoS 产能不够，哪怕 FY28 CoWoS 分配从 90 万片上调到 110 万片，要实现 1 万亿美元可能需要超过 150 万片
- 客户集中度太高，如果 1 万亿美元主要靠 hyperscaler，那意味着传统云厂商 2026–2027 年 capex 的 61% 都要流向 NVDA，这个假设太激进

所以报告不是不 bullish，而是说：bull case 有空间，但不能只靠 GPU 线性外推。

6/ 估值层面：目标价上调，但 PE 反而下调

HSBC 把目标价上调到 325 美元，主要靠 FY28 EPS 从 10.23 上调到 13.01。

但有意思的是，目标 PE 从 29x 下调到 25x。

这说明分析师也承认：盈利还在上修，但估值倍数不一定能继续扩张。因为市场现在更愿意给 Agentic AI CPU、server supply chain 这些扩散方向更高溢价，而 NVDA 作为 GPU 主线，必须拿出新故事。

7/ 我的理解

这份报告其实不是简单唱多 NVDA，而是在讲一个更重要的变化：

NVDA 的基本面还强，但市场已经从 AI GPU 稀缺性，切到 AI capex 再分配。

以前的叙事是：AI capex 上修 = GPU 上修 = NVDA 上修。
现在的叙事变成：AI capex 上修 = GPU + 内存 + 网络 + CPU + 光通信 + 电力共同分账。

所以 NVDA 不是没机会，而是下一段上涨需要证明自己还能继续定义 AI 基建，而不是只成为 AI capex 里的最大供应商之一。

NVDA 还能 beat，但要再创新高，市场要的不是更好的财报，而是下一个足够大的新叙事。`;

const sampleOptionsText = `期权每日简讯 26/06/17

1/ 容易轧空的票 Gamma Squeeze

GOOG：$369.75
PFE：$26.05
CSX：$46.89
KO：$80.27
XOM：$141.93
UBER：$73.32
ORCL：$186.92
HOOD：$96.58
RIVN：$15.90
MARA：$14.48
SMCI：$29.38
SNAP：$5.20
IREN：$58.69
ASTS：$83.23
BABA：$111.17

2/ 高溢价的票 Volatility Risk Premium

WDC：$687.50
TSM：$427.00
NBIS：$263.26
BTDR：$18.25
AMKR：$88.16
SNDK：$2,010.60
NFLX：$78.66
BB：$9.10
KEEL：$5.99
RXT：$6.25
BE：$281.10
MRNA：$55.42

结论：

短线动能看： GOOG、HOOD、ORCL、SMCI、RIVN、MARA。
波动率溢价： BTDR、KEEL、RXT、NFLX、AMKR、SNDK。

注意：期权异动由多种因素决定，不一定是交易决策，只是客观数据，同时波动率高不适合做买方，适合做卖方。`;

type ContentItem =
  | { type: "section"; text: string; number?: string }
  | { type: "paragraph"; text: string }
  | { type: "bullet"; text: string; marker?: string };

type TemplateMode = "research" | "options";

type OptionsBrief = {
  title: string;
  squeeze: Array<{ ticker: string; price: string }>;
  vrp: Array<{ ticker: string; price: string }>;
  momentum: string[];
  premium: string[];
  note: string;
};

type FormDraft = {
  content: string;
  title: string;
  subtitle: string;
  watermark: string;
  qrLink: string;
  footerText: string;
  footerSubtitle: string;
  templateMode: TemplateMode;
};

function normalizeInputText(text: string) {
  return text.replace(/\r\n/g, "\n").replace(/\n{2,}/g, "\n");
}

function readStoredDraft() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as Partial<FormDraft>;
    return {
      content: normalizeInputText(parsed.content || sampleText),
      title: parsed.title || "",
      subtitle: parsed.subtitle || "",
      watermark: parsed.watermark || "社会观察从业者",
      qrLink: parsed.qrLink || "https://t.zsxq.com/xvVXu",
      footerText: parsed.footerText || "社会观察从业者",
      footerSubtitle: parsed.footerSubtitle || "公众号&知识星球",
      templateMode: parsed.templateMode === "options" ? "options" : "research",
    } satisfies FormDraft;
  } catch {
    return null;
  }
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`)/g).filter(Boolean);

  return parts.map((part, index) => {
    if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    }

    return part;
  });
}

function cleanMarkdownText(text: string) {
  return text
    .trim()
    .replace(/^#{1,6}\s+/, "")
    .replace(/\s+#+$/, "")
    .replace(/^\*\*(.+)\*\*$/, "$1")
    .replace(/^__(.+)__$/, "$1");
}

function isMarkdownContent(text: string) {
  return /(^|\n)\s*#{1,6}\s+\S/.test(text) || /(^|\n)\s*(?:[-*+]|\d+[.)])\s+\S/.test(text);
}

const leadingInstitutionMarker = String.raw`[\s\[\(（【「『《<]*`;
const trailingInstitutionMarker = String.raw`[\s\])）】」』》>]*`;

function institutionPattern(source: string) {
  return new RegExp(`^${leadingInstitutionMarker}(?:${source})${trailingInstitutionMarker}`, "i");
}

const institutionPatterns = [
  { label: "Morgan Stanley", pattern: institutionPattern(String.raw`大摩|morgan\s*stanley\b|ms\b`) },
  { label: "GS", pattern: institutionPattern(String.raw`高盛|goldman\s+sachs\b|gs\b`) },
  {
    label: "JPM",
    pattern: institutionPattern(String.raw`摩根大通|j\.?\s*p\.?\s*morgan\b|jp\s*morgan\b|jpmorgan\b|jpm\b`),
  },
  { label: "BOFA", pattern: institutionPattern(String.raw`美银|bank\s+of\s+america\b|bofa\b|bofaml\b`) },
  { label: "UBS", pattern: institutionPattern(String.raw`瑞银|ubs\b`) },
  { label: "Deutsche Bank", pattern: institutionPattern(String.raw`德银|deutsche\s+bank\b|deutsche\b|db\b`) },
  { label: "Bernstein", pattern: institutionPattern(String.raw`伯恩斯坦|bernstein\b`) },
  { label: "Nomura", pattern: institutionPattern(String.raw`野村|nomura\b`) },
  { label: "Citi", pattern: institutionPattern(String.raw`花旗|citi\b|citigroup\b`) },
  { label: "HSBC", pattern: institutionPattern(String.raw`汇丰|hsbc\b`) },
  { label: "Jefferies", pattern: institutionPattern(String.raw`杰富瑞|jefferies\b`) },
  { label: "Barclays", pattern: institutionPattern(String.raw`巴克莱|barclays\b`) },
];

function getMarkdownTitle(text: string) {
  const titleLine = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .find((line) => /^#\s+\S/.test(line));

  return titleLine ? cleanMarkdownText(titleLine) : "";
}

function inferTitleFields(text: string) {
  const markdownTitle = getMarkdownTitle(text);
  if (!markdownTitle) {
    return { title: "", subtitle: "" };
  }

  for (const institution of institutionPatterns) {
    const match = markdownTitle.match(institution.pattern);
    if (!match) continue;

    const nextTitle = markdownTitle
      .slice(match[0].length)
      .replace(/^[\s:：\-–—|]+/, "")
      .trim();

    return {
      title: nextTitle || markdownTitle,
      subtitle: `${institution.label} 研报`,
    };
  }

  return { title: markdownTitle, subtitle: "" };
}

function parseMarkdownContent(text: string) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const items: ContentItem[] = [];
  const paragraphLines: string[] = [];
  let inferredTitle = "";

  function flushParagraph() {
    const paragraph = paragraphLines.join(" ").trim();
    if (paragraph) {
      items.push({ type: "paragraph", text: cleanMarkdownText(paragraph) });
    }
    paragraphLines.length = 0;
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      return;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const headingText = cleanMarkdownText(heading[2]);

      if (level === 1 && !inferredTitle) {
        inferredTitle = headingText;
        return;
      }

      items.push({ type: "section", text: headingText });
      return;
    }

    const unorderedItem = line.match(/^[-*+]\s+(.+)$/);
    if (unorderedItem) {
      flushParagraph();
      items.push({ type: "bullet", text: cleanMarkdownText(unorderedItem[1]) });
      return;
    }

    const orderedItem = line.match(/^(\d+)[.)]\s+(.+)$/);
    if (orderedItem) {
      flushParagraph();
      items.push({ type: "bullet", marker: `${orderedItem[1]}.`, text: cleanMarkdownText(orderedItem[2]) });
      return;
    }

    flushParagraph();
    paragraphLines.push(line.replace(/^>\s?/, ""));
    flushParagraph();
  });

  flushParagraph();

  if (!inferredTitle) {
    const firstParagraphIndex = items.findIndex((item) => item.type === "paragraph");
    if (firstParagraphIndex >= 0) {
      inferredTitle = items[firstParagraphIndex].text;
      items.splice(firstParagraphIndex, 1);
    }
  }

  return {
    inferredTitle: inferredTitle || "报告摘要",
    items: items.length ? items : [{ type: "paragraph", text: inferredTitle || "把报告总结粘贴到左侧，右侧会生成适合手机阅读的长图。" }] as ContentItem[],
  };
}

function parseContent(text: string) {
  const normalizedText = normalizeInputText(text).trim();

  if (isMarkdownContent(normalizedText)) {
    return parseMarkdownContent(normalizedText);
  }

  const blocks = normalizedText
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!blocks.length) {
    return {
      inferredTitle: "报告摘要",
      items: [{ type: "paragraph", text: "把报告总结粘贴到左侧，右侧会生成适合手机阅读的长图。" }] as ContentItem[],
    };
  }

  const [inferredTitle, ...body] = blocks;
  const items = body.map((block) => {
    const numberedHeading = block.match(/^(\d+)\s*[/、.]\s*(.+)$/);
    if (numberedHeading) {
      return { type: "section", number: numberedHeading[1], text: numberedHeading[2] } as ContentItem;
    }

    const cnHeading = block.match(/^([一二三四五六七八九十]+)\s*[、.]\s*(.+)$/);
    if (cnHeading) {
      return { type: "section", number: cnHeading[1], text: cnHeading[2] } as ContentItem;
    }

    const bullet = block.match(/^[-*•]\s*(.+)$/);
    if (bullet) {
      return { type: "bullet", text: bullet[1] } as ContentItem;
    }

    return { type: "paragraph", text: block } as ContentItem;
  });

  return {
    inferredTitle,
    items: items.length ? items : [{ type: "paragraph", text: inferredTitle }] as ContentItem[],
  };
}

function parseTickerLine(line: string) {
  const match = line.match(/^([A-Z][A-Z0-9.\-]{0,7})\s*[：:]\s*(\$?[\d,]+(?:\.\d+)?)/);
  if (!match) return null;

  return {
    ticker: match[1],
    price: match[2].startsWith("$") ? match[2] : `$${match[2]}`,
  };
}

function parseTickerList(text: string) {
  return text
    .split(/[、,，\s]+/)
    .map((item) => item.replace(/[。.;；]/g, "").trim())
    .filter(Boolean);
}

function stripOptionsTitleDate(text: string) {
  return text
    .replace(/\s+\d{2,4}[/-]\d{1,2}[/-]\d{1,2}\s*$/, "")
    .replace(/\s+\d{2,4}年\d{1,2}月\d{1,2}日\s*$/, "")
    .trim();
}

function parseOptionsBrief(text: string): OptionsBrief {
  const lines = normalizeInputText(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let section: "squeeze" | "vrp" | "conclusion" | null = null;
  const squeeze: OptionsBrief["squeeze"] = [];
  const vrp: OptionsBrief["vrp"] = [];
  let momentum: string[] = [];
  let premium: string[] = [];
  let note = "";

  for (const line of lines) {
    if (/Gamma\s*Squeeze|容易轧空/.test(line)) {
      section = "squeeze";
      continue;
    }

    if (/Volatility\s*Risk\s*Premium|高溢价/.test(line)) {
      section = "vrp";
      continue;
    }

    if (/^结论/.test(line)) {
      section = "conclusion";
      continue;
    }

    if (/^注意/.test(line)) {
      note = line;
      continue;
    }

    const ticker = parseTickerLine(line);
    if (ticker && section === "squeeze") {
      squeeze.push(ticker);
      continue;
    }

    if (ticker && section === "vrp") {
      vrp.push(ticker);
      continue;
    }

    const momentumMatch = line.match(/^短线动能看[：:]\s*(.+)$/);
    if (momentumMatch) {
      momentum = parseTickerList(momentumMatch[1]);
      continue;
    }

    const premiumMatch = line.match(/^波动率溢价[：:]\s*(.+)$/);
    if (premiumMatch) {
      premium = parseTickerList(premiumMatch[1]);
    }
  }

  return {
    title: stripOptionsTitleDate(lines.find((line) => /^期权每日简讯/.test(line)) || "期权每日简讯"),
    squeeze,
    vrp,
    momentum,
    premium,
    note:
      note ||
      "注意：期权异动由多种因素决定，不一定是交易决策，只是客观数据，同时波动率高不适合做买方，适合做卖方。",
  };
}

function OptionsTickerGrid({ items, tone = "squeeze" }: { items: Array<{ ticker: string; price: string }>; tone?: "squeeze" | "premium" }) {
  return (
    <div className={`options-ticker-grid options-ticker-grid--${tone}`}>
      {items.map((item) => (
        <div className="options-ticker" key={`${item.ticker}-${item.price}`}>
          <strong>{item.ticker}</strong>
          <span>{item.price}</span>
        </div>
      ))}
    </div>
  );
}

function OptionsFocusList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="options-focus-row">
      <span>{label}</span>
      <p>{items.length ? items.join("、") : "等待数据"}</p>
    </div>
  );
}

function App() {
  const storedDraft = useMemo(() => readStoredDraft(), []);
  const [templateMode, setTemplateMode] = useState<TemplateMode>(() => storedDraft?.templateMode || "research");
  const [content, setContent] = useState(() => storedDraft?.content || normalizeInputText(sampleText));
  const [title, setTitle] = useState(() => storedDraft?.title || "");
  const [isTitleEdited, setIsTitleEdited] = useState(() => Boolean(storedDraft?.title));
  const [subtitle, setSubtitle] = useState(() => storedDraft?.subtitle || "");
  const [watermark, setWatermark] = useState(() => storedDraft?.watermark || "社会观察从业者");
  const [qrLink, setQrLink] = useState(() => storedDraft?.qrLink || "https://t.zsxq.com/xvVXu");
  const [footerText, setFooterText] = useState(() => storedDraft?.footerText || "社会观察从业者");
  const [footerSubtitle, setFooterSubtitle] = useState(() => storedDraft?.footerSubtitle || "公众号&知识星球");
  const [isExporting, setIsExporting] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const [generatedImageWidth, setGeneratedImageWidth] = useState(0);
  const cardRef = useRef<HTMLElement>(null);

  const parsed = useMemo(() => parseContent(content), [content]);
  const optionsBrief = useMemo(() => parseOptionsBrief(content), [content]);
  const displayTitle = title.trim() || parsed.inferredTitle;
  const dateLabel = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  function saveDraft() {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        content: normalizeInputText(content),
        title,
        subtitle,
        watermark,
        qrLink,
        footerText,
        footerSubtitle,
        templateMode,
      } satisfies FormDraft),
    );
  }

  async function captureShareCard(): Promise<CaptureResult> {
    if (!cardRef.current) {
      throw new Error("Share card is not ready.");
    }

    const card = cardRef.current;
    const previousCardStyle = {
      width: card.style.width,
      height: card.style.height,
      minWidth: card.style.minWidth,
      maxWidth: card.style.maxWidth,
      flexBasis: card.style.flexBasis,
    };

    try {
      await document.fonts.ready;
      const { width, height } = card.getBoundingClientRect();
      const exportWidth = Math.ceil(width);
      const exportHeight = Math.ceil(height);
      card.style.width = `${exportWidth}px`;
      card.style.height = `${exportHeight}px`;
      card.style.minWidth = `${exportWidth}px`;
      card.style.maxWidth = `${exportWidth}px`;
      card.style.flexBasis = `${exportWidth}px`;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const fontEmbedCSS = await getFontEmbedCSS(card, { preferredFontFormat: "woff2" });

      const dataUrl = await toPng(card, {
        width: exportWidth,
        height: exportHeight,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
        fontEmbedCSS,
        preferredFontFormat: "woff2",
        style: {
          width: `${exportWidth}px`,
          height: `${exportHeight}px`,
        },
        filter: (node) => !((node as HTMLElement).dataset?.exportHidden === "true"),
      });

      return { dataUrl, width: exportWidth, height: exportHeight };
    } finally {
      card.style.width = previousCardStyle.width;
      card.style.height = previousCardStyle.height;
      card.style.minWidth = previousCardStyle.minWidth;
      card.style.maxWidth = previousCardStyle.maxWidth;
      card.style.flexBasis = previousCardStyle.flexBasis;
    }
  }

  async function generateImage() {
    setIsExporting(true);

    try {
      const result = await captureShareCard();

      setGeneratedImageWidth(result.width);
      setGeneratedImage(result.dataUrl);
      saveDraft();
    } finally {
      setIsExporting(false);
    }
  }

  useEffect(() => {
    const api = window as typeof window & {
      __flowPostCaptureShareCard?: () => Promise<CaptureResult>;
    };

    api.__flowPostCaptureShareCard = async () => {
      const result = await captureShareCard();

      setGeneratedImageWidth(result.width);
      setGeneratedImage(result.dataUrl);
      saveDraft();

      return result;
    };

    return () => {
      delete api.__flowPostCaptureShareCard;
    };
  });

  function resetSample() {
    setContent(normalizeInputText(templateMode === "options" ? sampleOptionsText : sampleText));
    setTitle("");
    setIsTitleEdited(false);
    setSubtitle(templateMode === "options" ? "Options Daily Brief" : "");
    setWatermark("社会观察从业者");
    setQrLink("https://t.zsxq.com/xvVXu");
    setFooterText("社会观察从业者");
    setFooterSubtitle("公众号&知识星球");
  }

  function switchTemplate(nextMode: TemplateMode) {
    setTemplateMode(nextMode);

    if (nextMode === "options") {
      setContent(normalizeInputText(sampleOptionsText));
      setTitle("");
      setIsTitleEdited(false);
      setSubtitle("Options Daily Brief");
      return;
    }

    setContent(normalizeInputText(sampleText));
    setTitle("");
    setIsTitleEdited(false);
    setSubtitle("");
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <aside className="control-panel">
          <div className="brand-row">
            <div>
              <p className="eyebrow">Long Post</p>
              <h1>长图分享生成器</h1>
            </div>
            <button className="icon-button" type="button" onClick={resetSample} aria-label="重置示例">
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="template-switch" aria-label="选择模板">
            <button
              className={templateMode === "research" ? "is-active" : ""}
              type="button"
              onClick={() => switchTemplate("research")}
            >
              <FileText size={16} />
              研报
            </button>
            <button
              className={templateMode === "options" ? "is-active" : ""}
              type="button"
              onClick={() => switchTemplate("options")}
            >
              <Activity size={16} />
              期权
            </button>
          </div>

          <label className="field content-field">
            <span>
              <Highlighter size={16} />
              正文内容
            </span>
            <textarea
              value={content}
              onChange={(event) => {
                const nextContent = normalizeInputText(event.target.value);
                const nextFields = inferTitleFields(nextContent);

                setContent(nextContent);
                if (nextFields.title) {
                  setTitle(nextFields.title);
                  setIsTitleEdited(false);
                  setSubtitle(nextFields.subtitle);
                }
              }}
              placeholder="粘贴报告总结、会议纪要、Markdown 或投研笔记"
            />
          </label>

          <label className="field">
            <span>
              <Type size={16} />
              标题
            </span>
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setIsTitleEdited(true);
              }}
              placeholder="留空时自动使用正文首段"
            />
          </label>

          <label className="field">
            <span>
              <Type size={16} />
              副标题
            </span>
            <input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} placeholder="显示在标题上方" />
          </label>

          <label className="field">
            <span>
              <ShieldCheck size={16} />
              水印
            </span>
            <input value={watermark} onChange={(event) => setWatermark(event.target.value)} placeholder="水印名称" />
          </label>

          <label className="field">
            <span>
              <Link size={16} />
              底部二维码
            </span>
            <input value={qrLink} onChange={(event) => setQrLink(event.target.value)} placeholder="https://..." />
          </label>

          <label className="field">
            <span>
              <Sparkles size={16} />
              底部文案
            </span>
            <input value={footerText} onChange={(event) => setFooterText(event.target.value)} placeholder="关注说明或署名" />
          </label>

          <label className="field">
            <span>
              <Sparkles size={16} />
              底部副标题
            </span>
            <input value={footerSubtitle} onChange={(event) => setFooterSubtitle(event.target.value)} placeholder="更小一行的补充说明" />
          </label>

          <button className="primary-action" type="button" onClick={generateImage} disabled={isExporting}>
            <ImageDown size={18} />
            {isExporting ? "生成中" : "生成图片"}
          </button>
        </aside>

        <section className="preview-stage">
          <div className="phone-frame">
            <article className={`share-card ${templateMode === "options" ? "theme-options options-card" : "theme-ink"}`} ref={cardRef}>
              <div className="watermark-layer" aria-hidden="true">
                {Array.from({ length: 40 }).map((_, index) => (
                  <span key={index}>{watermark}</span>
                ))}
              </div>

              {templateMode === "options" ? (
                <>
                  <header className="share-header options-header">
                    <div>
                      <p>{subtitle || "Options Daily Brief"}</p>
                      <h2>{title.trim() || optionsBrief.title}</h2>
                    </div>
                    <time className="card-date">{dateLabel}</time>
                  </header>

                  <div className="options-market-strip">
                    <div>
                      <span>Gamma Squeeze</span>
                      <strong>{optionsBrief.squeeze.length}</strong>
                    </div>
                    <div>
                      <span>Volatility Premium</span>
                      <strong>{optionsBrief.vrp.length}</strong>
                    </div>
                  </div>

                  <div className="options-summary-list">
                    <section className="options-section">
                      <div className="options-section-title">
                        <span>01</span>
                        <h3>容易轧空的票</h3>
                        <p>Gamma Squeeze</p>
                      </div>
                      <OptionsTickerGrid items={optionsBrief.squeeze} tone="squeeze" />
                    </section>

                    <section className="options-section">
                      <div className="options-section-title options-section-title--premium">
                        <span>02</span>
                        <h3>高溢价的票</h3>
                        <p>Volatility Risk Premium</p>
                      </div>
                      <OptionsTickerGrid items={optionsBrief.vrp} tone="premium" />
                    </section>

                    <section className="options-conclusion">
                      <h3>结论</h3>
                      <OptionsFocusList label="短线动能看" items={optionsBrief.momentum} />
                      <OptionsFocusList label="波动率溢价" items={optionsBrief.premium} />
                    </section>

                    <section className="options-risk-note">
                      <p>{optionsBrief.note}</p>
                      <span>Source: SpotGamma</span>
                    </section>
                  </div>
                </>
              ) : (
                <>
                  <header className="share-header">
                    <div>
                      <p>{subtitle || "华尔街研报"}</p>
                      <h2>{displayTitle}</h2>
                    </div>
                    <time className="card-date">{dateLabel}</time>
                  </header>

                  <div className="summary-list">
                    {parsed.items.map((item, index) => {
                      if (item.type === "section") {
                        return (
                          <section
                            className={`section-heading${item.number ? "" : " section-heading--plain"}`}
                            key={`${item.text}-${index}`}
                          >
                            {item.number && <span>{item.number}</span>}
                            <h3>{renderInline(item.text)}</h3>
                          </section>
                        );
                      }

                      if (item.type === "bullet") {
                        return (
                          <section className="text-block bullet-block" key={`${item.text}-${index}`}>
                            {item.marker ? <span className="bullet-marker">{item.marker}</span> : <span className="bullet-dot" />}
                            <p>{renderInline(item.text)}</p>
                          </section>
                        );
                      }

                      return (
                        <section className="text-block" key={`${item.text}-${index}`}>
                          <p>{renderInline(item.text)}</p>
                        </section>
                      );
                    })}
                  </div>
                </>
              )}

              <footer className="share-footer">
                <div className="footer-copy">
                  <strong>{footerText || "社会观察从业者"}</strong>
                  <span>{footerSubtitle || "公众号&知识星球"}</span>
                </div>
                <div className="qr-box">
                  <QRCodeSVG value={qrLink || "https://t.zsxq.com/xvVXu"} size={92} level="M" includeMargin />
                </div>
              </footer>
            </article>
          </div>

          {generatedImage && (
            <div
              className="generated-overlay theme-ink"
              data-export-hidden="true"
              onClick={() => {
                setGeneratedImage("");
                setGeneratedImageWidth(0);
              }}
            >
              <img
                src={generatedImage}
                alt="生成后的长图"
                style={generatedImageWidth ? { width: `${generatedImageWidth}px` } : undefined}
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          )}

          {generatedImage && (
            <div className="generated-toolbar" data-export-hidden="true">
              <span>右键复制或另存为图片</span>
              <button
                type="button"
                onClick={() => {
                  setGeneratedImage("");
                  setGeneratedImageWidth(0);
                }}
                aria-label="关闭生成图片"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </section>
      </section>

      <footer className="site-footer">
        <span>作者：社会观察从业者</span>
        <a href="https://socialwatcher.pro" target="_blank" rel="noreferrer">
          socialwatcher.pro
        </a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
