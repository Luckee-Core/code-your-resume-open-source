import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CompaniesListBuilderState = {
  searchFilter: string;
};

const initialState: CompaniesListBuilderState = {
  searchFilter: "",
};

const companiesListBuilderSlice = createSlice({
  name: "companiesListBuilder",
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    clearFilters: (state) => {
      state.searchFilter = "";
    },
  },
});

export const CompaniesListBuilderActions = companiesListBuilderSlice.actions;
export default companiesListBuilderSlice.reducer;
