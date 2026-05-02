import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TechnicalSkillItem, TechnicalSkillsChatMessage } from "@/model/technical-skills";
import { getTechnicalSkillsFingerprint } from "@/utils/technical-skills";

export type CurrentTechnicalSkillsState = {
  draftTechnicalSkills: TechnicalSkillItem[];
  messages: TechnicalSkillsChatMessage[];
  /** Fingerprint of the last server-committed skill list, used for dirty detection. */
  committedFingerprint: string;
};

const initialState: CurrentTechnicalSkillsState = {
  draftTechnicalSkills: [],
  messages: [],
  committedFingerprint: '',
};

const currentTechnicalSkillsSlice = createSlice({
  name: "currentTechnicalSkills",
  initialState,
  reducers: {
    syncDraftTechnicalSkills: (state, action: PayloadAction<TechnicalSkillItem[]>) => {
      state.draftTechnicalSkills = action.payload.map((s) => ({ ...s }));
    },
    commitSkillsFingerprint: (state) => {
      state.committedFingerprint = getTechnicalSkillsFingerprint(state.draftTechnicalSkills);
    },
    syncMessages: (state, action: PayloadAction<TechnicalSkillsChatMessage[]>) => {
      state.messages = [...action.payload];
    },
    addDraftTechnicalSkill: (state, action: PayloadAction<TechnicalSkillItem>) => {
      state.draftTechnicalSkills.push({ ...action.payload });
    },
    updateDraftTechnicalSkill: (
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        body?: string | null;
        sortOrder?: number;
        status?: "active" | "archived";
      }>,
    ) => {
      const idx = state.draftTechnicalSkills.findIndex((i) => i.id === action.payload.id);
      if (idx < 0) return;
      const cur = state.draftTechnicalSkills[idx];
      state.draftTechnicalSkills[idx] = {
        ...cur,
        ...(action.payload.title !== undefined ? { title: action.payload.title } : {}),
        ...(action.payload.body !== undefined ? { body: action.payload.body } : {}),
        ...(action.payload.sortOrder !== undefined ? { sortOrder: action.payload.sortOrder } : {}),
        ...(action.payload.status !== undefined ? { status: action.payload.status } : {}),
      };
    },
    removeDraftTechnicalSkill: (state, action: PayloadAction<string>) => {
      state.draftTechnicalSkills = state.draftTechnicalSkills.filter((i) => i.id !== action.payload);
    },
    resetCurrentTechnicalSkills: () => initialState,
  },
});

export const CurrentTechnicalSkillsActions = currentTechnicalSkillsSlice.actions;
export default currentTechnicalSkillsSlice.reducer;
