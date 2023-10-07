import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  password: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  token: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post("http://localhost:4001/register", {
        username: user.username,
        password: user.password,
      });
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          token: payload,
          username: payload.username,
          password: payload.password,
          registerStatus: "status",
        };
      }
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      return { ...state, registerError: payload, registerStatus: "rejected" };
    });
  },
});

export const authState = (state) => state.auth;
export default authSlice.reducer;
