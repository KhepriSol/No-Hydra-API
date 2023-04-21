## Table of Contents
Installation
Usage
API Routes
Contributing
License
## Installation
Clone the repository to your local machine.
Install the required dependencies using the npm install command.
Create a .env file in the root directory with the following variables:
MONGODB_URI - the URI for your MongoDB database
JWT_SECRET - a secret key for JWT authentication
Start the server using the npm start command.
##Usage
Once the server is running, you can use a tool like Insomnia to interact with the API endpoints. See the API Routes section below for a list of available endpoints and their functionality.

## API Routes
The following API routes are available:

POST /api/users - create a new user
GET /api/users - get a list of all users
GET /api/users/:id - get a single user by ID
PUT /api/users/:id - update a user's profile by ID
DELETE /api/users/:id - delete a user by ID
POST /api/users/:userId/friends/:friendId - add a friend to a user's friend list
DELETE /api/users/:userId/friends/:friendId - remove a friend from a user's friend list
POST /api/thoughts - create a new thought
GET /api/thoughts - get a list of all thoughts
GET /api/thoughts/:id - get a single thought by ID
PUT /api/thoughts/:id - update a thought by ID
DELETE /api/thoughts/:id - delete a thought by ID
POST /api/thoughts/:thoughtId/reactions - add a reaction to a thought
DELETE /api/thoughts/:thoughtId/reactions/:reactionId - remove a reaction from a thought
Contributing
Contributions to this project are welcome. If you find a bug or have a feature request, please open an issue on the GitHub repository.

## License
This project is licensed under the MIT License.
