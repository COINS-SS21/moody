import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { AudienceFaceExpression } from "../models";

const audienceFaceExpressionAdapter =
  createEntityAdapter<AudienceFaceExpression>();
const initialState = audienceFaceExpressionAdapter.getInitialState();

export const audienceFaceExpressionSlice = createSlice({
  name: "audienceFaceExpressions",
  initialState,
  reducers: {},
});

export default audienceFaceExpressionSlice.reducer;
