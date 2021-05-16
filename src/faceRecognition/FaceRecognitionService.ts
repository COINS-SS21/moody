import * as faceapi from "face-api.js";
import {
  FaceDetection,
  FaceExpressions,
  WithFaceExpressions,
} from "face-api.js";

export default class FaceRecognitionService {
  constructor(private readonly video: HTMLVideoElement) {}

  public async loadModel() {
    await faceapi.loadSsdMobilenetv1Model("/");
    await faceapi.loadFaceExpressionModel("/");
  }

  public async detectAllFaces(): Promise<
    WithFaceExpressions<{
      detection: FaceDetection;
      expressions: FaceExpressions;
    }>[]
  > {
    return faceapi
      .detectAllFaces(this.video, new faceapi.SsdMobilenetv1Options())
      .withFaceExpressions();
  }

  public drawDetections(
    detections: WithFaceExpressions<{
      detection: FaceDetection;
      expressions: FaceExpressions;
    }>[],
    canvas?: HTMLCanvasElement | null
  ): void {
    if (!canvas) {
      return console.info(
        "No canvas to draw into is registered. Ignoring method call."
      );
    }

    canvas.width = this.video.width;
    canvas.height = this.video.height;

    const detectionsForSize = faceapi.resizeResults(detections, {
      width: canvas.width,
      height: canvas.height,
    });

    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    ctx?.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, detectionsForSize);
    faceapi.draw.drawFaceExpressions(canvas, detectionsForSize);
  }
}
