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
import FaceRecognitionService from "../../faceRecognition/FaceRecognitionService";
import { addFaceExpressionScore } from "../../faceRecognition/audienceFaceExpressionSlice";
import { aggregateAndCalculateExpressionScore } from "../../faceRecognition/utils";

export function useScreenCapturingIfMeetingIsRunning(
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  handleStopMeeting: () => void
): void {
  const dispatch = useAppDispatch();
  const screenCaptureServiceRef = useRef<ScreenCaptureService>();
  const meetingRunning = useAppSelector(activeMeetingRunning);

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
  }, [dispatch, handleStopMeeting, meetingRunning, videoRef]);
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
            faceDetectionService.drawDetections(detections, canvasRef.current);
          }
        }, 1000);
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
