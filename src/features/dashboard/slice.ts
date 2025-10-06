import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  id: number;
  name: string;
  status: "Active" | "Completed" | "Pending";
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
}

interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [
    {
      id: 1,
      name: "Project Alpha",
      status: "Active",
      startDate: "2025-01-01",
      endDate: "2025-06-01",
      progress: 40,
      budget: 50000,
    },
    {
      id: 2,
      name: "Project Beta",
      status: "Completed",
      startDate: "2024-05-01",
      endDate: "2024-12-01",
      progress: 100,
      budget: 75000,
    },
    {
      id: 3,
      name: "Project Gamma",
      status: "Pending",
      startDate: "2025-02-01",
      endDate: "2025-08-01",
      progress: 0,
      budget: 30000,
    },
  ],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    editProjectField: <K extends keyof Project>(
      state: ProjectsState,
      action: PayloadAction<{ id: number; field: K; value: Project[K] }>
    ) => {
      const { id, field, value } = action.payload;
      const project = state.projects.find((p) => p.id === id);
      if (project) {
        project[field] = value;
      }
    },

    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.projects[index] = action.payload;
    },
  },
});

export const { addProject, deleteProject, editProjectField, updateProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
