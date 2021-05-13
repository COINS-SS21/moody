/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMeetingInput = {
  id?: string | null;
  name: string;
};

export type ModelMeetingConditionInput = {
  name?: ModelStringInput | null;
  and?: Array<ModelMeetingConditionInput | null> | null;
  or?: Array<ModelMeetingConditionInput | null> | null;
  not?: ModelMeetingConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Meeting = {
  __typename: "Meeting";
  id?: string;
  name?: string;
  audienceFaceExpressions?: ModelAudienceFaceExpressionConnection;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type ModelAudienceFaceExpressionConnection = {
  __typename: "ModelAudienceFaceExpressionConnection";
  items?: Array<AudienceFaceExpression | null> | null;
  nextToken?: string | null;
};

export type AudienceFaceExpression = {
  __typename: "AudienceFaceExpression";
  id?: string;
  timestamp?: number;
  score?: number;
  meetingId?: string;
  meeting?: Meeting;
  createdAt?: string;
  updatedAt?: string;
  owner?: string | null;
};

export type UpdateMeetingInput = {
  id: string;
  name?: string | null;
};

export type DeleteMeetingInput = {
  id?: string | null;
};

export type CreateAudienceFaceExpressionInput = {
  id?: string | null;
  timestamp: number;
  score: number;
  meetingId: string;
};

export type ModelAudienceFaceExpressionConditionInput = {
  timestamp?: ModelIntInput | null;
  score?: ModelFloatInput | null;
  meetingId?: ModelIDInput | null;
  and?: Array<ModelAudienceFaceExpressionConditionInput | null> | null;
  or?: Array<ModelAudienceFaceExpressionConditionInput | null> | null;
  not?: ModelAudienceFaceExpressionConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UpdateAudienceFaceExpressionInput = {
  id: string;
  timestamp?: number | null;
  score?: number | null;
  meetingId?: string | null;
};

export type DeleteAudienceFaceExpressionInput = {
  id?: string | null;
};

export type ModelMeetingFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  and?: Array<ModelMeetingFilterInput | null> | null;
  or?: Array<ModelMeetingFilterInput | null> | null;
  not?: ModelMeetingFilterInput | null;
};

export type ModelMeetingConnection = {
  __typename: "ModelMeetingConnection";
  items?: Array<Meeting | null> | null;
  nextToken?: string | null;
};

export type ModelAudienceFaceExpressionFilterInput = {
  id?: ModelIDInput | null;
  timestamp?: ModelIntInput | null;
  score?: ModelFloatInput | null;
  meetingId?: ModelIDInput | null;
  and?: Array<ModelAudienceFaceExpressionFilterInput | null> | null;
  or?: Array<ModelAudienceFaceExpressionFilterInput | null> | null;
  not?: ModelAudienceFaceExpressionFilterInput | null;
};

export type CreateMeetingMutationVariables = {
  input?: CreateMeetingInput;
  condition?: ModelMeetingConditionInput | null;
};

export type CreateMeetingMutation = {
  createMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    audienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        meetingId: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateMeetingMutationVariables = {
  input?: UpdateMeetingInput;
  condition?: ModelMeetingConditionInput | null;
};

export type UpdateMeetingMutation = {
  updateMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    audienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        meetingId: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteMeetingMutationVariables = {
  input?: DeleteMeetingInput;
  condition?: ModelMeetingConditionInput | null;
};

export type DeleteMeetingMutation = {
  deleteMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    audienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        meetingId: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateAudienceFaceExpressionMutationVariables = {
  input?: CreateAudienceFaceExpressionInput;
  condition?: ModelAudienceFaceExpressionConditionInput | null;
};

export type CreateAudienceFaceExpressionMutation = {
  createAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    meetingId: string;
    meeting: {
      __typename: "Meeting";
      id: string;
      name: string;
      audienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateAudienceFaceExpressionMutationVariables = {
  input?: UpdateAudienceFaceExpressionInput;
  condition?: ModelAudienceFaceExpressionConditionInput | null;
};

export type UpdateAudienceFaceExpressionMutation = {
  updateAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    meetingId: string;
    meeting: {
      __typename: "Meeting";
      id: string;
      name: string;
      audienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteAudienceFaceExpressionMutationVariables = {
  input?: DeleteAudienceFaceExpressionInput;
  condition?: ModelAudienceFaceExpressionConditionInput | null;
};

export type DeleteAudienceFaceExpressionMutation = {
  deleteAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    meetingId: string;
    meeting: {
      __typename: "Meeting";
      id: string;
      name: string;
      audienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type GetMeetingQueryVariables = {
  id?: string;
};

export type GetMeetingQuery = {
  getMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    audienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        meetingId: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListMeetingsQueryVariables = {
  filter?: ModelMeetingFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMeetingsQuery = {
  listMeetings?: {
    __typename: "ModelMeetingConnection";
    items?: Array<{
      __typename: "Meeting";
      id: string;
      name: string;
      audienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type GetAudienceFaceExpressionQueryVariables = {
  id?: string;
};

export type GetAudienceFaceExpressionQuery = {
  getAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    meetingId: string;
    meeting: {
      __typename: "Meeting";
      id: string;
      name: string;
      audienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListAudienceFaceExpressionsQueryVariables = {
  filter?: ModelAudienceFaceExpressionFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListAudienceFaceExpressionsQuery = {
  listAudienceFaceExpressions?: {
    __typename: "ModelAudienceFaceExpressionConnection";
    items?: Array<{
      __typename: "AudienceFaceExpression";
      id: string;
      timestamp: number;
      score: number;
      meetingId: string;
      meeting: {
        __typename: "Meeting";
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      };
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null> | null;
    nextToken?: string | null;
  } | null;
};

export type OnCreateMeetingSubscriptionVariables = {
  owner?: string;
};

export type OnCreateMeetingSubscription = {
  onCreateMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    audienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        meetingId: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateMeetingSubscriptionVariables = {
  owner?: string;
};

export type OnUpdateMeetingSubscription = {
  onUpdateMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    audienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        meetingId: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteMeetingSubscriptionVariables = {
  owner?: string;
};

export type OnDeleteMeetingSubscription = {
  onDeleteMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    audienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        meetingId: string;
        createdAt: string;
        updatedAt: string;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateAudienceFaceExpressionSubscriptionVariables = {
  owner?: string;
};

export type OnCreateAudienceFaceExpressionSubscription = {
  onCreateAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    meetingId: string;
    meeting: {
      __typename: "Meeting";
      id: string;
      name: string;
      audienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateAudienceFaceExpressionSubscriptionVariables = {
  owner?: string;
};

export type OnUpdateAudienceFaceExpressionSubscription = {
  onUpdateAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    meetingId: string;
    meeting: {
      __typename: "Meeting";
      id: string;
      name: string;
      audienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteAudienceFaceExpressionSubscriptionVariables = {
  owner?: string;
};

export type OnDeleteAudienceFaceExpressionSubscription = {
  onDeleteAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    meetingId: string;
    meeting: {
      __typename: "Meeting";
      id: string;
      name: string;
      audienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
      } | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    };
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};
