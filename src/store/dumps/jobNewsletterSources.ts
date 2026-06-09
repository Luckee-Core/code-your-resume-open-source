import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobNewsletterSource } from "@/model/job-newsletter-source";

type InitialState = Record<string, JobNewsletterSource>;

const initialState: InitialState = {};

const jobNewsletterSourcesSlice = createSlice({
  name: "jobNewsletterSources",
  initialState,
  reducers: {
    upsertJobNewsletterSources: (state, action: PayloadAction<JobNewsletterSource[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertJobNewsletterSource: (state, action: PayloadAction<JobNewsletterSource>) => {
      state[action.payload.id] = action.payload;
    },
    resetJobNewsletterSources: () => initialState,
  },
});

export const JobNewsletterSourcesActions = jobNewsletterSourcesSlice.actions;
export default jobNewsletterSourcesSlice.reducer;
