import { FaceExpressions, WithFaceExpressions } from "face-api.js";
import flow from "lodash-es/flow";

export type PaulEkmanEmotion = {
  happy: number;
  surprised: number;
  neutral: number;
  sad: number;
  disgusted: number;
  fearful: number;
  angry: number;
};

export type AggregatedExpression = {
  positive: number;
  neutral: number;
  negative: number;
};

export function aggregateExpressions(
  detections: WithFaceExpressions<{
    expressions: FaceExpressions;
  }>[]
): AggregatedExpression[] {
  return detections
    .map((detection) => detection.expressions)
    .map((expression: FaceExpressions) => ({
      positive: expression.surprised + expression.happy,
      neutral: expression.neutral,
      negative:
        expression.sad +
        expression.disgusted +
        expression.fearful +
        expression.angry,
    }));
}

export function calculateExpressionScore(
  aggregatedExpressions: AggregatedExpression[]
): number {
  return aggregatedExpressions.length > 0
    ? aggregatedExpressions
        .map(
          (expression: AggregatedExpression) =>
            expression.positive - expression.negative
        )
        .reduce((acc, current) => acc + current, 0) /
        aggregatedExpressions.length
    : 0;
}

export const aggregateAndCalculateExpressionScore: (
  detections: WithFaceExpressions<{
    expressions: FaceExpressions;
  }>[]
) => number = flow(aggregateExpressions, calculateExpressionScore);

export function aggregatePaulEkmanEmotions(
  detections: WithFaceExpressions<{
    expressions: FaceExpressions;
  }>[]
): PaulEkmanEmotion[] {
  return detections.map((detection) => detection.expressions);
}

export function calculatePaulEkmanEmotionScore(
  aggregatedPaulEkmanEmotions: PaulEkmanEmotion[]
): PaulEkmanEmotion {
  const meanEmotionFor = (emotionName: keyof PaulEkmanEmotion) => {
    return aggregatedPaulEkmanEmotions.length > 0
      ? aggregatedPaulEkmanEmotions.reduce(
          (acc, current) => acc + current[emotionName],
          0
        ) / aggregatedPaulEkmanEmotions.length
      : 0;
  };

  return {
    happy: meanEmotionFor("happy"),
    surprised: meanEmotionFor("surprised"),
    neutral: meanEmotionFor("neutral"),
    sad: meanEmotionFor("sad"),
    angry: meanEmotionFor("angry"),
    disgusted: meanEmotionFor("disgusted"),
    fearful: meanEmotionFor("fearful"),
  };
}

export const aggregateAndCalculatePaulEkmanEmotionScore: (
  detections: WithFaceExpressions<{
    expressions: FaceExpressions;
  }>[]
) => PaulEkmanEmotion = flow(
  aggregatePaulEkmanEmotions,
  calculatePaulEkmanEmotionScore
);
