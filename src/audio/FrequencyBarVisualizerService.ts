export default class FrequencyBarVisualizerService {
  private readonly canvasCtx: CanvasRenderingContext2D;
  private readonly canvas: HTMLCanvasElement;
  private readonly WIDTH: number;
  private readonly HEIGHT: number;

  constructor(
    canvas: HTMLCanvasElement | null,
    private readonly audioCtx: AudioContext,
    private readonly mediaStream: MediaStream
  ) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
      throw new Error("Did not get a valid Canvas element.");
    }
    this.canvas = canvas;
    this.WIDTH = this.canvas.width;
    this.HEIGHT = this.canvas.height;
    console.log(this.WIDTH, this.HEIGHT);

    const canvasCtx = this.canvas.getContext("2d");
    if (!canvasCtx) {
      throw new Error("Could not retrieve a valid Canvas 2D context.");
    }
    this.canvasCtx = canvasCtx;
  }

  public async startDrawing(): Promise<Function> {
    const source = this.audioCtx.createMediaStreamSource(this.mediaStream);
    const analyzer = this.audioCtx.createAnalyser();
    source.connect(analyzer);

    analyzer.fftSize = 64;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let animationFrame: number;

    const draw = () => {
      animationFrame = requestAnimationFrame(draw);
      this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

      analyzer.getByteFrequencyData(dataArray);

      const barWidth = (this.WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        this.canvasCtx.fillStyle = `rgb(50,${barHeight + 100},50)`;
        this.canvasCtx.fillRect(
          x,
          this.HEIGHT - barHeight / 2,
          barWidth,
          barHeight
        );

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }
}
