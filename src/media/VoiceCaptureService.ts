import Meyda, { MeydaAnalyzer, MeydaFeaturesObject } from "meyda";

export default class VoiceCaptureService {
  private _mediaStream: MediaStream | null = null;
  private _context: AudioContext | null = null;
  private _source: MediaStreamAudioSourceNode | null = null;
  private _analyzer: MeydaAnalyzer | null = null;

  public static readonly SAMPLE_RATE = 22050 * 2;

  public async startCapturing(): Promise<void> {
    this._mediaStream = await (navigator.mediaDevices as any).getUserMedia({
      audio: {
        noiseSuppression: true,
        sampleRate: VoiceCaptureService.SAMPLE_RATE,
        echoCancellation: true,
      },
      video: false,
    });

    if (this._mediaStream) {
      this._context = new AudioContext();
      this._source = this._context.createMediaStreamSource(this._mediaStream);
    }
  }

  public async stopCapturing(): Promise<void> {
    if (!this._mediaStream) {
      return console.info(
        "No media stream to stop found. Ignoring method call."
      );
    }

    this._mediaStream.getTracks().forEach((track) => {
      track.stop();
    });

    await this._context?.close();
    this.stopAnalyzer();
    this._mediaStream = null;
    this._context = null;
    this._source = null;
  }

  public startAnalyzer(
    callback: (features: Partial<MeydaFeaturesObject>) => void
  ): void {
    if (!this._mediaStream || !this._context || !this._source) {
      throw new Error(
        "Cannot start the analyzer if one of media stream, audio context or source node is uninitialized."
      );
    }

    this._analyzer = Meyda.createMeydaAnalyzer({
      audioContext: this._context,
      source: this._source,
      bufferSize: 512,
      featureExtractors: ["buffer"],
      sampleRate: VoiceCaptureService.SAMPLE_RATE,
      hopSize: 512,
      windowingFunction: "hanning",
      callback,
    });

    this._analyzer.start();
  }

  public stopAnalyzer(): void {
    if (!this._analyzer) {
      console.info("No analyzer initialized. Ignoring method call.");
    }

    this._analyzer?.stop();
  }

  public get mediaStream(): MediaStream {
    if (this._mediaStream && this._mediaStream.getTracks().length > 0) {
      return this._mediaStream;
    }

    throw new Error(
      "No media stream is registered. Did you start the voice capturing?"
    );
  }
}
