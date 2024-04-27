# Polling App API Documentation

## Base URL

All API requests are made to the base URL of the deployed backend. For development, this is `http://localhost:5000/`.

## Users

- All protected routes require a bearer token to be sent in the `Authorization` header.
- Tokens are acquired through the login endpoint and must be included in subsequent requests to protected endpoints.

### POST /register

- **Description**: Register a new user.
- **Body**:
  - `username`: String
  - `password`: String
  - `name`: String
  - `avatarURL`: String (optional)
- **Response**: JWT token with user details.

### POST /login

- **Description**: Authenticate a user and return a JWT.
- **Body**:
  - `username`: String
  - `password`: String
- **Response**: JWT token with user details.

### GET /users

- **Description**: Fetch all users.
- **Response**: Array of all user objects(id, username, name, voteCount, pollCount)

## Polls

### GET /polls

- **Description**: Fetch all polls.
- **Response**: Array of all poll objects, each including authorId, two options, and array of votes

### POST /polls

- **Description**: Create a new poll (authenticated users only).
- **Body**:
  - `optionOne`: String
  - `optionTwo`: String
  - `authorId`: String 
- **Response**: Newly created poll object.

## Votes

### POST /polls/:id/vote

- **Description**: Submit a vote on a poll option (authenticated users only).
- **Body**:
  - `userId`: String
  - `pollId`: String
  - `chosenOption`: Integer (1 or 2)
- **Response**: Newly created vote object.

## Database Schema Design

### Users Table

- `id`: Primary Key, UUID
- `username`: String, Unique
- `password`: String, Hashed
- `name`: String
- `avatarURL`: String, Nullable

### Polls Table

- `id`: Primary Key, UUID
- `authorId`: Foreign Key, References Users
- `optionOne`: String
- `optionTwo`: String

### Votes Table

- `id`: Primary Key, UUID
- `userId`: Foreign Key, References Users
- `pollId`: Foreign Key, References Polls
- `chosenOption`: Integer (1 or 2)

## Error Handling

- All endpoints should return appropriate HTTP status codes along with descriptive error messages in the case of failures.
