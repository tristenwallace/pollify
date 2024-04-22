# Polling App

The Polling App is a full-featured polling platform designed for individuals and organizations to create and participate in polls. It offers an interactive and user-friendly interface for users to express their opinions through votes, view poll results in real-time, and engage with a community of like-minded participants.

## Features

User Authentication: Secure login and registration system to manage user sessions.

Create Polls: Users can create polls with multiple choices.

Vote on Polls: Authenticated users can vote on different polls and see immediate updates.

View Results: Results are displayed as percentages alongside the total votes.

Leaderboard: A leaderboard showing users ranked by their activity, such as polls created and participated in.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- Node.js: Version 20.x or later, available at Node.js official website.
- Yarn or npm: Package managers to install dependencies and run the project.
- Docker

## Installation

To install the Polling App, follow these steps:

1.Clone the repository: `git clone git@github.com:tristenwallace/employee_polling_app.git`

2.Navigate to the project directory: `cd employee_polling_app`

### Installing the Frontend

`cd frontend`

1.Install dependencies: `npm install`

### Installing the Backend

`cd ../server`

1.Install dependencies: `npm install`

2.Update .env variables in ./environment by replacing the values if necessary and removing ".template" from the end of each file.

3.Add .env file to root:

```
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

## Database Setup

Before running the application, you need to set up the databases for both development and testing environments. This project uses PostgreSQL as the database system.

### Using Docker

If you prefer to use Docker to run PostgreSQL (docker setup is already provided):

1.Ensure Docker is installed and running on your system. You can download it from the official Docker website.

2.Navigate to the server directory of the project where the docker-compose.yml file is located.

3.**Permissions:** This setup includes an initialization script for PostgreSQL. Run the following from the root folder to ensure the script is executable:

```
chmod +x ./postgres-init/init-user-db.sh
```

4.Run the following command to start the PostgreSQL containers in detached mode:

```
docker-compose up --build -d
```

This grants the necessary permissions to execute the database initialization script when the PostgreSQL container starts.

## Running the Application

### Frontend

To run the frontend of the Polling App on your local machine, execute the following command inside the frontend directory:

1.Start the development server: `npm start`
2.Open http://localhost:3000 in your browser to view the app.

### Backend

To start the backend server, execute the following command inside the server directory:

1.Start the development server: `npm run dev`
2.This will start the backend on http://localhost:5000 by default.