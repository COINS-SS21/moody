import { CaseReducer, createSlice } from "@reduxjs/toolkit";
import { fetchAllCounters } from "../counter/counterSlice";

type ErrorState = {
  errors: string[];
};

const initialState: ErrorState = {
  errors: [],
};

const addError: CaseReducer = (state, action) => {
  if (action.error.message) {
    state.errors.push(action.type + ": " + action.error.message);
  }
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCounters.rejected, addError);
  },
});

export default errorSlice.reducer;
