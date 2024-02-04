const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	userName: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: false,
		trim: true,
	},
	lastName: {
		type: String,
		required: false,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: [8, 'Password should be at least 8 characters long.'],
		// Originally had validation req for 1 upper, 1 lower and 1 symbol here, however
		// should handle validation on the client side: https://stackoverflow.com/questions/51766754/mongoose-custom-validation-for-password
		// its probable that the pre-save hashing with bcrypt will turn them into valid passwords regardless of the below - need to valdiate.
		// validate: [
		//   {
		//     validator: function(v) {
		//       return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v);
		//     },
		//     message: 'Password should contain at least one uppercase letter, one lowercase letter, and one number.'
		//   },
		//   {
		//     validator: function(v) {
		//       return !/\s/.test(v);
		//     },
		//     message: 'Password should not contain any whitespace.'
		//   }
		// ]
	},
	dateOfBirth: {
		type: Date, // Confirm date is compatible type - possibly add validation somewhere for date if we want minimum age.
		required: false,
	},
	recommendations: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Recommendation',
			default:[]
		},
	],
	shareSent: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Share',
			default:[]
		},
	],
	shareReceived: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Share',
			default:[]
		},
	],
	// watchlist: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: 'Watchlist',
	// 	},
	// ],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	pendingFriendRequests: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	sentFriendRequests: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

// Pseudo to help implement ABOVE SYSTEM:

// User A sends a friend request to User B
// UserA.sentFriendRequests.push(UserB._id);
// UserB.pendingFriendRequests.push(UserA._id);

// User B accepts the friend request
// UserA.friends.push(UserB._id);
// UserA.sentFriendRequests.remove(UserB._id);

// UserB.friends.push(UserA._id);
// UserB.pendingFriendRequests.remove(UserA._id);

// NOTE: An alternative solution https://www.reddit.com/r/node/comments/znrzlm/how_to_create_a_friend_request_system_with_mongodb/
// Uses a seperate model to track "relationships" with toUser and fromUser ids, with a status: 'pending' | 'confirmed' | 'blocked_to' | 'blocked_from' | 'blocked_both' - could be done with "enum"

userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

userSchema.methods.isCorrectPassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
