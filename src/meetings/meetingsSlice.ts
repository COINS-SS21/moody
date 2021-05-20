import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DataStore } from "aws-amplify";
import { RootState } from "../reduxStore";
import { AudienceFaceExpression, Meeting, PublicMeetingInfo } from "../models";
import { createModelFromPlain } from "../models/utils";
import {
  deleteAudienceFaceExpressions,
  fetchAudienceFaceExpressions,
} from "./audienceFaceExpressionSlice";

export const fetchAllMeetings = createAsyncThunk(
  "meetings/fetchAll",
  async () => {
    return (await DataStore.query(Meeting)) as Meeting[];
  }
);

export const fetchMeeting = createAsyncThunk(
  "meetings/fetchOne",
  async (id: string, { dispatch }) => {
    const meeting = await DataStore.query(Meeting, id);

    if (meeting) {
      // Fetch corresponding AudienceFaceExpressions
      const audienceFaceExpressions = (
        await DataStore.query(AudienceFaceExpression, (a) =>
          a.meetingID("eq", meeting.id)
        )
      ).filter((faceExpression) => faceExpression.meetingID === meeting.id);
      await dispatch(fetchAudienceFaceExpressions(audienceFaceExpressions));
      return meeting;
    }
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
  async (id: string, { dispatch }) => {
    const meetingToDelete: Meeting | undefined = await DataStore.query(
      Meeting,
      id
    );

    if (meetingToDelete) {
      // Delete corresponding AudienceFaceExpressions first
      dispatch(
        deleteAudienceFaceExpressions(
          (
            await DataStore.delete(AudienceFaceExpression, (a) =>
              a.meetingID("eq", meetingToDelete.id)
            )
          ).map((a) => a.id)
        )
      );

      // TODO: Delete Ratings here as well
      // TODO: Delete public meeting here as well

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

export const createFeedbackLink = createAsyncThunk(
  "meetings/createFeedbackLink",
  async (_, { getState }) => {
    const state: RootState = getState() as RootState;
    const activeMeetingId: string | null = state.meetings.activeMeeting;

    if (activeMeetingId) {
      const activeMeeting: Meeting = selectMeetingById(state, activeMeetingId)!;
      if (!activeMeeting.startedAt || !activeMeeting.stoppedAt) {
        throw new Error(
          "You can only create feedback links once the meeting has finished."
        );
      }

      // Create a PublicMeetingInfo model which will serve as read-only model for guest users in order to give feedback
      return (await DataStore.save(
        Meeting.copyOf(
          createModelFromPlain(Meeting, activeMeeting),
          (meeting) => {
            meeting.PublicMeetingInfo = new PublicMeetingInfo({
              name: activeMeeting.name,
              startedAt: activeMeeting.startedAt!,
              stoppedAt: activeMeeting.stoppedAt!,
            });
          }
        )
      )) as Meeting;
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
  reducers: {
    setActiveMeeting(state, action: PayloadAction<string | null>) {
      state.activeMeeting = action.payload;
    },
  },
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
        state.loading = true;
      })
      .addCase(fetchMeeting.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMeeting.fulfilled, (state, { payload }) => {
        if (payload) {
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
      })
      .addCase(createFeedbackLink.fulfilled, (state, { payload }) => {
        if (payload) {
          meetingsAdapter.updateOne(state, {
            id: payload.id,
            changes: {
              PublicMeetingInfo: payload.PublicMeetingInfo,
            },
          });
        }
      });
  },
});

export const { setActiveMeeting } = meetingsSlice.actions;

export const { selectAll: selectAllMeetings, selectById: selectMeetingById } =
  meetingsAdapter.getSelectors((state: RootState) => state.meetings);

const selectActiveMeeting = (state: RootState) =>
  selectMeetingById(state, state.meetings.activeMeeting as EntityId);

// Returns true if the currently visible meeting is running, else false
export const activeMeetingRunning = createSelector(
  selectActiveMeeting,
  (activeMeeting: Meeting | undefined) => {
    return !!(
      activeMeeting &&
      !!activeMeeting.startedAt &&
      !activeMeeting.stoppedAt
    );
  }
);

// Returns true if the currently active meeting has ended, else false
export const activeMeetingEnded = createSelector(
  selectActiveMeeting,
  (activeMeeting: Meeting | undefined) => {
    return !!(
      activeMeeting &&
      !!activeMeeting.startedAt &&
      !!activeMeeting.stoppedAt
    );
  }
);

export const selectActiveMeetingFeedbackLinkId = createSelector(
  selectActiveMeeting,
  (activeMeeting: Meeting | undefined) => {
    if (activeMeeting) {
      return activeMeeting.PublicMeetingInfo?.id;
    }
  }
);

export default meetingsSlice.reducer;
