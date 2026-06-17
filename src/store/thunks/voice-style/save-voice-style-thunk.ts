import { patchVoiceStyle } from "@/api/voice-style";
import type { AppThunk } from "@/store";
import { VoiceStyleBuilderActions } from "@/store/builders/voiceStyleBuilder";
import { CurrentVoiceStyleActions } from "@/store/current/currentVoiceStyle";
import { commitVoiceStyleFingerprintThunk } from "./commit-voice-style-fingerprint-thunk";

type Status = Promise<200 | 500>;

/** Persist voice style body to Express / Supabase. */
export const saveVoiceStyleThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const body = getState().currentVoiceStyle.draftBody;
    dispatch(VoiceStyleBuilderActions.setSaving(true));
    try {
      const result = await patchVoiceStyle({ body });
      if (!result.success || !result.data) {
        return 500;
      }
      dispatch(CurrentVoiceStyleActions.syncDraftBody(result.data.body));
      dispatch(CurrentVoiceStyleActions.setUpdatedAt(result.data.updatedAt));
      await dispatch(commitVoiceStyleFingerprintThunk());
      return 200;
    } finally {
      dispatch(VoiceStyleBuilderActions.setSaving(false));
    }
  };
};
