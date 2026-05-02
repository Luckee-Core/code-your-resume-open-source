import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JobApplication } from "@/model/job-application";

const emptyJobApplication = (): JobApplication => ({
  id: "",
  jobId: "",
  submittedAt: "",
  imageGraphicId: "",
  notes: "",
  createdAt: "",
  updatedAt: "",
});

const initialState: JobApplication = emptyJobApplication();

const currentJobApplicationSlice = createSlice({
  name: "currentJobApplication",
  initialState,
  reducers: {
    setCurrentJobApplication: (_state, action: PayloadAction<JobApplication>) => action.payload,
    resetCurrentJobApplication: () => emptyJobApplication(),
  },
});

export const CurrentJobApplicationActions = currentJobApplicationSlice.actions;
export default currentJobApplicationSlice.reducer;
