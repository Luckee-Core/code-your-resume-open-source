import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobListingSectionCounts } from "@/model/job-listing-section-counts";

type InitialState = Record<string, JobListingSectionCounts>;

const initialState: InitialState = {};

const jobListingSectionCountsSlice = createSlice({
  name: "jobListingSectionCounts",
  initialState,
  reducers: {
    setJobListingSectionCounts: (
      state,
      action: PayloadAction<Record<string, JobListingSectionCounts>>,
    ) => {
      return action.payload;
    },
    upsertJobListingSectionCount: (
      state,
      action: PayloadAction<{ jobId: string; counts: JobListingSectionCounts }>,
    ) => {
      state[action.payload.jobId] = action.payload.counts;
    },
    resetJobListingSectionCounts: () => initialState,
  },
});

export const JobListingSectionCountsActions = jobListingSectionCountsSlice.actions;
export default jobListingSectionCountsSlice.reducer;
