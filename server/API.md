# Polling App API Documentation

## Base URL

All API requests are made to the base URL of the deployed backend. For development, this is `http://localhost:5000/`.

## Authentication

- All protected routes require a bearer token to be sent in the `Authorization` header.
- Tokens are acquired through the login endpoint and must be included in subsequent requests to protected endpoints.

## Users

### POST /users

- **Description**: Register a new user.
- **Body**:
  - `username`: String
  - `password`: String
  - `name`: String
  - `avatarURL`: String (optional)
- **Response**: User object with details and a JWT token.

### POST /login

- **Description**: Authenticate a user and return a JWT.
- **Body**:
  - `username`: String
  - `password`: String
- **Response**: JWT token and user details.

### GET /users

- **Description**: Fetch all users.
- **Response**: Array of all user objects.

### GET /users/:id

- **Description**: Fetch a single user by ID (Admin or the authenticated user).
- **Response**: User object.

## Polls

### GET /polls

- **Description**: Fetch all polls.
- **Response**: Array of all poll objects, each including author details and vote counts.

### GET /polls/:id

- **Description**: Fetch a single poll by ID.
- **Response**: Detailed poll object including author information and options.

### POST /polls

- **Description**: Create a new poll (authenticated users only).
- **Body**:
  - `optionOneText`: String
  - `optionTwoText`: String
- **Response**: Newly created poll object.

## Votes

### POST /polls/:id/vote

- **Description**: Submit a vote on a poll option (authenticated users only).
- **Body**:
  - `option`: String (`optionOne` or `optionTwo`)
- **Response**: Updated poll object with new vote counts.

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
- `timestamp`: Timestamp
- `optionOneText`: String
- `optionOneVotes`: Integer, Default 0
- `optionTwoText`: String
- `optionTwoVotes`: Integer, Default 0

### Votes Table

- `id`: Primary Key, UUID
- `userId`: Foreign Key, References Users
- `pollId`: Foreign Key, References Polls
- `optionChosen`: Enum ('optionOne', 'optionTwo')

## Error Handling

- All endpoints should return appropriate HTTP status codes along with descriptive error messages in the case of failures.
