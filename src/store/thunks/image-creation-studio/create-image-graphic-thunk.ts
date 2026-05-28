import { createImageGraphicApi } from "@/api/image-creation-studio";
import type { AppThunk } from "@/store";
import { loadImageGraphicsThunk } from "./load-image-graphics-thunk";

export type CreateImageGraphicInput = {
  title: string;
  canvasWidthPx: number;
  canvasHeightPx: number;
  jobId?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Creates a new graphic on the server, refreshes the list, returns the new id.
 */
export const createImageGraphicThunk = (input: CreateImageGraphicInput): AppThunk<Promise<string | null>> => {
  return async (dispatch) => {
    const title = input.title.trim() || "Untitled graphic";
    const result = await createImageGraphicApi({
      title,
      canvasWidthPx: input.canvasWidthPx,
      canvasHeightPx: input.canvasHeightPx,
      jobId: input.jobId,
      metadata: input.metadata,
    });
    if (!result.success || !result.data?.id) {
      return null;
    }
    await dispatch(loadImageGraphicsThunk());
    return result.data.id;
  };
};
