import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobNewsletterIngestRun } from "@/model/job-newsletter-ingest-run";

type InitialState = Record<string, JobNewsletterIngestRun>;

const initialState: InitialState = {};

const jobNewsletterIngestRunsSlice = createSlice({
  name: "jobNewsletterIngestRuns",
  initialState,
  reducers: {
    upsertJobNewsletterIngestRuns: (state, action: PayloadAction<JobNewsletterIngestRun[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    resetJobNewsletterIngestRuns: () => initialState,
  },
});

export const JobNewsletterIngestRunsActions = jobNewsletterIngestRunsSlice.actions;
export default jobNewsletterIngestRunsSlice.reducer;
