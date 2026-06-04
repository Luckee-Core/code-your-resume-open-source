import { IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID } from "./build-tsx-react-preview-src-doc";

import { STUDIO_PREVIEW_VIEWPORT_HEIGHT_CLASSES } from "./compute-studio-preview-content-height";

/** @deprecated Use STUDIO_PREVIEW_VIEWPORT_HEIGHT_CLASSES */
const VIEWPORT_HEIGHT_TAILWIND_CLASSES = [...STUDIO_PREVIEW_VIEWPORT_HEIGHT_CLASSES];

/**
 * The live preview iframe is sized tall so users can scroll the studio; TSX often uses `min-h-screen` / `h-screen`,
 * which resolve to **that iframe height** (100vh). `html2canvas` then rasterizes a huge empty band. This runs on the
 * **cloned** document only: strip those utilities and allow `#root` to shrink to content for export.
 */
export const normalizeStudioPreviewCloneForPngCapture = (clonedDoc: Document): void => {
  clonedDoc.documentElement.style.minHeight = "0";

  const body = clonedDoc.body;
  body.classList.remove("min-h-screen");
  body.style.minHeight = "0";

  const root = clonedDoc.getElementById(IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID);
  if (!(root instanceof HTMLElement)) {
    return;
  }

  root.style.minHeight = "min-content";
  root.style.height = "auto";

  const stripList = (el: HTMLElement) => {
    VIEWPORT_HEIGHT_TAILWIND_CLASSES.forEach((c) => el.classList.remove(c));
  };

  stripList(root);
  root.querySelectorAll<HTMLElement>("*").forEach((node) => stripList(node));
};
