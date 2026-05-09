import { patchImageGraphicDetailsApi, type PatchImageGraphicDetailsBody } from "@/api/image-creation-studio";
import { LOCAL_USER_ID } from "@/constants/local-user";
import type { AppThunk } from "@/store";
import { CurrentImageGraphicActions } from "@/store/current/currentImageGraphic";
import { ImageGraphicsActions } from "@/store/dumps/imageGraphics";

type Status = Promise<200 | 400 | 500>;

/**
 * Persists title/canvas changes for the current studio graphic and syncs dump + `currentImageGraphic`.
 */
export const patchImageGraphicDetailsThunk = (body: PatchImageGraphicDetailsBody): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const graphicId = getState().currentImageGraphic.id;
    if (!graphicId) {
      return 400;
    }
    const result = await patchImageGraphicDetailsApi(LOCAL_USER_ID, graphicId, body);
    if (!result.success || !result.data) {
      return result.error === "Graphic not found" ? 400 : 500;
    }
    dispatch(ImageGraphicsActions.upsertImageGraphics([result.data]));
    dispatch(CurrentImageGraphicActions.setCurrentImageGraphic(result.data));
    return 200;
  };
};
