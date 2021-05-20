import { Button, Typography } from "@material-ui/core";
import { Feedback } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  createFeedbackLink,
  selectActiveMeetingFeedbackLinkId,
} from "../../meetings/meetingsSlice";

export default function CreateFeedbackLinkButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const feedbackLinkId: string | undefined = useAppSelector(
    selectActiveMeetingFeedbackLinkId
  );

  return !!feedbackLinkId ? (
    <Typography variant="body1">
      Share this link with your audience to gather feedback:{" "}
      <code>{`${window.location.origin}/feedback/${feedbackLinkId}`}</code>
    </Typography>
  ) : (
    <Button
      startIcon={<Feedback />}
      color="primary"
      onClick={() => dispatch(createFeedbackLink())}
    >
      Create feedback link
    </Button>
  );
}
