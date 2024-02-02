// NOTE We may want to update AuthenticationError to be more specific/remove if redundant.

// IMPORT MODELS HERE
const { User } = require('../models');

// Import Auth middleware
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async (parent, args, context) => {
			if (context.user) {
				return User.find({});
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		user: async (parent, { id }, context) => {
			if (context.user) {
				return User.findById(id);
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		// Query to find list of users friends
		friends: async (parent, { id }, context) => {
			if (context.user) {
				const user = await User.findById(id);
				return user.friends;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		// Query to find list of users pending requests
		pendingFriendRequests: async (parent, { id }, context) => {
			if (context.user) {
				const user = await User.findById(id);
				return user.pendingFriendRequests;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		// Query to find list of users sent requests
		sentFriendRequests: async (parent, { id }, context) => {
			if (context.user) {
				const user = await User.findById(id);
				return user.sentFriendRequests;
			}
			throw new AuthenticationError('You need to be logged in!');
		},
	},
	Mutation: {
		// Mutation to add a new user
		// Sign token and return user
		// Context is not required as this is an unauthenticated mutation that results in authentication
		addUser: async (parent, { user }) => {
			const newUser = await User.create(user);
			const token = signToken(newUser);
			return { token, newUser };
		},
		// Mutation to update a user - consider if we want to implement this
		// If so, require password to confirm changes?
		updateUser: async (parent, { id, user }, context) => {
			if (context.user) {
				return User.findByIdAndUpdate(id, user, { new: true });
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		// Mutation to delete a user
		// See comment above at updateUser
		deleteUser: async (parent, { id }, context) => {
			if (context.user) {
				return User.findByIdAndDelete(id);
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		// Mutation to login
		// Context is not required as this is an unauthenticated mutation that results in authentication
		login: async (parent, { input: { email, password } }) => {
			// Find user by email
			const user = await User.findOne({ email });
			// If user does not exist, throw error
			if (!user) {
				throw new AuthenticationError('Incorrect username or password'); // Do we want to be more specific?
			}
			// Check password
			const correctPw = await user.isCorrectPassword(password);
			// If password is incorrect, throw error
			if (!correctPw) {
				throw new AuthenticationError('Incorrect username or password'); // Do we want to be more specific?
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

				// Return the user who sent the request
				return fromUser;
			}

			// Throw error if not authenticated
			throw new AuthenticationError('You need to be logged in!');
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
				toUser.pendingFriendRequests = toUser.pendingFriendRequests.filter(
					(user) => user.id !== fromUserId
				);
				// Remove user who received request from sentFriendRequests list of sender
				fromUser.sentFriendRequests = fromUser.sentFriendRequests.filter(
					(user) => user.id !== toUserId
				);

				// Save changes to db
				await fromUser.save();
				await toUser.save();

				// Return user who received request/accepted
				return toUser;
			}

			// Throw error if not authenticated
			throw new AuthenticationError('You need to be logged in!');
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
					(user) => user.id !== fromUserId
				);
				// Remove user who received request from sentFriendRequests list of sender
				fromUser.sentFriendRequests = fromUser.sentFriendRequests.filter(
					(user) => user.id !== toUserId
				);

				// Save the changes to the database
				await fromUser.save();
				await toUser.save();

				// Return the user who received request/rejected it
				return toUser;
			}

			// If the user is not authenticated, throw an error
			throw new AuthenticationError('You need to be logged in!');
		},
	},
};

module.exports = resolvers;
