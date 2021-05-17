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
import { selectActiveMeetingAudienceFaceExpressionsCurrentScore } from "../../faceRecognition/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";
import { InfoOutlined } from "@material-ui/icons";
import { useState } from "react";

export default function AudienceEmotionBarometer() {
  const theme = useTheme();
  const expression: AudienceFaceExpression | undefined = useAppSelector(
    selectActiveMeetingAudienceFaceExpressionsCurrentScore
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
                Shows the currently active emotions by the audience on a range
                from -1 (negative) to +1 (positive). When the meeting has ended,
                it shows the last recognized emotion.
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
          title: "Emotion Barometer",
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          hovermode: false,
          width: 300,
          margin: {
            l: 30,
            r: 10,
            t: 80,
            b: 70,
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
            x: ["Score"],
            y: [expression?.score || 0.0],
            type: "bar",
          },
        ]}
      />
    </Paper>
  );
}
