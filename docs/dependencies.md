# App Dependencies Documentation

This document outlines the dependencies utilized in the full-stack application, detailing the roles and justifications for their inclusion across different parts of the application: the root project level, the server, and the frontend.

## Root

The root package.json primarily contains development tools and configurations that are applicable across the entire project. These tools ensure consistency in coding style and aid in the development process.

### Root DevDependencies

- **@babel/plugin-proposal-private-property-in-object:** Allows Babel to compile private properties in objects which are part of the latest ECMAScript features.
- **@typescript-eslint/eslint-plugin and @typescript-eslint/parser:** Provides linting rules and parsing for TypeScript, integrating TypeScript support into ESLint.
- **concurrently:** Used to run multiple commands concurrently during development, such as the front-end and back-end servers.
- **eslint and related plugins:** Supports the enforcement of coding style and best practices across JavaScript and TypeScript files.
- **prettier:** An opinionated code formatter that enforces a consistent style by parsing code and reprinting it with its own rules.
- **ts-node:** Used to run TypeScript files directly without pre-compiling them, which is useful for development and testing scripts.

## Server

The server-side dependencies are crucial for the API's functionality, handling HTTP requests, security, and database interactions.

### Server Dependencies

- **bcrypt:** Provides password hashing functionality, crucial for storing user passwords securely.
- **cors:** Middleware to enable CORS (Cross-Origin Resource Sharing) with various options.
- **express:** A web application framework for Node.js, designed for building web applications and APIs.
- **express-validator:** Middleware that wraps validator.js, a library that provides validators and sanitizers.
- **helmet:** Helps secure Express apps by setting various HTTP headers.
- **jsonwebtoken:** Implements JSON Web Tokens for secure transmission of information between parties.
- **pg and pg-hstore:** PostgreSQL client for Node.js - pg-hstore is a module for serializing and deserializing JSON data into the hstore format.
- **sequelize:** A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It supports robust transaction support, relations, eager and lazy loading, read replication, and more.

### Server DevDependencies

- **@types/:** TypeScript definitions that provide type checking and IntelliSense for the respective libraries.
- **cross-env:** Allows scripts to use environment variables across platforms.
- **dotenv:** Loads environment variables from a .env file into process.env.
- **jest and ts-jest:** Testing framework and a TypeScript preprocessor for Jest, respectively, facilitating writing tests in TypeScript.
- **nodemon:** Monitors for any changes in the source and automatically restarts the server.
- **sequelize-cli:** The command line interface for Sequelize, useful for handling database migrations.
- **supertest:** A library for testing HTTP assertions, making it easy to test Express applications.

## Frontend

The frontend dependencies include libraries essential for building the user interface and managing state in a React environment.

### Frontend Dependencies

- **@emotion/react and @emotion/styled:** Library for writing css styles with JavaScript, enabling dynamic styling in React components.
- **@mui/material and @mui/icons-material:** Material-UI components and icons for React.
- **axios:** Promise-based HTTP client for making requests to external resources.
- **jwt-decode:** A library that helps decoding JWTs token which are Base64Url encoded.
- **react, react-dom, and react-router-dom:** Core React library, the DOM bindings for React, and the DOM bindings for React Router, respectively.
- **@reduxjs/toolkit and react-redux:** Efficient tools for managing application state in React using Redux.
- **redux-thunk:** Middleware allowing action creators to return a function instead of an action object, useful for handling asynchronous operations within Redux.

### Frontend DevDependencies

- **@testing-library/jest-dom, @testing-library/react:** Utilities for testing React components in a more user-centric way.
- **@types/:** TypeScript definitions for React and related libraries.
- **babel-jest:** Transforms ES6+ code inside Jest tests.
- **eslint-plugin-react:** Provides specific linting rules for React.
- **react-scripts:** Configuration and scripts for Create React App.

## Conclusion

This detailed breakdown ensures all team members understand the purpose and functionality of each dependency within the project, aiding in maintenance and future development efforts.