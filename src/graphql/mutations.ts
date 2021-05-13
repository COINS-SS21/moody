/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMeeting = /* GraphQL */ `
  mutation CreateMeeting(
    $input: CreateMeetingInput!
    $condition: ModelMeetingConditionInput
  ) {
    createMeeting(input: $input, condition: $condition) {
      id
      name
      audienceFaceExpressions {
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      audienceFaceExpressions {
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      audienceFaceExpressions {
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      meetingId
      meeting {
        id
        name
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
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
      meetingId
      meeting {
        id
        name
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
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
      meetingId
      meeting {
        id
        name
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
