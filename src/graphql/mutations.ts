/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPublicMeetingInfo = /* GraphQL */ `
  mutation CreatePublicMeetingInfo(
    $input: CreatePublicMeetingInfoInput!
    $condition: ModelPublicMeetingInfoConditionInput
  ) {
    createPublicMeetingInfo(input: $input, condition: $condition) {
      id
      name
      startedAt
      stoppedAt
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updatePublicMeetingInfo = /* GraphQL */ `
  mutation UpdatePublicMeetingInfo(
    $input: UpdatePublicMeetingInfoInput!
    $condition: ModelPublicMeetingInfoConditionInput
  ) {
    updatePublicMeetingInfo(input: $input, condition: $condition) {
      id
      name
      startedAt
      stoppedAt
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deletePublicMeetingInfo = /* GraphQL */ `
  mutation DeletePublicMeetingInfo(
    $input: DeletePublicMeetingInfoInput!
    $condition: ModelPublicMeetingInfoConditionInput
  ) {
    deletePublicMeetingInfo(input: $input, condition: $condition) {
      id
      name
      startedAt
      stoppedAt
      owner
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
      id
      overallStars
      contentStars
      paceStars
      owner
      publicmeetinginfoID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
      id
      overallStars
      contentStars
      paceStars
      owner
      publicmeetinginfoID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
      id
      overallStars
      contentStars
      paceStars
      owner
      publicmeetinginfoID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createMeeting(input: $input, condition: $condition) {
      id
      name
      startedAt
      stoppedAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      PublicMeetingInfo {
        id
        name
        startedAt
        stoppedAt
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      owner
      AudienceFaceExpressions {
        items {
          id
          timestamp
          score
          surprised
          happy
          neutral
          sad
          disgusted
          fearful
          angry
          meetingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const updateMeeting = /* GraphQL */ `
  mutation UpdateMeeting(
    $input: UpdateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    updateMeeting(input: $input, condition: $condition) {
      id
      name
      startedAt
      stoppedAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      PublicMeetingInfo {
        id
        name
        startedAt
        stoppedAt
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      owner
      AudienceFaceExpressions {
        items {
          id
          timestamp
          score
          surprised
          happy
          neutral
          sad
          disgusted
          fearful
          angry
          meetingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const deleteMeeting = /* GraphQL */ `
  mutation DeleteMeeting(
    $input: DeleteMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    deleteMeeting(input: $input, condition: $condition) {
      id
      name
      startedAt
      stoppedAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      PublicMeetingInfo {
        id
        name
        startedAt
        stoppedAt
        owner
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      owner
      AudienceFaceExpressions {
        items {
          id
          timestamp
          score
          surprised
          happy
          neutral
          sad
          disgusted
          fearful
          angry
          meetingID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const createAudienceFaceExpression = /* GraphQL */ `
  mutation CreateAudienceFaceExpression(
    $input: CreateAudienceFaceExpressionInput!
    $condition: ModelAudienceFaceExpressionConditionInput
  ) {
    createAudienceFaceExpression(input: $input, condition: $condition) {
      id
      timestamp
      score
      surprised
      happy
      neutral
      sad
      disgusted
      fearful
      angry
      meetingID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateAudienceFaceExpression = /* GraphQL */ `
  mutation UpdateAudienceFaceExpression(
    $input: UpdateAudienceFaceExpressionInput!
    $condition: ModelAudienceFaceExpressionConditionInput
  ) {
    updateAudienceFaceExpression(input: $input, condition: $condition) {
      id
      timestamp
      score
      surprised
      happy
      neutral
      sad
      disgusted
      fearful
      angry
      meetingID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteAudienceFaceExpression = /* GraphQL */ `
  mutation DeleteAudienceFaceExpression(
    $input: DeleteAudienceFaceExpressionInput!
    $condition: ModelAudienceFaceExpressionConditionInput
  ) {
    deleteAudienceFaceExpression(input: $input, condition: $condition) {
      id
      timestamp
      score
      surprised
      happy
      neutral
      sad
      disgusted
      fearful
      angry
      meetingID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
