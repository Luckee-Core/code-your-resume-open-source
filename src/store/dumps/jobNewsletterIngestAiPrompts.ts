import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobNewsletterIngestAiPrompt } from "@/model/job-newsletter-ingest-ai-prompt";

type InitialState = Record<string, JobNewsletterIngestAiPrompt>;

const initialState: InitialState = {};

const jobNewsletterIngestAiPromptsSlice = createSlice({
  name: "jobNewsletterIngestAiPrompts",
  initialState,
  reducers: {
    upsertJobNewsletterIngestAiPrompts: (
      state,
      action: PayloadAction<JobNewsletterIngestAiPrompt[]>,
    ) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    resetJobNewsletterIngestAiPrompts: () => initialState,
  },
});

export const JobNewsletterIngestAiPromptsActions = jobNewsletterIngestAiPromptsSlice.actions;
export default jobNewsletterIngestAiPromptsSlice.reducer;
