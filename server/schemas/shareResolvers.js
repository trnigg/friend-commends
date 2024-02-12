const { User } = require("../models");
const { Share } = require("../models");
const { ObjectId } = require("mongodb");

const { AuthenticationError } = require("../utils/auth");

const shareResolvers = {
  Share: {
    //__resolveType functions provides concrete types (ie. movies or tv shows or books) to the abstract interfaces
    __resolveType(share, context, info) {
      if (share.type) {
        return share.type;
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
    //returns a list of shares sent from the given user ID, not logged in user from context
    shareSentFrom: async (parent, { userId }, context) => {
      if (context.user) {

        const shares = await Share.find({
          sharedFrom: new ObjectId(userId),
        })
          .populate("sharedFrom")
          .populate("sharedTo");
        return shares;
      }
      throw AuthenticationError;
    },
    sharedWithMe: async (parent, args, context) => {
      if (context.user && args.userId) {
        return await Share.find({
          sharedTo: new ObjectId(context.user._id),
          sharedFrom: new ObjectId(args.userId),
        }).populate("sharedFrom");
      } else if (context.user) {
        return await Share.find({
          sharedTo: new ObjectId(context.user._id),
        }).populate("sharedFrom");
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
        const sender = await User.findById(context.user._id);
        const receiver = await User.findById(args.input.sharedTo);
        const shareObj = { ...args.input, sharedFrom: context.user._id };
        const share = await Share.create(shareObj);

        await User.findByIdAndUpdate(
          sender._id,
          { $addToSet: { shareSent: share } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          receiver._id,
          { $addToSet: { shareReceived: share } },
          { new: true }
        );
        const data = await Share.findById(share._id)
          .populate("sharedFrom")
          .populate("sharedTo");
        return data.toJSON();
      }
    },
    //share tv show with friend
    shareTV: async (parent, args, context) => {
      if (context.user) {
        const sender = await User.findById(context.user._id);
        const receiver = await User.findById(args.input.sharedTo);
        const shareObj = { ...args.input, sharedFrom: context.user._id };
        const share = await Share.create(shareObj);

        await User.findByIdAndUpdate(
          sender._id,
          { $addToSet: { shareSent: share } },
          { new: true }
        );
        await User.findByIdAndUpdate(
          receiver._id,
          { $addToSet: { shareReceived: share } },
          { new: true }
        );
        return share.toJSON();
      }
    },
    //delete individual received share from friend
    deleteReceivedShare: async (parent, { shareId }, context) => {
      if (context.user) {
        const share = await Share.findByIdAndDelete(shareId);

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

