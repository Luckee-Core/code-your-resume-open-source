import { generateCoverLetter } from "@/api/cover-letter";
import { coerceErrorFields, reportThunkError } from "@/api/thunk-errors";
import type { AppThunk } from "@/store";
import { loadImageGraphicsThunk } from "@/store/thunks/image-creation-studio/load-image-graphics-thunk";

export type GenerateCoverLetterThunkInput = {
  jobId: string;
};

/**
 * Queues cover letter generation on Express. Graphic persistence runs server-side.
 *
 * @returns 200 when queued, 400 if input invalid, 500 on API failure
 */
export const generateCoverLetterThunk =
  (input: GenerateCoverLetterThunkInput): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const jobId = input.jobId.trim();
    if (!jobId) {
      return 400;
    }

    try {
      const result = await generateCoverLetter({ jobId });
      if (result.httpStatus === 400) {
        return 400;
      }
      if (!result.success || result.httpStatus !== 202) {
        return 500;
      }

      void dispatch(loadImageGraphicsThunk());
      return 200;
    } catch (error) {
      const { message, stack } = coerceErrorFields(error);
      reportThunkError({
        event: "failedToGenerateCoverLetter",
        message,
        stack,
        thunkName: "generateCoverLetterThunk",
        collection: "job",
        entityId: jobId,
        severity: "error",
      });
      console.error("generateCoverLetterThunk error:", error);
      return 500;
    }
  };
