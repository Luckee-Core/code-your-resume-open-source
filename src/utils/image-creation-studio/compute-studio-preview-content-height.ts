import { IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID } from "./build-tsx-react-preview-src-doc";

/** Tailwind utilities that inflate height to the iframe/viewport — ignore for content sizing. */
export const STUDIO_PREVIEW_VIEWPORT_HEIGHT_CLASSES = [
  "min-h-screen",
  "h-screen",
  "min-h-svh",
  "min-h-lvh",
  "min-h-dvh",
  "h-svh",
  "h-lvh",
  "h-dvh",
] as const;

/** Ignore iframe measurements below this — almost always a pre-render or wrong node. */
export const STUDIO_PREVIEW_MIN_CREDIBLE_HEIGHT_PX = 280;

/**
 * True when an element only exists to fill the viewport, not real resume content.
 */
const elementUsesViewportMinHeight = (el: HTMLElement): boolean => {
  for (const cls of STUDIO_PREVIEW_VIEWPORT_HEIGHT_CLASSES) {
    if (el.classList.contains(cls)) {
      return true;
    }
  }
  const style = el.style.minHeight;
  if (style && /vh|svh|lvh|dvh/i.test(style)) {
    return true;
  }
  return false;
};

/**
 * Tight content height inside `#root`: farthest bottom edge among real content nodes,
 * skipping viewport-height shells (`min-h-screen`, etc.).
 *
 * @param root - Preview mount node (`#root`)
 */
export const computeStudioPreviewContentHeightPx = (root: HTMLElement): number | null => {
  const rootRect = root.getBoundingClientRect();
  const rootPadBottom = Number.parseFloat(window.getComputedStyle(root).paddingBottom) || 0;

  let maxBottom = 0;

  const consider = (el: HTMLElement) => {
    if (elementUsesViewportMinHeight(el)) {
      return;
    }
    const rect = el.getBoundingClientRect();
    if (rect.height <= 0) {
      return;
    }
    maxBottom = Math.max(maxBottom, rect.bottom - rootRect.top);
  };

  consider(root);
  root.querySelectorAll<HTMLElement>("*").forEach(consider);

  if (maxBottom > 0) {
    return Math.ceil(maxBottom + rootPadBottom);
  }

  const scroll = root.scrollHeight;
  if (!Number.isFinite(scroll) || scroll <= 0) {
    return null;
  }
  return Math.ceil(scroll);
};

/**
 * Whether a measured preview height is trustworthy enough to drive canvas sizing.
 */
export const isStudioPreviewMeasuredHeightCredible = (
  measuredPx: number,
  storedCanvasHeightPx: number,
): boolean => {
  if (!Number.isFinite(measuredPx) || measuredPx < STUDIO_PREVIEW_MIN_CREDIBLE_HEIGHT_PX) {
    return false;
  }
  const stored = clampStudioPreviewDimension(storedCanvasHeightPx, 540);
  if (stored > 400 && measuredPx < stored * 0.35) {
    return false;
  }
  return true;
};

/**
 * Inline JS for the preview iframe boot script. Keep in sync with {@link computeStudioPreviewContentHeightPx}.
 */
export const STUDIO_PREVIEW_CONTENT_HEIGHT_BOOT_FN = `
function __measureStudioPreviewContentHeight(rootEl) {
  if (!rootEl) return 0;
  var rootRect = rootEl.getBoundingClientRect();
  var rootPadBottom = parseFloat(window.getComputedStyle(rootEl).paddingBottom) || 0;
  var viewportClasses = ['min-h-screen','h-screen','min-h-svh','min-h-lvh','min-h-dvh','h-svh','h-lvh','h-dvh'];
  function usesViewportMin(el) {
    if (!el || !el.classList) return false;
    for (var i = 0; i < viewportClasses.length; i++) {
      if (el.classList.contains(viewportClasses[i])) return true;
    }
    return false;
  }
  var maxBottom = 0;
  function consider(el) {
    if (!el || usesViewportMin(el)) return;
    var rect = el.getBoundingClientRect();
    if (rect.height <= 0) return;
    maxBottom = Math.max(maxBottom, rect.bottom - rootRect.top);
  }
  consider(rootEl);
  var nodes = rootEl.querySelectorAll('*');
  for (var i = 0; i < nodes.length; i++) consider(nodes[i]);
  if (maxBottom > 0) return Math.ceil(maxBottom + rootPadBottom);
  return Math.ceil(rootEl.scrollHeight || 0);
}
`.trim();

/**
 * Measure preview document content height from an iframe (same-origin `srcDoc`).
 */
export const measureStudioPreviewIframeContentHeightPx = (iframe: HTMLIFrameElement): number | null => {
  try {
    const doc = iframe.contentDocument;
    if (!doc?.documentElement) {
      return null;
    }
    const root = doc.getElementById(IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID);
    if (!(root instanceof HTMLElement)) {
      return null;
    }
    return computeStudioPreviewContentHeightPx(root);
  } catch {
    return null;
  }
};

/** Local clamp — avoid circular import from studio-iframe-src-doc in this module. */
const clampStudioPreviewDimension = (n: number, fallback: number): number => {
  if (!Number.isFinite(n)) return fallback;
  const r = Math.round(n);
  if (r < 64) return 64;
  if (r > 8192) return 8192;
  return r;
};
