import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/user/me");
    return res.data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
