# API Overview

## RESTful Routes

### Users

- GET /users: Fetch all users (Admin only)
- GET /users/:id: Fetch a single user by ID (Admin or same user)
- POST /users: Register a new user
- POST /users/login: Authenticate a user and return a token

### Questions

- GET /questions: Fetch all questions
- GET /questions/:id: Fetch a single question by ID
- POST /questions: Create a new question (Authenticated users only)
- DELETE /questions/:id: Delete a question (Admin or question author)

### Votes

- POST /questions/:id/vote: Vote on a question (Authenticated users only)
- PUT /questions/:id/vote: Update a vote on a question (Authenticated users only)

## Database Schema Design

### Users Table

- id: Primary Key
- username: Text, Unique
- password: Text (hashed)
- name: Text
- avatarURL: Text (Optional)

### Questions Table

- id: Primary Key
- author_id: Foreign Key to Users
- timestamp: Timestamp
- optionOne_text: Text
- optionOne_votes: Array of user IDs (Text[])
- optionTwo_text: Text
- optionTwo_votes: Array of user IDs (Text[])

## Behavior Overview

### User Endpoints:

- GET /users: Returns all user profiles. Restricted to admin roles.
- GET /users/:id: Returns the user profile based on the user ID. Accessible by the user themselves or an admin.
- POST /users: Allows a new user to register by providing username, password, and optional name and avatar URL. The password is hashed before storing.
- POST /users/login: Authenticates user credentials and returns a JWT for access control.

### Question Endpoints:

- GET /questions: Retrieves all questions available in the database.
- GET /questions/:id: Retrieves a specific question by its ID including all details such as options and votes.
- POST /questions: Allows authenticated users to post a new question. Requires an auth token.
- DELETE /questions/:id: Allows a question to be deleted. This action is restricted to the question author or an admin.

### Vote Endpoints:

- POST /questions/:id/vote: Allows authenticated users to vote on a question. Users must provide their user ID and selected option.
- PUT /questions/:id/vote: Allows users to change their vote on a specific question. This endpoint checks if the user already voted and updates the vote accordingly.