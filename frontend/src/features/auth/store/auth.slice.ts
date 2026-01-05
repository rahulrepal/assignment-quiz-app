import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth.api";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem("authToken", action.payload.token);
      }
    );
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
