import { patchProfessionalBackground } from "@/api/professional-background";
import type { AppThunk } from "@/store";
import { ProfessionalBackgroundBuilderActions } from "@/store/builders/professionalBackgroundBuilder";
import { CurrentProfessionalBackgroundActions } from "@/store/current/currentProfessionalBackground";

type Status = Promise<200 | 500>;

/** Persist draft segments (full replace). */
export const saveProfessionalBackgroundThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const segments = getState().currentProfessionalBackground.draftSegments;
    dispatch(ProfessionalBackgroundBuilderActions.setSaving(true));
    try {
      const payload = await patchProfessionalBackground({ segments });
      dispatch(CurrentProfessionalBackgroundActions.syncDraftSegments(payload.segments));
      dispatch(CurrentProfessionalBackgroundActions.setUpdatedAt(payload.updatedAt));
      dispatch(CurrentProfessionalBackgroundActions.commitSegmentsFingerprint());
      return 200;
    } catch {
      return 500;
    } finally {
      dispatch(ProfessionalBackgroundBuilderActions.setSaving(false));
    }
  };
};
