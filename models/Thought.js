const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // use reactionSchema to validate data for a reply
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

ThoughtSchema.pre('findOneAndDelete', async function (next) {
  const thought = this;
  // Remove all reactions on the thought being deleted
  await Reaction.deleteMany({ thoughtId: thought._id });
  next();
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
