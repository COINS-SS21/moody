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
                allow: "public",
                provider: "iam",
                operations: ["create", "update", "delete", "read"],
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
                allow: "public",
                provider: "iam",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: "a3d0640b6fb47a6689d1dc12b7a50e4f",
};
