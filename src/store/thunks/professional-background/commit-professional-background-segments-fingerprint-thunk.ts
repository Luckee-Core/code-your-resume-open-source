import type { AppThunk } from "@/store";
import { CurrentProfessionalBackgroundActions } from "@/store/current/currentProfessionalBackground";
import { getProfessionalBackgroundFingerprint } from "@/utils/professional-background/get-professional-background-fingerprint";

/**
 * Computes and stores the committed fingerprint for current draft segments.
 */
export const commitProfessionalBackgroundSegmentsFingerprintThunk =
  (): AppThunk<Promise<200>> =>
  (dispatch, getState) => {
    const { draftSegments } = getState().currentProfessionalBackground;
    const fingerprint = getProfessionalBackgroundFingerprint(draftSegments);
    dispatch(CurrentProfessionalBackgroundActions.setCommittedFingerprint(fingerprint));
    return Promise.resolve(200);
  };
