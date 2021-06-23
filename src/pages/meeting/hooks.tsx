import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ScreenCaptureService from "../../media/ScreenCaptureService";
import { fetchMeeting, setActiveMeeting } from "../../meetings/meetingsSlice";
import { Meeting as MeetingModel } from "../../models";
import { unwrapResult } from "@reduxjs/toolkit";
import FaceRecognitionService from "../../meetings/FaceRecognitionService";
import { addFaceExpressionScore } from "../../meetings/audienceFaceExpressionSlice";
import {
  aggregateAndCalculateExpressionScore,
  aggregateAndCalculatePaulEkmanEmotionScore,
} from "../../meetings/audienceFaceExpressionUtils";
import { addError } from "../../error/errorSlice";
import {
  activeMeetingEnded,
  activeMeetingRunning,
  selectMeetingById,
} from "../../meetings/meetingsSelectors";
import {
  FaceDetection,
  FaceExpressions,
  WithFaceExpressions,
} from "face-api.js";
import VoiceCaptureService from "../../media/VoiceCaptureService";
import { MeydaFeaturesObject } from "meyda";
import { peakNormalize, softmax, standardize } from "../../utils";
import {
  aggregateAndCalculateVoiceEmotionScore,
  PaulEkmanVoiceEmotion,
  VOICE_EMOTIONS,
} from "../../meetings/speakerVoiceEmotionUtils";
import { addVoiceEmotionScore } from "../../meetings/speakerVoiceEmotionSlice";
// onnxruntime-web is included in public/index.html as <script>
// .wasm files are currently not compatible with the create-react-app webpack config
const InferenceSession = (window as any).ort.InferenceSession;
const Tensor = (window as any).ort.Tensor;

// Returns a callback to start the screen capturing and automatically cleans up the react components.
// Does nothing if the meeting is stopped.
// Note: In Safari you must start a screen capturing from a user gesture handler. This means that
// you cannot ask for permissions immediately after loading the page. The user must explicitly click a button
// to agree that he will be asked for permission.
export function useScreenCapturingIfMeetingIsRunning(
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  handleStopMeeting: () => void
): () => void {
  const dispatch = useAppDispatch();
  const screenCaptureServiceRef = useRef<ScreenCaptureService>();
  const meetingRunning = useAppSelector(activeMeetingRunning);

  const startScreenCapturing = useCallback(async () => {
    if (meetingRunning) {
      try {
        screenCaptureServiceRef.current = new ScreenCaptureService();
        await screenCaptureServiceRef.current.startCapturing();
        await screenCaptureServiceRef.current.attachStreamToVideo(
          videoRef.current!
        );
        screenCaptureServiceRef.current.mediaStream
          .getTracks()[0]
          .addEventListener("ended", handleStopMeeting);
      } catch (e) {
        dispatch(
          addError(
            "Cannot start screen capturing: " +
              e.message +
              ". Try to reload the page."
          )
        );
      }
    }
  }, [dispatch, handleStopMeeting, meetingRunning, videoRef]);

  // Cleanup function
  useEffect(() => {
    return () => {
      screenCaptureServiceRef.current?.stopCapturing();
    };
  }, [meetingRunning]);

  return startScreenCapturing;
}

export function useEmotionDetection(
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
): void {
  const dispatch = useAppDispatch();
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const meetingID: string = useAppSelector(
    (state) => state.meetings.activeMeeting!
  );
  const detectionsRef = useRef<
    WithFaceExpressions<{
      detection: FaceDetection;
      expressions: FaceExpressions;
    }>[]
  >([]);
  const faceRecognitionServiceRef = useRef<FaceRecognitionService>();

  // Initialize the face recognition service
  useEffect(() => {
    const initializeFaceDetection = async () => {
      faceRecognitionServiceRef.current = new FaceRecognitionService(
        videoRef.current!
      );
      await faceRecognitionServiceRef.current.loadModel();
    };
    initializeFaceDetection();
  }, [videoRef]);

  // Perform the detections every second
  useEffect(() => {
    let interval: number;
    const syncDetections = async () => {
      if (meetingRunning) {
        try {
          interval = window.setInterval(async () => {
            await faceRecognitionServiceRef
              .current!.detectAllFaces()
              .then((detections) => (detectionsRef.current = detections));
            if (detectionsRef.current.length > 0) {
              await dispatch(
                addFaceExpressionScore({
                  score: aggregateAndCalculateExpressionScore(
                    detectionsRef.current
                  ),
                  raw: aggregateAndCalculatePaulEkmanEmotionScore(
                    detectionsRef.current
                  ),
                  meetingID,
                })
              );
            }
          }, 1000);
        } catch (e) {
          await dispatch(
            addError(
              "Error while trying to save detected emotions: " + e.message
            )
          );
        }
      }
    };

    syncDetections();

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, meetingID, meetingRunning]);

  // Draw the most recent detections with a high frame rate
  useLayoutEffect(() => {
    let animationFrame: number;
    if (meetingRunning) {
      const drawDetections = () => {
        if (!!canvasRef.current) {
          faceRecognitionServiceRef.current!.drawDetections(
            detectionsRef.current,
            canvasRef.current
          );
        }
        animationFrame = requestAnimationFrame(drawDetections);
      };
      animationFrame = requestAnimationFrame(drawDetections);

      return () => {
        cancelAnimationFrame(animationFrame);
        canvasRef.current
          ?.getContext("2d")
          // eslint-disable-next-line react-hooks/exhaustive-deps
          ?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  }, [canvasRef, meetingRunning]);
}

export function useFetchMeeting(id: string): [boolean] {
  const dispatch = useAppDispatch();
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      const result = await dispatch(fetchMeeting(id));
      const meeting: MeetingModel | undefined = unwrapResult(result);
      if (!meeting) {
        setNotFound(true);
      } else {
        dispatch(setActiveMeeting(meeting.id));
        setNotFound(false);
      }
    };

    fetch();

    return () => {
      dispatch(setActiveMeeting(null));
    };
  }, [dispatch, id]);

  return [notFound];
}

export function useMeetingInformation(
  id: string
): [boolean, boolean, boolean, string | undefined] {
  const meetingRunning = useAppSelector(activeMeetingRunning);
  const meetingEnded = useAppSelector(activeMeetingEnded);
  const meetingLoading = useAppSelector((state) => state.meetings.loading);
  const meetingName = useAppSelector(
    (state) => selectMeetingById(state, id)?.name
  );

  return [meetingLoading, meetingRunning, meetingEnded, meetingName];
}

export function useVoiceCapturingIfMeetingIsRunning(
  callback: (features: Partial<MeydaFeaturesObject>) => void
): [() => Promise<MediaStream | undefined>, () => Promise<void>] {
  const voiceCaptureServiceRef = useRef<VoiceCaptureService | null>(null);
  const dispatch = useAppDispatch();
  const meetingRunning = useAppSelector(activeMeetingRunning);

  const startVoiceCapturing = useCallback(async (): Promise<
    MediaStream | undefined
  > => {
    voiceCaptureServiceRef.current = new VoiceCaptureService();
    try {
      await voiceCaptureServiceRef.current.startCapturing();
      voiceCaptureServiceRef.current?.startAnalyzer(callback);
      return voiceCaptureServiceRef.current?.mediaStream;
    } catch (e) {
      dispatch(
        addError(
          "Cannot start voice capturing: " +
            e.message +
            ". Try to reload the page."
        )
      );
    }
  }, [callback, dispatch]);

  const stopVoiceCapturing = useCallback(async () => {
    try {
      await voiceCaptureServiceRef.current?.stopCapturing();
    } catch (e) {
      dispatch(addError(e.message));
    }
    voiceCaptureServiceRef.current = null;
  }, [dispatch]);

  // Auto cleanup on component unmount or if the meeting is stopped
  useEffect(() => {
    return () => {
      stopVoiceCapturing();
    };
  }, [meetingRunning, stopVoiceCapturing]);

  return [startVoiceCapturing, stopVoiceCapturing];
}

export function useVoiceEmotionCapturing(): [
  () => Promise<void>,
  (features: Partial<MeydaFeaturesObject>) => Promise<void>
] {
  const onnxSession = useRef<typeof InferenceSession | null>(null);

  const warmupModel = useCallback(async () => {
    onnxSession.current = await InferenceSession.create(
      "/onnx/voice_emotion_cnn.onnx",
      { executionProviders: ["wasm"] }
    );
  }, []);

  const dispatch = useAppDispatch();
  const meetingID: string = useAppSelector(
    (state) => state.meetings.activeMeeting!
  );

  // Create a buffer for the audio data.
  // This gets flushed every 2.4 seconds by the callback.
  let dataRef = useRef<number[]>([]);

  // Audio data below this threshold will be considered as silence
  // This is useful to exclude disturbing background noises for example
  const THRESHOLD_RMS = 0.003;

  // Gets the features extracted by the audio analyzer (@see VoiceCaptureService).
  // This callback should be passed to the useVoiceCapturingIfMeetingIsRunning hook.
  // It will be called with as soon as an internal buffer of 512 is full
  const extractAndPersistVoiceEmotionsCallback = useCallback(
    async (features: Partial<MeydaFeaturesObject>) => {
      if (features.rms! > THRESHOLD_RMS) {
        // Push amplitude if no silence is detected
        dataRef.current.push(...features.buffer!);
      } else {
        // Push zeros if silence is detected
        dataRef.current.push(...new Array(512).fill(0));
      }

      // Every 2.4 seconds: Save the voice emotions and flush the buffer.
      if (dataRef.current.length >= VoiceCaptureService.SAMPLE_RATE * 2.4) {
        // Copy the data to a local variable and reset the global dataRef.
        // This avoids an infinite loop if the callback is called faster than it executes.
        // This is necessary because this is an async function with a race condition on dataRef.
        const data: number[] = peakNormalize(
          standardize(
            dataRef.current.slice(0, VoiceCaptureService.SAMPLE_RATE * 2.4)
          )
        );
        dataRef.current = [];

        if (Math.min(...data) === 0 && Math.max(...data) === 0) {
          // Complete silence is reported as neutral
          await dispatch(
            addVoiceEmotionScore({
              score: 0.0,
              meetingID,
              raw: {
                neutral: 1.0,
                happy: 0.0,
                sad: 0.0,
                angry: 0.0,
                fearful: 0.0,
                disgusted: 0.0,
                surprised: 0.0,
              },
            })
          );
        } else {
          // Otherwise report predicted tensor probabilities
          const input = new Tensor("float32", Float32Array.from(data), [
            1,
            VoiceCaptureService.SAMPLE_RATE * 2.4,
          ]);
          const results = await onnxSession.current.run({ input });
          const outputTensorProbabilities: number[] = softmax(
            Array.from(results.output.data)
          );
          const voiceEmotionObject: PaulEkmanVoiceEmotion =
            VOICE_EMOTIONS.reduce(
              (
                obj: PaulEkmanVoiceEmotion,
                emotionName: keyof PaulEkmanVoiceEmotion,
                index: number
              ) => ({
                ...obj,
                [emotionName]: outputTensorProbabilities[index],
              }),
              {
                neutral: 0.0,
                happy: 0.0,
                sad: 0.0,
                angry: 0.0,
                fearful: 0.0,
                disgusted: 0.0,
                surprised: 0.0,
              }
            );
          await dispatch(
            addVoiceEmotionScore({
              score: aggregateAndCalculateVoiceEmotionScore(voiceEmotionObject),
              meetingID,
              raw: voiceEmotionObject,
            })
          );
        }
      }
    },
    [meetingID, dataRef, dispatch]
  );

  return [warmupModel, extractAndPersistVoiceEmotionsCallback];
}
