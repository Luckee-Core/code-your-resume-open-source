import type { JobQuestionAnswer } from "@/model/job-question-answer";

/**
 * Returns the most recently updated answer for a question (any job), or empty string.
 */
export const getMostRecentAnswerForJobQuestion = (
  answers: Record<string, JobQuestionAnswer>,
  jobQuestionId: string,
): string => {
  const rows = Object.values(answers)
    .filter((a) => a.jobQuestionId === jobQuestionId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return rows[0]?.answer ?? "";
};
