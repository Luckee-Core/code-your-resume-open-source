import type { JobStudioPayload } from "@/model/job-studio";

type JobStudioApiResponse = {
  success: boolean;
  messages?: JobStudioPayload["messages"];
  error?: string;
};

const normalizePayload = (raw: JobStudioApiResponse): JobStudioPayload => ({
  messages: raw.messages ?? [],
});

/**
 * Load Job Studio chat history for one CRM job.
 */
export async function getJobStudioPayload(jobId: string): Promise<JobStudioPayload> {
  const qs = new URLSearchParams({ jobId });
  const res = await fetch(`/api/job-studio?${qs.toString()}`);
  const json = (await res.json()) as JobStudioApiResponse;
  if (!json.success) {
    throw new Error(json.error ?? "Failed to load Job Studio chat");
  }
  return normalizePayload(json);
}

/**
 * Send a user message to the Job Studio coach and return the updated transcript.
 */
export async function postJobStudioMessage(params: {
  jobId: string;
  userId: string;
  content: string;
}): Promise<JobStudioPayload> {
  const res = await fetch("/api/job-studio/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jobId: params.jobId,
      userId: params.userId,
      content: params.content,
    }),
  });
  const json = (await res.json()) as JobStudioApiResponse;
  if (!json.success) {
    throw new Error(json.error ?? "Failed to send message");
  }
  return normalizePayload(json);
}
