/**
 * Shared request body for job-scoped Cursor generate endpoints.
 */
export type GenerateByJobIdInput = {
  jobId: string;
};

/** @deprecated Generation now returns 202 accepted; graphic is persisted on Express. */
export type GenerateTsxResponse = {
  tsx: string;
};

/** 202 response when Express queues background Cursor generation. */
export type GenerateAcceptedResponse = {
  accepted: true;
  jobId: string;
};
