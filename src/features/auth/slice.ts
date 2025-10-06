import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type Role = "Admin" | "ProjectManager" | "Developer";

interface User {
  email: string;
  role: Role;
  token: string; // JWT وهمي
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,
  loading: false,
  error: null,
};

// Login وهمي
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const mockUsers: User[] = [
      { email: "admin@test.com", role: "Admin", token: "jwt-admin" },
      { email: "pm@test.com", role: "ProjectManager", token: "jwt-pm" },
      { email: "dev@test.com", role: "Developer", token: "jwt-dev" },
    ];

    const user = mockUsers.find(
      (u) => u.email === email && password === "123456"
    );
    if (!user) return rejectWithValue("Invalid email or password");

    return user;
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { email, password, role }: { email: string; password: string; role: Role },
    { rejectWithValue }
  ) => {
    const existingUsers: string[] = [
      "admin@test.com",
      "pm@test.com",
      "dev@test.com",
    ];
    if (existingUsers.includes(email))
      return rejectWithValue("Email already exists");

    const newUser: User = {
      email,
      role,
      token: Math.random().toString(36).substring(2),
    };

    return newUser;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
