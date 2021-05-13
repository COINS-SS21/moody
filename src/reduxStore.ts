import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import errorReducer from "./error/errorSlice";
import authReducer from "./auth/authSlice";
import meetingsReducer from "./meetings/meetingsSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    error: errorReducer,
    auth: authReducer,
    meetings: meetingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== "production"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
