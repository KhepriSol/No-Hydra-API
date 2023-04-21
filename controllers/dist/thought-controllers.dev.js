"use strict";

var _require = require('../models'),
    Thought = _require.Thought,
    User = _require.User;

var thoughtController = {
  // GET all thoughts
  getAllThoughts: function getAllThoughts(req, res) {
    Thought.find({}).then(function (dbThoughtData) {
      return res.json(dbThoughtData);
    })["catch"](function (err) {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // GET one thought by id
  getThoughtById: function getThoughtById(_ref, res) {
    var params = _ref.params;
    Thought.findOne({
      _id: params.id
    }).select('-__v').sort({
      _id: -1
    }).then(function (dbThoughtData) {
      if (!dbThoughtData) {
        res.status(404).json({
          message: 'No thought found with id.'
        });
        return;
      }

      res.json(dbThoughtData);
    })["catch"](function (err) {
      console.log(err);
      res.status(400).json(err);
    });
  },
  // CREATE thought
  addThought: function addThought(_ref2, res) {
    var body = _ref2.body;
    Thought.create(body).then(function (thoughtData) {
      return User.findOneAndUpdate( // Use the current user to create the thought
      {
        _id: body.userId
      }, {
        $addToSet: {
          thoughts: thoughtData._id
        }
      }, {
        "new": true
      });
    }).then(function (dbUserData) {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No user found with this id.'
        });
        return;
      }

      res.json(dbUserData);
    })["catch"](function (err) {
      console.log(err);
      res.status(400).json(err);
    });
  },
  // UPDATE thought by id
  updateThought: function updateThought(_ref3, res) {
    var params = _ref3.params,
        body = _ref3.body;
    Thought.findOneAndUpdate({
      _id: params.thoughtId
    }, {
      $set: body
    }, {
      runValidators: true,
      "new": true
    }).then(function (updatedThought) {
      if (!updatedThought) {
        return res.status(404).json({
          message: 'No thought with this id!'
        });
      }

      return res.json({
        message: "Success"
      });
    })["catch"](function (err) {
      return res.json(err);
    });
  },
  // DELETE thought
  removeThought: function removeThought(_ref4, res) {
    var params = _ref4.params;
    Thought.findOneAndDelete({
      _id: params.thoughtId
    }).then(function (deletedThought) {
      if (!deletedThought) {
        return res.status(404).json({
          message: 'No thought with this id!'
        });
      }

      return User.findOneAndUpdate({
        thoughts: params.thoughtId
      }, {
        $pull: {
          thoughts: params.thoughtId
        }
      }, {
        "new": true
      });
    }).then(function (dbUserData) {
      if (!dbUserData) {
        res.status(404).json({
          message: 'No thought found with this id!'
        });
        return;
      }

      res.json(dbUserData);
    })["catch"](function (err) {
      return res.json(err);
    });
  },
  // CREATE reactions
  addReaction: function addReaction(_ref5, res) {
    var params = _ref5.params,
        body = _ref5.body;
    Thought.findOneAndUpdate({
      _id: params.thoughtId
    }, {
      $push: {
        reactions: body
      }
    }, {
      "new": true,
      runValidators: true
    }).then(function (updatedThought) {
      if (!updatedThought) {
        res.status(404).json({
          message: 'No reaction found with this id!'
        });
        return;
      }

      res.json(updatedThought);
    })["catch"](function (err) {
      return res.json(err);
    });
  },
  // Delete a reaction
  removeReaction: function removeReaction(_ref6, res) {
    var params = _ref6.params;
    Thought.findOneAndUpdate({
      _id: params.thoughtId
    }, //allows to remove the reaction by id
    {
      $pull: {
        reactions: {
          reactionId: params.reactionId
        }
      }
    }, {
      "new": true
    }).then(function (thought) {
      if (!thought) {
        res.status(404).json({
          message: 'No reaction found with this id.'
        });
        return;
      }

      res.json(thought);
    })["catch"](function (err) {
      return res.json(err);
    });
  }
};
module.exports = thoughtController;
//# sourceMappingURL=thought-controllers.dev.js.map
