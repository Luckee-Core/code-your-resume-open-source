import { synthesizeProjectNotesApi } from "@/api/project/synthesize-notes";
import type { AppThunk } from "@/store";
import { ProjectNotesActions } from "@/store/dumps/projectNotes";

type Status = Promise<200 | 400 | 500>;

/**
 * Runs AI synthesis on pasted project narrative and replaces all notes for the project.
 */
export const synthesizeProjectNotesThunk = (input: {
  projectId: string;
  synthesisText: string;
}): AppThunk<Status> => {
  return async (dispatch): Status => {
    const projectId = input.projectId.trim();
    if (!projectId) {
      return 400;
    }

    const result = await synthesizeProjectNotesApi({
      id: projectId,
      synthesisText: input.synthesisText,
    });

    if (!result.success || !result.data) {
      return result.httpStatus >= 500 ? 500 : 400;
    }

    dispatch(ProjectNotesActions.removeProjectNotesForProject(projectId));
    dispatch(ProjectNotesActions.upsertProjectNotes(result.data.notes));
    return 200;
  };
};
