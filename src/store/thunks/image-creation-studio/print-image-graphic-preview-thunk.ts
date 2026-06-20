import { toast } from "sonner";
import type { AppThunk } from "@/store";
import {
  applyStudioPreviewPrintFilename,
  applyStudioPreviewPrintPageSize,
  IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
} from "@/utils/image-creation-studio";
import { resolveImageGraphicPrintFilename } from "@/utils/image-graphics";

type Status = Promise<200 | 400 | 500>;

/**
 * Triggers the browser print dialog for the studio preview iframe.
 * Sets `@page` from tight `#root` measure; titles parent + iframe for Save as PDF filename.
 * Must run synchronously on the click stack (no `async`) so the browser keeps user activation.
 */
export const printImageGraphicPreviewThunk = (): AppThunk<Status> => {
  return (_dispatch, getState): Status => {
    if (typeof document === "undefined") {
      return Promise.resolve(500);
    }

    const iframe = document.getElementById(IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID) as HTMLIFrameElement | null;
    const contentWindow = iframe?.contentWindow;

    if (!iframe || !contentWindow) {
      toast.error("Add TSX that compiles before printing");
      return Promise.resolve(400);
    }

    try {
      const graphic = getState().currentImageGraphic;
      const printFilename = resolveImageGraphicPrintFilename(graphic);
      applyStudioPreviewPrintPageSize(iframe, graphic.canvasWidthPx, {
        canvasHeightPx: graphic.canvasHeightPx,
        measuredContentHeightPx: getState().currentStudioEditor.previewMeasuredContentHeightPx,
      });
      applyStudioPreviewPrintFilename(iframe, printFilename);
      contentWindow.focus();
      contentWindow.print();
      return Promise.resolve(200);
    } catch {
      toast.error("Could not trigger print dialog");
      return Promise.resolve(500);
    }
  };
};
