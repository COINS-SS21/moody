export default class ScreenCaptureService {
  private _mediaStream: MediaStream | null = null;
  private _videoEl: HTMLVideoElement | null = null;

  public async startCapturing(audio: boolean = false): Promise<void> {
    this._mediaStream = await (navigator.mediaDevices as any).getDisplayMedia({
      audio,
    });
  }

  public stopCapturing(): void {
    if (!this._mediaStream) {
      return console.info(
        "No media stream to stop found. Ignoring method call."
      );
    }

    this._mediaStream.getTracks().forEach((track) => {
      track.stop();
    });

    this._mediaStream = null;
    if (this._videoEl) {
      this._videoEl.srcObject = null;
    }
  }

  public drawIntoVideoElement(videoEl: HTMLVideoElement): void {
    this._videoEl = videoEl;
    this._videoEl.srcObject = this._mediaStream;
  }

  public get mediaStream(): MediaStream {
    if (this._mediaStream && this._mediaStream.getTracks().length > 0) {
      return this._mediaStream;
    }

    throw new Error(
      "No media stream is registered. Did you start the screen capturing?"
    );
  }
}
