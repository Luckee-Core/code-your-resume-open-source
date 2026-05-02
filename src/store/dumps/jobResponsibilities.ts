import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobBulletRow } from "@/model/job";

type InitialState = Record<string, JobBulletRow>;

const initialState: InitialState = {};

const jobResponsibilitiesSlice = createSlice({
  name: "jobResponsibilities",
  initialState,
  reducers: {
    upsertJobResponsibilities: (state, action: PayloadAction<JobBulletRow[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    removeJobResponsibilitiesForJob: (state, action: PayloadAction<string>) => {
      for (const key of Object.keys(state)) {
        if (state[key].jobId === action.payload) {
          delete state[key];
        }
      }
    },
    resetJobResponsibilities: () => initialState,
  },
});

export const JobResponsibilitiesActions = jobResponsibilitiesSlice.actions;
export default jobResponsibilitiesSlice.reducer;
