import { toast } from "sonner";
import type { AppThunk } from "@/store";
import { IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID } from "@/utils/image-creation-studio";

type Status = Promise<200 | 400 | 500>;

/**
 * Triggers the browser print dialog for the studio preview iframe.
 * This is the most reliable way to "Download as PDF" while preserving fonts and spacing.
 * Must run synchronously on the click stack (no `async`) so the browser keeps user activation.
 */
export const printImageGraphicPreviewThunk = (): AppThunk<Status> => {
  return (_dispatch, _getState): Status => {
    if (typeof document === "undefined") {
      return Promise.resolve(500);
    }

    const iframe = document.getElementById(IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID) as HTMLIFrameElement | null;
    const contentWindow = iframe?.contentWindow;

    if (!contentWindow) {
      toast.error("Add TSX that compiles before printing");
      return Promise.resolve(400);
    }

    try {
      contentWindow.focus();
      contentWindow.print();
      return Promise.resolve(200);
    } catch {
      toast.error("Could not trigger print dialog");
      return Promise.resolve(500);
    }
  };
};
