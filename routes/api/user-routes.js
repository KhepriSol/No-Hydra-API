const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addToFriendList,
  removefromFriendList
} = require('../../controllers/user-controller');

// Set up routes for /api/users endpoint
router.route('/')
  .get(getAllUsers)    // Get all users
  .post(createUser);   // Create a new user

// Set up routes for /api/users/:id endpoint
router.route('/:id')
  .get(getUserById)    
  .put(updateUser)     
  .delete(deleteUser); 

// Set up routes for /api/users/:userId/friends/:friendId endpoint
router.route('/:userId/friends/:friendId')
  .post(addToFriendList)       
  .delete(removefromFriendList);

module.exports = router;
