import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobQuestion } from "@/model/job-question";

type InitialState = Record<string, JobQuestion>;

const initialState: InitialState = {};

const jobQuestionsSlice = createSlice({
  name: "jobQuestions",
  initialState,
  reducers: {
    upsertJobQuestions: (state, action: PayloadAction<JobQuestion[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertJobQuestion: (state, action: PayloadAction<JobQuestion>) => {
      state[action.payload.id] = action.payload;
    },
    removeJobQuestion: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetJobQuestions: () => initialState,
  },
});

export const JobQuestionsActions = jobQuestionsSlice.actions;
export default jobQuestionsSlice.reducer;
