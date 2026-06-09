import { generateCompanyInterest } from "@/api/company-interest";
import { coerceErrorFields, reportThunkError } from "@/api/thunk-errors";
import type { AppThunk } from "@/store";
import { loadImageGraphicsThunk } from "@/store/thunks/image-creation-studio/load-image-graphics-thunk";

export type GenerateCompanyInterestThunkInput = {
  jobId: string;
};

/**
 * Queues company-interest generation on Express. Graphic persistence runs server-side.
 *
 * @returns 200 when queued, 400 if input invalid, 500 on API failure
 */
export const generateCompanyInterestThunk =
  (input: GenerateCompanyInterestThunkInput): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const jobId = input.jobId.trim();
    if (!jobId) {
      return 400;
    }

    try {
      const result = await generateCompanyInterest({ jobId });
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
        event: "failedToGenerateCompanyInterest",
        message,
        stack,
        thunkName: "generateCompanyInterestThunk",
        collection: "job",
        entityId: jobId,
        severity: "error",
      });
      console.error("generateCompanyInterestThunk error:", error);
      return 500;
    }
  };
