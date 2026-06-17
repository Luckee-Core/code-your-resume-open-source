import { getVoiceStylePayload } from "@/api/voice-style";
import type { AppThunk } from "@/store";
import { VoiceStyleBuilderActions } from "@/store/builders/voiceStyleBuilder";
import { CurrentVoiceStyleActions } from "@/store/current/currentVoiceStyle";
import { commitVoiceStyleFingerprintThunk } from "./commit-voice-style-fingerprint-thunk";

type Status = Promise<200 | 500>;

/** Load voice style body from Express / Supabase. */
export const loadVoiceStyleThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(VoiceStyleBuilderActions.setLoading());
    try {
      const result = await getVoiceStylePayload();
      if (!result.success || !result.data) {
        dispatch(
          VoiceStyleBuilderActions.setError(result.error ?? "Failed to load voice style"),
        );
        return 500;
      }
      dispatch(CurrentVoiceStyleActions.syncDraftBody(result.data.body));
      dispatch(CurrentVoiceStyleActions.setUpdatedAt(result.data.updatedAt));
      await dispatch(commitVoiceStyleFingerprintThunk());
      dispatch(VoiceStyleBuilderActions.setLoaded());
      return 200;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load voice style";
      dispatch(VoiceStyleBuilderActions.setError(msg));
      return 500;
    }
  };
};
