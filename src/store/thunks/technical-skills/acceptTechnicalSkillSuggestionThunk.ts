import { postAcceptTechnicalSkillSuggestion } from "@/api/technical-skills";
import type { AppThunk } from "@/store";
import { TechnicalSkillsBuilderActions } from "@/store/builders/technicalSkillsBuilder";
import { CurrentTechnicalSkillsActions } from "@/store/current/currentTechnicalSkills";

type Status = Promise<200 | 400 | 500>;

export const acceptTechnicalSkillSuggestionThunk = (
  suggestionId: string,
): AppThunk<Status> => {
  return async (dispatch): Status => {
    dispatch(TechnicalSkillsBuilderActions.setPostingMessage(true));
    try {
      const payload = await postAcceptTechnicalSkillSuggestion(suggestionId);
      dispatch(CurrentTechnicalSkillsActions.syncDraftTechnicalSkills(payload.skills));
      dispatch(CurrentTechnicalSkillsActions.syncMessages(payload.messages));
      return 200;
    } catch {
      return 500;
    } finally {
      dispatch(TechnicalSkillsBuilderActions.setPostingMessage(false));
    }
  };
};
