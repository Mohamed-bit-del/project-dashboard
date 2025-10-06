import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import projectsReducer from "../features/dashboard/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;