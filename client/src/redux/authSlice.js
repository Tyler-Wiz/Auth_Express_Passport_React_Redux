import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../auth/Instance";

const initialState = {
  email: "",
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
      const token = await instance
        .post("/register", {
          email: user.email,
          password: user.password,
        })
        .then((res) => res.data);
      return token;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post("http://localhost:4000/login", {
        email: user.email,
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
          email: payload.email,
          password: payload.password,
          registerStatus: "user Created",
          registerError: "",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      return {
        ...state,
        email: "",
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
          email: payload.email,
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
        email: "",
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
