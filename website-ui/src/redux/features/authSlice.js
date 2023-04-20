import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.token = "";
      state.user = "";
    },
    addFriend: (state, action) => {
      state.user.friends = action.payload;
    },
  },
});

export const { addToken, addUser, logOut, addFriend } = authSlice.actions;
export default authSlice.reducer;
