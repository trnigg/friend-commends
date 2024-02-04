const { mergeTypeDefs } = require('@graphql-tools/merge')

const userTypeDefs = require('./userTypeDefs');
const recommendationTypeDefs = require('./recommendationTypeDefs');

const typeDefs = mergeTypeDefs([userTypeDefs, recommendationTypeDefs])

const resolvers = require('./resolvers');



module.exports = { typeDefs, resolvers };
