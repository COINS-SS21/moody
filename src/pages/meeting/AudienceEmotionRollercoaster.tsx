import { useAppSelector } from "../../reduxHooks";
import { AudienceFaceExpression } from "../../models";
import { selectActiveMeetingAudienceFaceExpressions } from "../../faceRecognition/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";
import { Paper, useTheme } from "@material-ui/core";

export default function AudienceEmotionRollercoaster(): JSX.Element {
  const theme = useTheme();
  const expressions: AudienceFaceExpression[] = useAppSelector(
    selectActiveMeetingAudienceFaceExpressions
  );

  return (
    <Paper>
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
            mode: "lines+markers",
            line: { color: theme.palette.primary.main },
          },
        ]}
      />
    </Paper>
  );
}
