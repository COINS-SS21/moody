import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Feedback,
  FileCopy,
  HourglassEmpty,
  Visibility,
} from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  createFeedbackLink,
  selectActiveMeeting,
  selectActiveMeetingFeedbackLinkId,
} from "../../meetings/meetingsSlice";
import SimpleDialog from "../../components/SimpleDialog";
import { useState } from "react";
import clipboardCopy from "clipboard-copy";
import { differenceInMinutes } from "date-fns";
import { EXPIRATION_MINUTES } from "../feedback/constants";

export default function CreateFeedbackLinkButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const feedbackLinkId: string | undefined = useAppSelector(
    selectActiveMeetingFeedbackLinkId
  );
  const feedbackLink: string | undefined = !!feedbackLinkId
    ? `${window.location.origin}/feedback/${feedbackLinkId}`
    : undefined;
  const activeMeetingStoppedAt = useAppSelector(
    (state) => selectActiveMeeting(state)?.stoppedAt
  );
  const linkExpired: boolean = !!activeMeetingStoppedAt
    ? Math.abs(
        differenceInMinutes(new Date(activeMeetingStoppedAt), new Date())
      ) > EXPIRATION_MINUTES
    : false;

  const [open, setOpen] = useState<boolean>(false);

  return !!feedbackLinkId ? (
    linkExpired ? (
      <Button disabled color="primary" startIcon={<HourglassEmpty />}>
        Feedback link expired
      </Button>
    ) : (
      <>
        <SimpleDialog
          header="Feedback link"
          body={
            <>
              <Typography variant="body1">
                <strong>
                  Share this link with your audience to gather feedback:
                </strong>
              </Typography>
              <Box
                border={1}
                borderColor="primary.main"
                p={1}
                mt={1}
                borderRadius={4}
                display="flex"
                alignItems="center"
              >
                <code>{feedbackLink!}</code>
                <Box>
                  <Tooltip title="Copy link">
                    <IconButton onClick={() => clipboardCopy(feedbackLink!)}>
                      <FileCopy />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </>
          }
          primaryAction={() => {}}
          primaryActionText="Close"
          open={open}
          handleClose={() => setOpen(false)}
        />
        <Button
          startIcon={<Visibility />}
          color="primary"
          onClick={() => setOpen(true)}
        >
          Show feedback link
        </Button>
      </>
    )
  ) : (
    <Button
      startIcon={<Feedback />}
      color="primary"
      onClick={async () => {
        await dispatch(createFeedbackLink());
        setOpen(true);
      }}
    >
      Create feedback link
    </Button>
  );
}
