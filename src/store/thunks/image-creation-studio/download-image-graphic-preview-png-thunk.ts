import html2canvas from "html2canvas";
import { toast } from "sonner";
import type { AppThunk } from "@/store";
import { CurrentStudioEditorActions } from "@/store/current/currentStudioEditor";
import {
  IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
  IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID,
  normalizeStudioPreviewCloneForPngCapture,
} from "@/utils/image-creation-studio";

type Status = Promise<200 | 400 | 500>;

export type DownloadImageGraphicPreviewPngInput = {
  /** Full-res export (default) vs lighter thumbnail (`scale: 1`, `-thumbnail.png`). */
  variant?: "preview" | "thumbnail";
};

/**
 * Captures the studio preview iframe as PNG using `html2canvas`, basename from `currentImageGraphic`.
 * Targets `#root` inside the iframe (not `body`) and enables `foreignObjectRendering` so labels match
 * the live preview; normalizes font-smoothing on the cloned document because the canvas path differs
 * from `-webkit-font-smoothing: antialiased` on the iframe body.
 */
export const downloadImageGraphicPreviewPngThunk = (
  input?: DownloadImageGraphicPreviewPngInput,
): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const variant = input?.variant ?? "preview";
    const scale = variant === "thumbnail" ? 1 : 2;
    const filenameSuffix = variant === "thumbnail" ? "thumbnail" : "preview";
    const state = getState();
    const graphicId = state.currentImageGraphic.id;
    if (!graphicId) {
      toast.error("Missing graphic");
      return 400;
    }

    if (typeof document === "undefined") {
      return 500;
    }

    const iframe = document.getElementById(IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID) as HTMLIFrameElement | null;
    const doc = iframe?.contentDocument;
    const body = doc?.body;
    if (!doc || !body) {
      toast.error("Add TSX that compiles before downloading");
      return 400;
    }

    const root = doc.getElementById(IMAGE_STUDIO_PREVIEW_ROOT_ELEMENT_ID);
    const target = (root ?? body) as HTMLElement;

    const graphic = state.currentImageGraphic;
    const downloadBasename = graphic.title || graphic.id || "layout";

    dispatch(CurrentStudioEditorActions.setIsDownloadingPreviewPng(true));
    try {
      const canvas = await html2canvas(target, {
        backgroundColor: "#ffffff",
        foreignObjectRendering: true,
        scale,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          normalizeStudioPreviewCloneForPngCapture(clonedDoc);
          const clonedBody = clonedDoc.body;
          clonedBody.classList.remove("antialiased");
          clonedBody.style.setProperty("-webkit-font-smoothing", "auto");
          clonedBody.style.setProperty("moz-osx-font-smoothing", "auto");
        },
      });
      const safe = downloadBasename.replace(/[^a-zA-Z0-9-_]+/g, "-").slice(0, 60) || "layout";
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safe}-${filenameSuffix}.png`;
      a.click();
      toast.success(variant === "thumbnail" ? "Thumbnail downloaded" : "PNG downloaded");
      return 200;
    } catch {
      toast.error("Could not capture preview as image");
      return 500;
    } finally {
      dispatch(CurrentStudioEditorActions.setIsDownloadingPreviewPng(false));
    }
  };
};
