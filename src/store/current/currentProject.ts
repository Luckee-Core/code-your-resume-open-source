import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "@/model/project";

const emptyProject = (): Project => ({
  id: "",
  businessName: "",
  description: "",
  url: "",
  duration: "",
  technologies: [],
  websiteResearchSummary: "",
  websiteResearchCompletedAt: "",
  createdAt: "",
  updatedAt: "",
});

const initialState: Project = emptyProject();

const currentProjectSlice = createSlice({
  name: "currentProject",
  initialState,
  reducers: {
    setCurrentProject: (_state, action: PayloadAction<Project>) => action.payload,
    resetCurrentProject: () => emptyProject(),
  },
});

export const CurrentProjectActions = currentProjectSlice.actions;
export default currentProjectSlice.reducer;
