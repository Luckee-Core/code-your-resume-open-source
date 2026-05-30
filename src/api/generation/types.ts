/**
 * Shared request body for job-scoped Cursor generate endpoints.
 */
export type GenerateByJobIdInput = {
  jobId: string;
};

export type GenerateTsxResponse = {
  tsx: string;
};
