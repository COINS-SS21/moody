import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { AudienceFaceExpression } from "../models";

const audienceFaceExpressionAdapter =
  createEntityAdapter<AudienceFaceExpression>({
    sortComparer: (a: AudienceFaceExpression, b: AudienceFaceExpression) =>
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
  });
const initialState = audienceFaceExpressionAdapter.getInitialState();

export const audienceFaceExpressionSlice = createSlice({
  name: "audienceFaceExpressions",
  initialState,
  reducers: {},
});

export default audienceFaceExpressionSlice.reducer;
