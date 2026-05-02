import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobApplication } from "@/model/job-application";

type InitialState = Record<string, JobApplication>;

const initialState: InitialState = {};

const jobApplicationsSlice = createSlice({
  name: "jobApplications",
  initialState,
  reducers: {
    upsertJobApplications: (state, action: PayloadAction<JobApplication[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertJobApplication: (state, action: PayloadAction<JobApplication>) => {
      state[action.payload.id] = action.payload;
    },
    removeJobApplication: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetJobApplications: () => initialState,
  },
});

export const JobApplicationsActions = jobApplicationsSlice.actions;
export default jobApplicationsSlice.reducer;
