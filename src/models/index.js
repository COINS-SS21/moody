// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { PublicMeetingInfo, Rating, Meeting, AudienceFaceExpression } =
  initSchema(schema);

export { PublicMeetingInfo, Rating, Meeting, AudienceFaceExpression };
