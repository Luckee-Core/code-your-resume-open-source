import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LinkedInProfile } from "@/model/linkedin-profile";

type InitialState = Record<string, LinkedInProfile>;

const initialState: InitialState = {};

const linkedInProfilesSlice = createSlice({
  name: "linkedinProfiles",
  initialState,
  reducers: {
    upsertLinkedInProfiles: (state, action: PayloadAction<LinkedInProfile[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertLinkedInProfile: (state, action: PayloadAction<LinkedInProfile>) => {
      state[action.payload.id] = action.payload;
    },
    resetLinkedInProfiles: () => initialState,
  },
});

export const LinkedInProfilesActions = linkedInProfilesSlice.actions;
export default linkedInProfilesSlice.reducer;
