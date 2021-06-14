import { configureStore, isPlain } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import errorReducer from "./error/errorSlice";
import authReducer from "./auth/authSlice";
import meetingsReducer from "./meetings/meetingsSlice";
import audienceFaceExpressionsReducer from "./meetings/audienceFaceExpressionSlice";
import speakerVoiceEmotionsReducer from "./meetings/speakerVoiceEmotionSlice";
import ratingsReducer from "./meetings/ratingsSlice";
import logger from "redux-logger";
import { immerable } from "immer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    error: errorReducer,
    auth: authReducer,
    meetings: meetingsReducer,
    audienceFaceExpressions: audienceFaceExpressionsReducer,
    speakerVoiceEmotions: speakerVoiceEmotionsReducer,
    ratings: ratingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== "production"
      ? getDefaultMiddleware({
          serializableCheck: {
            isSerializable: (value: any) =>
              // Allow Immer.js compatible classes
              Boolean(value?.constructor[immerable]) ||
              // Allow functions to be returned by action creators
              // This might be useful if you return WebSocket unsubscribe functions from a ReduxThunk
              typeof value === "function" ||
              // Allow all plain values
              isPlain(value),
          },
        }).concat(logger)
      : getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
