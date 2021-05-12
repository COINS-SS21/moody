import * as faceapi from "face-api.js";
import { FaceDetection, WithFaceExpressions } from "face-api.js";

export default class FaceRecognitionService {
  private _detections: WithFaceExpressions<{
    detection: FaceDetection;
  }>[] = [];

  constructor(
    private readonly video: HTMLVideoElement,
    private readonly canvas?: HTMLCanvasElement
  ) {}

  public async loadModel() {
    await faceapi.loadSsdMobilenetv1Model("/models");
    await faceapi.loadFaceExpressionModel("/models");
  }

  public async detectAllFaces(): Promise<void> {
    this._detections = await faceapi
      .detectAllFaces(this.video, new faceapi.SsdMobilenetv1Options())
      .withFaceExpressions();
  }

  public drawDetections(): void {
    if (!this.canvas) {
      return console.info(
        "No canvas to draw into is registered. Ignoring method call."
      );
    }

    this.canvas.width = this.video.offsetWidth;
    this.canvas.height = this.video.offsetHeight;

    const detectionsForSize = faceapi.resizeResults(this._detections, {
      width: this.canvas.width,
      height: this.canvas.height,
    });

    this.canvas
      .getContext("2d")
      ?.clearRect(0, 0, this.canvas.width, this.canvas.height);

    faceapi.draw.drawDetections(this.canvas, detectionsForSize);
    faceapi.draw.drawFaceExpressions(this.canvas, detectionsForSize);
  }
}
