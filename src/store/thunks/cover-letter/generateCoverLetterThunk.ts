import { patchImageGraphicStudioDraft } from "@/api/image-creation-studio";
import { generateCoverLetter } from "@/api/cover-letter";
import { coerceErrorFields, reportThunkError } from "@/api/thunk-errors";
import type { AppThunk } from "@/store";
import { CurrentStudioEditorActions } from "@/store/current/currentStudioEditor";
import { createImageGraphicThunk } from "@/store/thunks/image-creation-studio/create-image-graphic-thunk";
import { loadImageGraphicsThunk } from "@/store/thunks/image-creation-studio/load-image-graphics-thunk";
import { openImageGraphicStudioByIdThunk } from "@/store/thunks/image-creation-studio/open-image-graphic-studio-by-id-thunk";

export type GenerateCoverLetterThunkInput = {
  jobId: string;
};

/** US Letter width at 96dpi. */
const DEFAULT_CANVAS_W = 816;
/** US Letter height at 96dpi. */
const DEFAULT_CANVAS_H = 1056;

/**
 * Launch a Cursor agent to generate a cover letter TSX component, save it
 * to a new server-backed image graphic tagged with `jobId`, and open
 * that graphic in studio state.
 *
 * @returns 200 on success, 400 if input invalid, 500 on API or persistence failure
 */
export const generateCoverLetterThunk =
  (input: GenerateCoverLetterThunkInput): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const jobId = input.jobId.trim();
    if (!jobId) {
      return 400;
    }

    const jobTitle = getState().currentJob.title?.trim() ?? "";

    try {
      const generated = await generateCoverLetter({ jobId });
      if (!generated.success || !generated.data?.tsx) {
        return 500;
      }
      const tsx = generated.data.tsx;

      const titleBase = jobTitle || `Job ${jobId.slice(0, 8)}`;
      const createStatus = await dispatch(
        createImageGraphicThunk({
          title: `Cover letter — ${titleBase}`,
          canvasWidthPx: DEFAULT_CANVAS_W,
          canvasHeightPx: DEFAULT_CANVAS_H,
          jobId,
          metadata: {
            coverLetterSource: "cursor",
          },
        }),
      );

      if (createStatus !== 200) {
        return 500;
      }

      const newId = getState().currentImageGraphic.id;
      if (!newId) {
        return 500;
      }

      const patch = await patchImageGraphicStudioDraft(newId, tsx);
      if (!patch.success) {
        return 500;
      }

      await dispatch(loadImageGraphicsThunk());
      await dispatch(openImageGraphicStudioByIdThunk(newId));
      dispatch(CurrentStudioEditorActions.hydrateStudioForGraphic({ graphicId: newId, tsx }));

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
