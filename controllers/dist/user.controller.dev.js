"use strict";

var _require = require('../models'),
    User = _require.User;

var userController = {
  //get all users
  getAllUsers: function getAllUsers(req, res) {
    User.find({}).populate({
      path: 'thoughts',
      //allows to remove __v from visuals
      select: '-__v'
    }).populate({
      path: 'friends',
      select: '-__v'
    }).select('-__v') // sort by descending order by the _id value
    .sort({
      _id: -1
    }).then(function (dbUserData) {
      return res.json(dbUserData);
    })["catch"](function (err) {
      console.log(err);
      res.status(500).json(err);
    });
  },
  //get one user by id
  getUserById: function getUserById(_ref, res) {
    var params = _ref.params;
    User.findOne({
      _id: params.id
    }).populate({
      path: 'thoughts',
      select: '-__v'
    }).select('-__v').then(function (dbUserData) {
      return res.json(dbUserData);
    })["catch"](function (err) {
      console.log(err);
      res.sendStatus(400);
    });
  },
  //create user
  createUser: function createUser(_ref2, res) {
    var body = _ref2.body;
    User.create(body).then(function (dbUserData) {
      return res.json(dbUserData);
    })["catch"](function (err) {
      return res.status(400).json(err);
    });
  },
  //update user by id
  updateUser: function updateUser(_ref3, res) {
    var params = _ref3.params,
        body = _ref3.body;
    User.findOneAndUpdate({
      _id: params.id
    }, body, {
      "new": true,
      runValidators: true
    }).then(function (dbUserData) {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id.'
        });
        return;
      }

      res.json(dbUserData);
    })["catch"](function (err) {
      return res.status(400).json(err);
    });
  },
  //delete user
  deleteUser: function deleteUser(_ref4, res) {
    var params = _ref4.params;
    User.findOneAndDelete({
      _id: params.id
    }).then(function (dbUserData) {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id.'
        });
        return;
      }

      return dbUserData;
    }).then(function (dbUserData) {
      User.updateMany({
        _id: {
          $in: dbUserData.friends
        }
      }, {
        $pull: {
          friends: params.userId
        }
      }).then(function () {
        //deletes user's thought associated with id
        Thought.deleteMany({
          username: dbUserData.username
        }).then(function () {
          res.json({
            message: 'User deleted successfully'
          });
        })["catch"](function (err) {
          console.log(err);
          res.status(400).json(err);
        });
      })["catch"](function (err) {
        console.log(err);
        res.status(400).json(err);
      });
    })["catch"](function (err) {
      console.log(err);
      res.status(400).json(err);
    });
  },
  //add friends
  addToFriendList: function addToFriendList(_ref5, res) {
    var params = _ref5.params;
    User.findOneAndUpdate({
      _id: params.userId
    }, {
      $push: {
        friends: params.friendId
      }
    }, {
      "new": true
    }).then(function (dbUserData) {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found!'
        });
        return;
      }

      res.json(dbUserData);
    })["catch"](function (err) {
      console.log(err);
      res.json(err);
    });
  },
  //delete friend
  removefromFriendList: function removefromFriendList(_ref6, res) {
    var params = _ref6.params;
    User.findOneAndDelete({
      _id: params.thoghtId
    }).then(function (deletedFriend) {
      if (!deletedFriend) {
        return res.status(404).json({
          message: 'No friend found.'
        });
      }

      return User.findOneAndUpdate({
        friends: params.friendId
      }, {
        $pull: {
          friends: params.friendId
        }
      }, {
        "new": true
      });
    }).then(function (dbUserData) {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No friend found.'
        });
        return;
      }

      res.json(dbUserData);
    })["catch"](function (err) {
      return res.json(err);
    });
  }
};
module.exports = userController;
//# sourceMappingURL=user.controller.dev.js.map
