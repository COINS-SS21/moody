import { DataGrid, GridCellParams } from "@material-ui/data-grid";
import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { ArrowForwardIos, Delete, MoreVert } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { removeMeeting } from "../../meetings/meetingsSlice";
import { useCallback, useState } from "react";
import { red } from "@material-ui/core/colors";
import { Meeting } from "../../models";
import { formatDistance } from "date-fns";
import { selectAllMeetings } from "../../meetings/meetingsSelectors";

export default function MeetingTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const meetings: Meeting[] = useAppSelector(selectAllMeetings);
  const meetingsLoading: boolean = useAppSelector(
    (state) => state.meetings.loading
  );

  const [meetingToDelete, setMeetingToDelete] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    meetingId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setMeetingToDelete(meetingId);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMeetingToDelete(null);
  };

  const handleDeleteMeeting = useCallback(() => {
    handleMenuClose();
    if (meetingToDelete) {
      dispatch(removeMeeting(meetingToDelete));
    }
  }, [dispatch, meetingToDelete]);

  return (
    <Box height="500px" width={1}>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box color={red[500]}>
          <MenuItem onClick={handleDeleteMeeting}>
            <ListItemIcon style={{ color: "inherit" }}>
              <Delete />
            </ListItemIcon>
            <Typography variant="inherit" color="inherit">
              Delete
            </Typography>
          </MenuItem>
        </Box>
      </Menu>
      <DataGrid
        loading={meetingsLoading}
        rows={meetings.map((meeting) => ({
          id: meeting.id,
          name: meeting.name,
          duration:
            !!meeting.startedAt && !!meeting.stoppedAt
              ? formatDistance(
                  new Date(meeting.stoppedAt).getTime(),
                  new Date(meeting.startedAt).getTime()
                )
              : "Not yet finished",
          createdAt: new Date(meeting.createdAt!),
        }))}
        columns={[
          { field: "name", headerName: "Meeting name", width: 300 },
          {
            field: "duration",
            headerName: "Duration",
            width: 150,
          },
          {
            field: "createdAt",
            headerName: "Creation date",
            type: "dateTime",
            width: 175,
          },
          {
            field: "id",
            headerName: "Action",
            width: 150,
            renderCell: (params: GridCellParams) => (
              <>
                <Button
                  color="primary"
                  endIcon={<ArrowForwardIos />}
                  component={RouterLink}
                  to={`/meetings/${params.value}`}
                >
                  View
                </Button>
                <IconButton
                  onClick={(event) =>
                    handleMenuOpen(event, params.value as string)
                  }
                >
                  <MoreVert />
                </IconButton>
              </>
            ),
          },
        ]}
      />
    </Box>
  );
}
