/** CRM employment row: links company + job with tenure (resume work history). */
export type Employment = {
  id: string;
  companyId: string;
  jobId: string;
  /** ISO date (YYYY-MM-DD). */
  startDate: string;
  /** ISO date; empty string means current role. */
  endDate: string;
  createdAt: string;
  updatedAt: string;
};
