import {
  buildTsxReactPreviewSrcDoc,
  IMAGE_STUDIO_PREVIEW_HEIGHT_POST_MESSAGE_TYPE,
} from "./build-tsx-react-preview-src-doc";
import { compileImageStudioTsx } from "./compile-image-studio-tsx";
import {
  isStudioPreviewMeasuredHeightCredible,
  STUDIO_PREVIEW_MIN_CREDIBLE_HEIGHT_PX,
} from "./compute-studio-preview-content-height";

/** Stable `id` on the studio preview iframe so thunks can locate it without React refs. */
export const IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID = "image-studio-preview-iframe";

export { IMAGE_STUDIO_PREVIEW_HEIGHT_POST_MESSAGE_TYPE };
export { STUDIO_PREVIEW_MIN_CREDIBLE_HEIGHT_PX } from "./compute-studio-preview-content-height";

export const clampStudioPreviewDimension = (n: number, fallback: number): number => {
  if (!Number.isFinite(n)) return fallback;
  const r = Math.round(n);
  if (r < 64) return 64;
  if (r > 8192) return 8192;
  return r;
};

/**
 * On-screen preview iframe height: `max(stored canvas, measured content)`; stored canvas unchanged.
 *
 * @param canvasHeightPx - Persisted graphic height
 * @param measuredContentHeightPx - Live layout height from iframe (null until measured)
 */
export const resolveStudioPreviewHeightPx = (
  canvasHeightPx: number,
  measuredContentHeightPx: number | null,
): number => {
  const stored = clampStudioPreviewDimension(canvasHeightPx, 540);
  const displayFallback = Math.max(stored, STUDIO_PREVIEW_MIN_CREDIBLE_HEIGHT_PX);

  if (measuredContentHeightPx == null) {
    return displayFallback;
  }

  const measured = clampStudioPreviewDimension(measuredContentHeightPx, stored);
  if (!isStudioPreviewMeasuredHeightCredible(measured, stored)) {
    return displayFallback;
  }
  return Math.max(stored, measured);
};

type ComputeStudioIframeSrcDocParams = {
  tsxDraft: string;
  previewW: number;
  previewH: number;
};

/**
 * Builds the `srcDoc` string for the studio preview iframe (compiled TSX only; empty if TSX missing or compile fails).
 */
export const computeStudioIframeSrcDoc = (params: ComputeStudioIframeSrcDocParams): string => {
  const trimmed = params.tsxDraft.trim();
  if (!trimmed) {
    return "";
  }
  const result = compileImageStudioTsx(params.tsxDraft);
  if ("error" in result) {
    return "";
  }
  return buildTsxReactPreviewSrcDoc(result.code, { widthPx: params.previewW, heightPx: params.previewH });
};
