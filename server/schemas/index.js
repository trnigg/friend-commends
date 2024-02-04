const { mergeTypeDefs } = require('@graphql-tools/merge')
const { mergeResolvers } = require('@graphql-tools/merge')

const userTypeDefs = require('./userTypeDefs');
const recommendationTypeDefs = require('./recommendationTypeDefs');
const shareTypeDefs = require('./shareTypeDefs');
const typeDefs = mergeTypeDefs([userTypeDefs, recommendationTypeDefs,shareTypeDefs])

const userResolvers = require('./userResolvers');
const recommendationResolvers = require('./recommendationResolvers');
const shareResolvers = require('./shareResolvers');
const resolvers = mergeResolvers([userResolvers, recommendationResolvers,shareResolvers])

module.exports = { typeDefs, resolvers };
