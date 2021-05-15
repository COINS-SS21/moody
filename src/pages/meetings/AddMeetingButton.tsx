import { Box, Button, TextField } from "@material-ui/core";
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
          <Box display="flex" alignItems="flex-end">
            <Box mr={1}>
              <TextField
                required
                autoFocus
                onChange={handleChange}
                label="Meeting name"
                placeholder="Enter a meeting name"
              />
            </Box>
            <Box mr={1}>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </Box>
            <Box>
              <Button
                type="reset"
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      ) : (
        <Box display="flex">
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setEditing(true)}
          >
            New meeting
          </Button>
        </Box>
      )}
    </Box>
  );
}
