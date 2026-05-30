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
      const result = await patchTechnicalSkills({ technicalSkills: items });
      if (!result.success || !result.data) {
        return 500;
      }
      dispatch(CurrentTechnicalSkillsActions.syncDraftTechnicalSkills(result.data.skills));
      dispatch(CurrentTechnicalSkillsActions.commitSkillsFingerprint());
      return 200;
    } catch {
      return 500;
    } finally {
      dispatch(TechnicalSkillsBuilderActions.setSaving(false));
    }
  };
};
