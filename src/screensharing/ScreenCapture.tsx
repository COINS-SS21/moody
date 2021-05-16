import { useEffect, useRef } from "react";
import ScreenCaptureService from "./ScreenCaptureService";
import { useAppDispatch } from "../reduxHooks";
import { addError } from "../error/errorSlice";

type ScreenCaptureProps = {
  width?: number;
  height?: number;
};

export default function ScreenCapture({
  width,
  height,
}: ScreenCaptureProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const screenCaptureService = new ScreenCaptureService();
    const captureAndDraw = async () => {
      try {
        await screenCaptureService.startCapturing();
        await screenCaptureService.drawIntoVideoElement(videoRef.current!);
      } catch (e) {
        dispatch(addError("Cannot start screen recording: " + e.message));
      }
    };
    captureAndDraw();

    return () => {
      screenCaptureService.stopCapturing();
    };
  }, [dispatch]);

  return <video width={width} height={height} ref={videoRef} autoPlay />;
}
