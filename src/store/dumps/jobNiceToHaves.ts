import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobBulletRow } from "@/model/job";

type InitialState = Record<string, JobBulletRow>;

const initialState: InitialState = {};

const jobNiceToHavesSlice = createSlice({
  name: "jobNiceToHaves",
  initialState,
  reducers: {
    upsertJobNiceToHaves: (state, action: PayloadAction<JobBulletRow[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    removeJobNiceToHavesForJob: (state, action: PayloadAction<string>) => {
      for (const key of Object.keys(state)) {
        if (state[key].jobId === action.payload) {
          delete state[key];
        }
      }
    },
    resetJobNiceToHaves: () => initialState,
  },
});

export const JobNiceToHavesActions = jobNiceToHavesSlice.actions;
export default jobNiceToHavesSlice.reducer;
