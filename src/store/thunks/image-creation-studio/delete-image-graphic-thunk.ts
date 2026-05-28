import { deleteImageGraphicApi } from "@/api/image-creation-studio";
import type { AppThunk } from "@/store";
import { ImageGraphicsActions } from "@/store/dumps/imageGraphics";
import { loadImageGraphicsThunk } from "./load-image-graphics-thunk";

type Status = Promise<200 | 400 | 500>;

/**
 * Deletes one graphic from the server vault and refreshes Redux.
 */
export const deleteImageGraphicThunk = (graphicId: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await deleteImageGraphicApi(graphicId);
    if (!result.success) {
      return 500;
    }
    dispatch(ImageGraphicsActions.removeImageGraphics([graphicId]));
    await dispatch(loadImageGraphicsThunk());
    return 200;
  };
};
