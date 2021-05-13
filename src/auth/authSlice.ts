import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoggedInUserInfo = {
  email: string;
  name: string;
};

type ReduxAuthState = {
  signedIn: boolean;
  user?: LoggedInUserInfo;
};

const initialState: ReduxAuthState = {
  signedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<LoggedInUserInfo>) {
      state.user = action.payload;
      state.signedIn = true;
    },
    signOut(state) {
      delete state.user;
      state.signedIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
