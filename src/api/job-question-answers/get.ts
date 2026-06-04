import type { ApiResult } from "@/api/types";
import type { JobQuestionAnswer } from "@/model/job-question-answer";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job-question-answers/get?id=
 */
export const getJobQuestionAnswerApi = async (
  id: string,
): Promise<ApiResult<JobQuestionAnswer>> => {
  return requestApi<JobQuestionAnswer>(
    `/api/data/job-question-answers/get?id=${encodeURIComponent(id)}`,
  );
};
