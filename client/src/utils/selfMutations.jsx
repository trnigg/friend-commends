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
