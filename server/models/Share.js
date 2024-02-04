const { Schema, model } = require('mongoose');


const shareSchema = new Schema(
  {
    tmdbID:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
        enum: ['Movie', 'TV','Book'],
    },
    original_title: {
        type: String,
        required: false,
    },
    original_name: {
        type: String,
        required: false,
    },
    poster_path: {
      type: String,
      required: false,
    },
    overview: {
        type: String,
        required: false,
    },
    release_date: {
        type: Date,
        required: false,
    },
    first_air_date: {
        type: Date,
        required: false,
    },
    AU_platforms:{
        type:[String],
        required:false,
    },
    sharedFrom: 
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
    sharedTo: 
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
    shareMessage: {
        type: String,
        required: false,
    },
    sharedAt: {
        type: Date,
        default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters:true,
    },
  }
);

//count 
// shareSchema.virtual('Count').get(function () {
//     return this.reactions.length;
//   });



const Share = model('Share', shareSchema);

module.exports = Share;