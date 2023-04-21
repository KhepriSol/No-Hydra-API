const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [20, 'Username must be at most 20 characters long'],
    },
    email: {
      type: String,
      required: [true, 'User email address required'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

UserSchema.pre('findOneAndDelete', async function (next) {
  const user = this;
  // Remove all the user's thoughts
  await Thought.deleteMany({ username: user.username });
  // Remove the user from all the friends' friends list
  await User.updateMany(
    { friends: user._id },
    { $pull: { friends: user._id } }
  );
  next();
});

const User = model('User', UserSchema);

module.exports = User;
