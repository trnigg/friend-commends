const recommendationTypeDefs = `
  interface Recommendation {
    id: ID!
    type:String!
  }

  enum type {
    Movie
    TV
    Book
  }

  type Movie implements Recommendation {
    id: ID!
    type:String!
    original_title: String!
    tmdbID:String!
    overview:String
    poster_path:String
    release_date:String
    AU_platforms:[String]
    createdAt:String
  }

  type TV implements Recommendation {
    id: ID!
    type:String!
    original_name: String!
    tmdbID:String!
    overview:String
    poster_path:String
    release_date:String
    AU_platforms:[String]
    createdAt:String
  }

  input MovieInput{
    original_title: String!
    type:String!
    tmdbID:String!
    overview:String
    poster_path:String
    release_date:String
    AU_platforms:[String]
    createdAt:String
  }

  input TVInput{
    original_name: String!
    type:String!
    tmdbID:String!
    overview:String
    poster_path:String
    first_air_date:String
    AU_platforms:[String]
    createdAt:String
  }
   type Query {
   recommendations: [Recommendation]
   }

  type Mutation {
    addMovieRecommend(input: MovieInput!): User
    addTVRecommend(input: TVInput!):User
    removeRecommend(id: ID!): User
  }
  `;

  module.exports = recommendationTypeDefs;