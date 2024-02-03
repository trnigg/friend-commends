// NOTE We may want to update AuthenticationError to be more specific/remove if redundant.
//const dateScalar =require ('./scalar');

// IMPORT MODELS HERE
const { User } = require("../models");
const { Recommendation } = require("../models");

// Import Auth middleware
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
   Recommendation: {
		__resolveType(recommendation,context,info) {
		  if (recommendation.type === "Movie") {
			return "Movie";
		  }
		  if (recommendation.type === "TV") {
			return "TV";
		  }
		  return null; // GraphQLError is thrown
		},
		__resolveType(user,context,info) {
			console.log("user:",user)
			if (user.type) {
				return user.type;
			  }
			return null; // GraphQLError is thrown
		  },
	  },
  Query: {
    users: async (parent, args, context) => {
      if (context.user) {
        return (
          User.find({})
            // populate but exclude password and __v (version)
            // first parameter is the field to populate, second is what to select ('-' prefix means exclude)
            // we may want to be more selective about what we populate in future
            // see // populate but exclude password and __v (version)
            .populate("friends", "-password -__v")
            .populate("pendingFriendRequests", "-password -__v")
            .populate("sentFriendRequests", "-password -__v")
			.populate("recommendations")
        );
      }
      throw AuthenticationError;
    },
    user: async (parent, { id }, context) => {
      if (context.user) {
        return (
          User.findById(id)
            // populate but exclude password and __v (version)
            .populate("friends", "-password -__v")
            .populate("pendingFriendRequests", "-password -__v")
            .populate("sentFriendRequests", "-password -__v")
			.populate("recommendations")
        );
      }
      throw AuthenticationError;
    },
    // Query to find list of users friends
    friends: async (parent, { id }, context) => {
      if (context.user) {
        const user = await User.findById(id).populate(
          "friends",
          "-password -__v"
        );
        return user.friends;
      }
      throw AuthenticationError;
    },
    // Query to find list of users pending requests
    pendingFriendRequests: async (parent, { id }, context) => {
      if (context.user) {
        const user = await User.findById(id).populate(
          "pendingFriendRequests",
          "-password -__v"
        );
        return user.pendingFriendRequests;
      }
      throw AuthenticationError;
    },
    // Query to find list of users sent requests
    sentFriendRequests: async (parent, { id }, context) => {
      if (context.user) {
        const user = await User.findById(id).populate(
          "sentFriendRequests",
          "-password -__v"
        );
        return user.sentFriendRequests;
      }
      throw AuthenticationError;
    },
    recommendations: async (parent, args, context) => {
      if (context.user) {
        return Recommendation.find({});
      }
      throw AuthenticationError;
    },
    // movies: async (parent, args, context) => {
    //   if (context.user) {
    //     return Recommendation.find({ type: "Movie" });
    //   }
    //   throw AuthenticationError;
    // },
  },
  Mutation: {
    // Mutation to add a new user
    // Sign token and return user
    // Context is not required as this is an unauthenticated mutation that results in authentication
    addUser: async (parent, { input }) => {
      const newUser = await User.create(input);
      const token = signToken(newUser);
      return { token, user: newUser };
    },
    // Mutation to update a user - consider if we want to implement this
    // If so, require password to confirm changes?
    updateUser: async (parent, { id, input }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(id, input, { new: true });
      }
      throw AuthenticationError;
    },
    // Mutation to delete a user
    // See comment above at updateUser
    deleteUser: async (parent, { id }, context) => {
      if (context.user) {
        return User.findByIdAndDelete(id);
      }
      throw AuthenticationError;
    },
    // Mutation to login
    // Context is not required as this is an unauthenticated mutation that results in authentication
    // Input destructured to get email and password
    login: async (parent, { input: { email, password } }) => {
      console.log("Logging in");
      // Find user by email
      const user = await User.findOne({ email });
      // If user does not exist, throw error
      if (!user) {
        throw AuthenticationError;
      }
      // Check password
      const correctPw = await user.isCorrectPassword(password);
      // If password is incorrect, throw error
      if (!correctPw) {
        throw AuthenticationError;
      }
      // Otherwise, sign token and return user
      const token = signToken(user);
      return { token, user };
    },
    // Mutation to SEND friend request
    sendFriendRequest: async (parent, { fromUserId, toUserId }, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // Find users sending and receiving request
        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

        // Update the sentFriendRequests field of user sending
        fromUser.sentFriendRequests.push(toUser);
        // Update the pendingFriendRequests field of user receiving
        toUser.pendingFriendRequests.push(fromUser);

        // Save the changes to the database
        await fromUser.save();
        await toUser.save();

        // Return the user who sent the request and their sentFriendRequests
        return User.findById(fromUserId).populate(
          "sentFriendRequests",
          "-password -__v"
        );
      }

      // Throw error if not authenticated
      throw AuthenticationError;
    },

    // Mutation to ACCEPT friend request
    acceptFriendRequest: async (parent, { fromUserId, toUserId }, context) => {
      // Check authentication
      if (context.user) {
        // Find users involved
        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

        // Add usersto eachothers friends list
        toUser.friends.push(fromUser);
        fromUser.friends.push(toUser);

        // Remove user who sent request from pendingFriendRequests list of recipient
        // Remove user who sent request from pendingFriendRequests list of recipient
        toUser.pendingFriendRequests = toUser.pendingFriendRequests.filter(
          // userId.toString() converts the ObjectId to a string so it can be compared with fromUserId and toUserId
          (userId) => userId.toString() !== fromUserId
        );
        // Remove user who received request from sentFriendRequests list of sender
        fromUser.sentFriendRequests = fromUser.sentFriendRequests.filter(
          // userId.toString() converts the ObjectId to a string so it can be compared with fromUserId and toUserId
          (userId) => userId.toString() !== toUserId
        );

        // Save changes to db
        await fromUser.save();
        await toUser.save();

        // Return user who received request/accepted and their friends list + pendingFriendRequests
        return User.findById(toUserId)
          .populate("friends", "-password -__v")
          .populate("pendingFriendRequests", "-password -__v");
      }

      // Throw error if not authenticated
      throw AuthenticationError;
    },

    // Mutation to REJECT friend request
    // Similar to acceptFriendRequest, but without adding to friends list
    rejectFriendRequest: async (parent, { fromUserId, toUserId }, context) => {
      // Check authenticatiom
      if (context.user) {
        // Find users involved
        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

        // Remove user who sent request from pendingFriendRequests list of recipient

        toUser.pendingFriendRequests = toUser.pendingFriendRequests.filter(
          // userId.toString() converts the ObjectId to a string so it can be compared with fromUserId and toUserId

          (userId) => userId.toString() !== fromUserId
        );
        // Remove user who received request from sentFriendRequests list of sender
        fromUser.sentFriendRequests = fromUser.sentFriendRequests.filter(
          // userId.toString() converts the ObjectId to a string so it can be compared with fromUserId and toUserId
          (userId) => userId.toString() !== toUserId
        );

        // Save the changes to the database
        await fromUser.save();
        await toUser.save();

        // Return user who received request/accepted and their friends list + pendingFriendRequests
        return User.findById(toUserId)
          .populate("friends", "-password -__v")
          .populate("pendingFriendRequests", "-password -__v");
      }

      // If the user is not authenticated, throw an error
      throw AuthenticationError;
    },
    addMovie: async (parent, args, context) => {
      if (context.user) {
        console.log("args:", args.input);
        console.log("context.user._id:", context.user._id);
        const recommendation = await Recommendation.create(args.input);
        console.log("recommendation", recommendation);

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recommendations: recommendation } },
          { new: true }
        ).populate("recommendations");
      }
    },
	addTV: async (parent, args, context) => {
		if (context.user) {
		  console.log("args:", args.input);
		  console.log("context.user._id:", context.user._id);
		  const recommendation = await Recommendation.create(args.input);
		  console.log("recommendation", recommendation);
  
		  return await User.findOneAndUpdate(
			{ _id: context.user._id },
			{ $addToSet: { recommendations: recommendation } },
			{ new: true }
		  ).populate("recommendations");
		}
	  },
  },

  //Date: dateScalar,
};

module.exports = resolvers;
