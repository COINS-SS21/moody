import {
  Box,
  IconButton,
  Paper,
  Popover,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Rating } from "../../models";
import { useAppSelector } from "../../reduxHooks";
import { useState } from "react";
import { InfoOutlined } from "@material-ui/icons";
import Plot from "react-plotly.js";
import { selectActiveMeetingRatings } from "../../meetings/ratingsSlice";
import { range } from "lodash-es";

export default function RatingsBarChart(): JSX.Element {
  const theme = useTheme();
  const ratings: Rating[] = useAppSelector(selectActiveMeetingRatings);

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
                Shows the distribution of the overall experience scored by stars
                from 1 to 5 (1=useless, 5=excellent). This is the score your
                audience gave using the feedback link you sent them.
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
          title: "Overall experience",
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
          hovermode: false,
          width: 600,
          margin: {
            l: 30,
            r: 30,
            t: 80,
            b: 50,
          },
          font: {
            family: theme.typography.fontFamily,
            color: theme.palette.text.primary,
          },
          yaxis: {
            tickformat: ",d",
          },
          transition: {
            duration: 500,
            easing: "cubic-in-out",
          },
        }}
        data={[
          {
            x: range(1, 6).map((i) =>
              range(1, i).reduce((prev) => prev + "⭐", "⭐")
            ),
            y: range(1, 6).map(
              (i) => ratings.filter((r) => r.overallStars === i).length
            ),
            marker: {
              color: theme.palette.primary.main,
            },
            type: "bar",
          },
        ]}
      />
    </Paper>
  );
}
