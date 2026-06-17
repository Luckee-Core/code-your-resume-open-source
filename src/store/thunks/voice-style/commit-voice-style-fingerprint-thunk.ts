import type { AppThunk } from "@/store";
import { CurrentVoiceStyleActions } from "@/store/current/currentVoiceStyle";
import { getVoiceStyleFingerprint } from "@/utils/voice-style";

type Status = Promise<200>;

/** Commit draft body fingerprint after load or save. */
export const commitVoiceStyleFingerprintThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const { draftBody } = getState().currentVoiceStyle;
    const fingerprint = getVoiceStyleFingerprint(draftBody);
    dispatch(CurrentVoiceStyleActions.setCommittedFingerprint(fingerprint));
    return 200;
  };
};
