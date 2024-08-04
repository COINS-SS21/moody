import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import {
  LazyLoading,
  LazyLoadingDisabled,
  AsyncCollection,
  AsyncItem,
} from "@aws-amplify/datastore";

type EagerSpeakerVoiceEmotion = {
  readonly id: string;
  readonly timestamp: number;
  readonly score: number;
  readonly neutral: number;
  readonly happy: number;
  readonly sad: number;
  readonly angry: number;
  readonly fearful: number;
  readonly disgusted: number;
  readonly surprised: number;
  readonly meetingID?: string | null;
};

type LazySpeakerVoiceEmotion = {
  readonly id: string;
  readonly timestamp: number;
  readonly score: number;
  readonly neutral: number;
  readonly happy: number;
  readonly sad: number;
  readonly angry: number;
  readonly fearful: number;
  readonly disgusted: number;
  readonly surprised: number;
  readonly meetingID?: string | null;
};

export declare type SpeakerVoiceEmotion =
  LazyLoading extends LazyLoadingDisabled
    ? EagerSpeakerVoiceEmotion
    : LazySpeakerVoiceEmotion;

export declare const SpeakerVoiceEmotion: (new (
  init: ModelInit<SpeakerVoiceEmotion>
) => SpeakerVoiceEmotion) & {
  copyOf(
    source: SpeakerVoiceEmotion,
    mutator: (
      draft: MutableModel<SpeakerVoiceEmotion>
    ) => MutableModel<SpeakerVoiceEmotion> | void
  ): SpeakerVoiceEmotion;
};

type EagerPublicMeetingInfo = {
  readonly id: string;
  readonly name: string;
  readonly startedAt: string;
  readonly stoppedAt: string;
  readonly owner?: string | null;
};

type LazyPublicMeetingInfo = {
  readonly id: string;
  readonly name: string;
  readonly startedAt: string;
  readonly stoppedAt: string;
  readonly owner?: string | null;
};

export declare type PublicMeetingInfo = LazyLoading extends LazyLoadingDisabled
  ? EagerPublicMeetingInfo
  : LazyPublicMeetingInfo;

export declare const PublicMeetingInfo: (new (
  init: ModelInit<PublicMeetingInfo>
) => PublicMeetingInfo) & {
  copyOf(
    source: PublicMeetingInfo,
    mutator: (
      draft: MutableModel<PublicMeetingInfo>
    ) => MutableModel<PublicMeetingInfo> | void
  ): PublicMeetingInfo;
};

type EagerRating = {
  readonly id: string;
  readonly overallStars: number;
  readonly contentStars?: number | null;
  readonly paceStars?: number | null;
  readonly owner?: string | null;
  readonly publicmeetinginfoID: string;
};

type LazyRating = {
  readonly id: string;
  readonly overallStars: number;
  readonly contentStars?: number | null;
  readonly paceStars?: number | null;
  readonly owner?: string | null;
  readonly publicmeetinginfoID: string;
};

export declare type Rating = LazyLoading extends LazyLoadingDisabled
  ? EagerRating
  : LazyRating;

export declare const Rating: (new (init: ModelInit<Rating>) => Rating) & {
  copyOf(
    source: Rating,
    mutator: (draft: MutableModel<Rating>) => MutableModel<Rating> | void
  ): Rating;
};

type EagerMeeting = {
  readonly id: string;
  readonly name: string;
  readonly AudienceFaceExpressions?: (AudienceFaceExpression | null)[] | null;
  readonly startedAt?: string | null;
  readonly stoppedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly PublicMeetingInfo?: PublicMeetingInfo | null;
  readonly SpeakerVoiceEmotions?: (SpeakerVoiceEmotion | null)[] | null;
};

type LazyMeeting = {
  readonly id: string;
  readonly name: string;
  readonly AudienceFaceExpressions: AsyncCollection<AudienceFaceExpression>;
  readonly startedAt?: string | null;
  readonly stoppedAt?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly PublicMeetingInfo: AsyncItem<PublicMeetingInfo | undefined>;
  readonly SpeakerVoiceEmotions: AsyncCollection<SpeakerVoiceEmotion>;
};

export declare type Meeting = LazyLoading extends LazyLoadingDisabled
  ? EagerMeeting
  : LazyMeeting;

export declare const Meeting: (new (init: ModelInit<Meeting>) => Meeting) & {
  copyOf(
    source: Meeting,
    mutator: (draft: MutableModel<Meeting>) => MutableModel<Meeting> | void
  ): Meeting;
};

type EagerAudienceFaceExpression = {
  readonly id: string;
  readonly timestamp: number;
  readonly score: number;
  readonly surprised?: number | null;
  readonly happy?: number | null;
  readonly neutral?: number | null;
  readonly sad?: number | null;
  readonly disgusted?: number | null;
  readonly fearful?: number | null;
  readonly angry?: number | null;
  readonly meetingID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyAudienceFaceExpression = {
  readonly id: string;
  readonly timestamp: number;
  readonly score: number;
  readonly surprised?: number | null;
  readonly happy?: number | null;
  readonly neutral?: number | null;
  readonly sad?: number | null;
  readonly disgusted?: number | null;
  readonly fearful?: number | null;
  readonly angry?: number | null;
  readonly meetingID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type AudienceFaceExpression =
  LazyLoading extends LazyLoadingDisabled
    ? EagerAudienceFaceExpression
    : LazyAudienceFaceExpression;

export declare const AudienceFaceExpression: (new (
  init: ModelInit<AudienceFaceExpression>
) => AudienceFaceExpression) & {
  copyOf(
    source: AudienceFaceExpression,
    mutator: (
      draft: MutableModel<AudienceFaceExpression>
    ) => MutableModel<AudienceFaceExpression> | void
  ): AudienceFaceExpression;
};
