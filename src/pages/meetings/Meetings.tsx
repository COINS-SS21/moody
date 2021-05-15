import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { fetchAllMeetings } from "../../meetings/meetingsSlice";
import { Box, Container, Paper, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import MeetingTable from "./MeetingTable";
import AddMeetingButton from "./AddMeetingButton";
import { PersonalVideo } from "@material-ui/icons";

export default function Meetings(): JSX.Element {
  const dispatch = useAppDispatch();

  const name = useAppSelector((state) => state.auth.user?.name);

  useEffect(() => {
    const fetchMeetings = async () => {
      dispatch(fetchAllMeetings());
    };

    fetchMeetings();
  }, [dispatch]);

  return (
    <Page>
      <Container>
        <Typography variant="h1">Welcome, {name}</Typography>
        <Box fontSize="h3.fontSize" mb={4}>
          Let's get started! 🚀
        </Box>
        <Typography variant="h2">
          <Box display="flex" alignItems="center">
            <PersonalVideo fontSize="inherit" />
            <Box ml={2}>Your meetings</Box>
          </Box>
        </Typography>
        <Typography variant="body1" paragraph>
          Create a new meeting or choose one from below.
        </Typography>
        <Box>
          <Box mb={2}>
            <AddMeetingButton />
          </Box>
          <Paper>
            <MeetingTable />
          </Paper>
        </Box>
      </Container>
    </Page>
  );
}
