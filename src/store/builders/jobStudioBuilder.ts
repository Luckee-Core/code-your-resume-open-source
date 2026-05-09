import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type JobStudioBuilderState = {
  loadStatus: "idle" | "loading" | "loaded" | "error";
  error: string | null;
  isPostingMessage: boolean;
};

const initialState: JobStudioBuilderState = {
  loadStatus: "idle",
  error: null,
  isPostingMessage: false,
};

const jobStudioBuilderSlice = createSlice({
  name: "jobStudioBuilder",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loadStatus = "loading";
      state.error = null;
    },
    setLoaded: (state) => {
      state.loadStatus = "loaded";
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loadStatus = "error";
      state.error = action.payload;
    },
    setPostingMessage: (state, action: PayloadAction<boolean>) => {
      state.isPostingMessage = action.payload;
    },
    reset: () => initialState,
  },
});

export const JobStudioBuilderActions = jobStudioBuilderSlice.actions;
export default jobStudioBuilderSlice.reducer;
