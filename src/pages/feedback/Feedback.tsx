import {
  Box,
  Button,
  Container,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Error from "../../error/Error";
import { useState } from "react";
import { Alert, AlertTitle, Rating } from "@material-ui/lab";
import { Favorite, Security, Send } from "@material-ui/icons";
import { formatDistanceToNow } from "date-fns";
import NotFound from "../NotFound";
import { useFetchPublicMeeting, useSubmitAnswer } from "./hooks";
import { EXPIRATION_MINUTES, RATING_LABELS } from "./constants";
import { red } from "@material-ui/core/colors";
import { useAppSelector } from "../../reduxHooks";

const useStyles = makeStyles((theme: Theme) => ({
  stars: {
    fontSize: theme.typography.h1.fontSize,
  },
}));

export default function Feedback(): JSX.Element | null {
  const { publicMeetingId } = useParams() as any;
  const [meetingLoading, expired, publicMeeting] =
    useFetchPublicMeeting(publicMeetingId);
  const [submitLoading, submitted, submitAnswer] = useSubmitAnswer(
    publicMeeting?.id,
    publicMeeting?.owner
  );
  const signedIn: boolean = useAppSelector((state) => state.auth.signedIn);
  const userId: string | undefined = useAppSelector(
    (state) => state.auth.user?.id
  );

  const [stars, setStars] = useState<number | null>(3);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  return !meetingLoading ? (
    !publicMeeting ? (
      <NotFound />
    ) : (
      <Container>
        <Box px={[0, 4, 8, 16]}>
          {userId === publicMeeting.owner ? (
            <Alert severity="warning">
              <Typography variant="body1">
                <strong>You cannot give yourself feedback!</strong>
              </Typography>
            </Alert>
          ) : !submitted ? (
            <>
              <Box mb={2}>
                <Error />
                <Typography variant="h1">Give Feedback</Typography>
                <Typography variant="h5">
                  for the presentation <strong>{publicMeeting?.name}</strong>{" "}
                  which has just ended{" "}
                  <strong>
                    {formatDistanceToNow(new Date(publicMeeting?.startedAt!), {
                      addSuffix: true,
                    })}
                  </strong>
                </Typography>
              </Box>
              {!expired ? (
                <>
                  <Box mb={2}>
                    <Typography variant="h2">
                      How was the overall experience?
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Rating
                        name="feedback"
                        className={classes.stars}
                        value={stars}
                        onChange={(event, newValue) => {
                          setStars(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                      />
                      {stars !== null && (
                        <Box ml={2}>
                          {RATING_LABELS[hover !== -1 ? hover : stars]}
                        </Box>
                      )}
                    </Box>
                    <Typography variant="subtitle2">(Required)</Typography>
                  </Box>
                  <Box mb={2}>
                    <Button
                      disabled={!stars || submitLoading}
                      endIcon={<Send />}
                      variant="contained"
                      color="primary"
                      onClick={() => submitAnswer(stars!)}
                    >
                      Submit
                    </Button>
                  </Box>
                  <Box>
                    <Alert severity="info" icon={<Security />}>
                      <AlertTitle>Your feedback is anonymous</AlertTitle>
                      <Typography variant="body1">
                        We do not send any information related to your identity.{" "}
                        {signedIn &&
                          "Feel free to logout if you feel safer then."}
                      </Typography>
                    </Alert>
                  </Box>
                </>
              ) : (
                <Alert severity="warning">
                  <AlertTitle>This link is expired</AlertTitle>
                  <Typography variant="body1">
                    You cannot give feedback anymore as the expiration time for
                    this survey is <strong>{EXPIRATION_MINUTES} minutes</strong>
                    .
                  </Typography>
                </Alert>
              )}
            </>
          ) : (
            <Box
              height={300}
              mt={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Typography variant="h1">
                <Box display="flex">
                  <Box>Thank you</Box>
                  <Box color={red[500]} ml={2}>
                    <Favorite fontSize="inherit" />
                  </Box>
                </Box>
              </Typography>
              <Typography variant="subtitle1">
                You can close this page now.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    )
  ) : null;
}
