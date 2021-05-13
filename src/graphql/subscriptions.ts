/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting($owner: String!) {
    onCreateMeeting(owner: $owner) {
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
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting($owner: String!) {
    onUpdateMeeting(owner: $owner) {
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
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting($owner: String!) {
    onDeleteMeeting(owner: $owner) {
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
export const onCreateAudienceFaceExpression = /* GraphQL */ `
  subscription OnCreateAudienceFaceExpression($owner: String!) {
    onCreateAudienceFaceExpression(owner: $owner) {
      id
      timestamp
      score
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
export const onUpdateAudienceFaceExpression = /* GraphQL */ `
  subscription OnUpdateAudienceFaceExpression($owner: String!) {
    onUpdateAudienceFaceExpression(owner: $owner) {
      id
      timestamp
      score
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
export const onDeleteAudienceFaceExpression = /* GraphQL */ `
  subscription OnDeleteAudienceFaceExpression($owner: String!) {
    onDeleteAudienceFaceExpression(owner: $owner) {
      id
      timestamp
      score
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
