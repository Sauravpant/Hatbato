import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginData, User } from "@/types/auth/types";
import { login, logout } from "@/services/authServices";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  checkingAuth:true,
  error: null,
};

//Login thunk
export const loginUser = createAsyncThunk<User, LoginData, { rejectValue: string }>("auth/login", async (data: LoginData, thunkAPI) => {
  try {
    const user = await login(data);
    return user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});
//Logout thunk
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>("auth/logout", async (_, thunkAPI) => {
  try {
    await logout();
  } catch (err: any) {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.checkingAuth=false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.checkingAuth=false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login Failed";
        state.checkingAuth=false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = (action.payload as string) || "Logout failed";
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
