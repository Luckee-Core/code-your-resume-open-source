import type { TechnicalSkillItem } from "@/model/technical-skills";

/**
 * Creates a draft technical skill row from a job bullet text string.
 *
 * @param text - Bullet body text
 * @param maxSortOrder - Current max sortOrder among draft skills (-1 when empty)
 * @returns New draft skill item with generated id
 */
export const createDraftTechnicalSkillFromBullet = (
  text: string,
  maxSortOrder: number,
): TechnicalSkillItem => {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `skill-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  return {
    id,
    sortOrder: maxSortOrder + 1,
    title: text.length > 80 ? `${text.slice(0, 80)}…` : text,
    body: "",
    status: "active",
  };
};
