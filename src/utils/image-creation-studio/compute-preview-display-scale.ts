/**
 * Width-only fit-to-container scale for studio preview.
 * Caps at 1:1 for small canvases; tall canvases scroll inside the preview root.
 *
 * @param previewW - Full canvas preview width in px
 * @param availableW - Measured container width in px (0 means unknown — use 1)
 * @returns Scale factor between 0 and 1
 */
export const computePreviewDisplayScale = (previewW: number, availableW: number): number => {
  if (availableW <= 0) return 1;
  return Math.min(1, availableW / Math.max(previewW, 1));
};
