import * as faceapi from "face-api.js";
import {
  FaceDetection,
  FaceExpressions,
  WithFaceExpressions,
} from "face-api.js";

export default class FaceRecognitionService {
  constructor(
    private readonly video: HTMLVideoElement,
    private readonly canvas?: HTMLCanvasElement
  ) {}

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
    }>[]
  ): void {
    if (!this.canvas) {
      return console.info(
        "No canvas to draw into is registered. Ignoring method call."
      );
    }

    this.canvas.width = this.video.width;
    this.canvas.height = this.video.height;

    const detectionsForSize = faceapi.resizeResults(detections, {
      width: this.canvas.width,
      height: this.canvas.height,
    });

    const ctx = this.canvas.getContext("2d");
    ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx?.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    faceapi.draw.drawDetections(this.canvas, detectionsForSize);
    faceapi.draw.drawFaceExpressions(this.canvas, detectionsForSize);
  }
}
