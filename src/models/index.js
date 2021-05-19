// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { Rating, Meeting, AudienceFaceExpression } = initSchema(schema);

export { Rating, Meeting, AudienceFaceExpression };
