import { DataGrid, GridCellParams } from "@material-ui/data-grid";
import { Box, Button, IconButton } from "@material-ui/core";
import { ArrowForward, MoreVert } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Meeting } from "../../API";
import { useAppSelector } from "../../reduxHooks";
import { selectAllMeetings } from "../../meetings/meetingsSlice";

export default function MeetingTable(): JSX.Element {
  const meetings: Meeting[] = useAppSelector(selectAllMeetings);
  const meetingsLoading: boolean = useAppSelector(
    (state) => state.meetings.loading
  );

  return (
    <Box height="400px" width={1}>
      <DataGrid
        loading={meetingsLoading}
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
            width: 150,
            renderCell: (params: GridCellParams) => (
              <>
                <Button
                  color="primary"
                  endIcon={<ArrowForward />}
                  component={RouterLink}
                  to={`/meetings/${params.value}`}
                >
                  View
                </Button>
                <IconButton>
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
