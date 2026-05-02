import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "@/model/job";

const emptyJob = (): Job => ({
  id: "",
  companyId: "",
  type: "job",
  title: "",
  url: "",
  status: "draft",
  description: "",
  listingImportedAt: "",
  latestScrapeRunId: "",
  latestAiExchangeId: "",
  responsibilities: [],
  requirements: [],
  niceToHaves: [],
  createdAt: "",
  updatedAt: "",
});

const initialState: Job = emptyJob();

const currentJobSlice = createSlice({
  name: "currentJob",
  initialState,
  reducers: {
    setCurrentJob: (_state, action: PayloadAction<Job>) => action.payload,
    resetCurrentJob: () => emptyJob(),
  },
});

export const CurrentJobActions = currentJobSlice.actions;
export default currentJobSlice.reducer;
