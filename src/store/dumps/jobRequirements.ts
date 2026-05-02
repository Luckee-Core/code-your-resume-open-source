import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobBulletRow } from "@/model/job";

type InitialState = Record<string, JobBulletRow>;

const initialState: InitialState = {};

const jobRequirementsSlice = createSlice({
  name: "jobRequirements",
  initialState,
  reducers: {
    upsertJobRequirements: (state, action: PayloadAction<JobBulletRow[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    removeJobRequirementsForJob: (state, action: PayloadAction<string>) => {
      for (const key of Object.keys(state)) {
        if (state[key].jobId === action.payload) {
          delete state[key];
        }
      }
    },
    resetJobRequirements: () => initialState,
  },
});

export const JobRequirementsActions = jobRequirementsSlice.actions;
export default jobRequirementsSlice.reducer;
