const shareTypeDefs = `
  interface Share {
    id: ID!
    type:String!
    sharedFrom:User!
    sharedTo:User!
    shareMessage:String
    sharedAt:String
  }

  enum type {
    Movie
    TV
    Book
  }

  type Movie implements Share {
    id: ID!
    type:String!
    original_title: String!
    tmdbID:String!
    overview:String
    poster_path:String
    release_date:String
    AU_platforms:String
    sharedFrom:User!
    sharedTo:User!
    shareMessage:String
    sharedAt:String
  }

  type TV implements Share {
    id: ID!
    type:String!
    original_name: String!
    tmdbID:String!
    overview:String
    poster_path:String
    release_date:String
    AU_platforms:String
    sharedFrom:User!
    sharedTo:User!
    shareMessage:String
    sharedAt:String
  }

  input shareMovieInput{
    original_title: String!
    type:String!
    tmdbID:String!
    overview:String
    poster_path:String
    release_date:String
    AU_platforms:String
    shareMessage:String
    sharedAt:String
    sharedTo:String!
  }

  input shareTVInput{
    original_name: String!
    type:String!
    tmdbID:String!
    overview:String
    poster_path:String
    first_air_date:String
    AU_platforms:String
    shareMessage:String
    sharedAt:String
    sharedTo:String!
  }
   type Query {
    shareSentFrom(userId: ID!):[Share]!
    shareSentTo(userId: ID!):[Share]!
   }

  type Mutation {
    shareMovie(input: shareMovieInput!): Share
    shareTV(input: shareTVInput!): Share
    deleteReceivedShare(shareId: ID!):User
    deleteAllSentShares:User
    deleteAllReceivedShares:User
  }
  `;

module.exports = shareTypeDefs;
