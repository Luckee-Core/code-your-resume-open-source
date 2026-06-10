import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LinkedInCertification } from "@/model/linkedin-certification";

type InitialState = Record<string, LinkedInCertification>;

const initialState: InitialState = {};

const linkedInCertificationsSlice = createSlice({
  name: "linkedinCertifications",
  initialState,
  reducers: {
    upsertLinkedInCertifications: (state, action: PayloadAction<LinkedInCertification[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    resetLinkedInCertifications: () => initialState,
  },
});

export const LinkedInCertificationsActions = linkedInCertificationsSlice.actions;
export default linkedInCertificationsSlice.reducer;
