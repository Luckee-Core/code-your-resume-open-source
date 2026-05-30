import type { AppThunk } from "@/store";
import { CurrentTechnicalSkillsActions } from "@/store/current/currentTechnicalSkills";
import { createDraftTechnicalSkillFromBullet } from "@/utils/technical-skills";

/**
 * Adds a draft technical skill row derived from a job bullet text string.
 *
 * @param text - Bullet body text
 * @returns 200 when added, 400 when text is empty or save is blocked
 */
export const addDraftTechnicalSkillFromBulletThunk =
  (text: string): AppThunk<Promise<200 | 400>> =>
  (dispatch, getState) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return Promise.resolve(400);
    }
    const draftTechnicalSkills = getState().currentTechnicalSkills.draftTechnicalSkills;
    const maxOrder = Math.max(-1, ...draftTechnicalSkills.map((i) => i.sortOrder));
    const row = createDraftTechnicalSkillFromBullet(trimmed, maxOrder);
    dispatch(CurrentTechnicalSkillsActions.addDraftTechnicalSkill(row));
    return Promise.resolve(200);
  };
