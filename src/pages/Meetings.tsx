import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { fetchAllMeetings, selectAllMeetings } from "../meetings/meetingsSlice";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

import Loader from "../ui/Loader";
import { Meeting } from "../API";
import { Delete } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

export default function Meetings(): JSX.Element {
  const dispatch = useAppDispatch();
  const meetings: Meeting[] = useAppSelector(selectAllMeetings);
  const meetingsLoading: boolean = useAppSelector(
    (state) => state.meetings.loading
  );
  const name = useAppSelector((state) => state.auth.user?.name);

  useEffect(() => {
    const fetchMeetings = async () => {
      dispatch(fetchAllMeetings());
    };

    fetchMeetings();
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h1">Welcome, {name}</Typography>
      <Box fontSize="h3.fontSize" mb={4}>
        Let's get started! 🚀
      </Box>
      <Typography variant="h2" gutterBottom>
        Your meetings
      </Typography>
      <Box>
        {meetingsLoading ? (
          <Loader />
        ) : (
          <Paper>
            <Box height="400px" width={1}>
              <DataGrid
                rows={meetings.map((meeting) => ({
                  id: meeting.id,
                  name: meeting.name,
                  createdAt: new Date(meeting.createdAt!),
                }))}
                columns={[
                  { field: "name", headerName: "Meeting name", flex: 1 },
                  {
                    field: "createdAt",
                    headerName: "Creation date",
                    type: "dateTime",
                    flex: 0.5,
                  },
                  {
                    field: "id",
                    headerName: "Action",
                    renderCell: () => (
                      <Box color={red[500]} display="inline-block">
                        <IconButton color="inherit">
                          <Delete />
                        </IconButton>
                      </Box>
                    ),
                  },
                ]}
              />
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
