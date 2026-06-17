import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type VoiceStyleBuilderState = {
  loadStatus: "idle" | "loading" | "loaded" | "error";
  error: string | null;
  isSaving: boolean;
};

const initialState: VoiceStyleBuilderState = {
  loadStatus: "idle",
  error: null,
  isSaving: false,
};

const voiceStyleBuilderSlice = createSlice({
  name: "voiceStyleBuilder",
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
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    reset: () => initialState,
  },
});

export const VoiceStyleBuilderActions = voiceStyleBuilderSlice.actions;
export default voiceStyleBuilderSlice.reducer;
