import { createProjectApi, type CreateProjectBody } from "@/api/project";
import type { AppThunk } from "@/store";
import { ProjectsActions } from "@/store/dumps/projects";
import { CurrentProjectActions } from "@/store/current/currentProject";

type Status = Promise<200 | 400 | 500>;

/**
 * Creates a project and sets it as current.
 */
export const createProjectThunk = (input: CreateProjectBody): AppThunk<Status> => {
  return async (dispatch): Status => {
    const result = await createProjectApi(input);
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(ProjectsActions.upsertProject(result.data));
    dispatch(CurrentProjectActions.setCurrentProject(result.data));
    return 200;
  };
};
