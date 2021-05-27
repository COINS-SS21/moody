import { Button, Container, Typography } from "@material-ui/core";
import { useCallback } from "react";
import Meyda from "meyda";

const useAudioCapturing = () => {
  return useCallback(() => {
    const startAudioCapturing = async () => {
      const audioContext = new AudioContext();
      const audioStream: MediaStream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
      const source = audioContext.createMediaStreamSource(audioStream);
      source.connect(audioContext.destination);
      const analyzer = Meyda.createMeydaAnalyzer({
        audioContext: audioContext,
        source: source,
        bufferSize: 512,
        featureExtractors: ["mfcc"],
        callback: (features) => {
          console.log(features);
        },
      });
      analyzer.start();
    };
    startAudioCapturing();
  }, []);
};

export default function MFCC(): JSX.Element {
  const startCapturing = useAudioCapturing();

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
    </Container>
  );
}
