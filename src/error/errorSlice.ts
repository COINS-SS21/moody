import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllCounters } from "../counter/counterSlice";
import { fetchAllMeetings } from "../meetings/meetingsSlice";

type ErrorState = {
  errors: string[];
};

const initialState: ErrorState = {
  errors: [],
};

const addErrorReducer: CaseReducer = (state, action) => {
  if (action.error?.message) {
    state.errors.push(action.type + ": " + action.error.message);
  }

  if (action.payload && typeof action.payload === "string") {
    state.errors.push(action.payload);
  }
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    clearError(state, action: PayloadAction<number>) {
      delete state.errors[action.payload];
    },
    addError(state, action: PayloadAction<string>) {
      addErrorReducer(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCounters.rejected, addErrorReducer);
    builder.addCase(fetchAllMeetings.rejected, addErrorReducer);
  },
});

export const { clearError, addError } = errorSlice.actions;

export default errorSlice.reducer;
