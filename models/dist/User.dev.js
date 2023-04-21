"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var moment = require('moment');

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username must be at most 20 characters long']
  },
  email: {
    type: String,
    required: [true, 'User email address required'],
    unique: true,
    validate: {
      validator: function validator(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: function message(props) {
        return "".concat(props.value, " is not a valid email address!");
      }
    }
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});
UserSchema.pre('findOneAndDelete', function _callee(next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this; // Remove all the user's thoughts

          _context.next = 3;
          return regeneratorRuntime.awrap(Thought.deleteMany({
            username: user.username
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.updateMany({
            friends: user._id
          }, {
            $pull: {
              friends: user._id
            }
          }));

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
var User = model('User', UserSchema);
module.exports = User;
//# sourceMappingURL=User.dev.js.map
