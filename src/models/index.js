// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const { Meeting, AudienceFaceExpression } = initSchema(schema);

export { Meeting, AudienceFaceExpression };
