/**
 * Applies a print/PDF default filename to the studio preview iframe and parent page.
 * Chrome uses the parent document title when saving iframe content as PDF.
 */
export const applyStudioPreviewPrintFilename = (
  iframe: HTMLIFrameElement,
  filename: string,
): void => {
  const parentTitle = document.title;
  document.title = filename;

  const contentDocument = iframe.contentDocument;
  if (contentDocument) {
    contentDocument.title = filename;
    let titleEl = contentDocument.querySelector("title");
    if (!titleEl) {
      titleEl = contentDocument.createElement("title");
      contentDocument.head?.appendChild(titleEl);
    }
    titleEl.textContent = filename;
  }

  const restoreParentTitle = () => {
    document.title = parentTitle;
  };

  window.addEventListener("afterprint", restoreParentTitle, { once: true });
  iframe.contentWindow?.addEventListener("afterprint", restoreParentTitle, { once: true });
};
