import { useAppSelector } from "../../reduxHooks";
import { AudienceFaceExpression, SpeakerVoiceEmotion } from "../../models";
import { selectActiveMeetingAudienceFaceExpressions } from "../../meetings/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Popover,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { InfoOutlined, MoreVert } from "@material-ui/icons";
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { selectActiveMeetingSpeakerVoiceEmotions } from "../../meetings/speakerVoiceEmotionSlice";
import { guessGoodMovingAverage, movingAverage } from "../../utils";
import { activeMeetingRunning } from "../../meetings/meetingsSelectors";

type MovingAverageSelectProps = {
  callback: (audienceMa: number, speakerMa: number) => void;
  defaultAudienceMa: number;
  defaultSpeakerMa: number;
};

const MovingAverageSelect = ({
  defaultAudienceMa,
  defaultSpeakerMa,
  callback,
}: MovingAverageSelectProps) => {
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const [open, setOpen] = useState(false);
  const [audienceMa, setAudienceMa] = useState<number>(1);
  const [speakerMa, setSpeakerMa] = useState<number>(1);

  const handleClickOpen = () => {
    setAudienceMa(defaultAudienceMa);
    setSpeakerMa(defaultSpeakerMa);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    callback(audienceMa, speakerMa);
    handleClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleClickOpen}>
        <MoreVert />
      </IconButton>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth="xs"
      >
        <DialogTitle>Moving average smoothing</DialogTitle>
        <DialogContent>
          <Box display="flex">
            <Box mr={2}>
              <TextField
                id="audience-ma-input"
                type="number"
                inputProps={{
                  min: 1,
                }}
                label="Audience"
                value={audienceMa}
                color="primary"
                disabled={meetingRunning}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setAudienceMa(parseInt(e.target.value, 10) || 1);
                }}
                required
              />
            </Box>
            <Box>
              <TextField
                id="speaker-ma-input"
                type="number"
                inputProps={{
                  min: 1,
                }}
                label="Speaker"
                value={speakerMa}
                color="secondary"
                disabled={meetingRunning}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSpeakerMa(parseInt(e.target.value, 10) || 1);
                }}
                required
              />
            </Box>
          </Box>
          <Box mt={2}>
            {meetingRunning ? (
              <Typography variant="body2">
                The above values are guessed based on the curve variance and
                meeting duration. You can adjust the values after the meeting
                has finished.
              </Typography>
            ) : (
              <Typography variant="body2">
                Higher values make the curves smoother. A value of 1 is equal to
                the original curve.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function AudienceEmotionRollercoaster(): JSX.Element {
  const theme = useTheme();
  const audienceFaceExpressions: AudienceFaceExpression[] = useAppSelector(
    selectActiveMeetingAudienceFaceExpressions
  );
  const speakerVoiceEmotions: SpeakerVoiceEmotion[] = useAppSelector(
    selectActiveMeetingSpeakerVoiceEmotions
  );

  // Popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Moving average state
  const [audienceMa, setAudienceMa] = useState<number>(1);
  const [speakerMa, setSpeakerMa] = useState<number>(1);

  const updateFromDialog = useCallback(
    (audienceMa: number, speakerMa: number) => {
      setAudienceMa(audienceMa);
      setSpeakerMa(speakerMa);
    },
    []
  );

  // Guess good initial values for the moving average smoothing
  useEffect(() => {
    setAudienceMa(
      guessGoodMovingAverage(audienceFaceExpressions.map((e) => e.score))
    );
    setSpeakerMa(
      guessGoodMovingAverage(speakerVoiceEmotions.map((e) => e.score))
    );
  }, [audienceFaceExpressions, speakerVoiceEmotions]);

  // Checkbox
  const [checkboxes, setCheckboxes] = useState({
    audience: true,
    speaker: true,
  });
  const handleCheckboxes = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckboxes({ ...checkboxes, [event.target.name]: event.target.checked });
  };
  const data: object[] = [];
  if (checkboxes.audience) {
    data.push({
      name: "Audience face expressions",
      x: audienceFaceExpressions.map((e) => new Date(e.timestamp)),
      y: movingAverage(
        audienceFaceExpressions.map((e) => e.score),
        audienceMa
      ),
      type: "scatter",
      mode: "lines",
      line: { color: theme.palette.primary.main },
    });
  }
  if (checkboxes.speaker) {
    data.push({
      name: "Speaker voice emotions",
      x: speakerVoiceEmotions.map((e) => new Date(e.timestamp)),
      y: movingAverage(
        speakerVoiceEmotions.map((e) => e.score),
        speakerMa
      ),
      type: "scatter",
      mode: "lines",
      line: { color: theme.palette.secondary.main },
    });
  }

  return (
    <Paper>
      <Box position="relative">
        <Box position="absolute" top={0} right={0} zIndex={1} p={1}>
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
              <Typography variant="body2" paragraph>
                Shows the emotions by the audience for any given point in time
                on a range from -1 (negative) to +1 (positive). Emotion data is
                tracked every second.
              </Typography>
              <Typography variant="body2">
                In addition, the speakers voice emotions are plotted for any
                given point in time on a range from -1 (negative) to +1
                (positive). Voice emotion data is tracked every 2.1 seconds.
              </Typography>
            </Box>
          </Popover>
        </Box>
      </Box>
      <Box px={2} py={1}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={checkboxes.audience}
              onChange={handleCheckboxes}
              name="audience"
              size="small"
            />
          }
          label="Audience"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              checked={checkboxes.speaker}
              onChange={handleCheckboxes}
              name="speaker"
              size="small"
            />
          }
          label="Speaker"
        />
        <MovingAverageSelect
          callback={updateFromDialog}
          defaultAudienceMa={audienceMa}
          defaultSpeakerMa={speakerMa}
        />
      </Box>
      <Plot
        config={{
          displayModeBar: false,
        }}
        layout={{
          title: "Emotion Rollercoaster",
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          hoverlabel: {
            bgcolor: theme.palette.primary.main,
          },
          margin: {
            l: 40,
            r: 30,
            t: 50,
            b: 70,
          },
          width: 750,
          yaxis: {
            range: [-1.1, 1.1],
          },
          font: {
            family: theme.typography.fontFamily,
            color: theme.palette.text.primary,
          },
          showlegend: true,
          legend: { orientation: "h" },
          transition: {
            duration: 500,
            easing: "cubic-in-out",
          },
        }}
        data={data}
      />
    </Paper>
  );
}
