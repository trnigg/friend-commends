import { gql } from "@apollo/client";

export const QUERY_MYWATCHLIST = gql`
  query MyWatchList {
    myWatchList {
      watchList {
        id
        type
        ... on Movie {
          original_title
          overview
          poster_path
          tmdbID
          AU_platforms
          release_date
        }
        ... on TV {
          original_name
          overview
          poster_path
          tmdbID
          AU_platforms
          first_air_date
        }
      }
    }
  }
`;

export const QUERY_SHAREDWITHME = gql`
  query SharedWithMe($sharedWithMeUserId2: ID) {
    sharedWithMe(userId: $sharedWithMeUserId2) {
      id
      type
      shareMessage
      sharedFrom {
        id
        userName
        email
        firstName
        lastName
      }
      ... on Movie {
        original_title
        overview
        poster_path
        AU_platforms
        tmdbID
        release_date
      }
      ... on TV {
        original_name
        overview
        poster_path
        AU_platforms
        tmdbID
        first_air_date
      }
    }
  }
`;

export const QUERY_MYRECOMMENDATIONS = gql`
  query MyRecommendations {
    myRecommendations {
      recommendations {
        id
        type
        ... on Movie {
          tmdbID
          overview
          original_title
          poster_path
          release_date
          AU_platforms
        }
        ... on TV {
          original_name
          overview
          tmdbID
          poster_path
          first_air_date
          AU_platforms
        }
      }
    }
  }
`;

export const QUERY_MYDETAILS = gql`
  query MyDetails {
    myDetails {
      id
      userName
      firstName
      lastName
      dateOfBirth
      email
    }
  }
`;
