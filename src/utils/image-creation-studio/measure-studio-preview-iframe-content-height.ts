import { IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID } from "./build-tsx-react-preview-src-doc";

/**
 * Reads layout height inside the studio preview iframe (`about:blank` / `srcDoc`, same-origin).
 * Used to size the iframe element so the embedded document is not trapped in a shorter viewport.
 */
export const measureStudioPreviewIframeContentHeightPx = (iframe: HTMLIFrameElement): number | null => {
  try {
    const doc = iframe.contentDocument;
    if (!doc?.documentElement) return null;
    const root = doc.getElementById(IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID);
    const raw = Math.max(
      doc.documentElement.scrollHeight,
      doc.body?.scrollHeight ?? 0,
      root?.scrollHeight ?? 0,
    );
    if (!Number.isFinite(raw) || raw <= 0) return null;
    return Math.ceil(raw);
  } catch {
    return null;
  }
};
