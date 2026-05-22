import { patchImageGraphicStudioDraft } from "@/api/image-creation-studio";
import { generateCoverLetter } from "@/api/cover-letter";
import { LOCAL_USER_ID } from "@/constants/local-user";
import type { ProfessionalBackgroundSegments } from "@/model/professional-background";
import type { AppThunk } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { createImageGraphicThunk } from "@/store/thunks/image-creation-studio/create-image-graphic-thunk";
import { loadImageGraphicsThunk } from "@/store/thunks/image-creation-studio/load-image-graphics-thunk";
import { openImageGraphicStudioByIdThunk } from "@/store/thunks/image-creation-studio/open-image-graphic-studio-by-id-thunk";
import { collectSortedJobBulletBodies } from "@/utils/job";

export type GenerateCoverLetterThunkInput = {
  jobId: string;
  jobTitle: string;
  companyName?: string;
  skills?: string[];
  professionalBackgroundSegments: ProfessionalBackgroundSegments;
};

/** US Letter width at 96dpi. */
const DEFAULT_CANVAS_W = 816;
/** US Letter height at 96dpi. */
const DEFAULT_CANVAS_H = 1056;

/**
 * Launch a Cursor agent to generate a cover letter TSX component, save it
 * to a new localStorage-backed image graphic tagged with `jobId`, and open
 * that graphic in studio state.
 *
 * @returns 200 on success, 400 if input invalid, 500 on API or persistence failure
 */
export const generateCoverLetterThunk =
  (input: GenerateCoverLetterThunkInput): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const { jobId, jobTitle, companyName, skills, professionalBackgroundSegments } = input;

    if (!jobId.trim() || !jobTitle.trim()) {
      return 400;
    }

    const credibility = professionalBackgroundSegments.credibility_bio?.trim() ?? "";
    const voice = professionalBackgroundSegments.voice_style?.trim() ?? "";
    if (!credibility && !voice) {
      return 400;
    }

    const state = getState();
    const responsibilities = collectSortedJobBulletBodies(
      state.jobResponsibilities,
      jobId.trim(),
    );
    const requirements = collectSortedJobBulletBodies(state.jobRequirements, jobId.trim());
    const niceToHaves = collectSortedJobBulletBodies(state.jobNiceToHaves, jobId.trim());

    try {
      const { tsx } = await generateCoverLetter({
        jobId: jobId.trim(),
        jobTitle: jobTitle.trim(),
        companyName,
        responsibilities,
        requirements,
        niceToHaves,
        skills,
        canvasWidthPx: DEFAULT_CANVAS_W,
        canvasHeightPx: DEFAULT_CANVAS_H,
        professionalBackgroundSegments,
      });

      const titleBase = jobTitle.trim();
      const newId = await dispatch(
        createImageGraphicThunk({
          title: `Cover letter — ${titleBase}`,
          canvasWidthPx: DEFAULT_CANVAS_W,
          canvasHeightPx: DEFAULT_CANVAS_H,
          metadata: {
            jobId: jobId.trim(),
            coverLetterSource: "cursor",
          },
        }),
      );

      if (!newId) {
        return 500;
      }

      const patch = await patchImageGraphicStudioDraft(newId, LOCAL_USER_ID, tsx);
      if (!patch.success) {
        return 500;
      }

      await dispatch(loadImageGraphicsThunk());
      await dispatch(openImageGraphicStudioByIdThunk(newId));
      dispatch(StudioBuilderActions.hydrateStudioForGraphic({ tsx }));

      return 200;
    } catch (error) {
      console.error("generateCoverLetterThunk error:", error);
      return 500;
    }
  };
