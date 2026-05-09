import { IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID } from "./build-tsx-react-preview-src-doc";

/** Tailwind utilities tied to the viewport / iframe height — safe to drop on the PNG clone only. */
const VIEWPORT_HEIGHT_TAILWIND_CLASSES = [
  "min-h-screen",
  "h-screen",
  "min-h-svh",
  "min-h-lvh",
  "min-h-dvh",
  "h-svh",
  "h-lvh",
  "h-dvh",
];

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
