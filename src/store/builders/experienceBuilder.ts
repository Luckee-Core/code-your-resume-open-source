import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ExperienceBuilderState = {
  isAddEmploymentModalOpen: boolean;
  isSavingEmployment: boolean;
};

const initialState: ExperienceBuilderState = {
  isAddEmploymentModalOpen: false,
  isSavingEmployment: false,
};

const experienceBuilderSlice = createSlice({
  name: "experienceBuilder",
  initialState,
  reducers: {
    setAddEmploymentModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddEmploymentModalOpen = action.payload;
    },
    setSavingEmployment: (state, action: PayloadAction<boolean>) => {
      state.isSavingEmployment = action.payload;
    },
  },
});

export const ExperienceBuilderActions = experienceBuilderSlice.actions;
export default experienceBuilderSlice.reducer;
