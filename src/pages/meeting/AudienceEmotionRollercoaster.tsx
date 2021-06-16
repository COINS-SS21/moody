import { useAppSelector } from "../../reduxHooks";
import { AudienceFaceExpression, SpeakerVoiceEmotion } from "../../models";
import { selectActiveMeetingAudienceFaceExpressions } from "../../meetings/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Popover,
  Typography,
  useTheme,
} from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { selectActiveMeetingSpeakerVoiceEmotions } from "../../meetings/speakerVoiceEmotionSlice";

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
      y: audienceFaceExpressions.map((e) => e.score),
      type: "scatter",
      mode: "lines",
      line: { color: theme.palette.primary.main },
    });
  }
  if (checkboxes.speaker) {
    data.push({
      name: "Speaker voice emotions",
      x: speakerVoiceEmotions.map((e) => new Date(e.timestamp)),
      y: speakerVoiceEmotions.map((e) => e.score),
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
                (positive). Voice motion data is tracked every 3 seconds.
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
