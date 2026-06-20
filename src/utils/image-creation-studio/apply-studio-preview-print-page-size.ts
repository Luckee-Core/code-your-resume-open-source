import { IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID } from "./build-tsx-react-preview-src-doc";
import {
  measureStudioPreviewRootTightHeightPx,
  STUDIO_PREVIEW_VIEWPORT_HEIGHT_CLASSES,
} from "./compute-studio-preview-content-height";
import { clampStudioPreviewDimension } from "./studio-iframe-src-doc";

/** `id` on the injected print stylesheet so repeat prints update the same node. */
export const STUDIO_PREVIEW_PRINT_PAGE_STYLE_ELEMENT_ID = "image-studio-preview-print-page-size";

const PRINT_MEASURE_EXPAND_HEIGHT_PX = 8192;
const STUDIO_PREVIEW_PRINT_PAGE_BLEED_PX = 12;
const CSS_PX_PER_INCH = 96;

const VIEWPORT_HEIGHT_RESET_SELECTORS = STUDIO_PREVIEW_VIEWPORT_HEIGHT_CLASSES.map(
  (cls) => `.${cls}`,
).join(", ");

export type StudioPreviewPrintPageSizeHints = {
  /** Fallback when live `#root` measure fails */
  canvasHeightPx?: number;
  measuredContentHeightPx?: number | null;
};

type IframeMeasureSnapshot = {
  attrHeight: string | null;
  styleHeight: string;
};

const buildViewportHeightResetCss = (): string => {
  return `
html, body {
  min-height: 0 !important;
  height: auto !important;
}
#${IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID} {
  min-height: min-content !important;
  height: auto !important;
}
${VIEWPORT_HEIGHT_RESET_SELECTORS} {
  min-height: 0 !important;
  height: auto !important;
}
`.trim();
};

const injectPreviewStyle = (doc: Document, styleId: string, css: string): (() => void) => {
  let styleEl = doc.getElementById(styleId) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = doc.createElement("style");
    styleEl.id = styleId;
    doc.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
  return () => {
    styleEl?.remove();
  };
};

const expandIframeViewportForMeasure = (iframe: HTMLIFrameElement): IframeMeasureSnapshot => {
  const snapshot: IframeMeasureSnapshot = {
    attrHeight: iframe.getAttribute("height"),
    styleHeight: iframe.style.height,
  };
  iframe.setAttribute("height", String(PRINT_MEASURE_EXPAND_HEIGHT_PX));
  iframe.style.height = `${PRINT_MEASURE_EXPAND_HEIGHT_PX}px`;
  return snapshot;
};

const restoreIframeViewportAfterMeasure = (
  iframe: HTMLIFrameElement,
  snapshot: IframeMeasureSnapshot,
): void => {
  if (snapshot.attrHeight != null) {
    iframe.setAttribute("height", snapshot.attrHeight);
  }
  iframe.style.height = snapshot.styleHeight;
};

const forcePreviewDocumentReflow = (doc: Document): void => {
  void doc.documentElement.offsetHeight;
  void doc.body?.offsetHeight;
  const root = doc.getElementById(IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID);
  if (root instanceof HTMLElement) {
    void root.offsetHeight;
    void root.scrollHeight;
  }
};

const formatPrintPageSize = (widthPx: number, heightPx: number): string => {
  const wIn = widthPx / CSS_PX_PER_INCH;
  const hIn = heightPx / CSS_PX_PER_INCH;
  return `${wIn.toFixed(5)}in ${hIn.toFixed(5)}in`;
};

const measurePrintPageHeightPx = (doc: Document): number => {
  const root = doc.getElementById(IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID);
  if (!(root instanceof HTMLElement)) {
    return 0;
  }
  const contentH = measureStudioPreviewRootTightHeightPx(root);
  return contentH > 0 ? contentH + STUDIO_PREVIEW_PRINT_PAGE_BLEED_PX : 0;
};

const resolvePrintPageHeightFallbackPx = (hints: StudioPreviewPrintPageSizeHints): number => {
  const fallback = hints.measuredContentHeightPx ?? hints.canvasHeightPx ?? 540;
  return fallback + STUDIO_PREVIEW_PRINT_PAGE_BLEED_PX;
};

/**
 * Sets `@page` size before `window.print()` from tight `#root` content height.
 */
export const applyStudioPreviewPrintPageSize = (
  iframe: HTMLIFrameElement,
  widthPx: number,
  hints: StudioPreviewPrintPageSizeHints = {},
): void => {
  const doc = iframe.contentDocument;
  if (!doc?.head) {
    return;
  }

  const removeMeasureNormalize = injectPreviewStyle(
    doc,
    "studio-preview-print-measure-normalize",
    buildViewportHeightResetCss(),
  );
  const snapshot = expandIframeViewportForMeasure(iframe);
  forcePreviewDocumentReflow(doc);
  const measuredH = measurePrintPageHeightPx(doc);
  restoreIframeViewportAfterMeasure(iframe, snapshot);
  removeMeasureNormalize();

  const pageW = clampStudioPreviewDimension(widthPx, 960);
  const rawPageH = measuredH > 0 ? measuredH : resolvePrintPageHeightFallbackPx(hints);
  const pageH = clampStudioPreviewDimension(rawPageH, rawPageH);
  const pageSize = formatPrintPageSize(pageW, pageH);

  injectPreviewStyle(
    doc,
    "studio-preview-print-layout-normalize",
    `
@media print {
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    min-height: 0 !important;
    height: auto !important;
    -webkit-font-smoothing: auto !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  #${IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID} {
    width: ${pageW}px !important;
    min-height: min-content !important;
    height: auto !important;
    overflow: visible !important;
  }
  ${VIEWPORT_HEIGHT_RESET_SELECTORS} {
    min-height: 0 !important;
    height: auto !important;
  }
}
`.trim(),
  );

  injectPreviewStyle(
    doc,
    STUDIO_PREVIEW_PRINT_PAGE_STYLE_ELEMENT_ID,
    `
@media print {
  @page {
    margin: 0;
    size: ${pageSize};
  }
}
`.trim(),
  );
};
