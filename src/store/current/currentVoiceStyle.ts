import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CurrentVoiceStyleState = {
  draftBody: string;
  committedFingerprint: string;
  updatedAt: string | null;
};

const initialState: CurrentVoiceStyleState = {
  draftBody: "",
  committedFingerprint: "",
  updatedAt: null,
};

const currentVoiceStyleSlice = createSlice({
  name: "currentVoiceStyle",
  initialState,
  reducers: {
    syncDraftBody: (state, action: PayloadAction<string>) => {
      state.draftBody = action.payload;
    },
    setCommittedFingerprint: (state, action: PayloadAction<string>) => {
      state.committedFingerprint = action.payload;
    },
    setUpdatedAt: (state, action: PayloadAction<string | null>) => {
      state.updatedAt = action.payload;
    },
    resetCurrentVoiceStyle: () => initialState,
  },
});

export const CurrentVoiceStyleActions = currentVoiceStyleSlice.actions;
export default currentVoiceStyleSlice.reducer;
