import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
  useTheme,
} from "@material-ui/core";
import { RefObject, useEffect, useRef, useState } from "react";
import Meyda, { MeydaAnalyzer } from "meyda";
import Plot from "react-plotly.js";
import { InferenceSession, Tensor } from "onnxjs";
import { softmax } from "../utils";
import Loader from "../components/Loader";
import max from "lodash-es/max";

const VOICE_EMOTIONS = [
  "neutral",
  "calm",
  "happy",
  "sad",
  "angry",
  "fearful",
  "disgust",
  "surprised",
];

const useAudioAnalyzer = (
  audioRef: RefObject<HTMLAudioElement>,
  analyzerCallback: (features: Partial<Meyda.MeydaFeaturesObject>) => void,
  endedCallback: () => void
) => {
  const analyzer = useRef<MeydaAnalyzer | null>(null);

  return useEffect(() => {
    const createAnalyzer = async (): Promise<void> => {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audioRef.current!);
      source.connect(audioContext.destination);

      analyzer.current = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: ["buffer"],
        sampleRate: 22050 * 2,
        hopSize: 512,
        windowingFunction: "hanning",
        callback: analyzerCallback,
      });
    };

    if (audioRef.current instanceof HTMLAudioElement) {
      audioRef.current.onplay = async () => {
        if (!analyzer.current) {
          await createAnalyzer();
        }
        analyzer.current?.start();
      };

      audioRef.current.onended = () => {
        analyzer.current?.stop();
        endedCallback();
      };
    }

    return () => {
      analyzer.current?.stop();
    };
  }, [audioRef, analyzerCallback, endedCallback]);
};

let data: number[] = [];

export default function RavdessVoiceEmotion(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeVoice, setActiveVoice] = useState<string>(
    "/03-01-08-01-01-01-08.wav"
  );

  const onnxSession = useRef<InferenceSession | null>(null);
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [predictions, setPredictions] = useState<number[]>([]);

  useEffect(() => {
    const loadModel = async () => {
      setModelLoading(true);
      onnxSession.current = new InferenceSession();
      await onnxSession.current.loadModel("/onnx/voice_emotion_cnn.onnx");
      setModelLoading(false);
    };
    loadModel();
  }, []);

  useAudioAnalyzer(
    audioRef,
    (features) => {
      data.push(...features.buffer!);
    },
    async () => {
      if (onnxSession.current instanceof InferenceSession) {
        const tooLong = data.length - 88200;
        data = data.slice(
          Math.floor(tooLong / 2 + 6500),
          data.length - Math.floor(tooLong / 2 - 6500)
        );
        const inputs = [
          new Tensor(new Float32Array(data), "float32", [1, 88200]),
        ];
        const outputMap = await onnxSession.current.run(inputs);
        const outputTensor = outputMap.values().next().value;

        setPredictions(softmax(outputTensor.data));
        setWaveform([...data]);
        data = [];
      }
    }
  );

  const theme = useTheme();

  return (
    <Container>
      <Typography variant="h1">RAVDESS Voice Emotion</Typography>
      <Typography variant="h5">
        This page is useful for debugging the voice emotion model.
      </Typography>
      <Box height="4rem" mt={2} display="flex" alignItems="center">
        {modelLoading && (
          <Box display="flex" alignItems="center">
            <Box mr={2}>
              <Loader />
            </Box>
            <Box>
              <Typography variant="body1">Model loading ...</Typography>
            </Box>
          </Box>
        )}
        <Box mr={2}>
          <audio
            style={{ display: modelLoading ? "none" : "inline-block" }}
            ref={audioRef}
            controls
            crossOrigin="anonymous"
            id="audio"
            src={activeVoice}
          />
        </Box>
        <ButtonGroup color="primary">
          <Button
            disabled={activeVoice === "/03-01-08-01-01-01-08.wav"}
            onClick={() => {
              setActiveVoice("/03-01-08-01-01-01-08.wav");
            }}
          >
            Surprised
          </Button>
          <Button
            disabled={activeVoice === "/03-01-06-02-01-02-16.wav"}
            onClick={() => {
              setActiveVoice("/03-01-06-02-01-02-16.wav");
            }}
          >
            Fearful
          </Button>
          <Button
            disabled={activeVoice === "/03-01-04-01-01-02-16.wav"}
            onClick={() => {
              setActiveVoice("/03-01-04-01-01-02-16.wav");
            }}
          >
            Sad
          </Button>
          <Button
            disabled={activeVoice === "/03-01-01-01-01-01-03.wav"}
            onClick={() => {
              setActiveVoice("/03-01-01-01-01-01-03.wav");
            }}
          >
            Neutral
          </Button>
        </ButtonGroup>
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Predictions</Typography>
        {predictions.length > 0 ? (
          VOICE_EMOTIONS.map((emotion, index) => {
            return (
              <Box
                mr={2}
                display="inline-block"
                color={
                  max(predictions) === predictions[index]
                    ? "primary.main"
                    : "inherit"
                }
                key={emotion}
              >
                <Typography variant="body1">
                  <strong>{emotion.toUpperCase()}: </strong>
                  {predictions[index].toFixed(2)}
                </Typography>
              </Box>
            );
          })
        ) : (
          <Typography variant="body1">
            Run the audio file to perform a prediction.
          </Typography>
        )}
      </Box>
      <Box mt={2}>
        <Plot
          config={{
            displayModeBar: false,
          }}
          data={[{ type: "scatter", mode: "lines", y: waveform }]}
          layout={{
            title: "Waveform",
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            hovermode: false,
            width: 1000,
            height: 1000 / 1.66,
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
