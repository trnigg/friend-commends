const { User } = require("../models");
const { Recommendation } = require("../models");

const { AuthenticationError } = require("../utils/auth");

const recommendationResolvers = {
  Recommendation: {
    //__resolveType functions provides concrete types (ie. movies or tv shows or books) to the abstract interfaces
    __resolveType(recommendation, context, info) {
      //console.log("recommendation:",recommendation)
      if (recommendation.type) {
        return recommendation.type;
      }
      return null; // GraphQLError is thrown
    },
    __resolveType(user, context, info) {
      //console.log("user:", user);
      if (user.type) {
        return user.type;
      }
      return null; // GraphQLError is thrown
    },
  },
  Query: {
    recommendations: async (parent, args, context) => {
      if (context.user) {
        //console.log("context.user:",context.user);
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
        //console.log("args:", args.input);
        //console.log("context.user._id:", context.user._id);
        //const recommendation = await Recommendation.create(args.input);
        const recommendation = await Recommendation.findOneAndUpdate(
          { tmdbID: args.input.tmdbID },
          { ...args.input },
          { upsert: true,
            new: true },
        );
        //console.log("recommendation", recommendation);

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
        // console.log("args:", args.input);
        //console.log("context.user._id:", context.user._id);
        //const recommendation = await Recommendation.create(args.input);
        const recommendation = await Recommendation.findOneAndUpdate(
          { tmdbID: args.input.tmdbID },
          { ...args.input },
          { upsert: true,
            new: true },
        );
        // console.log("recommendation", recommendation);

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recommendations: recommendation } },
          { new: true }
        ).populate("recommendations");
      }
    },
    removeRecommend: async (parent, {id}, context) => {
        if (context.user) {
          console.log("id:", id);
          console.log("context.user._id:", context.user._id);
          const recommendation = await Recommendation.findByIdAndDelete(id);
          console.log("recommendation", recommendation);
  
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

// GraphQL sample test input variables:
// create user
//{
//   "input": {
//     "userName": "test2",
//     "password": "password",
//     "email": "test2@email.com"
//   }
// } 
//
// add TV recommendation
// {
//   "addTvRecommendInput2": {
//     "type": "TV",
//     "tmdbID": "101",
//     "original_name": "The simpsons"
//   }
// } 
//
// add Movie recommendation
// {
//   "addMovieRecommendInput2": {
//     "type": "Movie",
//     "original_title": "testMovie",
//     "tmdbID": "100"
//   }
// }
//
// remove recommendation by ID
//{
//     "removeRecommendId": "65bf0e80965638907fdea9e6"
//}

// {
//   "userId": "65bf6743c23eca151f71f3fa"
// }