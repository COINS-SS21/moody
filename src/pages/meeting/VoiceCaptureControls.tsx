import {
  Box,
  FormControlLabel,
  IconButton,
  LinearProgress,
  MenuItem,
  Popover,
  Switch,
  TextField,
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

type VoiceCaputreControlsProps = {
  handleMediaStream: (mediaStream: MediaStream | undefined) => void;
};

export default function VoiceCaptureControls({
  handleMediaStream,
}: VoiceCaputreControlsProps): JSX.Element {
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const [checked, setChecked] = useState<boolean>(false);
  const [warmupModel, extractAndPersistVoiceEmotionsCallback] =
    useVoiceEmotionCapturing();
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [audioDevices, setAudioDevices] = useState<InputDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string | null>(
    null
  );
  const [startVoiceCapturing, stopVoiceCapturing] =
    useVoiceCapturingIfMeetingIsRunning(extractAndPersistVoiceEmotionsCallback);

  const handeSelectAudioDevice = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      await setSelectedAudioDevice(e.target.value);

      // Stop accessing microphone
      await stopVoiceCapturing();
      handleMediaStream(undefined);

      // Acquire access to the microphone and start predicting the emotions
      handleMediaStream(await startVoiceCapturing(e.target.value));
    },
    [handleMediaStream, startVoiceCapturing, stopVoiceCapturing]
  );

  const handleVoiceCaptureSwitch = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);

      if (meetingRunning) {
        if (e.target.checked) {
          setModelLoading(true);
          await warmupModel();
          setModelLoading(false);

          // Acquire access to the microphone and start predicting the emotions
          handleMediaStream(await startVoiceCapturing());

          // Enumerate all audio input devices after acquiring permission to the microphone
          const devices = await (
            navigator.mediaDevices as any
          ).enumerateDevices();
          const audioDevices = devices.filter(
            (device: any) => device?.kind === "audioinput"
          );
          setSelectedAudioDevice(audioDevices[0].deviceId);
          setAudioDevices(audioDevices);
        } else {
          // Stop accessing microphone
          await stopVoiceCapturing();
          handleMediaStream(undefined);
        }
      }
    },
    [
      handleMediaStream,
      meetingRunning,
      startVoiceCapturing,
      stopVoiceCapturing,
      warmupModel,
    ]
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
    <Box display="flex" alignItems="center">
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleVoiceCaptureSwitch}
            color="primary"
          />
        }
        label={`${checked ? "Disable" : "Enable"} voice emotion tracking`}
      />
      {checked && audioDevices.length > 1 && (
        <TextField
          select
          label="Audio device"
          value={selectedAudioDevice}
          onChange={handeSelectAudioDevice}
          size="small"
          variant="outlined"
          style={{ width: 200 }}
        >
          {audioDevices.map((device: InputDeviceInfo) => (
            <MenuItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      {!checked && (
        <>
          <Box ml={2}>
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
          </Box>
        </>
      )}
    </Box>
  );
}
