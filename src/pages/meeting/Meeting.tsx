import { Box, Button, Container, Typography } from "@material-ui/core";
import { ArrowBackIos, PlayArrow, Stop } from "@material-ui/icons";
import { useCallback, useEffect, useState } from "react";
import Page from "../../components/Page";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  activeMeetingRunning,
  fetchMeeting,
  selectMeetingById,
  startMeeting,
  stopMeeting,
} from "../../meetings/meetingsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Meeting as MeetingModel } from "../../models";
import Loader from "../../components/Loader";
import { Alert, AlertTitle } from "@material-ui/lab";
import AudienceEmotionCanvas from "./AudienceEmotionCanvas";

export default function Meeting(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams() as any;
  const [notFound, setNotFound] = useState<boolean>(false);
  const meetingLoading = useAppSelector((state) => state.meetings.loading);
  const meetingName = useAppSelector(
    (state) => selectMeetingById(state, id)?.name
  );
  const meetingRunning = useAppSelector(activeMeetingRunning);

  useEffect(() => {
    const fetch = async () => {
      const result = await dispatch(fetchMeeting(id));
      const meeting: MeetingModel | undefined = unwrapResult(result);
      if (!meeting) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    };
    fetch();
  }, [dispatch, id]);

  const handleStopMeeting = useCallback(() => {
    dispatch(stopMeeting());
  }, [dispatch]);

  const handleStartMeeting = useCallback(async () => {
    dispatch(startMeeting());
  }, [dispatch]);

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
            <Button
              color={meetingRunning ? "secondary" : "primary"}
              variant="contained"
              size="large"
              startIcon={meetingRunning ? <Stop /> : <PlayArrow />}
              onClick={meetingRunning ? handleStopMeeting : handleStartMeeting}
            >
              {meetingRunning ? "Stop" : "Start"} the meeting
            </Button>
            <AudienceEmotionCanvas />
          </>
        )}
      </Container>
    </Page>
  );
}
