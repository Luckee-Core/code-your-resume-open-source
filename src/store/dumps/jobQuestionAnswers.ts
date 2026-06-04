import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobQuestionAnswer } from "@/model/job-question-answer";

type InitialState = Record<string, JobQuestionAnswer>;

const initialState: InitialState = {};

const jobQuestionAnswersSlice = createSlice({
  name: "jobQuestionAnswers",
  initialState,
  reducers: {
    upsertJobQuestionAnswers: (state, action: PayloadAction<JobQuestionAnswer[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertJobQuestionAnswer: (state, action: PayloadAction<JobQuestionAnswer>) => {
      state[action.payload.id] = action.payload;
    },
    removeJobQuestionAnswersForJob: (state, action: PayloadAction<string>) => {
      const jobId = action.payload;
      for (const [id, row] of Object.entries(state)) {
        if (row.jobId === jobId) {
          delete state[id];
        }
      }
    },
    removeJobQuestionAnswer: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetJobQuestionAnswers: () => initialState,
  },
});

export const JobQuestionAnswersActions = jobQuestionAnswersSlice.actions;
export default jobQuestionAnswersSlice.reducer;
