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
import { selectActiveMeetingAudienceFaceExpressions } from "../../meetings/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";
import { InfoOutlined } from "@material-ui/icons";
import React, { ChangeEvent, useState } from "react";
import { calculatePaulEkmanEmotionScore } from "../../meetings/audienceFaceExpressionUtils";
import { selectActiveMeetingSpeakerVoiceEmotions } from "../../meetings/speakerVoiceEmotionSlice";

export default function EmotionRadar() {
  const theme = useTheme();
  const audienceFaceExpressions: AudienceFaceExpression[] = useAppSelector(
    selectActiveMeetingAudienceFaceExpressions
  );
  const speakerVoiceEmotions: SpeakerVoiceEmotion[] = useAppSelector(
    selectActiveMeetingSpeakerVoiceEmotions
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
      r: Object.values(
        calculatePaulEkmanEmotionScore(
          audienceFaceExpressions.map((e) => ({
            happy: e.happy ? Math.log(e.happy) : 0.0,
            surprised: e.surprised ? Math.log(e.surprised) : 0.0,
            neutral: e.neutral ? Math.log(e.neutral) : 0.0,
            sad: e.sad ? Math.log(e.sad) : 0.0,
            angry: e.angry ? Math.log(e.angry) : 0.0,
            disgusted: e.disgusted ? Math.log(e.disgusted) : 0.0,
            fearful: e.fearful ? Math.log(e.fearful) : 0.0,
          }))
        )
      ),
      marker: {
        color: theme.palette.primary.main,
      },
      theta: [
        "happy",
        "surprised",
        "neutral",
        "sad",
        "angry",
        "disgusted",
        "fearful",
      ],
      fill: "toself",
      type: "scatterpolar",
    });
  }
  if (checkboxes.speaker) {
    data.push({
      name: "Speaker voice emotions",
      r: Object.values(
        calculatePaulEkmanEmotionScore(
          speakerVoiceEmotions.map((e) => ({
            happy: e.happy ? Math.log(e.happy) : 0.0,
            surprised: e.surprised ? Math.log(e.surprised) : 0.0,
            // Please note that calm and neutral are aggregated to have class parity with the face emotions
            neutral: e.neutral && e.calm ? Math.log(e.neutral + e.calm) : 0.0,
            sad: e.sad ? Math.log(e.sad) : 0.0,
            angry: e.angry ? Math.log(e.angry) : 0.0,
            disgusted: e.disgusted ? Math.log(e.disgusted) : 0.0,
            fearful: e.fearful ? Math.log(e.fearful) : 0.0,
          }))
        )
      ),
      marker: {
        color: theme.palette.secondary.main,
      },
      theta: [
        "happy",
        "surprised",
        "neutral",
        "sad",
        "angry",
        "disgusted",
        "fearful",
      ],
      fill: "toself",
      type: "scatterpolar",
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
                Shows the audience's average emotion distribution throughout the
                whole meeting as measured by their faces on a logarithmic scale.
              </Typography>
              <Typography variant="body2">
                In addition, the speaker's average emotion distribution as
                measured by his/her voice is plotted on a logarithmic scale.
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
          title: "Emotion Radar",
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          polar: {
            bgcolor: "transparent",
            radialaxis: {
              visible: true,
              ticks: "",
              showticklabels: false,
              showline: false,
            },
          },
          hovermode: false,
          width: 465,
          margin: {
            l: 50,
            r: 50,
            t: 50,
            b: 60,
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
        }}
        data={data}
      />
    </Paper>
  );
}
