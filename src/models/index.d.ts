import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export declare class Meeting {
  readonly id: string;
  readonly name: string;
  readonly AudienceFaceExpressions?: (AudienceFaceExpression | null)[];
  readonly startedAt?: string;
  readonly stoppedAt?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Meeting>);
  static copyOf(
    source: Meeting,
    mutator: (draft: MutableModel<Meeting>) => MutableModel<Meeting> | void
  ): Meeting;
}

export declare class AudienceFaceExpression {
  readonly id: string;
  readonly timestamp: number;
  readonly score: number;
  readonly meetingID?: string;
  readonly Meeting?: Meeting;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AudienceFaceExpression>);
  static copyOf(
    source: AudienceFaceExpression,
    mutator: (
      draft: MutableModel<AudienceFaceExpression>
    ) => MutableModel<AudienceFaceExpression> | void
  ): AudienceFaceExpression;
}
