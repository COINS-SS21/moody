import { RootState } from "../reduxStore";
import { createSelector, EntityId } from "@reduxjs/toolkit";
import { Meeting } from "../models";
import { meetingsAdapter } from "./meetingsSlice";

export const { selectAll: selectAllMeetings, selectById: selectMeetingById } =
  meetingsAdapter.getSelectors((state: RootState) => state.meetings);

export const selectActiveMeeting = (state: RootState) =>
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
