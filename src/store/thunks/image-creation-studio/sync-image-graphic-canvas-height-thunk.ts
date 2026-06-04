import type { AppThunk } from "@/store";
import { patchImageGraphicDetailsThunk } from "./patch-image-graphic-details-thunk";
import {
  clampStudioPreviewDimension,
  isStudioPreviewMeasuredHeightCredible,
} from "@/utils/image-creation-studio";

type Status = Promise<200 | 400 | 500>;

/**
 * Persists canvas height when live preview content exceeds (or differs from) stored dimensions.
 * No-op when height is unchanged or graphic is missing.
 *
 * @param heightPx - Measured preview content height in px
 */
export const syncImageGraphicCanvasHeightThunk = (heightPx: number): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const graphic = getState().currentImageGraphic;
    if (!graphic.id) {
      return 400;
    }

    const nextHeight = clampStudioPreviewDimension(heightPx, graphic.canvasHeightPx);
    if (!isStudioPreviewMeasuredHeightCredible(nextHeight, graphic.canvasHeightPx)) {
      return 200;
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
