import type { ApiResult } from "@/api/types";
import type { JobQuestionAnswer } from "@/model/job-question-answer";
import { requestApi } from "@/api/_shared/request-api";

/**
 * GET /api/data/job-question-answers/list?jobId=
 */
export const listJobQuestionAnswersApi = async (
  jobId: string,
): Promise<ApiResult<JobQuestionAnswer[]>> => {
  return requestApi<JobQuestionAnswer[]>(
    `/api/data/job-question-answers/list?jobId=${encodeURIComponent(jobId)}`,
  );
};
