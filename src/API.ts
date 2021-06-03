/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePublicMeetingInfoInput = {
  id?: string | null;
  name: string;
  startedAt: string;
  stoppedAt: string;
  owner?: string | null;
  _version?: number | null;
};

export type ModelPublicMeetingInfoConditionInput = {
  name?: ModelStringInput | null;
  startedAt?: ModelStringInput | null;
  stoppedAt?: ModelStringInput | null;
  and?: Array<ModelPublicMeetingInfoConditionInput | null> | null;
  or?: Array<ModelPublicMeetingInfoConditionInput | null> | null;
  not?: ModelPublicMeetingInfoConditionInput | null;
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

export type PublicMeetingInfo = {
  __typename: "PublicMeetingInfo";
  id: string;
  name: string;
  startedAt: string;
  stoppedAt: string;
  owner?: string | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdatePublicMeetingInfoInput = {
  id: string;
  name?: string | null;
  startedAt?: string | null;
  stoppedAt?: string | null;
  owner?: string | null;
  _version?: number | null;
};

export type DeletePublicMeetingInfoInput = {
  id: string;
  _version?: number | null;
};

export type CreateRatingInput = {
  id?: string | null;
  overallStars: number;
  contentStars?: number | null;
  paceStars?: number | null;
  owner?: string | null;
  publicmeetinginfoID: string;
  _version?: number | null;
};

export type ModelRatingConditionInput = {
  overallStars?: ModelIntInput | null;
  contentStars?: ModelIntInput | null;
  paceStars?: ModelIntInput | null;
  publicmeetinginfoID?: ModelIDInput | null;
  and?: Array<ModelRatingConditionInput | null> | null;
  or?: Array<ModelRatingConditionInput | null> | null;
  not?: ModelRatingConditionInput | null;
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

export type Rating = {
  __typename: "Rating";
  id: string;
  overallStars: number;
  contentStars?: number | null;
  paceStars?: number | null;
  owner?: string | null;
  publicmeetinginfoID: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateRatingInput = {
  id: string;
  overallStars?: number | null;
  contentStars?: number | null;
  paceStars?: number | null;
  owner?: string | null;
  publicmeetinginfoID?: string | null;
  _version?: number | null;
};

export type DeleteRatingInput = {
  id: string;
  _version?: number | null;
};

export type CreateMeetingInput = {
  id?: string | null;
  name: string;
  startedAt?: string | null;
  stoppedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
  meetingPublicMeetingInfoId?: string | null;
};

export type ModelMeetingConditionInput = {
  name?: ModelStringInput | null;
  startedAt?: ModelStringInput | null;
  stoppedAt?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelMeetingConditionInput | null> | null;
  or?: Array<ModelMeetingConditionInput | null> | null;
  not?: ModelMeetingConditionInput | null;
};

export type Meeting = {
  __typename: "Meeting";
  id: string;
  name: string;
  startedAt?: string | null;
  stoppedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  PublicMeetingInfo?: PublicMeetingInfo | null;
  owner?: string | null;
  AudienceFaceExpressions?: ModelAudienceFaceExpressionConnection | null;
};

export type ModelAudienceFaceExpressionConnection = {
  __typename: "ModelAudienceFaceExpressionConnection";
  items?: Array<AudienceFaceExpression | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type AudienceFaceExpression = {
  __typename: "AudienceFaceExpression";
  id: string;
  timestamp: number;
  score: number;
  surprised?: number | null;
  happy?: number | null;
  neutral?: number | null;
  sad?: number | null;
  disgusted?: number | null;
  fearful?: number | null;
  angry?: number | null;
  meetingID: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
  owner?: string | null;
};

export type UpdateMeetingInput = {
  id: string;
  name?: string | null;
  startedAt?: string | null;
  stoppedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
  meetingPublicMeetingInfoId?: string | null;
};

export type DeleteMeetingInput = {
  id: string;
  _version?: number | null;
};

export type CreateAudienceFaceExpressionInput = {
  id?: string | null;
  timestamp: number;
  score: number;
  surprised?: number | null;
  happy?: number | null;
  neutral?: number | null;
  sad?: number | null;
  disgusted?: number | null;
  fearful?: number | null;
  angry?: number | null;
  meetingID: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type ModelAudienceFaceExpressionConditionInput = {
  timestamp?: ModelIntInput | null;
  score?: ModelFloatInput | null;
  surprised?: ModelFloatInput | null;
  happy?: ModelFloatInput | null;
  neutral?: ModelFloatInput | null;
  sad?: ModelFloatInput | null;
  disgusted?: ModelFloatInput | null;
  fearful?: ModelFloatInput | null;
  angry?: ModelFloatInput | null;
  meetingID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelAudienceFaceExpressionConditionInput | null> | null;
  or?: Array<ModelAudienceFaceExpressionConditionInput | null> | null;
  not?: ModelAudienceFaceExpressionConditionInput | null;
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

export type UpdateAudienceFaceExpressionInput = {
  id: string;
  timestamp?: number | null;
  score?: number | null;
  surprised?: number | null;
  happy?: number | null;
  neutral?: number | null;
  sad?: number | null;
  disgusted?: number | null;
  fearful?: number | null;
  angry?: number | null;
  meetingID?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  _version?: number | null;
};

export type DeleteAudienceFaceExpressionInput = {
  id: string;
  _version?: number | null;
};

export type ModelPublicMeetingInfoFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  startedAt?: ModelStringInput | null;
  stoppedAt?: ModelStringInput | null;
  owner?: ModelStringInput | null;
  and?: Array<ModelPublicMeetingInfoFilterInput | null> | null;
  or?: Array<ModelPublicMeetingInfoFilterInput | null> | null;
  not?: ModelPublicMeetingInfoFilterInput | null;
};

export type ModelPublicMeetingInfoConnection = {
  __typename: "ModelPublicMeetingInfoConnection";
  items?: Array<PublicMeetingInfo | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelRatingFilterInput = {
  id?: ModelIDInput | null;
  overallStars?: ModelIntInput | null;
  contentStars?: ModelIntInput | null;
  paceStars?: ModelIntInput | null;
  owner?: ModelStringInput | null;
  publicmeetinginfoID?: ModelIDInput | null;
  and?: Array<ModelRatingFilterInput | null> | null;
  or?: Array<ModelRatingFilterInput | null> | null;
  not?: ModelRatingFilterInput | null;
};

export type ModelRatingConnection = {
  __typename: "ModelRatingConnection";
  items?: Array<Rating | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelMeetingFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  startedAt?: ModelStringInput | null;
  stoppedAt?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelMeetingFilterInput | null> | null;
  or?: Array<ModelMeetingFilterInput | null> | null;
  not?: ModelMeetingFilterInput | null;
};

export type ModelMeetingConnection = {
  __typename: "ModelMeetingConnection";
  items?: Array<Meeting | null> | null;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelAudienceFaceExpressionFilterInput = {
  id?: ModelIDInput | null;
  timestamp?: ModelIntInput | null;
  score?: ModelFloatInput | null;
  surprised?: ModelFloatInput | null;
  happy?: ModelFloatInput | null;
  neutral?: ModelFloatInput | null;
  sad?: ModelFloatInput | null;
  disgusted?: ModelFloatInput | null;
  fearful?: ModelFloatInput | null;
  angry?: ModelFloatInput | null;
  meetingID?: ModelIDInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  and?: Array<ModelAudienceFaceExpressionFilterInput | null> | null;
  or?: Array<ModelAudienceFaceExpressionFilterInput | null> | null;
  not?: ModelAudienceFaceExpressionFilterInput | null;
};

export type CreatePublicMeetingInfoMutationVariables = {
  input: CreatePublicMeetingInfoInput;
  condition?: ModelPublicMeetingInfoConditionInput | null;
};

export type CreatePublicMeetingInfoMutation = {
  createPublicMeetingInfo?: {
    __typename: "PublicMeetingInfo";
    id: string;
    name: string;
    startedAt: string;
    stoppedAt: string;
    owner?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdatePublicMeetingInfoMutationVariables = {
  input: UpdatePublicMeetingInfoInput;
  condition?: ModelPublicMeetingInfoConditionInput | null;
};

export type UpdatePublicMeetingInfoMutation = {
  updatePublicMeetingInfo?: {
    __typename: "PublicMeetingInfo";
    id: string;
    name: string;
    startedAt: string;
    stoppedAt: string;
    owner?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeletePublicMeetingInfoMutationVariables = {
  input: DeletePublicMeetingInfoInput;
  condition?: ModelPublicMeetingInfoConditionInput | null;
};

export type DeletePublicMeetingInfoMutation = {
  deletePublicMeetingInfo?: {
    __typename: "PublicMeetingInfo";
    id: string;
    name: string;
    startedAt: string;
    stoppedAt: string;
    owner?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateRatingMutationVariables = {
  input: CreateRatingInput;
  condition?: ModelRatingConditionInput | null;
};

export type CreateRatingMutation = {
  createRating?: {
    __typename: "Rating";
    id: string;
    overallStars: number;
    contentStars?: number | null;
    paceStars?: number | null;
    owner?: string | null;
    publicmeetinginfoID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateRatingMutationVariables = {
  input: UpdateRatingInput;
  condition?: ModelRatingConditionInput | null;
};

export type UpdateRatingMutation = {
  updateRating?: {
    __typename: "Rating";
    id: string;
    overallStars: number;
    contentStars?: number | null;
    paceStars?: number | null;
    owner?: string | null;
    publicmeetinginfoID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteRatingMutationVariables = {
  input: DeleteRatingInput;
  condition?: ModelRatingConditionInput | null;
};

export type DeleteRatingMutation = {
  deleteRating?: {
    __typename: "Rating";
    id: string;
    overallStars: number;
    contentStars?: number | null;
    paceStars?: number | null;
    owner?: string | null;
    publicmeetinginfoID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateMeetingMutationVariables = {
  input: CreateMeetingInput;
  condition?: ModelMeetingConditionInput | null;
};

export type CreateMeetingMutation = {
  createMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    startedAt?: string | null;
    stoppedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    PublicMeetingInfo?: {
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    owner?: string | null;
    AudienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        surprised?: number | null;
        happy?: number | null;
        neutral?: number | null;
        sad?: number | null;
        disgusted?: number | null;
        fearful?: number | null;
        angry?: number | null;
        meetingID: string;
        createdAt?: string | null;
        updatedAt?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
      startedAt?: number | null;
    } | null;
  } | null;
};

export type UpdateMeetingMutationVariables = {
  input: UpdateMeetingInput;
  condition?: ModelMeetingConditionInput | null;
};

export type UpdateMeetingMutation = {
  updateMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    startedAt?: string | null;
    stoppedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    PublicMeetingInfo?: {
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    owner?: string | null;
    AudienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        surprised?: number | null;
        happy?: number | null;
        neutral?: number | null;
        sad?: number | null;
        disgusted?: number | null;
        fearful?: number | null;
        angry?: number | null;
        meetingID: string;
        createdAt?: string | null;
        updatedAt?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
      startedAt?: number | null;
    } | null;
  } | null;
};

export type DeleteMeetingMutationVariables = {
  input: DeleteMeetingInput;
  condition?: ModelMeetingConditionInput | null;
};

export type DeleteMeetingMutation = {
  deleteMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    startedAt?: string | null;
    stoppedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    PublicMeetingInfo?: {
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    owner?: string | null;
    AudienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        surprised?: number | null;
        happy?: number | null;
        neutral?: number | null;
        sad?: number | null;
        disgusted?: number | null;
        fearful?: number | null;
        angry?: number | null;
        meetingID: string;
        createdAt?: string | null;
        updatedAt?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
      startedAt?: number | null;
    } | null;
  } | null;
};

export type CreateAudienceFaceExpressionMutationVariables = {
  input: CreateAudienceFaceExpressionInput;
  condition?: ModelAudienceFaceExpressionConditionInput | null;
};

export type CreateAudienceFaceExpressionMutation = {
  createAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    surprised?: number | null;
    happy?: number | null;
    neutral?: number | null;
    sad?: number | null;
    disgusted?: number | null;
    fearful?: number | null;
    angry?: number | null;
    meetingID: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    owner?: string | null;
  } | null;
};

export type UpdateAudienceFaceExpressionMutationVariables = {
  input: UpdateAudienceFaceExpressionInput;
  condition?: ModelAudienceFaceExpressionConditionInput | null;
};

export type UpdateAudienceFaceExpressionMutation = {
  updateAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    surprised?: number | null;
    happy?: number | null;
    neutral?: number | null;
    sad?: number | null;
    disgusted?: number | null;
    fearful?: number | null;
    angry?: number | null;
    meetingID: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    owner?: string | null;
  } | null;
};

export type DeleteAudienceFaceExpressionMutationVariables = {
  input: DeleteAudienceFaceExpressionInput;
  condition?: ModelAudienceFaceExpressionConditionInput | null;
};

export type DeleteAudienceFaceExpressionMutation = {
  deleteAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    surprised?: number | null;
    happy?: number | null;
    neutral?: number | null;
    sad?: number | null;
    disgusted?: number | null;
    fearful?: number | null;
    angry?: number | null;
    meetingID: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    owner?: string | null;
  } | null;
};

export type GetPublicMeetingInfoQueryVariables = {
  id: string;
};

export type GetPublicMeetingInfoQuery = {
  getPublicMeetingInfo?: {
    __typename: "PublicMeetingInfo";
    id: string;
    name: string;
    startedAt: string;
    stoppedAt: string;
    owner?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListPublicMeetingInfosQueryVariables = {
  filter?: ModelPublicMeetingInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListPublicMeetingInfosQuery = {
  listPublicMeetingInfos?: {
    __typename: "ModelPublicMeetingInfoConnection";
    items?: Array<{
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncPublicMeetingInfosQueryVariables = {
  filter?: ModelPublicMeetingInfoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncPublicMeetingInfosQuery = {
  syncPublicMeetingInfos?: {
    __typename: "ModelPublicMeetingInfoConnection";
    items?: Array<{
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetRatingQueryVariables = {
  id: string;
};

export type GetRatingQuery = {
  getRating?: {
    __typename: "Rating";
    id: string;
    overallStars: number;
    contentStars?: number | null;
    paceStars?: number | null;
    owner?: string | null;
    publicmeetinginfoID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListRatingsQueryVariables = {
  filter?: ModelRatingFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListRatingsQuery = {
  listRatings?: {
    __typename: "ModelRatingConnection";
    items?: Array<{
      __typename: "Rating";
      id: string;
      overallStars: number;
      contentStars?: number | null;
      paceStars?: number | null;
      owner?: string | null;
      publicmeetinginfoID: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncRatingsQueryVariables = {
  filter?: ModelRatingFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncRatingsQuery = {
  syncRatings?: {
    __typename: "ModelRatingConnection";
    items?: Array<{
      __typename: "Rating";
      id: string;
      overallStars: number;
      contentStars?: number | null;
      paceStars?: number | null;
      owner?: string | null;
      publicmeetinginfoID: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetMeetingQueryVariables = {
  id: string;
};

export type GetMeetingQuery = {
  getMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    startedAt?: string | null;
    stoppedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    PublicMeetingInfo?: {
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    owner?: string | null;
    AudienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        surprised?: number | null;
        happy?: number | null;
        neutral?: number | null;
        sad?: number | null;
        disgusted?: number | null;
        fearful?: number | null;
        angry?: number | null;
        meetingID: string;
        createdAt?: string | null;
        updatedAt?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
      startedAt?: number | null;
    } | null;
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
      startedAt?: string | null;
      stoppedAt?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      PublicMeetingInfo?: {
        __typename: "PublicMeetingInfo";
        id: string;
        name: string;
        startedAt: string;
        stoppedAt: string;
        owner?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      owner?: string | null;
      AudienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
        startedAt?: number | null;
      } | null;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncMeetingsQueryVariables = {
  filter?: ModelMeetingFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncMeetingsQuery = {
  syncMeetings?: {
    __typename: "ModelMeetingConnection";
    items?: Array<{
      __typename: "Meeting";
      id: string;
      name: string;
      startedAt?: string | null;
      stoppedAt?: string | null;
      createdAt?: string | null;
      updatedAt?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      PublicMeetingInfo?: {
        __typename: "PublicMeetingInfo";
        id: string;
        name: string;
        startedAt: string;
        stoppedAt: string;
        owner?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        createdAt: string;
        updatedAt: string;
      } | null;
      owner?: string | null;
      AudienceFaceExpressions?: {
        __typename: "ModelAudienceFaceExpressionConnection";
        nextToken?: string | null;
        startedAt?: number | null;
      } | null;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type GetAudienceFaceExpressionQueryVariables = {
  id: string;
};

export type GetAudienceFaceExpressionQuery = {
  getAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    surprised?: number | null;
    happy?: number | null;
    neutral?: number | null;
    sad?: number | null;
    disgusted?: number | null;
    fearful?: number | null;
    angry?: number | null;
    meetingID: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
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
      surprised?: number | null;
      happy?: number | null;
      neutral?: number | null;
      sad?: number | null;
      disgusted?: number | null;
      fearful?: number | null;
      angry?: number | null;
      meetingID: string;
      createdAt?: string | null;
      updatedAt?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      owner?: string | null;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncAudienceFaceExpressionsQueryVariables = {
  filter?: ModelAudienceFaceExpressionFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncAudienceFaceExpressionsQuery = {
  syncAudienceFaceExpressions?: {
    __typename: "ModelAudienceFaceExpressionConnection";
    items?: Array<{
      __typename: "AudienceFaceExpression";
      id: string;
      timestamp: number;
      score: number;
      surprised?: number | null;
      happy?: number | null;
      neutral?: number | null;
      sad?: number | null;
      disgusted?: number | null;
      fearful?: number | null;
      angry?: number | null;
      meetingID: string;
      createdAt?: string | null;
      updatedAt?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      owner?: string | null;
    } | null> | null;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type OnCreatePublicMeetingInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreatePublicMeetingInfoSubscription = {
  onCreatePublicMeetingInfo?: {
    __typename: "PublicMeetingInfo";
    id: string;
    name: string;
    startedAt: string;
    stoppedAt: string;
    owner?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdatePublicMeetingInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdatePublicMeetingInfoSubscription = {
  onUpdatePublicMeetingInfo?: {
    __typename: "PublicMeetingInfo";
    id: string;
    name: string;
    startedAt: string;
    stoppedAt: string;
    owner?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeletePublicMeetingInfoSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeletePublicMeetingInfoSubscription = {
  onDeletePublicMeetingInfo?: {
    __typename: "PublicMeetingInfo";
    id: string;
    name: string;
    startedAt: string;
    stoppedAt: string;
    owner?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateRatingSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateRatingSubscription = {
  onCreateRating?: {
    __typename: "Rating";
    id: string;
    overallStars: number;
    contentStars?: number | null;
    paceStars?: number | null;
    owner?: string | null;
    publicmeetinginfoID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateRatingSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateRatingSubscription = {
  onUpdateRating?: {
    __typename: "Rating";
    id: string;
    overallStars: number;
    contentStars?: number | null;
    paceStars?: number | null;
    owner?: string | null;
    publicmeetinginfoID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteRatingSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteRatingSubscription = {
  onDeleteRating?: {
    __typename: "Rating";
    id: string;
    overallStars: number;
    contentStars?: number | null;
    paceStars?: number | null;
    owner?: string | null;
    publicmeetinginfoID: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateMeetingSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateMeetingSubscription = {
  onCreateMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    startedAt?: string | null;
    stoppedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    PublicMeetingInfo?: {
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    owner?: string | null;
    AudienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        surprised?: number | null;
        happy?: number | null;
        neutral?: number | null;
        sad?: number | null;
        disgusted?: number | null;
        fearful?: number | null;
        angry?: number | null;
        meetingID: string;
        createdAt?: string | null;
        updatedAt?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
      startedAt?: number | null;
    } | null;
  } | null;
};

export type OnUpdateMeetingSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateMeetingSubscription = {
  onUpdateMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    startedAt?: string | null;
    stoppedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    PublicMeetingInfo?: {
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    owner?: string | null;
    AudienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        surprised?: number | null;
        happy?: number | null;
        neutral?: number | null;
        sad?: number | null;
        disgusted?: number | null;
        fearful?: number | null;
        angry?: number | null;
        meetingID: string;
        createdAt?: string | null;
        updatedAt?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
      startedAt?: number | null;
    } | null;
  } | null;
};

export type OnDeleteMeetingSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteMeetingSubscription = {
  onDeleteMeeting?: {
    __typename: "Meeting";
    id: string;
    name: string;
    startedAt?: string | null;
    stoppedAt?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    PublicMeetingInfo?: {
      __typename: "PublicMeetingInfo";
      id: string;
      name: string;
      startedAt: string;
      stoppedAt: string;
      owner?: string | null;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    owner?: string | null;
    AudienceFaceExpressions?: {
      __typename: "ModelAudienceFaceExpressionConnection";
      items?: Array<{
        __typename: "AudienceFaceExpression";
        id: string;
        timestamp: number;
        score: number;
        surprised?: number | null;
        happy?: number | null;
        neutral?: number | null;
        sad?: number | null;
        disgusted?: number | null;
        fearful?: number | null;
        angry?: number | null;
        meetingID: string;
        createdAt?: string | null;
        updatedAt?: string | null;
        _version: number;
        _deleted?: boolean | null;
        _lastChangedAt: number;
        owner?: string | null;
      } | null> | null;
      nextToken?: string | null;
      startedAt?: number | null;
    } | null;
  } | null;
};

export type OnCreateAudienceFaceExpressionSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateAudienceFaceExpressionSubscription = {
  onCreateAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    surprised?: number | null;
    happy?: number | null;
    neutral?: number | null;
    sad?: number | null;
    disgusted?: number | null;
    fearful?: number | null;
    angry?: number | null;
    meetingID: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    owner?: string | null;
  } | null;
};

export type OnUpdateAudienceFaceExpressionSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateAudienceFaceExpressionSubscription = {
  onUpdateAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    surprised?: number | null;
    happy?: number | null;
    neutral?: number | null;
    sad?: number | null;
    disgusted?: number | null;
    fearful?: number | null;
    angry?: number | null;
    meetingID: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    owner?: string | null;
  } | null;
};

export type OnDeleteAudienceFaceExpressionSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteAudienceFaceExpressionSubscription = {
  onDeleteAudienceFaceExpression?: {
    __typename: "AudienceFaceExpression";
    id: string;
    timestamp: number;
    score: number;
    surprised?: number | null;
    happy?: number | null;
    neutral?: number | null;
    sad?: number | null;
    disgusted?: number | null;
    fearful?: number | null;
    angry?: number | null;
    meetingID: string;
    createdAt?: string | null;
    updatedAt?: string | null;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
    owner?: string | null;
  } | null;
};
