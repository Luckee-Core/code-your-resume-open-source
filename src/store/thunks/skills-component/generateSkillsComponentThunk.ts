import { patchImageGraphicStudioDraft } from "@/api/image-creation-studio";
import { generateSkillsComponent } from "@/api/skills-component";
import type { ProfessionalBackgroundSegments } from "@/model/professional-background";
import type { AppThunk } from "@/store";
import { StudioBuilderActions } from "@/store/builders/studioBuilder";
import { createImageGraphicThunk } from "@/store/thunks/image-creation-studio/create-image-graphic-thunk";
import { loadImageGraphicsThunk } from "@/store/thunks/image-creation-studio/load-image-graphics-thunk";
import { openImageGraphicStudioByIdThunk } from "@/store/thunks/image-creation-studio/open-image-graphic-studio-by-id-thunk";

export type GenerateSkillsComponentThunkInput = {
  skills: string[];
  jobId: string;
  jobTitle?: string;
  professionalBackgroundSegments?: ProfessionalBackgroundSegments;
};

/** US Letter width at 96dpi. */
const RESUME_CANVAS_W = 816;
/** Fixed resume document height (816×1150 preview canvas). */
const RESUME_CANVAS_H = 1150;

/**
 * Launch a Cursor agent to generate a skills showcase TSX component, save it
 * to a new server-backed image graphic tagged with `jobId`, and open
 * that graphic in studio state.
 *
 * Canvas is always 816×1150 for generated resumes.
 *
 * @returns 200 on success, 400 if input invalid, 500 on API or persistence failure
 */
export const generateSkillsComponentThunk =
  (input: GenerateSkillsComponentThunkInput): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const { skills, jobId, jobTitle, professionalBackgroundSegments } = input;
    if (!skills.length || !jobId.trim()) {
      return 400;
    }

    const w = RESUME_CANVAS_W;
    const h = RESUME_CANVAS_H;

    try {
      const { tsx } = await generateSkillsComponent({
        skills,
        canvasWidthPx: w,
        canvasHeightPx: h,
        professionalBackgroundSegments,
      });

      const titleBase = jobTitle?.trim() ? jobTitle.trim() : `Job ${jobId.slice(0, 8)}`;
      const newId = await dispatch(
        createImageGraphicThunk({
          title: `Skills — ${titleBase}`,
          canvasWidthPx: w,
          canvasHeightPx: h,
          metadata: {
            jobId: jobId.trim(),
            skillsComponentSource: "cursor",
          },
        }),
      );

      if (!newId) {
        return 500;
      }

      const patch = await patchImageGraphicStudioDraft(newId, tsx);
      if (!patch.success) {
        return 500;
      }

      await dispatch(loadImageGraphicsThunk());
      await dispatch(openImageGraphicStudioByIdThunk(newId));
      dispatch(StudioBuilderActions.hydrateStudioForGraphic({ tsx }));

      return 200;
    } catch (error) {
      console.error("generateSkillsComponentThunk error:", error);
      return 500;
    }
  };
