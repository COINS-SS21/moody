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
import { peakNormalize, softmax } from "../utils";
import Loader from "../components/Loader";
import max from "lodash-es/max";
import Page from "../components/Page";
// onnxruntime-web is included in public/index.html as <script>
// .wasm files are currently not compatible with the create-react-app webpack config
const InferenceSession = (window as any).ort.InferenceSession;
const Tensor = (window as any).ort.Tensor;

const VOICE_EMOTIONS = [
  "neutral",
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
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext({ sampleRate: 22050 });
      const source = audioContext.createMediaElementSource(audioRef.current!);
      source.connect(audioContext.destination);

      analyzer.current = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: ["buffer", "rms"],
        sampleRate: 22050,
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
    "/ravdess/03-01-01-01-01-01-03.wav"
  );

  const onnxSession = useRef<typeof InferenceSession | null>(null);
  const [modelLoading, setModelLoading] = useState<boolean>(false);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [predictions, setPredictions] = useState<number[]>([]);

  useEffect(() => {
    const loadModel = async () => {
      setModelLoading(true);
      onnxSession.current = await InferenceSession.create(
        "/onnx/voice_emotion_cnn_resnet.onnx",
        { executionProviders: ["wasm"] }
      );
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
      if (onnxSession.current) {
        const offset = Math.floor((data.length - 22050 * 2.4) / 2);
        if (offset < 0) {
          // Pad with zeros
          data.unshift(...new Array<number>(Math.abs(offset)).fill(0.0));
          data.push(...new Array<number>(Math.abs(offset)).fill(0.0));
        } else {
          // Cut off the overhead equally at the beginning and the end
          data = data.slice(offset, 22050 * 2.4 + offset);
        }
        data = peakNormalize(data);

        const input = new Tensor("float32", Float32Array.from(data), [
          1,
          22050 * 2.4,
        ]);
        const results = await onnxSession.current.run({ input });

        setPredictions(softmax(Array.from(results.output.data)));
        setWaveform([...data]);
        data = [];
      }
    }
  );
  const theme = useTheme();

  return (
    <Page>
      <Container>
        <Typography variant="h1">Voice Emotion Debugging</Typography>
        <Typography variant="h5">
          This page is useful for debugging the voice emotion model.
        </Typography>
        <Box minHeight="4rem" mt={2} display="flex" alignItems="center">
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
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">RAVDESS</Typography>
            <Typography variant="subtitle2">
              Neutral and Calm have been merged into Neutral.
            </Typography>
            <ButtonGroup color="primary">
              <Button
                disabled={activeVoice === "/ravdess/03-01-01-01-01-01-03.wav"}
                onClick={() => {
                  setActiveVoice("/ravdess/03-01-01-01-01-01-03.wav");
                }}
              >
                Neutral
              </Button>
              <Button
                disabled={activeVoice === "/ravdess/03-01-02-02-01-01-22.wav"}
                onClick={() => {
                  setActiveVoice("/ravdess/03-01-02-02-01-01-22.wav");
                }}
              >
                Calm
              </Button>
              <Button
                disabled={activeVoice === "/ravdess/03-01-03-01-02-01-07.wav"}
                onClick={() => {
                  setActiveVoice("/ravdess/03-01-03-01-02-01-07.wav");
                }}
              >
                Happy
              </Button>
              <Button
                disabled={activeVoice === "/ravdess/03-01-04-01-01-02-16.wav"}
                onClick={() => {
                  setActiveVoice("/ravdess/03-01-04-01-01-02-16.wav");
                }}
              >
                Sad
              </Button>
              <Button
                disabled={activeVoice === "/ravdess/03-01-05-01-02-01-13.wav"}
                onClick={() => {
                  setActiveVoice("/ravdess/03-01-05-01-02-01-13.wav");
                }}
              >
                Angry
              </Button>
              <Button
                disabled={activeVoice === "/ravdess/03-01-06-02-01-02-16.wav"}
                onClick={() => {
                  setActiveVoice("/ravdess/03-01-06-02-01-02-16.wav");
                }}
              >
                Fearful
              </Button>
              <Button
                disabled={activeVoice === "/ravdess/03-01-07-01-01-01-19.wav"}
                onClick={() => {
                  setActiveVoice("/ravdess/03-01-07-01-01-01-19.wav");
                }}
              >
                Disgust
              </Button>
              <Button
                disabled={activeVoice === "/ravdess/03-01-08-01-01-01-08.wav"}
                onClick={() => {
                  setActiveVoice("/ravdess/03-01-08-01-01-01-08.wav");
                }}
              >
                Surprised
              </Button>
            </ButtonGroup>
            <Typography variant="h6">SAVEE</Typography>
            <ButtonGroup color="primary">
              <Button
                disabled={activeVoice === "/savee/n06.wav"}
                onClick={() => {
                  setActiveVoice("/savee/n06.wav");
                }}
              >
                Neutral
              </Button>
              <Button
                disabled={activeVoice === "/savee/h01.wav"}
                onClick={() => {
                  setActiveVoice("/savee/h01.wav");
                }}
              >
                Happy
              </Button>
              <Button
                disabled={activeVoice === "/savee/sa03.wav"}
                onClick={() => {
                  setActiveVoice("/savee/sa03.wav");
                }}
              >
                Sad
              </Button>
              <Button
                disabled={activeVoice === "/savee/a04.wav"}
                onClick={() => {
                  setActiveVoice("/savee/a04.wav");
                }}
              >
                Angry
              </Button>
              <Button
                disabled={activeVoice === "/savee/f01.wav"}
                onClick={() => {
                  setActiveVoice("/savee/f01.wav");
                }}
              >
                Fearful
              </Button>
              <Button
                disabled={activeVoice === "/savee/d01.wav"}
                onClick={() => {
                  setActiveVoice("/savee/d01.wav");
                }}
              >
                Disgust
              </Button>
              <Button
                disabled={activeVoice === "/savee/su08.wav"}
                onClick={() => {
                  setActiveVoice("/savee/su08.wav");
                }}
              >
                Surprised
              </Button>
            </ButtonGroup>
            <Typography variant="h6">EMO-DB</Typography>
            <Typography variant="subtitle2">
              Neutral and Boredom have been merged into Neutral.
            </Typography>
            <ButtonGroup color="primary">
              <Button
                disabled={activeVoice === "/emodb/03a01Nc.wav"}
                onClick={() => {
                  setActiveVoice("/emodb/03a01Nc.wav");
                }}
              >
                Neutral
              </Button>
              <Button
                disabled={activeVoice === "/emodb/03a04Lc.wav"}
                onClick={() => {
                  setActiveVoice("/emodb/03a04Lc.wav");
                }}
              >
                Boredom
              </Button>
              <Button
                disabled={activeVoice === "/emodb/03a01Fa.wav"}
                onClick={() => {
                  setActiveVoice("/emodb/03a01Fa.wav");
                }}
              >
                Happy
              </Button>
              <Button
                disabled={activeVoice === "/emodb/11a02Tc.wav"}
                onClick={() => {
                  setActiveVoice("/emodb/11a02Tc.wav");
                }}
              >
                Sad
              </Button>
              <Button
                disabled={activeVoice === "/emodb/03a01Wa.wav"}
                onClick={() => {
                  setActiveVoice("/emodb/03a01Wa.wav");
                }}
              >
                Angry
              </Button>
              <Button
                disabled={activeVoice === "/emodb/10a05Aa.wav"}
                onClick={() => {
                  setActiveVoice("/emodb/10a05Aa.wav");
                }}
              >
                Fearful
              </Button>
              <Button
                disabled={activeVoice === "/emodb/11b01Eb.wav"}
                onClick={() => {
                  setActiveVoice("/emodb/11b01Eb.wav");
                }}
              >
                Disgust
              </Button>
            </ButtonGroup>
          </Box>
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
                  borderBottom={max(predictions) === predictions[index] ? 1 : 0}
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
              title: "Peak-normalized waveform",
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
    </Page>
  );
}
