import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentails: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentails, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: { auth: { user: any } }) =>
  state.auth.user;
export const selectCurrentToken = (state: { auth: { token: any } }) =>
  state.auth.token;
