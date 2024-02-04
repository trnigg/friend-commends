const { Schema, model } = require('mongoose');


const recommendationSchema = new Schema(
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
    createdAt: {
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
// recommendationSchema.virtual('Count').get(function () {
//     return this.reactions.length;
//   });



const Recommendation = model('Recommendation', recommendationSchema);

module.exports = Recommendation;