import { Box } from "@material-ui/core";
import { useEffect, useRef } from "react";
import FaceRecognitionService from "../../faceRecognition/FaceRecognitionService";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { activeMeetingRunning } from "../../meetings/meetingsSlice";
import { aggregateAndCalculateExpressionScore } from "../../faceRecognition/utils";
import { addFaceExpressionScore } from "../../faceRecognition/audienceFaceExpressionSlice";

type AudienceEmotionCanvasProps = {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
};

export default function AudienceEmotionCanvas({
  videoRef,
}: AudienceEmotionCanvasProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const meetingID: string = useAppSelector(
    (state) => state.meetings.activeMeeting!
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;

    const detectEmotionsIfMeetingIsRunning = async () => {
      if (meetingRunning) {
        const faceDetectionService = new FaceRecognitionService(
          videoRef.current!,
          canvas!
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
          faceDetectionService.drawDetections(detections);
        }, 1000);
      }
    };

    detectEmotionsIfMeetingIsRunning();

    return () => {
      clearInterval(intervalRef.current);
      canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [dispatch, meetingRunning, meetingID, videoRef]);

  return (
    <Box position="relative">
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </Box>
  );
}
