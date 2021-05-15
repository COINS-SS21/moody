import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import { RootState } from "../reduxStore";
import { Meeting } from "../models";
import { createModelFromPlain } from "../models/utils";

export const fetchAllMeetings = createAsyncThunk(
  "meetings/fetchAll",
  async () => {
    return (await DataStore.query(Meeting)) as Meeting[];
  }
);

export const fetchMeeting = createAsyncThunk(
  "meetings/fetchOne",
  async (id: string) => {
    return (await DataStore.query(Meeting, id)) as Meeting | undefined;
  }
);

export const addMeeting = createAsyncThunk(
  "meetings/create",
  async (name: string) => {
    return (await DataStore.save(new Meeting({ name }))) as Meeting;
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
      return (await DataStore.delete(meetingToDelete)) as Meeting;
    }
  }
);

export const startMeeting = createAsyncThunk(
  "meetings/start",
  async (_, { getState }) => {
    const state: RootState = getState() as RootState;
    const activeMeetingId: string | null = state.meetings.activeMeeting;

    if (activeMeetingId) {
      const activeMeeting: Meeting = selectMeetingById(state, activeMeetingId)!;

      if (!activeMeeting.startedAt) {
        return (await DataStore.save(
          Meeting.copyOf(
            createModelFromPlain(Meeting, activeMeeting),
            (meeting) => {
              meeting.startedAt = new Date().toISOString();
            }
          )
        )) as Meeting;
      }
    }
  }
);

export const stopMeeting = createAsyncThunk(
  "meetings/stop",
  async (_, { getState }) => {
    const state: RootState = getState() as RootState;
    const activeMeetingId: string | null = state.meetings.activeMeeting;

    if (activeMeetingId) {
      const activeMeeting: Meeting = selectMeetingById(state, activeMeetingId)!;

      if (!activeMeeting.stoppedAt) {
        return (await DataStore.save(
          Meeting.copyOf(
            createModelFromPlain(Meeting, activeMeeting),
            (meeting) => {
              meeting.stoppedAt = new Date().toISOString();
            }
          )
        )) as Meeting;
      }
    }
  }
);

const meetingsAdapter = createEntityAdapter<Meeting>({
  sortComparer: (a: Meeting, b: Meeting) =>
    new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime(),
});
const initialState = meetingsAdapter.getInitialState({
  loading: false as boolean,
  activeMeeting: null as string | null,
});

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
      })
      .addCase(fetchMeeting.pending, (state) => {
        state.activeMeeting = null;
        state.loading = true;
      })
      .addCase(fetchMeeting.rejected, (state) => {
        state.activeMeeting = null;
        state.loading = false;
      })
      .addCase(fetchMeeting.fulfilled, (state, { payload }) => {
        if (payload) {
          state.activeMeeting = payload.id;
          meetingsAdapter.upsertOne(state, payload);
        }
        state.loading = false;
      })
      .addCase(startMeeting.fulfilled, (state, { payload }) => {
        if (payload) {
          meetingsAdapter.updateOne(state, {
            id: payload.id,
            changes: {
              startedAt: payload.startedAt,
            },
          });
        }
      })
      .addCase(stopMeeting.fulfilled, (state, { payload }) => {
        if (payload) {
          meetingsAdapter.updateOne(state, {
            id: payload.id,
            changes: {
              stoppedAt: payload.stoppedAt,
            },
          });
        }
      });
  },
});

export const { selectAll: selectAllMeetings, selectById: selectMeetingById } =
  meetingsAdapter.getSelectors((state: RootState) => state.meetings);

export const activeMeetingRunning = createSelector(
  (state: RootState) => state.meetings,
  (meetings) => {
    const activeMeetingId: string | null = meetings.activeMeeting;
    if (activeMeetingId) {
      const activeMeeting: Meeting | undefined =
        meetings.entities[activeMeetingId];
      return !!(
        activeMeeting &&
        !!activeMeeting.startedAt &&
        !activeMeeting.stoppedAt
      );
    }
    return false;
  }
);

export default meetingsSlice.reducer;
