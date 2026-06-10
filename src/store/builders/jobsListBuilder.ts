import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobStatus } from "@/model/job";
import {
  DEFAULT_JOBS_LIST_STATUS_FILTERS,
  normalizeJobsListStatusFilters,
  type JobsListStatusFilters,
} from "@/utils/job";

type JobsListBuilderState = {
  statusFilters: JobsListStatusFilters;
  /** Per-job spinner while POST /skills-component/generate is in flight. */
  resumeGenerateBusyByJobId: Record<string, boolean>;
};

const initialState: JobsListBuilderState = {
  statusFilters: DEFAULT_JOBS_LIST_STATUS_FILTERS,
  resumeGenerateBusyByJobId: {},
};

const jobsListBuilderSlice = createSlice({
  name: "jobsListBuilder",
  initialState,
  reducers: {
    setStatusFilters: (state, action: PayloadAction<JobsListStatusFilters>) => {
      state.statusFilters = normalizeJobsListStatusFilters(action.payload);
    },
    toggleStatusFilter: (state, action: PayloadAction<JobStatus>) => {
      const status = action.payload;
      if (state.statusFilters.includes(status)) {
        state.statusFilters = state.statusFilters.filter((value) => value !== status);
        return;
      }
      state.statusFilters = normalizeJobsListStatusFilters([...state.statusFilters, status]);
    },
    resetStatusFilters: (state) => {
      state.statusFilters = DEFAULT_JOBS_LIST_STATUS_FILTERS;
    },
    setResumeGenerateBusy: (
      state,
      action: PayloadAction<{ jobId: string; busy: boolean }>,
    ) => {
      const { jobId, busy } = action.payload;
      if (busy) {
        state.resumeGenerateBusyByJobId[jobId] = true;
      } else {
        delete state.resumeGenerateBusyByJobId[jobId];
      }
    },
  },
});

export const JobsListBuilderActions = jobsListBuilderSlice.actions;
export default jobsListBuilderSlice.reducer;
