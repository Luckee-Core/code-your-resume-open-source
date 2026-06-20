import { toast } from "sonner";
import type { AppThunk } from "@/store";
import {
  clampStudioPreviewDimension,
  IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
  isStudioPreviewMeasuredHeightCredible,
  measureStudioPreviewIframeContentHeightPx,
} from "@/utils/image-creation-studio";
import { patchImageGraphicDetailsThunk } from "./patch-image-graphic-details-thunk";

type Status = Promise<200 | 400 | 500>;

/**
 * Measures live preview content height and persists it as canvas height (**Fit height to content**).
 */
export const fitImageGraphicCanvasHeightToContentThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    if (typeof document === "undefined") {
      return 500;
    }

    const iframe = document.getElementById(
      IMAGE_STUDIO_PREVIEW_IFRAME_ELEMENT_ID,
    ) as HTMLIFrameElement | null;
    if (!iframe) {
      toast.error("Add TSX that compiles before fitting height");
      return 400;
    }

    const graphic = getState().currentImageGraphic;
    if (!graphic.id) {
      return 400;
    }

    const cachedHeightPx = getState().currentStudioEditor.previewMeasuredContentHeightPx;
    const heightPx =
      measureStudioPreviewIframeContentHeightPx(iframe) ?? cachedHeightPx ?? null;

    if (heightPx == null || heightPx <= 0) {
      toast.error("Could not measure preview content height");
      return 400;
    }

    const nextHeight = clampStudioPreviewDimension(heightPx, graphic.canvasHeightPx);
    if (!isStudioPreviewMeasuredHeightCredible(nextHeight, graphic.canvasHeightPx)) {
      toast.error("Measured height is not credible yet — wait for preview to finish loading");
      return 400;
    }
    if (nextHeight === graphic.canvasHeightPx) {
      return 200;
    }

    return dispatch(
      patchImageGraphicDetailsThunk({
        title: graphic.title,
        canvasWidthPx: graphic.canvasWidthPx,
        canvasHeightPx: nextHeight,
      }),
    );
  };
};
