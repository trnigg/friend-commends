const { mergeTypeDefs } = require('@graphql-tools/merge')
const { mergeResolvers } = require('@graphql-tools/merge')

const userTypeDefs = require('./userTypeDefs');
const recommendationTypeDefs = require('./recommendationTypeDefs');
const shareTypeDefs = require('./shareTypeDefs');
const watchTypeDefs = require('./watchTypeDefs');
const typeDefs = mergeTypeDefs([userTypeDefs, recommendationTypeDefs,shareTypeDefs,watchTypeDefs])

const userResolvers = require('./userResolvers');
const recommendationResolvers = require('./recommendationResolvers');
const shareResolvers = require('./shareResolvers');
const watchResolvers = require('./watchResolvers');
const resolvers = mergeResolvers([userResolvers, recommendationResolvers,shareResolvers,watchResolvers])

module.exports = { typeDefs, resolvers };
