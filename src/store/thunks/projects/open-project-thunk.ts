import { getProjectApi } from "@/api/project";
import type { AppThunk } from "@/store";
import { ProjectsActions } from "@/store/dumps/projects";
import { CurrentProjectActions } from "@/store/current/currentProject";

type Status = Promise<200 | 400 | 500>;

/**
 * Fetches a project by id and sets it as current.
 */
export const openProjectThunk = (id: string): AppThunk<Status> => {
  return async (dispatch): Status => {
    if (!id.trim()) return 400;
    const result = await getProjectApi(id);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 || result.httpStatus === 404 ? 400 : 500;
    }
    dispatch(ProjectsActions.upsertProject(result.data));
    dispatch(CurrentProjectActions.setCurrentProject(result.data));
    return 200;
  };
};
