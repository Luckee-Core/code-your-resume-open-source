import { listImageGraphicsApi } from "@/api/image-creation-studio";
import type { AppThunk } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { ImageGraphicsActions } from "@/store/dumps/imageGraphics";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads image graphics via Express `/api/data/image-graphic/list` (Supabase on server).
 */
export const loadImageGraphicsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(StudioBuilderActions.setListLoadStatus("loading"));
    dispatch(StudioBuilderActions.setListError(null));
    const result = await listImageGraphicsApi();
    if (!result.success || !result.data) {
      dispatch(StudioBuilderActions.setListLoadStatus("error"));
      dispatch(StudioBuilderActions.setListError(result.error ?? "Failed to load"));
      return 500;
    }
    dispatch(ImageGraphicsActions.upsertImageGraphics(result.data.graphics));
    dispatch(StudioBuilderActions.setListLoadStatus("idle"));
    return 200;
  };
};
