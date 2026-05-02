import type { TechnicalSkillsChatMessage } from "@/model/technical-skills";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const ROLLING_DAYS = 7;

/** Keep messages whose rawTime is within the last 7 days (rolling window). */
export const filterTechnicalSkillsMessagesRollingWindow = (
  messages: TechnicalSkillsChatMessage[],
  nowMs: number = Date.now(),
): TechnicalSkillsChatMessage[] => {
  const cutoff = nowMs - ROLLING_DAYS * MS_PER_DAY;
  return messages.filter((m) => {
    const t = new Date(m.rawTime).getTime();
    return !Number.isNaN(t) && t >= cutoff;
  });
};
