import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobNewsletterSource } from "@/model/job-newsletter-source";

const emptySource = (): JobNewsletterSource => ({
  id: "",
  name: "",
  senderEmail: "",
  enabled: true,
  parseInstructions: "",
  createdAt: "",
  updatedAt: "",
});

const initialState: JobNewsletterSource = emptySource();

const currentJobNewsletterSourceSlice = createSlice({
  name: "currentJobNewsletterSource",
  initialState,
  reducers: {
    setCurrentJobNewsletterSource: (_state, action: PayloadAction<JobNewsletterSource>) =>
      action.payload,
    resetCurrentJobNewsletterSource: () => emptySource(),
  },
});

export const CurrentJobNewsletterSourceActions = currentJobNewsletterSourceSlice.actions;
export default currentJobNewsletterSourceSlice.reducer;
