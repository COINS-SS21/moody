import SimpleDialog from "../../components/SimpleDialog";
import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../reduxHooks";
import { activeMeetingRunning } from "../../meetings/meetingsSelectors";

export type StartScreenCapturingDialogProps = {
  handleStartScreenCapturing: () => void;
};

export default function StartScreenCapturingDialog({
  handleStartScreenCapturing,
}: StartScreenCapturingDialogProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const meetingRunning: boolean = useAppSelector(activeMeetingRunning);

  useEffect(() => {
    if (meetingRunning) {
      setOpen(true);
    }

    return () => {
      setOpen(false);
    };
  }, [meetingRunning]);

  return (
    <SimpleDialog
      header="Start the Screen Recording?"
      body={
        <Typography variant="body1">
          We will ask you for permission to access your screen. This is
          necessary to keep track of your audience's face emotions.
        </Typography>
      }
      primaryAction={() => {
        handleStartScreenCapturing();
        setOpen(false);
      }}
      primaryActionText="Allow"
      secondaryAction={() => {
        setOpen(false);
      }}
      secondaryActionText="Cancel"
      open={open}
      handleClose={() => {
        setOpen(false);
      }}
    />
  );
}
