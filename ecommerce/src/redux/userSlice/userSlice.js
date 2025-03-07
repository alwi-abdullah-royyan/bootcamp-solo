// store/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false, // To check if the user is an admin
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // Check if the user has admin privileges
      state.isAdmin = action.payload?.role === "admin";
    },
    logout: (state) => {
      state.user = null;
      state.isAdmin = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
