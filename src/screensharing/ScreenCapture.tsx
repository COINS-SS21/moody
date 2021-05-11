import { useEffect, useRef } from "react";
import ScreenCaptureService from "./ScreenCaptureService";

type ScreenCaptureProps = {
  width?: number;
  height?: number;
};

export default function ScreenCapture({
  width,
  height,
}: ScreenCaptureProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const screenCaptureService = new ScreenCaptureService();
    const captureAndDraw = async () => {
      await screenCaptureService.startCapturing();
      screenCaptureService.drawIntoVideoElement(videoRef.current);
    };
    captureAndDraw();

    return () => {
      screenCaptureService.stopCapturing();
    };
  }, []);

  return <video width={width} height={height} ref={videoRef} autoPlay />;
}
