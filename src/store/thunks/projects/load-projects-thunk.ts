import { listProjectsApi } from "@/api/project";
import type { AppThunk } from "@/store";
import { ProjectsActions } from "@/store/dumps/projects";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads all projects into the Redux dump.
 */
export const loadProjectsThunk = (): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await listProjectsApi();
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(ProjectsActions.upsertProjects(result.data));
    return 200;
  };
};
