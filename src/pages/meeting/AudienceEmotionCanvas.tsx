import { Box } from "@material-ui/core";
import { useEffect, useRef } from "react";
import ScreenCaptureService from "../../screensharing/ScreenCaptureService";
import FaceRecognitionService from "../../faceRecognition/FaceRecognitionService";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  activeMeetingRunning,
  stopMeeting,
} from "../../meetings/meetingsSlice";

export default function AudienceEmotionCanvas(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number>();
  const screenCaptureServiceRef = useRef<ScreenCaptureService>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    const detectEmotionsIfMeetingIsRunning = async () => {
      if (meetingRunning) {
        screenCaptureServiceRef.current = new ScreenCaptureService();
        await screenCaptureServiceRef.current.startCapturing();
        await screenCaptureServiceRef.current.drawIntoVideoElement(video!);
        screenCaptureServiceRef.current.mediaStream
          .getTracks()[0]
          .addEventListener("ended", () => {
            dispatch(stopMeeting());
          });

        const faceDetectionService = new FaceRecognitionService(
          video!,
          canvas!
        );
        await faceDetectionService.loadModel();
        intervalRef.current = window.setInterval(async () => {
          await faceDetectionService.detectAllFaces();
          faceDetectionService.drawDetections();
        }, 1000);
      }
    };

    detectEmotionsIfMeetingIsRunning();

    return () => {
      screenCaptureServiceRef.current?.stopCapturing();
      clearInterval(intervalRef.current);
      canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [meetingRunning, dispatch]);

  return (
    <Box position="relative" mt={2}>
      <video playsInline ref={videoRef} width={1024} autoPlay muted />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </Box>
  );
}
