import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import { RootState } from "../reduxStore";
import { Meeting } from "../models";

export const fetchAllMeetings = createAsyncThunk(
  "meetings/fetchAll",
  async () => {
    return await DataStore.query(Meeting);
  }
);

export const addMeeting = createAsyncThunk(
  "meetings/create",
  async (name: string) => {
    return await DataStore.save(new Meeting({ name }));
  }
);

export const removeMeeting = createAsyncThunk(
  "meetings/delete",
  async (id: string) => {
    const meetingToDelete: Meeting | undefined = await DataStore.query(
      Meeting,
      id
    );

    if (meetingToDelete) {
      return await DataStore.delete(meetingToDelete);
    }
  }
);

const meetingsAdapter = createEntityAdapter<Meeting>();
const initialState = meetingsAdapter.getInitialState({ loading: false });

export const meetingsSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeetings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMeetings.fulfilled, (state, { payload }) => {
        meetingsAdapter.upsertMany(state, payload);
        state.loading = false;
      })
      .addCase(fetchAllMeetings.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMeeting.fulfilled, (state, { payload }) => {
        meetingsAdapter.addOne(state, payload);
        state.loading = false;
      })
      .addCase(addMeeting.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeMeeting.fulfilled, (state, { payload }) => {
        if (payload?.id) {
          meetingsAdapter.removeOne(state, payload.id);
        }
        state.loading = false;
      })
      .addCase(removeMeeting.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { selectAll: selectAllMeetings } = meetingsAdapter.getSelectors(
  (state: RootState) => state.meetings
);

export default meetingsSlice.reducer;
