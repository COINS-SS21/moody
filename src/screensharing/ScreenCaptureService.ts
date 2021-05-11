export default class ScreenCaptureService {
  private _mediaStream: MediaStream | null = null;

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
  }

  public drawIntoVideoElement(videoEl: HTMLVideoElement | null): void {
    if (!videoEl || !(videoEl instanceof HTMLVideoElement)) {
      throw new Error("Cannot draw into invalid HTMLVideoElement.");
    }

    videoEl.srcObject = this._mediaStream;
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
