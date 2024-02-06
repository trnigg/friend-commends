import { gql } from '@apollo/client';

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
        }
        ... on TV {
          original_name
          overview
          poster_path
          tmdbID
          AU_platforms
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
      }
      ... on TV {
        original_name
        overview
        poster_path
        AU_platforms
        tmdbID
      }
    }
  }
`;