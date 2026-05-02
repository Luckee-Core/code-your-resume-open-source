import { patchTechnicalSkills } from "@/api/technical-skills";
import type { AppThunk } from "@/store";
import { TechnicalSkillsBuilderActions } from "@/store/builders/technicalSkillsBuilder";
import { CurrentTechnicalSkillsActions } from "@/store/current/currentTechnicalSkills";

type Status = Promise<200 | 400 | 500>;

/** Persists draft technical skills (full replace) and refreshes from the API. */
export const saveTechnicalSkillsThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const items = getState().currentTechnicalSkills.draftTechnicalSkills;
    dispatch(TechnicalSkillsBuilderActions.setSaving(true));
    try {
      const payload = await patchTechnicalSkills({ technicalSkills: items });
      dispatch(CurrentTechnicalSkillsActions.syncDraftTechnicalSkills(payload.skills));
      dispatch(CurrentTechnicalSkillsActions.commitSkillsFingerprint());
      return 200;
    } catch {
      return 500;
    } finally {
      dispatch(TechnicalSkillsBuilderActions.setSaving(false));
    }
  };
};
