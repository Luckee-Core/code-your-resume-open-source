import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "@/model/job";

type InitialState = Record<string, Job>;

const initialState: InitialState = {};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    upsertJobs: (state, action: PayloadAction<Job[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertJob: (state, action: PayloadAction<Job>) => {
      state[action.payload.id] = action.payload;
    },
    removeJob: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetJobs: () => initialState,
  },
});

export const JobsActions = jobsSlice.actions;
export default jobsSlice.reducer;
