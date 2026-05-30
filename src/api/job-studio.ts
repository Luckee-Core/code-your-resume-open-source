import type { ApiResult } from "@/api/types";
import { requestApi } from "@/api/_shared/request-api";
import type { JobStudioPayload } from "@/model/job-studio";

type RawJobStudioResponse = ApiResult<JobStudioPayload> & {
  messages?: JobStudioPayload["messages"];
};

const normalizeJobStudioResult = (result: RawJobStudioResponse): ApiResult<JobStudioPayload> => {
  if (!result.success) {
    return result;
  }

  return {
    success: true,
    data: {
      messages: result.messages ?? result.data?.messages ?? [],
    },
    httpStatus: result.httpStatus,
  };
};

/**
 * Load Job Studio chat history for one CRM job.
 */
export const getJobStudioPayload = async (jobId: string): Promise<ApiResult<JobStudioPayload>> => {
  const qs = new URLSearchParams({ jobId });
  const result = await requestApi<JobStudioPayload>(`/api/job-studio?${qs.toString()}`);
  return normalizeJobStudioResult(result as RawJobStudioResponse);
};

/**
 * Send a user message to the Job Studio coach and return the updated transcript.
 */
export const postJobStudioMessage = async (params: {
  jobId: string;
  userId: string;
  content: string;
}): Promise<ApiResult<JobStudioPayload>> => {
  const result = await requestApi<JobStudioPayload>("/api/job-studio/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jobId: params.jobId,
      userId: params.userId,
      content: params.content,
    }),
  });
  return normalizeJobStudioResult(result as RawJobStudioResponse);
};
