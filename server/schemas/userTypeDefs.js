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
    recommendations: [Recommendation]!
    shareSent:[Share]!
    shareReceived:[Share]!
    watchList:[Watch]!

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
    friendRecommendations(id: ID!): [User]
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


//const combinedTypeDefs = userTypeDefs + recommendationTypeDefs;
module.exports = userTypeDefs;


