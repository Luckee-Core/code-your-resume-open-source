/**
 * Request body for POST /api/data/cover-letter/generate.
 */
export type GenerateCoverLetterInput = {
  jobId: string;
  /** Optional angle the candidate wants emphasized (e.g. business/ops focus). */
  pointOfEmphasis?: string;
};
