const router = require('express').Router();

// Import the thought and user routes from their respective files
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// Mount the thought routes under the '/thoughts' endpoint
router.use('/thoughts', thoughtRoutes);

// Mount the user routes under the '/users' endpoint
router.use('/users', userRoutes);

module.exports = router;
