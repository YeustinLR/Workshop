const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');
const typeDefs = require('./schema/typeDefs');
const teacherResolvers = require('./resolvers/teacherResolvers');
const courseResolvers = require('./resolvers/courseResolvers');

const mergedTypeDefs = mergeTypeDefs([typeDefs]);
const mergedResolvers = mergeResolvers([teacherResolvers, courseResolvers]);

module.exports = { typeDefs: mergedTypeDefs, resolvers: mergedResolvers };
