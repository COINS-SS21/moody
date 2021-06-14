import {
  Box,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Popover,
  Switch,
  Typography,
} from "@material-ui/core";
import { ChangeEvent, useCallback, useState } from "react";
import { useAppSelector } from "../../reduxHooks";
import { activeMeetingRunning } from "../../meetings/meetingsSelectors";
import {
  useVoiceCapturingIfMeetingIsRunning,
  useVoiceEmotionCapturing,
} from "./hooks";
import { InfoOutlined } from "@material-ui/icons";

export default function VoiceCaptureControls(): JSX.Element {
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const [checked, setChecked] = useState<boolean>(false);
  const [warmupModel, extractAndPersistVoiceEmotionsCallback] =
    useVoiceEmotionCapturing();
  const [startVoiceCapturing, stopVoiceCapturing] =
    useVoiceCapturingIfMeetingIsRunning(extractAndPersistVoiceEmotionsCallback);
  const [modelLoading, setModelLoading] = useState<boolean>(false);

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);

      if (meetingRunning) {
        if (e.target.checked) {
          setModelLoading(true);
          await warmupModel();
          setModelLoading(false);

          // Acquire access to the microphone and start predicting the emotions
          await startVoiceCapturing();
        } else {
          // Stop accessing microphone
          await stopVoiceCapturing();
        }
      }
    },
    [meetingRunning, startVoiceCapturing, stopVoiceCapturing, warmupModel]
  );

  // Popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return modelLoading ? (
    <Box display="flex" width={200} alignItems="center">
      <Box flexGrow={1}>
        <LinearProgress color="primary" />
      </Box>
      <Box ml={2}>
        <Typography variant="body1">Warming up ...</Typography>
      </Box>
    </Box>
  ) : (
    <>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={handleChange} color="primary" />
        }
        label={`${checked ? "Disable" : "Enable"} voice emotion tracking`}
      />
      {!checked && (
        <>
          <IconButton
            color="secondary"
            onClick={handleOpenPopover}
            size="small"
          >
            <InfoOutlined />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box p={2}>
              <Typography variant="body2">
                If you enable this function, we will ask you to access your
                microphone in order to track the emotions transmitted by your
                voice. You can enable and disable it at any time during a
                meeting.
              </Typography>
            </Box>
          </Popover>
        </>
      )}
    </>
  );
}
