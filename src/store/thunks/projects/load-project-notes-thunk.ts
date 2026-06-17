import { listProjectNotesApi } from "@/api/project-notes";
import type { AppThunk } from "@/store";
import { ProjectNotesActions } from "@/store/dumps/projectNotes";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads note rows for a project into the Redux dump.
 */
export const loadProjectNotesThunk = (projectId: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    if (!projectId.trim()) return 400;
    const result = await listProjectNotesApi(projectId);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(ProjectNotesActions.upsertProjectNotes(result.data));
    return 200;
  };
};
