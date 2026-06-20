import { patchImageGraphicStudioDraft } from "@/api/image-creation-studio";
import type { AppThunk } from "@/store";
import { CurrentStudioEditorActions } from "@/store/current/currentStudioEditor";
import { CurrentImageGraphicActions } from "@/store/current/currentImageGraphic";
import { ImageGraphicsActions } from "@/store/dumps/imageGraphics";
type Status = Promise<200 | 400 | 500>;

/**
 * Persists TSX from `currentStudioEditor` into `metadata.studioDraft` on the server and syncs Redux.
 */
export const saveImageGraphicStudioDraftThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const state = getState();
    const graphicId = state.currentImageGraphic.id;
    if (!graphicId) {
      return 400;
    }

    const tsx = state.currentStudioEditor.tsxDraft;

    dispatch(CurrentStudioEditorActions.setIsSavingDraft(true));
    try {
      const result = await patchImageGraphicStudioDraft(graphicId, tsx);
      if (!result.success || !result.data) {
        return 500;
      }

      const current = getState().currentImageGraphic;
      if (current.id !== graphicId) {
        return 500;
      }

      const nextGraphic = {
        ...current,
        metadata: result.data.metadata,
        updatedAt: result.data.updatedAt,
      };
      dispatch(CurrentImageGraphicActions.setCurrentImageGraphic(nextGraphic));
      dispatch(ImageGraphicsActions.upsertImageGraphics([nextGraphic]));
      dispatch(CurrentStudioEditorActions.syncTsxBaselineAfterSave());

      return 200;
    } finally {
      dispatch(CurrentStudioEditorActions.setIsSavingDraft(false));
    }
  };
};
