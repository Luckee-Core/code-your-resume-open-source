import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LinkedInEducation } from "@/model/linkedin-education";

type InitialState = Record<string, LinkedInEducation>;

const initialState: InitialState = {};

const linkedInEducationsSlice = createSlice({
  name: "linkedinEducations",
  initialState,
  reducers: {
    upsertLinkedInEducations: (state, action: PayloadAction<LinkedInEducation[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    resetLinkedInEducations: () => initialState,
  },
});

export const LinkedInEducationsActions = linkedInEducationsSlice.actions;
export default linkedInEducationsSlice.reducer;
