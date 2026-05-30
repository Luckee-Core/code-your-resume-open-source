import { patchProfessionalBackground } from "@/api/professional-background";
import type { AppThunk } from "@/store";
import { ProfessionalBackgroundBuilderActions } from "@/store/builders/professionalBackgroundBuilder";
import { CurrentProfessionalBackgroundActions } from "@/store/current/currentProfessionalBackground";
import { commitProfessionalBackgroundSegmentsFingerprintThunk } from "./commit-professional-background-segments-fingerprint-thunk";

type Status = Promise<200 | 500>;

/** Persist draft segments (full replace). */
export const saveProfessionalBackgroundThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const segments = getState().currentProfessionalBackground.draftSegments;
    dispatch(ProfessionalBackgroundBuilderActions.setSaving(true));
    try {
      const result = await patchProfessionalBackground({ segments });
      if (!result.success || !result.data) {
        return 500;
      }
      dispatch(CurrentProfessionalBackgroundActions.syncDraftSegments(result.data.segments));
      dispatch(CurrentProfessionalBackgroundActions.setUpdatedAt(result.data.updatedAt));
      await dispatch(commitProfessionalBackgroundSegmentsFingerprintThunk());
      return 200;
    } catch {
      return 500;
    } finally {
      dispatch(ProfessionalBackgroundBuilderActions.setSaving(false));
    }
  };
};
