import React, { useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { toPng } from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import {
  X,
  Highlighter,
  ImageDown,
  Link,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Type,
} from "lucide-react";
import "./styles.css";

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

type ContentItem =
  | { type: "section"; text: string; number?: string }
  | { type: "paragraph"; text: string }
  | { type: "bullet"; text: string };

function renderInline(text: string) {
  return text;
}

function parseContent(text: string) {
  const blocks = text
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

function App() {
  const [content, setContent] = useState(sampleText);
  const [title, setTitle] = useState("NVDA - Buy Earnings outlook and agentic AI narrative");
  const [subtitle, setSubtitle] = useState("HSBC 研报");
  const [watermark, setWatermark] = useState("社会观察从业者");
  const [qrLink, setQrLink] = useState("https://t.zsxq.com/xvVXu");
  const [footerText, setFooterText] = useState("社会观察从业者");
  const [footerSubtitle, setFooterSubtitle] = useState("公众号&知识星球");
  const [isExporting, setIsExporting] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const parsed = useMemo(() => parseContent(content), [content]);
  const displayTitle = title.trim() || parsed.inferredTitle;
  const dateLabel = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  async function generateImage() {
    if (!cardRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
        filter: (node) => !((node as HTMLElement).dataset?.exportHidden === "true"),
      });

      setGeneratedImage(dataUrl);
    } finally {
      setIsExporting(false);
    }
  }

  function resetSample() {
    setContent(sampleText);
    setTitle("NVDA - Buy Earnings outlook and agentic AI narrative");
    setSubtitle("HSBC 研报");
    setWatermark("社会观察从业者");
    setQrLink("https://t.zsxq.com/xvVXu");
    setFooterText("社会观察从业者");
    setFooterSubtitle("公众号&知识星球");
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

          <label className="field">
            <span>
              <Type size={16} />
              标题
            </span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="留空时自动使用正文首段" />
          </label>

          <label className="field">
            <span>
              <Type size={16} />
              副标题
            </span>
            <input value={subtitle} onChange={(event) => setSubtitle(event.target.value)} placeholder="显示在标题上方" />
          </label>

          <label className="field content-field">
            <span>
              <Highlighter size={16} />
              纯文本内容
            </span>
            <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="粘贴报告总结、会议纪要或投研笔记" />
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
            <article className="share-card theme-ink" ref={cardRef}>
              <div className="watermark-layer" aria-hidden="true">
                {Array.from({ length: 40 }).map((_, index) => (
                  <span key={index}>{watermark}</span>
                ))}
              </div>

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
                      <section className="section-heading" key={`${item.text}-${index}`}>
                        <span>{item.number}</span>
                        <h3>{renderInline(item.text)}</h3>
                      </section>
                    );
                  }

                  if (item.type === "bullet") {
                    return (
                      <section className="text-block bullet-block" key={`${item.text}-${index}`}>
                        <span className="bullet-dot" />
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
              onClick={() => setGeneratedImage("")}
            >
              <img src={generatedImage} alt="生成后的长图" onClick={(event) => event.stopPropagation()} />
            </div>
          )}

          {generatedImage && (
            <div className="generated-toolbar" data-export-hidden="true">
              <span>右键复制或另存为图片</span>
              <button type="button" onClick={() => setGeneratedImage("")} aria-label="关闭生成图片">
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
