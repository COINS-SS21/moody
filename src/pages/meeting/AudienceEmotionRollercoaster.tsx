import { useAppSelector } from "../../reduxHooks";
import { AudienceFaceExpression } from "../../models";
import { selectActiveMeetingAudienceFaceExpressions } from "../../meetings/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";
import {
  Box,
  IconButton,
  Paper,
  Popover,
  Typography,
  useTheme,
} from "@material-ui/core";
import { InfoOutlined } from "@material-ui/icons";
import { useState } from "react";

export default function AudienceEmotionRollercoaster(): JSX.Element {
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
                Shows the emotions by the audience for any given point in time
                on a range from -1 (negative) to +1 (positive). Emotion data is
                tracked every second.
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
          title: "Emotion Rollercoaster",
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          hoverlabel: {
            bgcolor: theme.palette.primary.main,
          },
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
            x: expressions.map((e) => new Date(e.timestamp)),
            y: expressions.map((e) => e.score),
            type: "scatter",
            mode: "lines",
            line: { color: theme.palette.primary.main },
          },
        ]}
      />
    </Paper>
  );
}
