import { useEffect, useRef } from "react";
import FrequencyBarVisualizerService from "./FrequencyBarVisualizerService";
import { useAppDispatch } from "../reduxHooks";
import { addError } from "../error/errorSlice";
import { Card } from "@material-ui/core";

type FrequencyBarProps = {
  width?: number;
  height?: number;
};

export default function FrequencyBar({
  width,
  height,
}: FrequencyBarProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();

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
        const msg = "Cannot access audio device: " + e.message;
        dispatch(addError(msg));
        return console.error(msg);
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
  }, [dispatch]);

  return (
    <Card style={{ display: "inline-block", padding: 0 }}>
      <canvas width={width} height={height} ref={canvasRef} />
    </Card>
  );
}
