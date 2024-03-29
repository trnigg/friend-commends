const { User } = require("../models");
const { Watch } = require("../models");
const { ObjectId } = require("mongodb");

const { AuthenticationError } = require("../utils/auth");

const watchResolvers = {
  Watch: {
    //__resolveType functions provides concrete types (ie. movies or tv shows or books) to the abstract interfaces
    __resolveType(watch, context, info) {
      if (watch.type) {
        return watch.type;
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
    myWatchList: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id)
          .select("watchList")
          .populate("watchList");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    //add Movie to users watch list
    addMovieToWatch: async (parent, args, context) => {
      if (context.user) {
        const watch = await Watch.findOneAndUpdate(
          { tmdbID: args.input.tmdbID },
          { ...args.input },
          { upsert: true,
            new: true },
        );

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchList: watch._id } },
          { new: true }
        ).populate("watchList");
      }
    },
    //add TV show to users watch list
    addTVToWatch: async (parent, args, context) => {
      if (context.user) {
        const watch = await Watch.findOneAndUpdate(
          { tmdbID: args.input.tmdbID },
          { ...args.input },
          { upsert: true,
            new: true }
        );

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchList: watch._id } },
          { new: true }
        ).populate("watchList");
      }
    },
    removeFromWatchList: async (parent, { id }, context) => {
      if (context.user) {
        const watch = await Watch.findByIdAndDelete(id);

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { watchList: id } },
          { new: true }
        ).populate("watchList");
      }
    },
    clearWatchList: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { watchList: [] } },
          { new: true }
        ).populate("watchList");
      }
    },
  },
};

module.exports = watchResolvers;

// GraphQL sample test input variables:

// {
//   "addTvToWatchInput2": {
//     "type": "TV",
//     "tmdbID": "456",
//     "poster_path": "/vHqeLzYl3dEAutojCO26g0LIkom.jpg",
//     "overview": "Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands. Since the beginning, the series has been a pop culture icon, attracting hundreds of celebrities to guest star. The show has also made name for itself in its fearless satirical take on politics, media and American life in general.",
//     "original_name": "The Simpsons",
//     "first_air_date": "1989-12-17",
//     "AU_platforms": ["Disney Plus"]
//   }
// }
