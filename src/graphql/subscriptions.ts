/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePublicMeetingInfo = /* GraphQL */ `
  subscription OnCreatePublicMeetingInfo($owner: String) {
    onCreatePublicMeetingInfo(owner: $owner) {
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
export const onUpdatePublicMeetingInfo = /* GraphQL */ `
  subscription OnUpdatePublicMeetingInfo($owner: String) {
    onUpdatePublicMeetingInfo(owner: $owner) {
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
export const onDeletePublicMeetingInfo = /* GraphQL */ `
  subscription OnDeletePublicMeetingInfo($owner: String) {
    onDeletePublicMeetingInfo(owner: $owner) {
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
export const onCreateRating = /* GraphQL */ `
  subscription OnCreateRating($owner: String) {
    onCreateRating(owner: $owner) {
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
export const onUpdateRating = /* GraphQL */ `
  subscription OnUpdateRating($owner: String) {
    onUpdateRating(owner: $owner) {
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
export const onDeleteRating = /* GraphQL */ `
  subscription OnDeleteRating($owner: String) {
    onDeleteRating(owner: $owner) {
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
export const onCreateMeeting = /* GraphQL */ `
  subscription OnCreateMeeting($owner: String) {
    onCreateMeeting(owner: $owner) {
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
export const onUpdateMeeting = /* GraphQL */ `
  subscription OnUpdateMeeting($owner: String) {
    onUpdateMeeting(owner: $owner) {
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
export const onDeleteMeeting = /* GraphQL */ `
  subscription OnDeleteMeeting($owner: String) {
    onDeleteMeeting(owner: $owner) {
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
export const onCreateAudienceFaceExpression = /* GraphQL */ `
  subscription OnCreateAudienceFaceExpression($owner: String) {
    onCreateAudienceFaceExpression(owner: $owner) {
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
export const onUpdateAudienceFaceExpression = /* GraphQL */ `
  subscription OnUpdateAudienceFaceExpression($owner: String) {
    onUpdateAudienceFaceExpression(owner: $owner) {
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
export const onDeleteAudienceFaceExpression = /* GraphQL */ `
  subscription OnDeleteAudienceFaceExpression($owner: String) {
    onDeleteAudienceFaceExpression(owner: $owner) {
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
