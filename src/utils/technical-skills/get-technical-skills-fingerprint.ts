import type { TechnicalSkillItem } from "@/model/technical-skills";

export const getTechnicalSkillsFingerprint = (items: TechnicalSkillItem[]): string => {
  const sorted = [...items].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.id.localeCompare(b.id);
  });
  return JSON.stringify(
    sorted.map((i) => ({
      id: i.id,
      sortOrder: i.sortOrder,
      title: i.title,
      body: i.body,
      status: i.status,
    })),
  );
};
