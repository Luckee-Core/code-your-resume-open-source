import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_JOBS_LIST_STATUS_FILTER,
  type JobsListStatusFilter,
} from "@/utils/job";

type JobsListBuilderState = {
  statusFilter: JobsListStatusFilter;
  /** Per-job spinner while POST /skills-component/generate is in flight. */
  resumeGenerateBusyByJobId: Record<string, boolean>;
};

const initialState: JobsListBuilderState = {
  statusFilter: DEFAULT_JOBS_LIST_STATUS_FILTER,
  resumeGenerateBusyByJobId: {},
};

const jobsListBuilderSlice = createSlice({
  name: "jobsListBuilder",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<JobsListStatusFilter>) => {
      state.statusFilter = action.payload;
    },
    resetStatusFilter: (state) => {
      state.statusFilter = DEFAULT_JOBS_LIST_STATUS_FILTER;
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
