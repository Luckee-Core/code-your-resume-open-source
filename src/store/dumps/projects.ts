import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "@/model/project";

type InitialState = Record<string, Project>;

const initialState: InitialState = {};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    upsertProjects: (state, action: PayloadAction<Project[]>) => {
      for (const row of action.payload) {
        state[row.id] = row;
      }
    },
    upsertProject: (state, action: PayloadAction<Project>) => {
      state[action.payload.id] = action.payload;
    },
    removeProject: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    resetProjects: () => initialState,
  },
});

export const ProjectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
