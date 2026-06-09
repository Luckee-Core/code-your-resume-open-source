import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AiPrompt } from "@/model/ai-prompt";

type AiPromptsState = Record<string, AiPrompt>;

const initialState: AiPromptsState = {};

const aiPromptsSlice = createSlice({
  name: "aiPrompts",
  initialState,
  reducers: {
    upsertAiPrompts: (state, action: PayloadAction<AiPrompt[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    clearAiPrompts: () => initialState,
  },
});

export const AiPromptsActions = aiPromptsSlice.actions;
export default aiPromptsSlice.reducer;
