import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TechnicalSkillsBuilderState = {
  loadStatus: "idle" | "loading" | "loaded" | "error";
  error: string | null;
  isPostingMessage: boolean;
  isSaving: boolean;
};

const initialState: TechnicalSkillsBuilderState = {
  loadStatus: "idle",
  error: null,
  isPostingMessage: false,
  isSaving: false,
};

const technicalSkillsBuilderSlice = createSlice({
  name: "technicalSkillsBuilder",
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
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    reset: () => initialState,
  },
});

export const TechnicalSkillsBuilderActions = technicalSkillsBuilderSlice.actions;
export default technicalSkillsBuilderSlice.reducer;
