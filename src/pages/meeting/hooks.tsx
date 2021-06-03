import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ScreenCaptureService from "../../media/ScreenCaptureService";
import { fetchMeeting, setActiveMeeting } from "../../meetings/meetingsSlice";
import { Meeting as MeetingModel } from "../../models";
import { unwrapResult } from "@reduxjs/toolkit";
import FaceRecognitionService from "../../meetings/FaceRecognitionService";
import { addFaceExpressionScore } from "../../meetings/audienceFaceExpressionSlice";
import {
  aggregateAndCalculateExpressionScore,
  aggregateAndCalculatePaulEkmanEmotionScore,
} from "../../meetings/utils";
import { addError } from "../../error/errorSlice";
import {
  activeMeetingEnded,
  activeMeetingRunning,
  selectMeetingById,
} from "../../meetings/meetingsSelectors";
import {
  FaceDetection,
  FaceExpressions,
  WithFaceExpressions,
} from "face-api.js";

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
  const detectionsRef = useRef<
    WithFaceExpressions<{
      detection: FaceDetection;
      expressions: FaceExpressions;
    }>[]
  >([]);
  const faceRecognitionServiceRef = useRef<FaceRecognitionService>();

  // Initialize the face recognition service
  useEffect(() => {
    const initializeFaceDetection = async () => {
      faceRecognitionServiceRef.current = new FaceRecognitionService(
        videoRef.current!
      );
      await faceRecognitionServiceRef.current.loadModel();
    };
    initializeFaceDetection();
  }, [videoRef]);

  // Perform the detections every second
  useEffect(() => {
    let interval: number;
    const syncDetections = async () => {
      if (meetingRunning) {
        try {
          interval = window.setInterval(async () => {
            await faceRecognitionServiceRef
              .current!.detectAllFaces()
              .then((detections) => (detectionsRef.current = detections));
            if (detectionsRef.current.length > 0) {
              await dispatch(
                addFaceExpressionScore({
                  score: aggregateAndCalculateExpressionScore(
                    detectionsRef.current
                  ),
                  raw: aggregateAndCalculatePaulEkmanEmotionScore(
                    detectionsRef.current
                  ),
                  meetingID,
                })
              );
            }
          }, 1000);
        } catch (e) {
          await dispatch(
            addError(
              "Error while trying to save detected emotions: " + e.message
            )
          );
        }
      }
    };

    syncDetections();

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, meetingID, meetingRunning]);

  // Draw the most recent detections with a high frame rate
  useLayoutEffect(() => {
    let animationFrame: number;
    if (meetingRunning) {
      const drawDetections = () => {
        if (!!canvasRef.current) {
          faceRecognitionServiceRef.current!.drawDetections(
            detectionsRef.current,
            canvasRef.current
          );
        }
        animationFrame = requestAnimationFrame(drawDetections);
      };
      animationFrame = requestAnimationFrame(drawDetections);

      return () => {
        cancelAnimationFrame(animationFrame);
        canvasRef.current
          ?.getContext("2d")
          // eslint-disable-next-line react-hooks/exhaustive-deps
          ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  }, [canvasRef, meetingRunning]);
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
