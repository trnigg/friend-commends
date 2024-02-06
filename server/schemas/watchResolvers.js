const { User } = require("../models");
const { Watch } = require("../models");

const { AuthenticationError } = require("../utils/auth");

const watchResolvers = {
  Watch: {
    //__resolveType functions provides concrete types (ie. movies or tv shows or books) to the abstract interfaces
    __resolveType(watch, context, info) {
      //console.log("watch:",watch)
      if (watch.type) {
        return watch.type;
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
    myWatchList: async (parent, args, context) => {
      if (context.user) {
        //console.log("context.user:",context.user);
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
        //console.log("args:", args.input);
        //console.log("context.user._id:", context.user._id);
        const watch = await Watch.create(args.input);
        //console.log("watch", watch);

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchList: watch } },
          { new: true }
        ).populate("watchList");
      }
    },
    //add TV show to users watch list
    addTVToWatch: async (parent, args, context) => {
      if (context.user) {
        //console.log("args:", args.input);
        //console.log("context.user._id:", context.user._id);
        const watch = await Watch.create(args.input);
        //console.log("watch", watch);

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { watchList: watch } },
          { new: true }
        ).populate("watchList");
      }
    },
    removeFromWatchList: async (parent, { id }, context) => {
      if (context.user) {
        console.log("id:", id);
        console.log("context.user._id:", context.user._id);
        const watch = await Watch.findOneAndDelete({ _id: id });
        console.log("watch", watch);

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