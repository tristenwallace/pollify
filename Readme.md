# Pollify

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/KPSszw1xUCAvioRxYj4MSJ/pLc8BUmCLCrMcRmxKvR4U/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/KPSszw1xUCAvioRxYj4MSJ/pLc8BUmCLCrMcRmxKvR4U/tree/main)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

Pollify is a full-featured polling platform designed for individuals and organizations to create and participate in polls. It offers an interactive and user-friendly interface for users to express their opinions through votes, view poll results in real-time, and engage with a community of like-minded participants.

Try adding your own Polls!

[https://pollify.dev/](https://pollify.dev/)

![Polling App Homepage](<https://hangouthabit.sirv.com/polling_app/Poll_Dashboard.png>)

## Features

**User Authentication:** Secure login and registration system to manage user sessions.

**Create Polls:** Users can create polls with multiple choices.

**Vote on Polls:** Authenticated users can vote on different polls and see immediate updates.

**View Results:** Results are displayed as percentages alongside the total votes.

**Leaderboard:** A leaderboard showing users ranked by their activity, such as polls created and participated in.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Node.js:** Version 20.x or later, available at Node.js official website.
- **Yarn or npm:** Package managers to install dependencies and run the project.
- **Docker**

## Installation

To install the Polling App, follow these steps:

1.Clone the repository: `git clone git@github.com:tristenwallace/pollify.git`

2.Navigate to the project directory: `cd pollify`

3.Install Root Dependencies: npm install (Important for Husky Pre-Commit Hooks)

### Setup environment variables

2.Navigate to environment folder: `cd environment`

3.Copy .env.template file to create `.env.development` and `.env.test` files. PORT should be different for each, I typically change test PORT to 5433.

## Running the Application

Before running the application, ensure Docker is installed and running on your system. You can download it from the [official Docker website](https://docs.docker.com/desktop/install/ubuntu/).

The frontend, backend, and database services are all handled via Docker. To start the application in the development environment on your local machine, run the following command in the root directory:

```
docker-compose up --build -d
```

This command will start the frontend at `http://localhost:3000` and the backend at `http://localhost:5000`.

No additional setup steps are necessary, as Docker handles all service dependencies and initializations.

## Further documentation

For more detailed information on setting up, running, and testing the application, refer to the following guides in our documentation:

### API Documentation

For more information about the API endpoints, see the [API Documentation](https://api.pollify.dev/docs).

### Architecture

Below is a high-level overview of the Polling App's architecture:

![Architecture Diagram](https://hangouthabit.sirv.com/polling_app/architecture_diagram.jpeg)

For a detailed explanation of our infrastructure setup, view our [Infrastructure Guide](docs/Infrastructure.md).


### CI/CD Pipeline

Overview of our CircleCi pipeline process

[View Pipeline Process](docs/Pipeline.md)

![Pipeline Diagram](<https://hangouthabit.sirv.com/polling_app/pipeline_diagram.jpeg>)

### Testing

Refer to [Testing Documentation](frontend/src/tests/docs/testing.md) for details on planned testing using Jest & Playwright.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
