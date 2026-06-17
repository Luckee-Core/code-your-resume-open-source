import { createProjectNoteApi, type CreateProjectNoteBody } from "@/api/project-notes";
import type { AppThunk } from "@/store";
import { ProjectNotesActions } from "@/store/dumps/projectNotes";

type Status = Promise<200 | 400 | 500>;

/**
 * Appends a freeform note to a project.
 */
export const createProjectNoteThunk = (input: CreateProjectNoteBody): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createProjectNoteApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(ProjectNotesActions.upsertProjectNote(result.data));
    return 200;
  };
};
