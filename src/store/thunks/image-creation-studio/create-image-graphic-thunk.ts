import { createImageGraphicApi } from "@/api/image-creation-studio";
import type { AppThunk } from "@/store";
import { CurrentImageGraphicActions } from "@/store/current/currentImageGraphic";
import { loadImageGraphicsThunk } from "./load-image-graphics-thunk";

export type CreateImageGraphicInput = {
  title: string;
  canvasWidthPx: number;
  canvasHeightPx: number;
  jobId?: string;
  metadata?: Record<string, unknown>;
};

type Status = Promise<200 | 400 | 500>;

/**
 * Creates a new graphic on the server, refreshes the list, and sets `currentImageGraphic`.
 */
export const createImageGraphicThunk = (input: CreateImageGraphicInput): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const title = input.title.trim() || "Untitled graphic";
    const result = await createImageGraphicApi({
      title,
      canvasWidthPx: input.canvasWidthPx,
      canvasHeightPx: input.canvasHeightPx,
      jobId: input.jobId,
      metadata: input.metadata,
    });
    if (!result.success || !result.data?.id) {
      return 500;
    }

    await dispatch(loadImageGraphicsThunk());
    const graphic = getState().imageGraphics[result.data.id];
    if (graphic) {
      dispatch(CurrentImageGraphicActions.setCurrentImageGraphic(graphic));
    }

    return 200;
  };
};
