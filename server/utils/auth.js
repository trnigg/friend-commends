const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const path = require('path'); // required to resolve the path to the .env file
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); // Getting secret from .env file in root directory

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
	AuthenticationError: new GraphQLError('Could not authenticate user.', {
		extensions: {
			code: 'UNAUTHENTICATED',
		},
	}),
	authMiddleware: function ({ req }) {
		// allows token to be sent via req.body, req.query, or headers
		let token = req.body.token || req.query.token || req.headers.authorization;

		// ["Bearer", "<tokenvalue>"]
		if (req.headers.authorization) {
			token = token.split(' ').pop().trim();
		}

		if (!token) {
			return req;
		}

		try {
			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			req.user = data;
		} catch {
			console.log('Invalid token');
		}

		return req;
	},
	// WHAT ELSE DO WE WAN IN THE PAYLOAD?
	signToken: function ({ email, _id }) {
		const payload = { email, _id };
		console.log(secret, expiration, payload); // TODO - remove!
		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},
};
