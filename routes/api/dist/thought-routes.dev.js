"use strict";

var router = require('express').Router();

var _require = require('../../controllers/thought-controller'),
    getAllThoughts = _require.getAllThoughts,
    getThoughtById = _require.getThoughtById,
    addThought = _require.addThought,
    updateThought = _require.updateThought,
    removeThought = _require.removeThought,
    addReaction = _require.addReaction,
    removeReaction = _require.removeReaction; // Routes for /api/thoughts endpoint


router.route('/').get(getAllThoughts) // Get all thoughts
.post(addThought); // Add a new thought
// Routes for /api/thoughts/:thoughtId endpoint

router.route('/:thoughtId').get(getThoughtById).put(updateThought)["delete"](removeThought); // Route for /api/thoughts/:thoughtId/reactions endpoint

router.route('/:thoughtId/reactions').post(addReaction); // Route for /api/thoughts/:thoughtId/reactions/:reactionId endpoint
// Remove a reaction from a specific thought by ID and reaction ID

router.route('/:thoughtId/reactions/:reactionId')["delete"](removeReaction);
module.exports = router;
//# sourceMappingURL=thought-routes.dev.js.map
