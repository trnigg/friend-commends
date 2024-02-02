const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    dateOfBirth: String!
    friends: [User]
    pendingFriendRequests: [User]
    sentFriendRequests: [User]
  }

  type Auth {
    token: String!
    user: User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    dateOfBirth: String!
  }

  input UserUpdateInput {
    firstName: String
    lastName: String
    email: String
    password: String
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

module.exports = typeDefs;
