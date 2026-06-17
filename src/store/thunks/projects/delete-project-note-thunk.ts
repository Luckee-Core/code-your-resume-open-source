import { deleteProjectNoteApi } from "@/api/project-notes";
import type { AppThunk } from "@/store";
import { ProjectNotesActions } from "@/store/dumps/projectNotes";

type Status = Promise<200 | 400 | 500>;

/**
 * Deletes a project note by id.
 */
export const deleteProjectNoteThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await deleteProjectNoteApi(id);
    if (!result.success) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(ProjectNotesActions.removeProjectNote(id));
    return 200;
  };
};
