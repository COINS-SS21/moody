import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export declare class SpeakerVoiceEmotion {
  readonly id: string;
  readonly timestamp: number;
  readonly score: number;
  readonly neutral: number;
  readonly calm: number;
  readonly happy: number;
  readonly sad: number;
  readonly angry: number;
  readonly fearful: number;
  readonly disgusted: number;
  readonly surprised: number;
  readonly meetingID?: string;
  constructor(init: ModelInit<SpeakerVoiceEmotion>);
  static copyOf(
    source: SpeakerVoiceEmotion,
    mutator: (
      draft: MutableModel<SpeakerVoiceEmotion>
    ) => MutableModel<SpeakerVoiceEmotion> | void
  ): SpeakerVoiceEmotion;
}

export declare class PublicMeetingInfo {
  readonly id: string;
  readonly name: string;
  readonly startedAt: string;
  readonly stoppedAt: string;
  readonly owner?: string;
  constructor(init: ModelInit<PublicMeetingInfo>);
  static copyOf(
    source: PublicMeetingInfo,
    mutator: (
      draft: MutableModel<PublicMeetingInfo>
    ) => MutableModel<PublicMeetingInfo> | void
  ): PublicMeetingInfo;
}

export declare class Rating {
  readonly id: string;
  readonly overallStars: number;
  readonly contentStars?: number;
  readonly paceStars?: number;
  readonly owner?: string;
  readonly publicmeetinginfoID: string;
  constructor(init: ModelInit<Rating>);
  static copyOf(
    source: Rating,
    mutator: (draft: MutableModel<Rating>) => MutableModel<Rating> | void
  ): Rating;
}

export declare class Meeting {
  readonly id: string;
  readonly name: string;
  readonly AudienceFaceExpressions?: (AudienceFaceExpression | null)[];
  readonly startedAt?: string;
  readonly stoppedAt?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly PublicMeetingInfo?: PublicMeetingInfo;
  readonly SpeakerVoiceEmotions?: (SpeakerVoiceEmotion | null)[];
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
  readonly surprised?: number;
  readonly happy?: number;
  readonly neutral?: number;
  readonly sad?: number;
  readonly disgusted?: number;
  readonly fearful?: number;
  readonly angry?: number;
  readonly meetingID: string;
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
