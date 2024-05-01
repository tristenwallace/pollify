# App Dependencies Documentation

This document outlines all dependencies utilized in the Employee Polls application, detailing their roles and justifications for inclusion across the project's root, server, and frontend components.

## Root

The `root` `package.json` mainly contains development tools and configurations that are applicable across the entire project.

### Root Dependencies

- **concurrently**
  - **Version**: ^8.2.2
  - **Purpose**: Used to run multiple commands concurrently, facilitating simultaneous development of both the frontend and backend.
  - **Documentation**: [Concurrently](https://www.npmjs.com/package/concurrently)

### Root DevDependencies

- **@babel/plugin-proposal-private-property-in-object**
  - **Version**: ^7.21.11
  - **Purpose**: Enables support for the latest ECMAScript features, specifically private properties in objects.
  - **Documentation**: [Babel Plugin Proposal](https://babeljs.io/docs/en/babel-plugin-proposal-private-property-in-object)

- **@typescript-eslint/eslint-plugin** and **@typescript-eslint/parser**
  - **Version**: ^7.6.0
  - **Purpose**: Provides TypeScript linting and parsing capabilities integrated with ESLint.
  - **Documentation**: [TypeScript ESLint](https://typescript-eslint.io/)

- **eslint**
  - **Version**: ^8.57.0
  - **Purpose**: Ensures code quality and consistency across JavaScript and TypeScript files.
  - **Documentation**: [ESLint](https://eslint.org/)

- **eslint-config-prettier**
  - **Version**: ^9.1.0
  - **Purpose**: Disables ESLint rules that might conflict with Prettier formatting rules.

- **eslint-import-resolver-typescript**
  - **Version**: ^3.6.1
  - **Purpose**: Adds ESLint resolving capabilities for TypeScript files.

- **eslint-plugin-import**
  - **Version**: ^2.29.1
  - **Purpose**: Provides support for linting ES6+ import/export syntax.

- **eslint-plugin-prettier**
  - **Version**: ^5.1.3
  - **Purpose**: Runs Prettier as an ESLint rule.

- **prettier**
  - **Version**: ^3.2.5
  - **Purpose**: Code formatter that ensures consistency in code style.
  - **Documentation**: [Prettier](https://prettier.io/)

- **ts-node**
  - **Version**: ^10.9.2
  - **Purpose**: Enables directly running TypeScript files in Node.js.
  - **Documentation**: [ts-node](https://typestrong.org/ts-node/)

- **typescript**
  - **Version**: ^4.9.5
  - **Purpose**: Adds static type checking to JavaScript, enhancing code quality and maintainability.

## Server

The server-side setup is crucial for handling API requests, security, and database interactions.

### Server Dependencies

- **bcrypt**
  - **Version**: ^5.1.1
  - **Purpose**: Provides secure password hashing.
  - **Documentation**: [bcrypt](https://www.npmjs.com/package/bcrypt)

- **cors**
  - **Version**: ^2.8.5
  - **Purpose**: Enables CORS to allow the frontend to interact securely with the backend.
  - **Documentation**: [CORS](https://www.npmjs.com/package/cors)

- **express**
  - **Version**: ^4.19.2
  - **Purpose**: Fundamental web framework for routing and middleware.
  - **Documentation**: [Express](https://expressjs.com/)

- **express-validator**
  - **Version**: ^7.0.1
  - **Purpose**: Provides middleware for validating and sanitizing inputs.

- **helmet**
  - **Version**: ^7.1.0
  - **Purpose**: Secures Express applications by setting various HTTP headers.

- **jsonwebtoken**
  - **Version**: ^8.5.1
  - **Purpose**: Facilitates the creation and verification of JSON Web Tokens.
  - **Documentation**: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- **pg** (PostgreSQL client) and **pg-hstore**
  - **Version**: ^8.11.5 and ^2.3.4
  - **Purpose**: Allows interaction with PostgreSQL databases and handling of hstore data type.

- **sequelize**
  - **Version**: ^6.37.3
  - **Purpose**: ORM for Node.js supporting multiple SQL dialects.
  - **Documentation**: [Sequelize](https://sequelize.org/)

### Server DevDependencies

- **cross-env**
  - **Version**: ^7.0.3
  - **Purpose**: Sets and uses environment variables across platforms.

- **dotenv**
  - **Version**: ^16.4.5
  - **Purpose**: Loads environment variables from `.env` files into `process.env`.

- **jest** and **ts-jest**
  - **Version**: ^29.7.0 and ^29.1.2
  - **Purpose**: Provides a framework for testing, with ts-jest used for handling TypeScript.
  - **Documentation**: [Jest](https://jestjs.io/)

- **nodemon**
  - **Version**: ^2.0.22
  - **Purpose**: Monitors changes and automatically restarts the server.
  - **Documentation**: [Nodemon](https://nodemon.io/)

- **sequelize-cli**
  - **Version**: ^6.6.2
  - **Purpose**: Command-line tools for managing Sequelize migrations.

- **supertest**
  - **Version**: ^6.3.4
  - **Purpose**: Facilitates HTTP assertions for testing Express applications.

## Frontend

The frontend relies on several libraries crucial for UI development and state management.

### Frontend Dependencies

- **@emotion/react** and **@emotion/styled**
  - **Version**: ^11.11.4 and ^11.11.5
  - **Purpose**: Allows for CSS-in-JS styling in React components.

- **@mui/material** and **@mui/icons-material**
  - **Version**: ^5.15.15
  - **Purpose**: Provides a comprehensive suite of UI tools for React applications.
  - **Documentation**: [MUI](https://mui.com/)

- **axios**
  - **Version**: ^1.6.8
  - **Purpose**: Manages HTTP requests to external APIs.
  - **Documentation**: [Axios](https://axios-http.com/)

- **jwt-decode**
  - **Version**: ^4.0.0
  - **Purpose**: Decodes JWTs to extract user details and token expiration information.

- **react**, **react-dom**, and **react-router-dom**
  - **Version**: ^18.0.0, ^18.0.0, and ^6.22.3
  - **Purpose**: Core libraries for building and routing within React applications.
  - **Documentation**: [React](https://reactjs.org/)

- **@reduxjs/toolkit** and **react-redux**
  - **Version**: ^2.2.3 and ^9.1.1
  - **Purpose**: Efficient state management tools for React applications.

- **redux-thunk**
  - **Version**: ^3.1.0
  - **Purpose**: Allows action creators to return functions, enabling asynchronous actions within Redux.

### Frontend DevDependencies

- **@testing-library/jest-dom** and **@testing-library/react**
  - **Version**: ^6.4.2 and ^15.0.2
  - **Purpose**: Provides utilities for testing React components in a user-centric way.
  - **Documentation**: [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

- **babel-jest**
  - **Version**: ^29.7.0
  - **Purpose**: Transforms ES6+ code inside Jest tests to ensure compatibility.

- **eslint-plugin-react**
  - **Version**: ^7.34.1
  - **Purpose**: Linting rules specific to React, helping maintain code quality.

- **react-scripts**
  - **Version**: ^5.0.1
  - **Purpose**: Includes scripts and configuration used by Create React App.

## Conclusion

This detailed documentation ensures that all team members and new developers understand the specific purposes and functionalities of each dependency, aiding in the project's maintenance and future development.
