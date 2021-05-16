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
import { AudienceEmotionCurrentScore } from "./AudienceEmotionCurrentScore";
import {
  useEmotionDetection,
  useFetchMeeting,
  useMeetingInformation,
  useScreenCapturingIfMeetingIsRunning,
} from "./hooks";

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
  useScreenCapturingIfMeetingIsRunning(videoRef, handleStopMeeting);
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
        style={{ display: "none" }}
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
              <Typography variant="h5" paragraph>
                This meeting has ended and cannot be started again. 👏
              </Typography>
            ) : (
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
            )}
            <Box mt={2}>
              <TabContext value={tabValue}>
                <Paper square>
                  <TabList onChange={handleTabChange}>
                    <Tab label="Statistics" value="1" />
                    <Tab label="Faces" value="2" disabled={meetingEnded} />
                  </TabList>
                </Paper>
                <TabPanel value="1" style={{ padding: theme.spacing(2, 0) }}>
                  <Box display="inline-block" mr={2}>
                    <AudienceEmotionCurrentScore />
                  </Box>
                  <Box display="inline-block">
                    <AudienceEmotionRollercoaster />
                  </Box>
                </TabPanel>
                <TabPanel value="2" style={{ padding: theme.spacing(2, 0) }}>
                  <canvas ref={canvasRef} />
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
}
