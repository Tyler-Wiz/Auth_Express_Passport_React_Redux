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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post("http://localhost:4001/login", {
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
          registerStatus: "user Created",
          registerError: "",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      return {
        ...state,
        username: "",
        password: "",
        token: "",
        registerError: payload,
        registerStatus: "rejected",
      };
    });
    builder.addCase(loginUser.pending, (state) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      if (payload) {
        return {
          ...state,
          token: payload,
          username: payload.username,
          password: payload.password,
          _id: payload._id,
          loginStatus: "success",
        };
      } else return state;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        username: "",
        password: "",
        token: "",
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const authState = (state) => state.auth;
export default authSlice.reducer;
