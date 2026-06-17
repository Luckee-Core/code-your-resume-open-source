import { updateProjectApi, type UpdateProjectBody } from "@/api/project";
import type { AppThunk } from "@/store";
import { ProjectsActions } from "@/store/dumps/projects";
import { CurrentProjectActions } from "@/store/current/currentProject";

type Status = Promise<200 | 400 | 500>;

/**
 * Updates a project row in Supabase and syncs Redux dump + current.
 */
export const updateProjectThunk = (input: UpdateProjectBody): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const result = await updateProjectApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(ProjectsActions.upsertProject(result.data));
    const cur = getState().currentProject;
    if (cur.id === result.data.id) {
      dispatch(CurrentProjectActions.setCurrentProject(result.data));
    }
    return 200;
  };
};
