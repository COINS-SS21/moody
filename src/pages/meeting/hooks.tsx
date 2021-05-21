import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useCallback, useEffect, useRef, useState } from "react";
import ScreenCaptureService from "../../media/ScreenCaptureService";
import {
  activeMeetingEnded,
  activeMeetingRunning,
  fetchMeeting,
  selectMeetingById,
  setActiveMeeting,
} from "../../meetings/meetingsSlice";
import { Meeting as MeetingModel } from "../../models";
import { unwrapResult } from "@reduxjs/toolkit";
import FaceRecognitionService from "../../meetings/FaceRecognitionService";
import { addFaceExpressionScore } from "../../meetings/audienceFaceExpressionSlice";
import { aggregateAndCalculateExpressionScore } from "../../meetings/utils";
import { addError } from "../../error/errorSlice";

// Returns a callback to start the screen capturing and automatically cleans up the react components.
// Does nothing if the meeting is stopped.
// Note: In Safari you must start a screen capturing from a user gesture handler. This means that
// you cannot ask for permissions immediately after loading the page. The user must explicitly click a button
// to agree that he will be asked for permission.
export function useScreenCapturingIfMeetingIsRunning(
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  handleStopMeeting: () => void
): () => void {
  const dispatch = useAppDispatch();
  const screenCaptureServiceRef = useRef<ScreenCaptureService>();
  const meetingRunning = useAppSelector(activeMeetingRunning);

  const startScreenCapturing = useCallback(async () => {
    if (meetingRunning) {
      try {
        screenCaptureServiceRef.current = new ScreenCaptureService();
        await screenCaptureServiceRef.current.startCapturing();
        await screenCaptureServiceRef.current.attachStreamToVideo(
          videoRef.current!
        );
        screenCaptureServiceRef.current.mediaStream
          .getTracks()[0]
          .addEventListener("ended", handleStopMeeting);
      } catch (e) {
        dispatch(addError("Cannot start screen capturing: " + e.message));
      }
    }
  }, [dispatch, handleStopMeeting, meetingRunning, videoRef]);

  const stopScreenCapturing = useCallback(() => {
    screenCaptureServiceRef.current?.stopCapturing();
  }, []);

  // Cleanup function
  useEffect(() => {
    return () => {
      screenCaptureServiceRef.current?.stopCapturing();
    };
  }, [stopScreenCapturing, meetingRunning]);

  return startScreenCapturing;
}

export function useEmotionDetection(
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
): void {
  const dispatch = useAppDispatch();
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const meetingID: string = useAppSelector(
    (state) => state.meetings.activeMeeting!
  );
  const intervalRef = useRef<number>();

  useEffect(() => {
    const detectEmotionsIfMeetingIsRunning = async () => {
      if (meetingRunning) {
        try {
          const faceDetectionService = new FaceRecognitionService(
            videoRef.current!
          );
          await faceDetectionService.loadModel();
          intervalRef.current = window.setInterval(async () => {
            const detections = await faceDetectionService.detectAllFaces();
            dispatch(
              addFaceExpressionScore({
                score: aggregateAndCalculateExpressionScore(detections),
                meetingID,
              })
            );
            if (!!canvasRef.current) {
              faceDetectionService.drawDetections(
                detections,
                canvasRef.current
              );
            }
          }, 1000);
        } catch (e) {
          dispatch(addError("Error during emotion detection: " + e.message));
        }
      }
    };

    detectEmotionsIfMeetingIsRunning();

    return () => {
      clearInterval(intervalRef.current);
      canvasRef.current
        ?.getContext("2d")
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };
  }, [dispatch, meetingRunning, meetingID, videoRef, canvasRef]);
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
