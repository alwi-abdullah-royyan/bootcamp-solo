import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false, // Set as false initially (avoid SSR mismatch)
  username: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.authStatus = true;
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.authStatus = false;
      state.username = null;
      state.isAdmin = false;
    },
    setAuthState: (state, action) => {
      // Update state from localStorage in useEffect
      state.authStatus = action.payload.authStatus;
      state.username = action.payload.username;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { loginSuccess, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
