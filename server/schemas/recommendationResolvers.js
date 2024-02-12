const { User } = require("../models");
const { Recommendation } = require("../models");

const { AuthenticationError } = require("../utils/auth");

const recommendationResolvers = {
  Recommendation: {
    //__resolveType functions provides concrete types (ie. movies or tv shows or books) to the abstract interfaces
    __resolveType(recommendation, context, info) {
      if (recommendation.type) {
        return recommendation.type;
      }
      return null; // GraphQLError is thrown
    },
    __resolveType(user, context, info) {
      if (user.type) {
        return user.type;
      }
      return null; // GraphQLError is thrown
    },
  },
  Query: {
    recommendations: async (parent, args, context) => {
      if (context.user) {
        return Recommendation.find({});
      }
      throw AuthenticationError;
    },
    myRecommendations: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id)
        .select("recommendations")
        .populate("recommendations");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    //add Movie to users recommendation list
    addMovieRecommend: async (parent, args, context) => {
      if (context.user) {
        const recommendation = await Recommendation.findOneAndUpdate(
          { tmdbID: args.input.tmdbID },
          { ...args.input },
          { upsert: true,
            new: true },
        );

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recommendations: recommendation } },
          { new: true }
        ).populate("recommendations");
      }
    },
    //add TV show to users recommendation list
    addTVRecommend: async (parent, args, context) => {
      if (context.user) {
        const recommendation = await Recommendation.findOneAndUpdate(
          { tmdbID: args.input.tmdbID },
          { ...args.input },
          { upsert: true,
            new: true },
        );

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recommendations: recommendation } },
          { new: true }
        ).populate("recommendations");
      }
    },
    removeRecommend: async (parent, {id}, context) => {
        if (context.user) {
          const recommendation = await Recommendation.findByIdAndDelete(id);
  
          return await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { recommendations: id } },
            { new: true }
          ).populate("recommendations");
        }
      },
  },
};

module.exports = recommendationResolvers;

