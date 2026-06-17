import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ListLoadStatus = "idle" | "loading" | "error";

type CompanyWebsiteResearchRunPhase = "idle" | "website";
type ProjectWebsiteResearchRunPhase = "idle" | "website";

type CrmBuilderState = {
  listLoadStatus: ListLoadStatus;
  listError: string | null;
  isCompanyEditModalOpen: boolean;
  companyWebsiteResearchRunPhase: CompanyWebsiteResearchRunPhase;
  isCompanyWebsiteResearchConfirmModalOpen: boolean;
  projectWebsiteResearchRunPhase: ProjectWebsiteResearchRunPhase;
  isProjectWebsiteResearchConfirmModalOpen: boolean;
  lastJobImportWarning: string | null;
  isBulkDraftListingImportRunning: boolean;
};

const initialState: CrmBuilderState = {
  listLoadStatus: "idle",
  listError: null,
  isCompanyEditModalOpen: false,
  companyWebsiteResearchRunPhase: "idle",
  isCompanyWebsiteResearchConfirmModalOpen: false,
  projectWebsiteResearchRunPhase: "idle",
  isProjectWebsiteResearchConfirmModalOpen: false,
  lastJobImportWarning: null,
  isBulkDraftListingImportRunning: false,
};

const crmBuilderSlice = createSlice({
  name: "crmBuilder",
  initialState,
  reducers: {
    setListLoadStatus: (state, action: PayloadAction<ListLoadStatus>) => {
      state.listLoadStatus = action.payload;
    },
    setListError: (state, action: PayloadAction<string | null>) => {
      state.listError = action.payload;
    },
    setCompanyEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCompanyEditModalOpen = action.payload;
    },
    setCompanyWebsiteResearchRunPhase: (
      state,
      action: PayloadAction<CompanyWebsiteResearchRunPhase>,
    ) => {
      state.companyWebsiteResearchRunPhase = action.payload;
    },
    setCompanyWebsiteResearchConfirmModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCompanyWebsiteResearchConfirmModalOpen = action.payload;
    },
    setProjectWebsiteResearchRunPhase: (
      state,
      action: PayloadAction<ProjectWebsiteResearchRunPhase>,
    ) => {
      state.projectWebsiteResearchRunPhase = action.payload;
    },
    setProjectWebsiteResearchConfirmModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isProjectWebsiteResearchConfirmModalOpen = action.payload;
    },
    setLastJobImportWarning: (state, action: PayloadAction<string | null>) => {
      state.lastJobImportWarning = action.payload;
    },
    clearLastJobImportWarning: (state) => {
      state.lastJobImportWarning = null;
    },
    setBulkDraftListingImportRunning: (state, action: PayloadAction<boolean>) => {
      state.isBulkDraftListingImportRunning = action.payload;
    },
  },
});

export const CrmBuilderActions = crmBuilderSlice.actions;
export default crmBuilderSlice.reducer;
