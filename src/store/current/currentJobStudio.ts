import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobStudioChatMessage } from "@/model/job-studio";

export type CurrentJobStudioState = {
  /** Job id whose chat is loaded into `messages`; cleared on reset. */
  loadedJobId: string | null;
  messages: JobStudioChatMessage[];
};

const initialState: CurrentJobStudioState = {
  loadedJobId: null,
  messages: [],
};

const currentJobStudioSlice = createSlice({
  name: "currentJobStudio",
  initialState,
  reducers: {
    setLoadedJobId: (state, action: PayloadAction<string | null>) => {
      state.loadedJobId = action.payload;
    },
    syncMessages: (state, action: PayloadAction<JobStudioChatMessage[]>) => {
      state.messages = [...action.payload];
    },
    resetCurrentJobStudio: () => initialState,
  },
});

export const CurrentJobStudioActions = currentJobStudioSlice.actions;
export default currentJobStudioSlice.reducer;
