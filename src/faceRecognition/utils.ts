import { FaceExpressions, WithFaceExpressions } from "face-api.js";
import flow from "lodash-es/flow";

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
