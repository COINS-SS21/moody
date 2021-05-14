import { Box, Button, Grid, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../../reduxHooks";
import { addMeeting } from "../../meetings/meetingsSlice";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { Meeting } from "../../models";

export default function AddMeetingButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [editing, setEditing] = useState<boolean>(false);
  const [meetingName, setMeetingName] = useState<string>("");

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const newMeeting: Meeting = unwrapResult(
        await dispatch(addMeeting(meetingName))
      );
      setEditing(false);
      if (newMeeting.id) {
        history.push(`/meetings/${newMeeting.id}`);
      }
    },
    [dispatch, history, meetingName]
  );

  const handleCancel = useCallback(() => {
    setEditing(false);
    setMeetingName("");
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMeetingName(event.target.value);
  }, []);

  return (
    <Box minHeight="3rem" display="flex" alignItems="flex-end">
      {editing ? (
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="flex-end" spacing={1}>
            <Grid item>
              <TextField
                required
                autoFocus
                onChange={handleChange}
                label="Meeting name"
                placeholder="Enter a meeting name"
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </Grid>
            <Grid item>
              <Button
                type="reset"
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <Grid container justify="flex-start" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setEditing(true)}
          >
            New meeting
          </Button>
        </Grid>
      )}
    </Box>
  );
}
