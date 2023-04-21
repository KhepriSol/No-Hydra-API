const router = require('express').Router();

// Import the API routes from the 'api' directory
const apiRoutes = require('./api');

// Mount the API routes under the '/api' endpoint
router.use('/api', apiRoutes);

// Define a catch-all route for 404 errors
router.use((req, res) => {
  res.status(404);
  res.send('<h1>(ㅠ﹏ㅠ) 404 Error...</h1>');
});

module.exports = router;
