import type { JobStudioChatMessage } from "@/model/job-studio";

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const ROLLING_DAYS = 7;

/** Keep messages whose rawTime is within the last 7 days (rolling window). */
export const filterJobStudioMessagesRollingWindow = (
  messages: JobStudioChatMessage[],
  nowMs: number = Date.now(),
): JobStudioChatMessage[] => {
  const cutoff = nowMs - ROLLING_DAYS * MS_PER_DAY;
  return messages.filter((m) => {
    const t = new Date(m.rawTime).getTime();
    return !Number.isNaN(t) && t >= cutoff;
  });
};
