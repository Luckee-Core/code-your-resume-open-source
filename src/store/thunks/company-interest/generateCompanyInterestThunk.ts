import { patchImageGraphicStudioDraft } from "@/api/image-creation-studio";
import { generateCompanyInterest } from "@/api/company-interest";
import { LOCAL_USER_ID } from "@/constants/local-user";
import type { ProfessionalBackgroundSegments } from "@/model/professional-background";
import type { AppThunk } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { createImageGraphicThunk } from "@/store/thunks/image-creation-studio/create-image-graphic-thunk";
import { loadImageGraphicsThunk } from "@/store/thunks/image-creation-studio/load-image-graphics-thunk";
import { openImageGraphicStudioByIdThunk } from "@/store/thunks/image-creation-studio/open-image-graphic-studio-by-id-thunk";
import { collectSortedJobBulletBodies } from "@/utils/job";

export type GenerateCompanyInterestThunkInput = {
  jobId: string;
  jobTitle: string;
  companyName?: string;
  skills?: string[];
  professionalBackgroundSegments: ProfessionalBackgroundSegments;
};

/** US Letter width at 96dpi. */
const DEFAULT_CANVAS_W = 816;
/** Shorter than cover letter — half-page answer block. */
const DEFAULT_CANVAS_H = 480;

/**
 * Launch a Cursor agent to generate a short company-interest TSX component,
 * save it as a job-tagged graphic, and open it in studio state.
 *
 * @returns 200 on success, 400 if input invalid, 500 on API or persistence failure
 */
export const generateCompanyInterestThunk =
  (input: GenerateCompanyInterestThunkInput): AppThunk<Promise<200 | 400 | 500>> =>
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
      const { tsx } = await generateCompanyInterest({
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
          title: `Company interest — ${titleBase}`,
          canvasWidthPx: DEFAULT_CANVAS_W,
          canvasHeightPx: DEFAULT_CANVAS_H,
          jobId: jobId.trim(),
          metadata: {
            companyInterestSource: "cursor",
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
      console.error("generateCompanyInterestThunk error:", error);
      return 500;
    }
  };
