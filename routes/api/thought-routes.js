const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// Routes for /api/thoughts endpoint
router.route('/')
  .get(getAllThoughts)  // Get all thoughts
  .post(addThought);    // Add a new thought

// Routes for /api/thoughts/:thoughtId endpoint
router.route('/:thoughtId')
  .get(getThoughtById)      
  .put(updateThought)       
  .delete(removeThought);   

// Route for /api/thoughts/:thoughtId/reactions endpoint
router.route('/:thoughtId/reactions')
  .post(addReaction);   

// Route for /api/thoughts/:thoughtId/reactions/:reactionId endpoint
// Remove a reaction from a specific thought by ID and reaction ID
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);  

module.exports = router;
