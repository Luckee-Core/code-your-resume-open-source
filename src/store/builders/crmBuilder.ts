import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ListLoadStatus = "idle" | "loading" | "error";

type CompanyWebsiteResearchRunPhase = "idle" | "website";

type CrmBuilderState = {
  listLoadStatus: ListLoadStatus;
  listError: string | null;
  isCompanyEditModalOpen: boolean;
  companyWebsiteResearchRunPhase: CompanyWebsiteResearchRunPhase;
  isCompanyWebsiteResearchConfirmModalOpen: boolean;
};

const initialState: CrmBuilderState = {
  listLoadStatus: "idle",
  listError: null,
  isCompanyEditModalOpen: false,
  companyWebsiteResearchRunPhase: "idle",
  isCompanyWebsiteResearchConfirmModalOpen: false,
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
  },
});

export const CrmBuilderActions = crmBuilderSlice.actions;
export default crmBuilderSlice.reducer;
