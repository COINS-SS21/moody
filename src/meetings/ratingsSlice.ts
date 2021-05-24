import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Meeting, Rating } from "../models";
import { RootState } from "../reduxStore";
import { DataStore } from "aws-amplify";

export const fetchActiveMeetingRatings = createAsyncThunk(
  "ratings/fetchActiveMeetingRatings",
  async (_, { getState }): Promise<Rating[]> => {
    const state = getState() as RootState;
    if (!!state.meetings.activeMeeting) {
      const activeMeeting: Meeting | undefined =
        state.meetings.entities[state.meetings.activeMeeting];

      if (activeMeeting && activeMeeting.PublicMeetingInfo?.id) {
        return await DataStore.query(Rating, (r) =>
          r.publicmeetinginfoID("eq", activeMeeting.PublicMeetingInfo!.id)
        );
      }
    }

    return [];
  }
);

export const subscribeToActiveMeetingRatings = createAsyncThunk(
  "ratings/subscribeToActiveMeetingRatings",
  async (_, { getState, dispatch }): Promise<any> => {
    const state = getState() as RootState;

    if (!!state.meetings.activeMeeting) {
      const activeMeeting: Meeting | undefined =
        state.meetings.entities[state.meetings.activeMeeting];

      if (activeMeeting && activeMeeting.PublicMeetingInfo?.id) {
        return DataStore.observe(Rating, (r) =>
          r.publicmeetinginfoID("eq", activeMeeting.PublicMeetingInfo!.id)
        ).subscribe(() => {
          dispatch(fetchActiveMeetingRatings());
        });
      }
    }
  }
);

const ratingsAdapter = createEntityAdapter<Rating>();
const initialState = ratingsAdapter.getInitialState({
  loading: true as boolean,
});

export const ratingsSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    deleteRatings: ratingsAdapter.removeMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveMeetingRatings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActiveMeetingRatings.fulfilled, (state, { payload }) => {
        ratingsAdapter.upsertMany(state, payload);
        state.loading = false;
      })
      .addCase(fetchActiveMeetingRatings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { deleteRatings } = ratingsSlice.actions;

export const { selectAll: selectAllRatings } = ratingsAdapter.getSelectors(
  (state: RootState) => state.ratings
);

export const selectActiveMeetingRatings = createSelector(
  [
    (state) =>
      !!state.meetings.activeMeeting
        ? state.meetings.entities[state.meetings.activeMeeting]
        : undefined,
    selectAllRatings,
  ],
  (activeMeeting?: Meeting, ratings?: Rating[]) =>
    ratings?.filter(
      (r) => r.publicmeetinginfoID === activeMeeting?.PublicMeetingInfo?.id
    ) || []
);

export default ratingsSlice.reducer;
