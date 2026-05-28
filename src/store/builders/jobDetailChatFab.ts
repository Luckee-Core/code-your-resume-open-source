import { createSlice } from "@reduxjs/toolkit";

type JobDetailChatFabState = {
  isExpanded: boolean;
};

const initialState: JobDetailChatFabState = {
  isExpanded: false,
};

const jobDetailChatFabSlice = createSlice({
  name: "jobDetailChatFab",
  initialState,
  reducers: {
    expand: (state) => {
      state.isExpanded = true;
    },
    collapse: (state) => {
      state.isExpanded = false;
    },
    resetForJobChange: (state) => {
      state.isExpanded = false;
    },
    reset: () => initialState,
  },
});

export const JobDetailChatFabActions = jobDetailChatFabSlice.actions;
export default jobDetailChatFabSlice.reducer;
