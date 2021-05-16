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
import { useCallback, useEffect, useRef, useState } from "react";
import Page from "../../components/Page";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  activeMeetingEnded,
  activeMeetingRunning,
  fetchMeeting,
  selectMeetingById,
  setActiveMeeting,
  startMeeting,
  stopMeeting,
} from "../../meetings/meetingsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Meeting as MeetingModel } from "../../models";
import Loader from "../../components/Loader";
import {
  Alert,
  AlertTitle,
  TabContext,
  TabList,
  TabPanel,
} from "@material-ui/lab";
import AudienceEmotionCanvas from "./AudienceEmotionCanvas";
import AudienceEmotionRollercoaster from "./AudienceEmotionRollercoaster";
import { AudienceEmotionCurrentScore } from "./AudienceEmotionCurrentScore";
import ScreenCaptureService from "../../screensharing/ScreenCaptureService";

export default function Meeting(): JSX.Element {
  const dispatch = useAppDispatch();

  const screenCaptureServiceRef = useRef<ScreenCaptureService>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStopMeeting = useCallback(() => {
    dispatch(stopMeeting());
  }, [dispatch]);

  const handleStartMeeting = useCallback(async () => {
    dispatch(startMeeting());
  }, [dispatch]);

  const meetingRunning = useAppSelector(activeMeetingRunning);

  useEffect(() => {
    if (meetingRunning) {
      const startScreenCapturing = async () => {
        screenCaptureServiceRef.current = new ScreenCaptureService();
        await screenCaptureServiceRef.current.startCapturing();
        await screenCaptureServiceRef.current.drawIntoVideoElement(
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
  }, [handleStopMeeting, meetingRunning]);

  const [notFound, setNotFound] = useState<boolean>(false);
  const { id } = useParams() as any;

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

  const [tabValue, setTabValue] = useState<string>("1");
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
  };

  const meetingEnded = useAppSelector(activeMeetingEnded);
  const meetingLoading = useAppSelector((state) => state.meetings.loading);
  const meetingName = useAppSelector(
    (state) => selectMeetingById(state, id)?.name
  );
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
                  <AudienceEmotionCanvas videoRef={videoRef} />
                </TabPanel>
              </TabContext>
            </Box>
          </>
        )}
      </Container>
    </Page>
  );
}
