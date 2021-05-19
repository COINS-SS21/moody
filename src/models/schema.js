export const schema = {
  models: {
    Rating: {
      name: "Rating",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        overallStars: {
          name: "overallStars",
          isArray: false,
          type: "Int",
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
      },
      syncable: true,
      pluralName: "Ratings",
      attributes: [
        {
          type: "model",
          properties: {},
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
                operations: ["read"],
                identityClaim: "cognito:username",
              },
              {
                allow: "public",
                operations: ["create"],
                provider: "iam",
              },
            ],
          },
        },
      ],
    },
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
        startedAt: {
          name: "startedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        stoppedAt: {
          name: "stoppedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
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
        Ratings: {
          name: "Ratings",
          isArray: true,
          type: {
            model: "Rating",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "meetingID",
          },
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
          isRequired: true,
          attributes: [],
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
  version: "cac8cc086171e3869d356e3f623cec2b",
};
