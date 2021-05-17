import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { AudienceFaceExpression } from "../models";
import { DataStore } from "aws-amplify";
import { RootState } from "../reduxStore";
import last from "lodash-es/last";

export const addFaceExpressionScore = createAsyncThunk(
  "audienceFaceExpressions/addScore",
  async (data: { score: number; meetingID: string }) => {
    return (await DataStore.save(
      new AudienceFaceExpression({
        score: data.score,
        meetingID: data.meetingID,
        timestamp: Date.now(),
      })
    )) as AudienceFaceExpression;
  }
);

const audienceFaceExpressionAdapter =
  createEntityAdapter<AudienceFaceExpression>({
    sortComparer: (a: AudienceFaceExpression, b: AudienceFaceExpression) =>
      a.timestamp - b.timestamp,
  });
const initialState = audienceFaceExpressionAdapter.getInitialState();

export const audienceFaceExpressionSlice = createSlice({
  name: "audienceFaceExpressions",
  initialState,
  reducers: {
    fetchAudienceFaceExpressions: audienceFaceExpressionAdapter.upsertMany,
    deleteAudienceFaceExpressions: audienceFaceExpressionAdapter.removeMany,
  },
  extraReducers: (builder) => {
    builder.addCase(
      addFaceExpressionScore.fulfilled,
      audienceFaceExpressionAdapter.upsertOne
    );
  },
});

export const { fetchAudienceFaceExpressions, deleteAudienceFaceExpressions } =
  audienceFaceExpressionSlice.actions;

export const { selectAll: selectAllAudienceFaceExpressions } =
  audienceFaceExpressionAdapter.getSelectors(
    (state: RootState) => state.audienceFaceExpressions
  );

export const selectActiveMeetingAudienceFaceExpressions = createSelector(
  [
    (state: RootState) => state.meetings.activeMeeting,
    selectAllAudienceFaceExpressions,
  ],
  (activeMeetingId: string | null, expressions: AudienceFaceExpression[]) =>
    expressions.filter((e) => e.meetingID === activeMeetingId)
);

export const selectActiveMeetingAudienceFaceExpressionsCurrentScore =
  createSelector(selectActiveMeetingAudienceFaceExpressions, (expressions) =>
    last(expressions)
  );

export default audienceFaceExpressionSlice.reducer;
