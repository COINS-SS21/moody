import {
  Box,
  Button,
  Container,
  Paper,
  Tab,
  Typography,
  useTheme,
} from "@material-ui/core";
import { ArrowBackIos, PlayArrow, Stop } from "@material-ui/icons";
import { useCallback, useRef, useState } from "react";
import Page from "../../components/Page";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useAppDispatch } from "../../reduxHooks";
import { startMeeting, stopMeeting } from "../../meetings/meetingsSlice";
import Loader from "../../components/Loader";
import {
  Alert,
  AlertTitle,
  TabContext,
  TabList,
  TabPanel,
} from "@material-ui/lab";
import AudienceEmotionRollercoaster from "./AudienceEmotionRollercoaster";
import AudienceEmotionBarometer from "./AudienceEmotionBarometer";
import {
  useEmotionDetection,
  useFetchMeeting,
  useMeetingInformation,
  useScreenCapturingIfMeetingIsRunning,
} from "./hooks";
import FeedbackLinkButton from "./FeedbackLinkButton";
import StartScreenCapturingDialog from "./StartScreenCapturingDialog";
import Ratings from "./Ratings";
import EmotionRadar from "./EmotionRadar";
import VoiceCaptureControls from "./VoiceCaptureControls";

export default function Meeting(): JSX.Element {
  const { id } = useParams() as any;
  const [notFound] = useFetchMeeting(id);
  const [meetingLoading, meetingRunning, meetingEnded, meetingName] =
    useMeetingInformation(id);

  const dispatch = useAppDispatch();

  const handleStartMeeting = useCallback(async () => {
    dispatch(startMeeting());
  }, [dispatch]);

  const handleStopMeeting = useCallback(() => {
    dispatch(stopMeeting());
  }, [dispatch]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleStartScreenCapturing = useScreenCapturingIfMeetingIsRunning(
    videoRef,
    handleStopMeeting
  );
  useEmotionDetection(videoRef, canvasRef);

  const [tabValue, setTabValue] = useState<string>("1");
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  const theme = useTheme();

  return (
    <Page>
      <video
        ref={videoRef}
        width={1000}
        height={564}
        autoPlay
        muted
        style={{ display: "none", visibility: "hidden" }}
      />
      <Container>
        <Button
          color="primary"
          startIcon={<ArrowBackIos />}
          component={RouterLink}
          to="/meetings"
        >
          Back
        </Button>
        {meetingLoading ? (
          <Box>
            <Loader />
          </Box>
        ) : notFound ? (
          <Box mt={2}>
            <Alert severity="warning">
              <AlertTitle>Oh no! Meeting not found 😩</AlertTitle>
              <Typography variant="body1">
                This meeting does not exist or has been deleted.
              </Typography>
            </Alert>
          </Box>
        ) : (
          <>
            <Typography variant="h1">{meetingName}</Typography>
            {meetingEnded ? (
              <>
                <Typography variant="h5">
                  This meeting has ended and cannot be started again. 👏
                </Typography>
                <FeedbackLinkButton />
              </>
            ) : (
              <Box display="flex" alignItems="center">
                <StartScreenCapturingDialog
                  handleStartScreenCapturing={handleStartScreenCapturing}
                />
                <Button
                  color={meetingRunning ? "secondary" : "primary"}
                  variant="contained"
                  size="large"
                  startIcon={meetingRunning ? <Stop /> : <PlayArrow />}
                  onClick={
                    meetingRunning ? handleStopMeeting : handleStartMeeting
                  }
                >
                  {meetingRunning ? "Stop" : "Start"} the meeting
                </Button>
                {meetingRunning && (
                  <Box ml={3}>
                    <VoiceCaptureControls />
                  </Box>
                )}
              </Box>
            )}
            <Box mt={2}>
              <TabContext value={tabValue}>
                <Paper square>
                  <TabList onChange={handleTabChange}>
                    <Tab label="Statistics" value="1" />
                    <Tab label="Faces" value="2" />
                    <Tab label="Voice" value="3" />
                    <Tab label="Ratings" value="4" />
                  </TabList>
                </Paper>
                <TabPanel value="1" style={{ padding: theme.spacing(2, 0) }}>
                  <Box display="inline-block" mr={2}>
                    {meetingEnded ? (
                      <EmotionRadar />
                    ) : (
                      <AudienceEmotionBarometer />
                    )}
                  </Box>
                  <Box display="inline-block">
                    <AudienceEmotionRollercoaster />
                  </Box>
                </TabPanel>
                <TabPanel value="2" style={{ padding: theme.spacing(2, 0) }}>
                  {!meetingRunning ? (
                    <Alert severity="info">
                      <Typography variant="body1">
                        This visualization is only available if the meeting is
                        running.
                      </Typography>
                    </Alert>
                  ) : (
                    <>
                      {!videoRef.current?.srcObject && (
                        <Alert severity="info">
                          <Typography variant="body1">
                            There is no active screen capturing. Did you allow
                            the application access to your screen? Reload the
                            page to try again.
                          </Typography>
                        </Alert>
                      )}
                      <canvas ref={canvasRef} />
                    </>
                  )}
                </TabPanel>
                <TabPanel value="3">
                  <div>Voice</div>
                </TabPanel>
                <TabPanel value="4">
                  <Ratings />
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
}
