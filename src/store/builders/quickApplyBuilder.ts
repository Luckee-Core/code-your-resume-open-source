import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuickApplyResult } from "@/api/quick-apply";

export type QuickApplyPhase = "idle" | "running" | "done" | "error";

type QuickApplyBuilderState = {
  phase: QuickApplyPhase;
  lastResult: QuickApplyResult | null;
  lastError: string | null;
};

const initialState: QuickApplyBuilderState = {
  phase: "idle",
  lastResult: null,
  lastError: null,
};

const quickApplyBuilderSlice = createSlice({
  name: "quickApplyBuilder",
  initialState,
  reducers: {
    setPhase: (state, action: PayloadAction<QuickApplyPhase>) => {
      state.phase = action.payload;
    },
    setLastResult: (state, action: PayloadAction<QuickApplyResult | null>) => {
      state.lastResult = action.payload;
    },
    setLastError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
    resetQuickApply: (state) => {
      state.phase = "idle";
      state.lastResult = null;
      state.lastError = null;
    },
  },
});

export const QuickApplyBuilderActions = quickApplyBuilderSlice.actions;
export default quickApplyBuilderSlice.reducer;
