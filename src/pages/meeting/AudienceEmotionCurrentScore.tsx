import { Paper, useTheme } from "@material-ui/core";
import { AudienceFaceExpression } from "../../models";
import { useAppSelector } from "../../reduxHooks";
import { selectActiveMeetingAudienceFaceExpressionsCurrentScore } from "../../faceRecognition/audienceFaceExpressionSlice";
import Plot from "react-plotly.js";

export function AudienceEmotionCurrentScore() {
  const theme = useTheme();
  const expression: AudienceFaceExpression | undefined = useAppSelector(
    selectActiveMeetingAudienceFaceExpressionsCurrentScore
  );

  return (
    <Paper>
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
            range: [-1, 1],
          },
          font: {
            family: theme.typography.fontFamily,
            color: theme.palette.text.primary,
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
