"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    Types = _require.Types;

var moment = require('moment');

var reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    "default": Date.now,
    get: function get(createdAtVal) {
      return moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a');
    }
  }
}, {
  toJSON: {
    getters: true
  },
  id: false
});
reactionSchema.add({
  reactionId: {
    type: Types.ObjectId,
    "default": function _default() {
      return new Types.ObjectId();
    }
  }
});
module.exports = reactionSchema;
//# sourceMappingURL=Reaction.dev.js.map
