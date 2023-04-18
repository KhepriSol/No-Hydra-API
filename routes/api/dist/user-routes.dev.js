"use strict";

var router = require('express').Router();

var _require = require('../../controllers/user-controller'),
    getAllUsers = _require.getAllUsers,
    getUserById = _require.getUserById,
    createUser = _require.createUser,
    updateUser = _require.updateUser,
    deleteUser = _require.deleteUser,
    addToFriendList = _require.addToFriendList,
    removefromFriendList = _require.removefromFriendList; // Set up routes for /api/users endpoint


router.route('/').get(getAllUsers) // Get all users
.post(createUser); // Create a new user
// Set up routes for /api/users/:id endpoint

router.route('/:id').get(getUserById).put(updateUser)["delete"](deleteUser); // Set up routes for /api/users/:userId/friends/:friendId endpoint

router.route('/:userId/friends/:friendId').post(addToFriendList)["delete"](removefromFriendList);
module.exports = router;
//# sourceMappingURL=user-routes.dev.js.map
