import { getTechnicalSkillsStudioPayload } from "@/api/technical-skills";
import type { AppThunk } from "@/store";
import { TechnicalSkillsBuilderActions } from "@/store/builders/technicalSkillsBuilder";
import { CurrentTechnicalSkillsActions } from "@/store/current/currentTechnicalSkills";

type Status = Promise<200 | 400 | 500>;

/** Load all technical skills and chat history from the server. */
export const loadTechnicalSkillsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(TechnicalSkillsBuilderActions.setLoading());
    try {
      const result = await getTechnicalSkillsStudioPayload();
      if (!result.success || !result.data) {
        dispatch(
          TechnicalSkillsBuilderActions.setError(
            result.error ?? "Failed to load Technical Skills Studio",
          ),
        );
        return 500;
      }
      dispatch(CurrentTechnicalSkillsActions.syncDraftTechnicalSkills(result.data.skills));
      dispatch(CurrentTechnicalSkillsActions.commitSkillsFingerprint());
      dispatch(CurrentTechnicalSkillsActions.syncMessages(result.data.messages));
      dispatch(TechnicalSkillsBuilderActions.setLoaded());
      return 200;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load Technical Skills Studio";
      dispatch(TechnicalSkillsBuilderActions.setError(msg));
      return 500;
    }
  };
};
