// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const {
  SpeakerVoiceEmotion,
  PublicMeetingInfo,
  Rating,
  Meeting,
  AudienceFaceExpression,
} = initSchema(schema);

export {
  SpeakerVoiceEmotion,
  PublicMeetingInfo,
  Rating,
  Meeting,
  AudienceFaceExpression,
};
