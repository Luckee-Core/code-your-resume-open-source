import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";

/**
 * DELETE /api/data/job-question-answers/delete?id=
 */
export const deleteJobQuestionAnswerApi = async (
  id: string,
): Promise<ApiResult<{ id: string }>> => {
  return requestApi<{ id: string }>(
    `/api/data/job-question-answers/delete?id=${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    },
  );
};
