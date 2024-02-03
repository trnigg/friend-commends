//scalar Date - removed not really required anymore

const userTypeDefs = ` 
  type User {
    id: ID!
    userName: String!
    firstName: String
    lastName: String
    email: String!
    password: String!
    dateOfBirth: String
    friends: [User]
    pendingFriendRequests: [User]
    sentFriendRequests: [User]
    recommendations: [Recommendation]
  }

  type Auth {
    token: String!
    user: User
  }

  input UserInput {
    userName: String!
    firstName: String
    lastName: String
    email: String!
    password: String!
    dateOfBirth: String
  }

  input UserUpdateInput {
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    dateOfBirth: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    friends(id: ID!): [User]
    pendingFriendRequests(id: ID!): [User]
    sentFriendRequests(id: ID!): [User]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    updateUser(id: ID!, user: UserUpdateInput!): User
    deleteUser(id: ID!): User
    login(input: LoginInput!): Auth
    sendFriendRequest(fromUserId: ID!, toUserId: ID!): User
    acceptFriendRequest(fromUserId: ID!, toUserId: ID!): User
    rejectFriendRequest(fromUserId: ID!, toUserId: ID!): User
  }
`;

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
    AU_platforms:String
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
    AU_platforms:String
    createdAt:String
  }

  input MovieInput{
    original_title: String!
    type:String!
    tmdbID:String!
    overview:String
    poster_path:String
    release_date:String
    AU_platforms:String
    createdAt:String
  }

  input TVInput{
    original_name: String!
    type:String!
    tmdbID:String!
    overview:String
    poster_path:String
    first_air_date:String
    AU_platforms:String
    createdAt:String
  }
   type Query {
   recommendations: [Recommendation]
   }

  type Mutation {
    addMovie(input: MovieInput!): User
    addTV(input: TVInput!):User
  }
  `;
const combinedTypeDefs = userTypeDefs + recommendationTypeDefs;
//module.exports = userTypeDefs;
module.exports = combinedTypeDefs;

