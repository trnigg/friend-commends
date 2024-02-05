import { gql } from '@apollo/client';

export const QUERY_ALL = gql`
    query Users {
        users {
        firstName
        id
        lastName
        email
        password
        dateOfBirth
        userName
        friends {
            id
            userName
            firstName
            lastName
          }  
        }
    }
`;

export const QUERY_USER = gql`
query user($userId: ID!) {
    user(id: $userId) {
      id
      userName
      firstName
      lastName
      email
      password
      dateOfBirth
      friends {
        id
        userName
        firstName
        lastName
      }
      pendingFriendRequests {
        id
        userName
        firstName
        lastName
      }
      sentFriendRequests {
        id
        userName
        firstName
        lastName
      }
      recommendations {
        ... on Movie {
          id
          original_title
          tmdbID
        }
        ... on TV {
          id
          original_name
          tmdbID
        }
      }
    }
  }  
`;

export const QUERY_FRIENDS = gql`
    query friends($friendsId: ID!) {
        friends(id: $friendsId) {
        id
        userName
        firstName
        lastName
        }
    }
`;

export const QUERY_FRIENREQ = gql`
query friendRecommendations {
  friendRecommendations {
    id
    userName
    firstName
    lastName
    email
    friends {
      id
      userName
      firstName
      lastName
    }
    recommendations {
      ... on Movie {
        id
        original_title
      }
      ... on TV {
        id
        original_name
      }
    }
  }
}
`;

