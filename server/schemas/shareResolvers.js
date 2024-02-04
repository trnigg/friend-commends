const { User } = require("../models");
const { Share } = require("../models");
const { ObjectId } = require("mongodb");

const { AuthenticationError } = require("../utils/auth");

const shareResolvers = {
  Share: {
    //__resolveType functions provides concrete types (ie. movies or tv shows or books) to the abstract interfaces
    __resolveType(share, context, info) {
      //console.log("share:",share)
      if (share.type) {
        return share.type;
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
    //returns a list of shares sent from the given user ID, not logged in user from context
    shareSentFrom: async (parent, { userId }, context) => {
      if (context.user) {
        console.log("userId:", userId);

        const shares = await Share.find({
          sharedFrom: new ObjectId(userId),
        }).populate("sharedFrom")
        .populate("sharedTo");
        console.log("shares:", shares);
        return shares;
      }
      throw AuthenticationError;
    },
    //returns a list of shares sent to the given user ID, not logged in user from context
    shareSentTo: async (parent, { userId }, context) => {
      if (context.user) {
        return Share.find({ sharedTo: new ObjectId(userId) })
        .populate("sharedTo")
        .populate("sharedFrom");
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    //share movie with friend
    shareMovie: async (parent, args, context) => {
      if (context.user) {
        console.log("args:", args);
        console.log("context.user._id:", context.user._id);
        const sender = await User.findById(context.user._id);
        const receiver = await User.findById(args.input.sharedTo);
        const shareObj = { ...args.input, sharedFrom: context.user._id };
        const share = await Share.create(shareObj);
        console.log("share", share);
        console.log("share._id", share._id);

        await User.findByIdAndUpdate(sender._id, {
          $addToSet: { shareSent: share },
        });
        await User.findByIdAndUpdate(
          receiver._id,
          { $addToSet: { shareReceived: share } },
          { new: true }
        );
        console.log("sender", sender);
        console.log("receiver", receiver);
        const data = await Share.findById(share._id)
          .populate("sharedFrom")
          .populate("sharedTo");
        console.log("data:", data);
        return data.toJSON();
      }
    },
    //share tv show with friend
    shareTV: async (parent, args, context) => {
      if (context.user) {
        //console.log("args:", args.input);
        //console.log("context.user._id:", context.user._id);
        const sender = await User.findById(context.user._id);
        const receiver = await User.findById(args.input.sharedTo);
        const shareObj = { ...args.input, sharedFrom: context.user._id };
        const share = await Share.create(shareObj);
        console.log("share", share);

        await User.findByIdAndUpdate(sender._id, {
          $addToSet: { shareSent: share },
        });
        await User.findByIdAndUpdate(
          receiver._id,
          { $addToSet: { shareReceived: share } },
          { new: true }
        );
        console.log("sender", sender);
        console.log("receiver", receiver);
        return share.toJSON();
      }
    },
    //delete individual received share from friend
    deleteReceivedShare: async (parent, { shareId }, context) => {
      if (context.user) {
        console.log("shareId:", shareId);
        console.log("context.user._id:", context.user._id);
        const share = await Share.findByIdAndDelete(shareId);
        console.log("share", share);

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { shareReceived: shareId } },
          { new: true }
        ).populate("shareReceived");
      }
    },
    //delete all sent shares
    deleteAllSentShares: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { shareSent: [] } },
          { new: true }
        ).populate("shareSent");
      }
    },
    //delete all received shares
    deleteAllReceivedShares: async (parent, args, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { shareReceived: [] } },
          { new: true }
        ).populate("shareReceived");
      }
    },
  },
};

module.exports = shareResolvers;

// GraphQL sample test input variables:
//
// share TV
// {
//   "shareTvInput2": {
//     "tmdbID": "200",
//     "type": "TV",
//     "sharedTo": "65bf7043f36852ba922c2589",
//     "original_name": "simpsons"
//   },
// }


// share Movie
// {
//   "input": {
//     "type": "Movie",
//     "tmdbID": "101",
//     "sharedTo": "65bf7043f36852ba922c2589",
//     "original_title": "Movie101"
//   }
// }

// {
//   "shareSentToUserId2": "65bf7043f36852ba922c2589",
// }

// {
//   "userId": "65bf6743c23eca151f71f3fa",
// }

// {
//   "shareId": "65bf7120fc9cf7f7da2a4cb5"
// }