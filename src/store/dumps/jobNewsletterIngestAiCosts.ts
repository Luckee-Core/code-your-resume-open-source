import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobNewsletterIngestAiCost } from "@/model/job-newsletter-ingest-ai-cost";

type InitialState = Record<string, JobNewsletterIngestAiCost>;

const initialState: InitialState = {};

const jobNewsletterIngestAiCostsSlice = createSlice({
  name: "jobNewsletterIngestAiCosts",
  initialState,
  reducers: {
    upsertJobNewsletterIngestAiCosts: (state, action: PayloadAction<JobNewsletterIngestAiCost[]>) => {
      for (const row of action.payload) {
        state[row.exchangeId] = row;
      }
    },
    resetJobNewsletterIngestAiCosts: () => initialState,
  },
});

export const JobNewsletterIngestAiCostsActions = jobNewsletterIngestAiCostsSlice.actions;
export default jobNewsletterIngestAiCostsSlice.reducer;
