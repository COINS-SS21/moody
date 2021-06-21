import flow from "lodash-es/flow";

export type PaulEkmanVoiceEmotion = {
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
};

// The index is in order with the output tensor of the ONNX model
export const VOICE_EMOTIONS: (keyof PaulEkmanVoiceEmotion)[] = [
  "neutral", // neutral
  "happy", // positive
  "sad", // negative
  "angry", // negative
  "fearful", // negative
  "disgusted", // negative
  "surprised", // positive
];

type AggregatedVoiceEmotion = {
  positive: number;
  neutral: number;
  negative: number;
};

function aggregateVoiceEmotion(
  emotion: PaulEkmanVoiceEmotion
): AggregatedVoiceEmotion {
  return {
    positive: emotion.happy + emotion.surprised,
    neutral: emotion.neutral,
    negative: emotion.sad + emotion.angry + emotion.disgusted + emotion.fearful,
  };
}

function calculateVoiceEmotionScore(
  aggregatedVoiceEmotion: AggregatedVoiceEmotion
): number {
  return aggregatedVoiceEmotion.positive - aggregatedVoiceEmotion.negative;
}

export const aggregateAndCalculateVoiceEmotionScore: (
  emotion: PaulEkmanVoiceEmotion
) => number = flow(aggregateVoiceEmotion, calculateVoiceEmotionScore);
