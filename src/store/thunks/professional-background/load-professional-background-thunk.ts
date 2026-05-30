import { getProfessionalBackgroundPayload } from "@/api/professional-background";
import type { AppThunk } from "@/store";
import { ProfessionalBackgroundBuilderActions } from "@/store/builders/professionalBackgroundBuilder";
import { CurrentProfessionalBackgroundActions } from "@/store/current/currentProfessionalBackground";
import { commitProfessionalBackgroundSegmentsFingerprintThunk } from "./commit-professional-background-segments-fingerprint-thunk";

type Status = Promise<200 | 500>;

/** Load professional background segments from Express / Supabase. */
export const loadProfessionalBackgroundThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(ProfessionalBackgroundBuilderActions.setLoading());
    try {
      const payload = await getProfessionalBackgroundPayload();
      dispatch(CurrentProfessionalBackgroundActions.syncDraftSegments(payload.segments));
      dispatch(CurrentProfessionalBackgroundActions.setUpdatedAt(payload.updatedAt));
      await dispatch(commitProfessionalBackgroundSegmentsFingerprintThunk());
      dispatch(ProfessionalBackgroundBuilderActions.setLoaded());
      return 200;
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Failed to load Professional Background";
      dispatch(ProfessionalBackgroundBuilderActions.setError(msg));
      return 500;
    }
  };
};
