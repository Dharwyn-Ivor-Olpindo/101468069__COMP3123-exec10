import { createSlice } from "@reduxjs/toolkit";
import { decodeJwtPayload } from "../utils/mockJwt";

const savedToken = localStorage.getItem("jwt_token");

const initialState = {
  token: savedToken || null,
  user: savedToken ? decodeJwtPayload(savedToken) : null,
  isAuthenticated: Boolean(savedToken),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const token = action.payload;
      state.token = token;
      state.user = decodeJwtPayload(token);
      state.isAuthenticated = true;
      localStorage.setItem("jwt_token", token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("jwt_token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;