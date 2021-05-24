import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Feedback,
  FileCopy,
  HourglassEmpty,
  Security,
  Visibility,
} from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { createFeedbackLink } from "../../meetings/meetingsSlice";
import SimpleDialog from "../../components/SimpleDialog";
import { useState } from "react";
import clipboardCopy from "clipboard-copy";
import { addMinutes, differenceInMinutes, formatDistanceToNow } from "date-fns";
import { EXPIRATION_MINUTES } from "../feedback/constants";
import { Alert, AlertTitle } from "@material-ui/lab";
import {
  selectActiveMeeting,
  selectActiveMeetingFeedbackLinkId,
} from "../../meetings/meetingsSelectors";

const FeedbackLinkExpiredButton = (): JSX.Element => (
  <Button disabled color="primary" startIcon={<HourglassEmpty />}>
    Feedback link expired
  </Button>
);

const useStyles = makeStyles(() => ({
  code: {
    wordBreak: "break-all",
  },
}));

export default function FeedbackLinkButton(): JSX.Element {
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

  const classes = useStyles();

  return !!feedbackLinkId ? (
    linkExpired ? (
      <FeedbackLinkExpiredButton />
    ) : (
      <>
        <SimpleDialog
          header="Feedback link"
          body={
            <>
              <Box mb={1}>
                <Alert severity="info" icon={<Security />}>
                  <AlertTitle>Privacy information</AlertTitle>
                  <Typography variant="body1">
                    The meeting name and the meeting end date will be visible to
                    the user. Your personal information and all other
                    information related to this meeting stay private.
                  </Typography>
                </Alert>
              </Box>
              <Typography variant="body1">
                <strong>
                  Share this link with your audience to gather feedback:
                </strong>
              </Typography>
              <Box
                border={1}
                borderColor="primary.main"
                p={1}
                my={1}
                borderRadius={4}
                display="flex"
                alignItems="center"
              >
                <code className={classes.code}>{feedbackLink!}</code>
                <Box>
                  <Tooltip title="Copy link">
                    <IconButton onClick={() => clipboardCopy(feedbackLink!)}>
                      <FileCopy />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Typography variant="body2">
                The link expires in{" "}
                <strong>
                  {formatDistanceToNow(
                    addMinutes(
                      new Date(activeMeetingStoppedAt!),
                      EXPIRATION_MINUTES
                    )
                  )}
                </strong>
                .
              </Typography>
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
  ) : linkExpired ? (
    <FeedbackLinkExpiredButton />
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
