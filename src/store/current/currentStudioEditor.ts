import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CurrentStudioEditorState = {
  graphicId: string;
  tsxDraft: string;
  tsxBaselineForPreview: string;
  isSavingDraft: boolean;
  isDownloadingPreviewPng: boolean;
};

const initialState: CurrentStudioEditorState = {
  graphicId: "",
  tsxDraft: "",
  tsxBaselineForPreview: "",
  isSavingDraft: false,
  isDownloadingPreviewPng: false,
};

const currentStudioEditorSlice = createSlice({
  name: "currentStudioEditor",
  initialState,
  reducers: {
    hydrateStudioForGraphic: (state, action: PayloadAction<{ graphicId: string; tsx: string }>) => {
      state.graphicId = action.payload.graphicId;
      state.tsxDraft = action.payload.tsx;
      state.tsxBaselineForPreview = action.payload.tsx;
    },
    resetStudioEditorState: () => initialState,
    setTsxDraft: (state, action: PayloadAction<string>) => {
      state.tsxDraft = action.payload;
    },
    alignTsxBaselineToCurrentDraft: (state) => {
      state.tsxBaselineForPreview = state.tsxDraft;
    },
    setIsSavingDraft: (state, action: PayloadAction<boolean>) => {
      state.isSavingDraft = action.payload;
    },
    setIsDownloadingPreviewPng: (state, action: PayloadAction<boolean>) => {
      state.isDownloadingPreviewPng = action.payload;
    },
    syncTsxBaselineAfterSave: (state) => {
      state.tsxBaselineForPreview = state.tsxDraft;
    },
  },
});

export const CurrentStudioEditorActions = currentStudioEditorSlice.actions;
export default currentStudioEditorSlice.reducer;
