/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
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
export const listMeetings = /* GraphQL */ `
  query ListMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMeetings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getAudienceFaceExpression = /* GraphQL */ `
  query GetAudienceFaceExpression($id: ID!) {
    getAudienceFaceExpression(id: $id) {
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
export const listAudienceFaceExpressions = /* GraphQL */ `
  query ListAudienceFaceExpressions(
    $filter: ModelAudienceFaceExpressionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAudienceFaceExpressions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        timestamp
        score
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
