const { mergeTypeDefs } = require('@graphql-tools/merge')
const { mergeResolvers } = require('@graphql-tools/merge')

const userTypeDefs = require('./userTypeDefs');
const recommendationTypeDefs = require('./recommendationTypeDefs');

const typeDefs = mergeTypeDefs([userTypeDefs, recommendationTypeDefs])

const userResolvers = require('./userResolvers');
const recommendationResolvers = require('./recommendationResolvers');
const resolvers = mergeResolvers([userResolvers, recommendationResolvers])

module.exports = { typeDefs, resolvers };
