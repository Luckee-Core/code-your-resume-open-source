import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProfessionalBackgroundSegments } from "@/model/professional-background";
import { getProfessionalBackgroundFingerprint } from "@/utils/professional-background/get-professional-background-fingerprint";

export type CurrentProfessionalBackgroundState = {
  draftSegments: ProfessionalBackgroundSegments;
  updatedAt: string | null;
  committedFingerprint: string;
};

const emptySegments = (): ProfessionalBackgroundSegments => ({
  education: "",
  credibility_bio: "",
  voice_style: "",
  portfolio_github: "",
});

const initialState: CurrentProfessionalBackgroundState = {
  draftSegments: emptySegments(),
  updatedAt: null,
  committedFingerprint: "",
};

const currentProfessionalBackgroundSlice = createSlice({
  name: "currentProfessionalBackground",
  initialState,
  reducers: {
    syncDraftSegments: (state, action: PayloadAction<ProfessionalBackgroundSegments>) => {
      state.draftSegments = { ...action.payload };
    },
    setUpdatedAt: (state, action: PayloadAction<string | null>) => {
      state.updatedAt = action.payload;
    },
    commitSegmentsFingerprint: (state) => {
      state.committedFingerprint = getProfessionalBackgroundFingerprint(state.draftSegments);
    },
    updateDraftSegment: (
      state,
      action: PayloadAction<{ key: keyof ProfessionalBackgroundSegments; value: string }>,
    ) => {
      state.draftSegments[action.payload.key] = action.payload.value;
    },
    resetCurrentProfessionalBackground: () => initialState,
  },
});

export const CurrentProfessionalBackgroundActions = currentProfessionalBackgroundSlice.actions;
export default currentProfessionalBackgroundSlice.reducer;
