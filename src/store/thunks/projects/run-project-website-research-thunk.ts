import { postProjectWebsiteResearch } from "@/api/project/website-research";
import type { AppThunk } from "@/store";
import { CrmBuilderActions } from "@/store/builders/crmBuilder";
import { ProjectsActions } from "@/store/dumps/projects";
import { CurrentProjectActions } from "@/store/current/currentProject";

type Status = Promise<200 | 400 | 500>;

/**
 * Crawls the current project's URL on the server and refreshes Redux from the response.
 */
export const runProjectWebsiteResearchThunk = (): AppThunk<Status> => {
  return async (dispatch, getState): Status => {
    const projectId = getState().currentProject.id;
    if (!projectId) {
      return 400;
    }
    if (getState().crmBuilder.projectWebsiteResearchRunPhase !== "idle") {
      return 400;
    }

    dispatch(CrmBuilderActions.setProjectWebsiteResearchRunPhase("website"));
    try {
      const result = await postProjectWebsiteResearch(projectId);
      if (!result.success || !result.data) {
        return result.httpStatus >= 500 ? 500 : 400;
      }

      dispatch(ProjectsActions.upsertProject(result.data));
      if (getState().currentProject.id === result.data.id) {
        dispatch(CurrentProjectActions.setCurrentProject(result.data));
      }
      return 200;
    } catch {
      return 500;
    } finally {
      dispatch(CrmBuilderActions.setProjectWebsiteResearchRunPhase("idle"));
    }
  };
};
