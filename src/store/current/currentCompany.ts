import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Company } from "@/model/company";

const emptyCompany = (): Company => ({
  id: "",
  name: "",
  website: "",
  notes: "",
  websiteUrls: [],
  playwrightWebsiteUrlDiscoveryAttempted: false,
  websiteResearchSummary: "",
  websiteResearchCompletedAt: "",
  createdAt: "",
  updatedAt: "",
});

const initialState: Company = emptyCompany();

const currentCompanySlice = createSlice({
  name: "currentCompany",
  initialState,
  reducers: {
    setCurrentCompany: (_state, action: PayloadAction<Company>) => action.payload,
    resetCurrentCompany: () => emptyCompany(),
  },
});

export const CurrentCompanyActions = currentCompanySlice.actions;
export default currentCompanySlice.reducer;
