import { Box, Button, Container, Typography } from "@material-ui/core";
import { ArrowBackIos, PlayArrow, Stop } from "@material-ui/icons";
import { useCallback, useRef, useState } from "react";
import FaceRecognitionService from "../../faceRecognition/FaceRecognitionService";
import ScreenCaptureService from "../../screensharing/ScreenCaptureService";
import Page from "../../components/Page";
import { Link as RouterLink } from "react-router-dom";

export default function Meeting(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number>();
  const screenCaptureServiceRef = useRef<ScreenCaptureService>();
  const [meetingStarted, setMeetingStarted] = useState<boolean>(false);

  const stopMeeting = useCallback(() => {
    screenCaptureServiceRef.current?.stopCapturing();
    clearInterval(intervalRef.current);
    canvasRef.current
      ?.getContext("2d")
      ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setMeetingStarted(false);
  }, []);

  const startMeeting = useCallback(async () => {
    screenCaptureServiceRef.current = new ScreenCaptureService();
    await screenCaptureServiceRef.current.startCapturing();
    await screenCaptureServiceRef.current.drawIntoVideoElement(
      videoRef.current!
    );
    screenCaptureServiceRef.current.mediaStream
      .getTracks()[0]
      .addEventListener("ended", stopMeeting);

    const faceDetectionService = new FaceRecognitionService(
      videoRef.current!,
      canvasRef.current!
    );
    await faceDetectionService.loadModel();
    intervalRef.current = window.setInterval(async () => {
      await faceDetectionService.detectAllFaces();
      faceDetectionService.drawDetections();
    }, 1000);
    setMeetingStarted(true);
  }, [stopMeeting]);

  return (
    <Page>
      <Container>
        <Button
          color="primary"
          startIcon={<ArrowBackIos />}
          component={RouterLink}
          to="/meetings"
        >
          Back
        </Button>
        <Typography variant="h1">Meeting</Typography>
        <Button
          color={meetingStarted ? "secondary" : "primary"}
          variant="contained"
          size="large"
          startIcon={meetingStarted ? <Stop /> : <PlayArrow />}
          onClick={meetingStarted ? stopMeeting : startMeeting}
        >
          {meetingStarted ? "Stop" : "Start"} the meeting
        </Button>
        <Box position="relative" mt={2}>
          <video playsInline ref={videoRef} width={1024} autoPlay muted />
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </Box>
      </Container>
    </Page>
  );
}
