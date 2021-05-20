/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPublicMeetingInfo = /* GraphQL */ `
  query GetPublicMeetingInfo($id: ID!) {
    getPublicMeetingInfo(id: $id) {
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
export const listPublicMeetingInfos = /* GraphQL */ `
  query ListPublicMeetingInfos(
    $filter: ModelPublicMeetingInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPublicMeetingInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPublicMeetingInfos = /* GraphQL */ `
  query SyncPublicMeetingInfos(
    $filter: ModelPublicMeetingInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPublicMeetingInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getRating = /* GraphQL */ `
  query GetRating($id: ID!) {
    getRating(id: $id) {
      id
      overallStars
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
export const listRatings = /* GraphQL */ `
  query ListRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        overallStars
        owner
        publicmeetinginfoID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRatings = /* GraphQL */ `
  query SyncRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRatings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        overallStars
        owner
        publicmeetinginfoID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getMeeting = /* GraphQL */ `
  query GetMeeting($id: ID!) {
    getMeeting(id: $id) {
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
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncMeetings = /* GraphQL */ `
  query SyncMeetings(
    $filter: ModelMeetingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMeetings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
          nextToken
          startedAt
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getAudienceFaceExpression = /* GraphQL */ `
  query GetAudienceFaceExpression($id: ID!) {
    getAudienceFaceExpression(id: $id) {
      id
      timestamp
      score
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
`;
export const syncAudienceFaceExpressions = /* GraphQL */ `
  query SyncAudienceFaceExpressions(
    $filter: ModelAudienceFaceExpressionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAudienceFaceExpressions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        timestamp
        score
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
`;
