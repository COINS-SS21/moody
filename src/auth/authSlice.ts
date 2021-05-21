import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LoggedInUserInfo = {
  email: string;
  name: string;
  id: string;
};

type ReduxAuthState = {
  signedIn: boolean;
  loading: boolean;
  user?: LoggedInUserInfo;
};

const initialState: ReduxAuthState = {
  signedIn: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<LoggedInUserInfo>) {
      state.user = action.payload;
      state.signedIn = true;
      state.loading = false;
    },
    signOut(state) {
      delete state.user;
      state.signedIn = false;
      state.loading = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
