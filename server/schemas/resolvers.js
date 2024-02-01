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
	},
	Mutation: {
		addUser: async (parent, { user }) => {
			const newUser = await User.create(user);
			const token = signToken(newUser);
			return { token, newUser };
		},
		updateUser: async (parent, { id, user }) => {
			if (context.user) {
				return User.findByIdAndUpdate(id, user, { new: true });
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		deleteUser: async (parent, { id }, context) => {
			if (context.user) {
				return User.findByIdAndDelete(id);
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		login: async (parent, { input: { email, password } }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrect username or password');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect username or password');
			}

			const token = signToken(user);
			return { token, user };
		},
	},
};

module.exports = resolvers;
