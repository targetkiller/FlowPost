function setBadge(tabId, text, color) {
  chrome.action.setBadgeText({ tabId, text });
  chrome.action.setBadgeBackgroundColor({ tabId, color });
}

async function showPageMessage(tabId, message, tone = "error") {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: (text, messageTone) => {
      const existing = document.getElementById("__share_card_capture_toast");

      if (existing) {
        existing.remove();
      }

      const toast = document.createElement("div");
      toast.id = "__share_card_capture_toast";
      toast.textContent = text;
      toast.style.cssText = [
        "position:fixed",
        "right:16px",
        "top:16px",
        "z-index:2147483647",
        "max-width:360px",
        "padding:12px 14px",
        "border-radius:8px",
        "box-shadow:0 12px 30px rgba(0,0,0,.18)",
        "font:14px/1.45 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif",
        "color:#fff",
        `background:${messageTone === "success" ? "#166534" : "#991b1b"}`
      ].join(";");

      document.documentElement.append(toast);
      setTimeout(() => toast.remove(), messageTone === "success" ? 1800 : 6000);
    },
    args: [message, tone]
  });
}

async function captureFromFlowPost(tabId) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `share-card-${timestamp}.png`;
  const [result] = await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    func: async (downloadFilename) => {
      if (typeof window.__flowPostCaptureShareCard !== "function") {
        throw new Error("FlowPost capture API is not available. Refresh the FlowPost page and try again.");
      }

      const capture = await window.__flowPostCaptureShareCard();

      if (!capture?.dataUrl) {
        throw new Error("FlowPost generated no image data.");
      }

      const link = document.createElement("a");
      link.href = capture.dataUrl;
      link.download = downloadFilename;
      link.style.display = "none";

      document.documentElement.append(link);
      link.click();
      link.remove();

      return {
        ok: true,
        width: capture.width,
        height: capture.height,
        bytes: capture.dataUrl.length
      };
    },
    args: [filename]
  });

  if (!result?.result?.ok) {
    throw new Error("FlowPost did not confirm the download.");
  }

  return result.result;
}

async function captureActiveTab(tab) {
  if (!tab.id) {
    throw new Error("No active tab found.");
  }

  const tabId = tab.id;

  setBadge(tabId, "...", "#264e82");

  try {
    await captureFromFlowPost(tabId);

    setBadge(tabId, "OK", "#166534");
    await showPageMessage(tabId, "Share card PNG saved to Downloads.", "success");
  } catch (error) {
    const message = error?.message || String(error);

    setBadge(tabId, "ERR", "#991b1b");
    await showPageMessage(tabId, `Share card capture failed: ${message}`);
    throw error;
  } finally {
    setTimeout(() => chrome.action.setBadgeText({ tabId, text: "" }), 2500);
  }
}

chrome.action.onClicked.addListener((tab) => {
  captureActiveTab(tab).catch((error) => {
    console.error(error);
  });
});
