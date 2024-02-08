import { gql } from "@apollo/client";

export const QUERY_ALL = gql`
  query Users {
    users {
      id
      userName
      firstName
      lastName
      email
      friends {
        id
      }
      pendingFriendRequests {
        id
      }
      sentFriendRequests {
        id
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
  query Friends {
    friends {
      friends {
        id
        firstName
        lastName
        userName
      }
    }
  }
`;

export const QUERY_FRIEND_STATUS = gql`
  query FriendStatus($userId: ID!, $friendId: ID!) {
    friendStatus(userId: $userId, friendId: $friendId)
  }
`;

export const QUERY_FRIENREQ = gql`
query friendRecommendations($userId: ID!) {
	friendRecommendations(id: $userId) {
	  userName
	  firstName
	  lastName
	  email
	  recommendations {
		... on Movie {
		  id
		  type
		  original_title
		  tmdbID
		  overview
		  poster_path
		  release_date
		  AU_platforms
		  createdAt
		  shareMessage
		  sharedAt
		}
		... on TV {
		  id
		  type
		  original_name
		  tmdbID
		  overview
		  poster_path
		  first_air_date
		  AU_platforms
		  createdAt
		  shareMessage
		  sharedAt
		}
	  }
	}
  }
  `;

