import { listAiPromptsApi } from "@/api/ai-prompts";
import type { AppThunk } from "@/store";
import { AiPromptsActions } from "@/store/dumps/aiPrompts";

type Status = Promise<200 | 400 | 500>;

/**
 * Loads all versioned AI prompts (registry flows) into Redux.
 */
export const loadAiPromptsThunk =
  (): AppThunk<Status> =>
  async (dispatch): Status => {
    const result = await listAiPromptsApi();
    if (!result.success || !result.data) {
      return result.httpStatus === 400 ? 400 : 500;
    }
    dispatch(AiPromptsActions.upsertAiPrompts(result.data));
    if (result.warnings?.length) {
      console.warn(result.warnings.join(" "));
    }
    return 200;
  };
