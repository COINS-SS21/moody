import {
  Box,
  IconButton,
  Paper,
  Popover,
  Typography,
  useTheme,
} from "@material-ui/core";
import { AudienceFaceExpression } from "../../models";
import { useAppSelector } from "../../reduxHooks";
import { selectActiveMeetingAudienceFaceExpressions } from "../../meetings/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";
import { InfoOutlined } from "@material-ui/icons";
import { useState } from "react";
import { calculatePaulEkmanEmotionScore } from "../../meetings/audienceFaceExpressionUtils";

export default function EmotionRadar() {
  const theme = useTheme();
  const expressions: AudienceFaceExpression[] = useAppSelector(
    selectActiveMeetingAudienceFaceExpressions
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

  return (
    <Paper>
      <Box position="relative">
        <Box position="absolute" top={0} right={0} zIndex={1}>
          <IconButton color="secondary" onClick={handleOpenPopover}>
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
                Shows the average emotion distribution throughout the whole
                meeting on a logarithmic scale.
              </Typography>
            </Box>
          </Popover>
        </Box>
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
          width: 400,
          margin: {
            l: 50,
            r: 50,
            t: 80,
            b: 40,
          },
          yaxis: {
            range: [-1.1, 1.1],
          },
          font: {
            family: theme.typography.fontFamily,
            color: theme.palette.text.primary,
          },
          transition: {
            duration: 500,
            easing: "cubic-in-out",
          },
        }}
        data={[
          {
            r: Object.values(
              calculatePaulEkmanEmotionScore(
                expressions.map((e) => ({
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
          },
        ]}
      />
    </Paper>
  );
}
