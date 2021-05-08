import { useEffect, useRef } from "react";
import FrequencyBarVisualizerService from "./FrequencyBarVisualizerService";

type FrequencyBarProps = {
  width?: number;
  height?: number;
};

export default function FrequencyBar({
  width,
  height,
}: FrequencyBarProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelAnimation: Function;
    let audioStream: MediaStream;

    const draw = async () => {
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
      } catch (e) {
        return console.error("Cannot access audio device:", e.message);
      }

      const visualizer = new FrequencyBarVisualizerService(
        canvasRef.current,
        new AudioContext(),
        audioStream
      );
      cancelAnimation = await visualizer.startDrawing();
    };
    draw();

    return () => {
      audioStream?.getAudioTracks().forEach((track) => track.stop());
      !!cancelAnimation && cancelAnimation();
    };
  }, []);

  return <canvas width={width} height={height} ref={canvasRef} />;
}
