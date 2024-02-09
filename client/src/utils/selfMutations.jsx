import { gql } from "@apollo/client";

export const MUTATION_ADDMOVIETOWATCHLIST = gql`
  mutation AddMovieToWatch($addMovieToWatchInput: MovieInput!) {
    addMovieToWatch(input: $addMovieToWatchInput) {
      watchList {
        id
        type
        ... on Movie {
          original_title
          overview
          poster_path
          release_date
          tmdbID
          AU_platforms
        }
        ... on TV {
          original_name
          overview
          poster_path
          first_air_date
          AU_platforms
          tmdbID
        }
      }
    }
  }
`;

export const MUTATION_ADDTVTOWATCHLIST = gql`
  mutation AddTVToWatch($addTvToWatchInput2: TVInput!) {
    addTVToWatch(input: $addTvToWatchInput2) {
      watchList {
        id
        type
        ... on Movie {
          original_title
          overview
          poster_path
          release_date
          tmdbID
          AU_platforms
        }
        ... on TV {
          original_name
          overview
          poster_path
          first_air_date
          AU_platforms
          tmdbID
        }
      }
    }
  }
`;

export const MUTATION_SHAREMOVIE = gql`
  mutation ShareMovie($shareMovieInput: shareMovieInput!) {
    shareMovie(input: $shareMovieInput) {
      id
      type
      sharedAt
      shareMessage
    }
  }
`;

export const MUTATION_SHARETV = gql`
  mutation ShareTV($shareTvInput2: shareTVInput!) {
    shareTV(input: $shareTvInput2) {
      id
      type
      shareMessage
      sharedAt
    }
  }
`;

export const MUTATION_EDITPROFILE = gql`
mutation UpdateUser($updateUserInput2: UserUpdateInput!) {
  updateUser(input: $updateUserInput2) {
    id
    firstName
    lastName
    email
    password
    dateOfBirth
  }
}
`;


export const MUTATION_REMOVEWATCHITEM = gql`
mutation RemoveFromWatchList($removeFromWatchListId: ID!) {
  removeFromWatchList(id: $removeFromWatchListId) {
    id
    userName
    watchList {
      ... on Movie {
        original_title
        overview
      }
      id
      ... on TV {
        id
        original_name
      }
    }
  }
}
`;

export const MUTATION_REMOVESHAREITEM = gql`
mutation DeleteReceivedShare($shareId: ID!) {
  deleteReceivedShare(shareId: $shareId) {
    id
    userName
    shareReceived {
      id
      shareMessage
      type
    }
  }
}
`;

export const MUTATION_REMOVERECOMENDITEM = gql`
mutation RemoveRecommend($removeRecommendId: ID!) {
  removeRecommend(id: $removeRecommendId) {
    id
    userName
    recommendations {
      id
      type
      ... on Movie {
        original_title
      }
      ... on TV {
        original_name
      }
    }
  }
}
`;