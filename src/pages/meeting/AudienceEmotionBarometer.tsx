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
import { AudienceFaceExpression, SpeakerVoiceEmotion } from "../../models";
import { useAppSelector } from "../../reduxHooks";
import { selectActiveMeetingAudienceFaceExpressionsCurrentScore } from "../../meetings/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";
import { InfoOutlined } from "@material-ui/icons";
import React, { ChangeEvent, useState } from "react";
import { selectActiveMeetingSpeakerVoiceEmotionsLastN } from "../../meetings/speakerVoiceEmotionSlice";
import meanBy from "lodash-es/meanBy";

export default function AudienceEmotionBarometer() {
  const theme = useTheme();
  const audienceFaceExpression: AudienceFaceExpression | undefined =
    useAppSelector(selectActiveMeetingAudienceFaceExpressionsCurrentScore);
  const speakerVoiceEmotions: SpeakerVoiceEmotion[] = useAppSelector(
    selectActiveMeetingSpeakerVoiceEmotionsLastN(5)
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
      x: ["Score"],
      y: [audienceFaceExpression?.score || 0.0],
      marker: {
        color: theme.palette.primary.main,
      },
      type: "bar",
    });
  }
  if (checkboxes.speaker) {
    data.push({
      name: "Speaker voice emotions (moving average)",
      x: ["Score"],
      y: [meanBy(speakerVoiceEmotions, "score") || 0.0],
      marker: {
        color: theme.palette.secondary.main,
      },
      type: "bar",
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
                Shows the currently active emotions by the audience on a range
                from -1 (negative) to +1 (positive).
              </Typography>
              <Typography variant="body2">
                In addition, the speaker's voice emotions are visualized
                smoothed by a moving average of order 5.
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
          title: "Emotion Barometer",
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          hovermode: false,
          width: 465,
          margin: {
            l: 30,
            r: 10,
            t: 80,
            b: 70,
          },
          yaxis: {
            range: [-1.1, 1.1],
          },
          showlegend: true,
          legend: { orientation: "h" },
          font: {
            family: theme.typography.fontFamily,
            color: theme.palette.text.primary,
          },
          transition: {
            duration: 500,
            easing: "cubic-in-out",
          },
          barmode: "group",
        }}
        data={data}
      />
    </Paper>
  );
}
