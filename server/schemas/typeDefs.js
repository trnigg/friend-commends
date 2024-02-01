const typeDefs = `
  type User {
    id: ID!
    userName: String!
    email: String!
    password: String!
  }

  type Auth {
    token: String!
    user: User
  }

  input UserInput {
    userName: String!
    email: String!
    password: String!
  }

  input UserUpdateInput {
    userName: String
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
  }

  type Mutation {
    addUser(user: UserInput!): User
    updateUser(id: ID!, user: UserUpdateInput!): User
    deleteUser(id: ID!): User
    login(input: LoginInput!): Auth
  }
`;

module.exports = typeDefs;
