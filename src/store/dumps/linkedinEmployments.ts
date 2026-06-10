import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LinkedInEmployment } from "@/model/linkedin-employment";

type InitialState = Record<string, LinkedInEmployment>;

const initialState: InitialState = {};

const linkedInEmploymentsSlice = createSlice({
  name: "linkedinEmployments",
  initialState,
  reducers: {
    upsertLinkedInEmployments: (state, action: PayloadAction<LinkedInEmployment[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    resetLinkedInEmployments: () => initialState,
  },
});

export const LinkedInEmploymentsActions = linkedInEmploymentsSlice.actions;
export default linkedInEmploymentsSlice.reducer;
