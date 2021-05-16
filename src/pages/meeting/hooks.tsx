import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useEffect, useRef, useState } from "react";
import ScreenCaptureService from "../../screensharing/ScreenCaptureService";
import {
  activeMeetingEnded,
  activeMeetingRunning,
  fetchMeeting,
  selectMeetingById,
  setActiveMeeting,
} from "../../meetings/meetingsSlice";
import { Meeting as MeetingModel } from "../../models";
import { unwrapResult } from "@reduxjs/toolkit";

export function useScreenCapturingIfMeetingIsRunning(
  handleStopMeeting: () => void
): [React.MutableRefObject<HTMLVideoElement | null>] {
  const dispatch = useAppDispatch();
  const screenCaptureServiceRef = useRef<ScreenCaptureService>();
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (meetingRunning) {
      const startScreenCapturing = async () => {
        screenCaptureServiceRef.current = new ScreenCaptureService();
        await screenCaptureServiceRef.current.startCapturing();
        await screenCaptureServiceRef.current.attachStreamToVideo(
          videoRef.current!
        );
        screenCaptureServiceRef.current.mediaStream
          .getTracks()[0]
          .addEventListener("ended", handleStopMeeting);
      };
      startScreenCapturing();
    }

    return () => {
      screenCaptureServiceRef.current?.stopCapturing();
    };
  }, [dispatch, handleStopMeeting, meetingRunning]);

  return [videoRef];
}

export function useFetchMeeting(id: string): [boolean] {
  const dispatch = useAppDispatch();
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const result = await dispatch(fetchMeeting(id));
      const meeting: MeetingModel | undefined = unwrapResult(result);
      if (!meeting) {
        setNotFound(true);
      } else {
        dispatch(setActiveMeeting(meeting.id));
        setNotFound(false);
      }
    };

    fetch();

    return () => {
      dispatch(setActiveMeeting(null));
    };
  }, [dispatch, id]);

  return [notFound];
}

export function useMeetingInformation(
  id: string
): [boolean, boolean, boolean, string | undefined] {
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const meetingEnded = useAppSelector(activeMeetingEnded);
  const meetingLoading = useAppSelector((state) => state.meetings.loading);
  const meetingName = useAppSelector(
    (state) => selectMeetingById(state, id)?.name
  );

  return [meetingLoading, meetingRunning, meetingEnded, meetingName];
}
