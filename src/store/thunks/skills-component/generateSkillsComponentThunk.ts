import { generateSkillsComponent } from "@/api/skills-component";
import { coerceErrorFields, reportThunkError } from "@/api/thunk-errors";
import type { AppThunk } from "@/store";
import { loadImageGraphicsThunk } from "@/store/thunks/image-creation-studio/load-image-graphics-thunk";

export type GenerateSkillsComponentThunkInput = {
  jobId: string;
  pointOfEmphasis?: string;
};

/**
 * Queues resume TSX generation on Express. The server runs the Cursor agent and
 * persists the job-tagged graphic — the browser does not need to stay open.
 *
 * @returns 200 when queued, 400 if input invalid, 500 on API failure
 */
export const generateSkillsComponentThunk =
  (input: GenerateSkillsComponentThunkInput): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const jobId = input.jobId.trim();
    if (!jobId) {
      return 400;
    }

    try {
      const result = await generateSkillsComponent({
        jobId,
        pointOfEmphasis: input.pointOfEmphasis?.trim() || undefined,
      });
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
        event: "failedToGenerateSkillsComponent",
        message,
        stack,
        thunkName: "generateSkillsComponentThunk",
        collection: "job",
        entityId: jobId,
        severity: "error",
      });
      console.error("generateSkillsComponentThunk error:", error);
      return 500;
    }
  };
