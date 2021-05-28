import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useCallback, useState } from "react";
import Meyda from "meyda";
import Plot from "react-plotly.js";

const useAudioCapturing = (
  callback: (features: Partial<Meyda.MeydaFeaturesObject>) => void
) => {
  return useCallback(() => {
    const startAudioCapturing = async () => {
      const audioContext = new AudioContext();
      const audioStream: MediaStream =
        await navigator.mediaDevices.getUserMedia({
          audio: {
            noiseSuppression: true,
            sampleRate: 22050,
            echoCancellation: true,
          },
          video: false,
        });
      const source = audioContext.createMediaStreamSource(audioStream);
      //source.connect(audioContext.destination);

      const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: ["mfcc"],
        sampleRate: 22050,
        numberOfMFCCCoefficients: 40,
        callback,
      });
      analyzer.start();
    };
    startAudioCapturing();
  }, [callback]);
};

export default function MFCC(): JSX.Element {
  const [data, setData] = useState<number[][]>(
    new Array(40).fill(new Array(40).fill(0))
  );
  let counter = 0;
  const startCapturing = useAudioCapturing((features) => {
    data[counter] = features.mfcc!;
    if (counter === 0) {
      setData([...data]);
    }
    counter = (counter + 1) % 40;
  });
  const theme = useTheme();

  return (
    <Container>
      <Typography variant="h1">MFCC features</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => startCapturing()}
      >
        Start
      </Button>
      <Box>
        <Plot
          config={{
            displayModeBar: false,
          }}
          data={[{ type: "heatmap", z: data }]}
          layout={{
            title: "Mel spectogram",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            hovermode: false,
            width: 700,
            height: 700,
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
        />
      </Box>
    </Container>
  );
}
