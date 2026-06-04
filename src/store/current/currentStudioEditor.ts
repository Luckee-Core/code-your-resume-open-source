import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CurrentStudioEditorState = {
  graphicId: string;
  tsxDraft: string;
  tsxBaselineForPreview: string;
  /** Live content height from preview iframe (null until measured). */
  previewMeasuredContentHeightPx: number | null;
  isSavingDraft: boolean;
  isDownloadingPreviewPng: boolean;
};

const initialState: CurrentStudioEditorState = {
  graphicId: "",
  tsxDraft: "",
  tsxBaselineForPreview: "",
  previewMeasuredContentHeightPx: null,
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
      state.previewMeasuredContentHeightPx = null;
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
    setPreviewMeasuredContentHeightPx: (state, action: PayloadAction<number | null>) => {
      state.previewMeasuredContentHeightPx = action.payload;
    },
    syncTsxBaselineAfterSave: (state) => {
      state.tsxBaselineForPreview = state.tsxDraft;
    },
  },
});

export const CurrentStudioEditorActions = currentStudioEditorSlice.actions;
export default currentStudioEditorSlice.reducer;
