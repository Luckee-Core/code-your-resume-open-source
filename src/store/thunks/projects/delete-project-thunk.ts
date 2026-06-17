import { deleteProjectApi } from "@/api/project";
import type { AppThunk } from "@/store";
import { ProjectsActions } from "@/store/dumps/projects";
import { ProjectNotesActions } from "@/store/dumps/projectNotes";
import { CurrentProjectActions } from "@/store/current/currentProject";

type Status = Promise<200 | 400 | 500>;

/**
 * Deletes a project and clears related notes from Redux.
 */
export const deleteProjectThunk = (id: string): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await deleteProjectApi(id);
    if (!result.success) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(ProjectsActions.removeProject(id));
    dispatch(ProjectNotesActions.removeProjectNotesForProject(id));
    if (getState().currentProject.id === id) {
      dispatch(CurrentProjectActions.resetCurrentProject());
    }
    return 200;
  };
};
