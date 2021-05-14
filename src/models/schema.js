export const schema = {
  models: {
    Meeting: {
      name: "Meeting",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        AudienceFaceExpressions: {
          name: "AudienceFaceExpressions",
          isArray: true,
          type: {
            model: "AudienceFaceExpression",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "meetingID",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: "Meetings",
      attributes: [
        {
          type: "model",
          properties: {
            timestamps: {
              createdAt: "createdAt",
              updatedAt: "updatedAt",
            },
          },
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                provider: "userPools",
                ownerField: "owner",
                allow: "owner",
                operations: ["read", "create", "update", "delete"],
                identityClaim: "cognito:username",
              },
            ],
          },
        },
      ],
    },
    AudienceFaceExpression: {
      name: "AudienceFaceExpression",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        timestamp: {
          name: "timestamp",
          isArray: false,
          type: "AWSTimestamp",
          isRequired: true,
          attributes: [],
        },
        score: {
          name: "score",
          isArray: false,
          type: "Float",
          isRequired: true,
          attributes: [],
        },
        meetingID: {
          name: "meetingID",
          isArray: false,
          type: "ID",
          isRequired: false,
          attributes: [],
        },
        Meeting: {
          name: "Meeting",
          isArray: false,
          type: {
            model: "Meeting",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "audienceFaceExpressionMeetingId",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
      },
      syncable: true,
      pluralName: "AudienceFaceExpressions",
      attributes: [
        {
          type: "model",
          properties: {
            timestamps: {
              createdAt: "createdAt",
              updatedAt: "updatedAt",
            },
          },
        },
        {
          type: "key",
          properties: {
            name: "byMeeting",
            fields: ["meetingID"],
          },
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                provider: "userPools",
                ownerField: "owner",
                allow: "owner",
                operations: ["read", "create", "update", "delete"],
                identityClaim: "cognito:username",
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: "d835e8fd8a81b25b9d9b39953f35f6b9",
};
