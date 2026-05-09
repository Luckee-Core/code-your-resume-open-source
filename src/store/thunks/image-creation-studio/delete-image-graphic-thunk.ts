import { deleteImageGraphicApi } from "@/api/image-creation-studio";
import { LOCAL_USER_ID } from "@/constants/local-user";
import type { AppThunk } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { CurrentImageGraphicActions } from "@/store/current/currentImageGraphic";
import { ImageGraphicsActions } from "@/store/dumps/imageGraphics";

type Status = Promise<200 | 400 | 500>;

/**
 * Deletes a graphic from `localStorage`, updates normalized store, and clears studio session if it was the active graphic.
 */
export const deleteImageGraphicThunk = (graphicId: string): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await deleteImageGraphicApi(LOCAL_USER_ID, graphicId);
    if (!result.success) {
      const err = result.error ?? "";
      if (err === "Graphic not found" || err === "Forbidden") {
        return 400;
      }
      return 500;
    }
    dispatch(ImageGraphicsActions.removeImageGraphics([graphicId]));
    if (getState().currentImageGraphic.id === graphicId) {
      dispatch(CurrentImageGraphicActions.resetCurrentImageGraphic());
      dispatch(StudioBuilderActions.resetStudioEditorState());
    }
    return 200;
  };
};
