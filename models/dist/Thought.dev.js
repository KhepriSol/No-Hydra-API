"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var moment = require('moment');

var reactionSchema = require('./Reaction');

var ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    get: function get(createdAtVal) {
      return moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a');
    }
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  // use reactionSchema to validate data for a reply
  reactions: [reactionSchema]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});
ThoughtSchema.pre('findOneAndDelete', function _callee(next) {
  var thought;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          thought = this; // Remove all reactions on the thought being deleted

          _context.next = 3;
          return regeneratorRuntime.awrap(Reaction.deleteMany({
            thoughtId: thought._id
          }));

        case 3:
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
var Thought = model('Thought', ThoughtSchema);
module.exports = Thought;
//# sourceMappingURL=Thought.dev.js.map
