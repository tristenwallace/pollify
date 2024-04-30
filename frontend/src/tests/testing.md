# Testing Plan

## Components

### 1. Navbar

- Verifies responsive behavior and the display of correct navigation links based on the user's authentication status. (!TODO!)
- Checks the mobile hamburger menu functionality. (!TODO!)

### 2. Home Page

- Tests display of polls and conditional content for authenticated vs. unauthenticated users. (!TODO!)
- Ensures correct filtering and display of answered and unanswered polls. (!TODO!)

### 3. Login Form

- Validates form submission handling and user feedback on errors. (!TODO!)
- Tests navigation between Login and Signup forms. (!TODO!)

### 4. Signup Form

- Checks form validation, submission handling, and error feedback. (!TODO!)
- Validates navigation between Signup and Login forms. (!TODO!)

### 5. Poll List

- Ensures correct fetching and rendering of polls. (!TODO!)

### 6. Poll Details

- Tests display of poll details, voting functionality, and results presentation. (!TODO!)

### 7. Create Poll Form

- Validates form submissions for creating new polls. (!TODO!)

### 8. Leaderboard

- Checks correct fetching and display of user statistics, sorted by activity. (!TODO!)

## API Calls

### 1. Fetch Users

- Ensures users are retrieved correctly and handles errors. (!TODO!)

### 2. Login User

- Tests successful user authentication and error handling. (!TODO!)

### 3. Register User

- Validates user registration and error responses. (!TODO!)

### 4. Fetch Polls

- Ensures polls are fetched correctly and handles possible errors. (!TODO!)

### 5. Create Poll

- Tests API response on creating a new poll and handles errors. (!TODO!)

### 6. Vote on Poll

- Ensures the voting mechanism works correctly and error conditions are handled. (!TODO!)

## Testing Strategy

### MVP Unit Testing with Jest

#### Unit Tests

- Test individual functions and components in isolation. (!TODO!)
- Mock API calls using jest mocks to simulate server responses. (!TODO!)
- Use React Testing Library to render components and interact with them as users would. (!TODO!)

### Comprehensive Testing with Playwright

#### Integration Tests

- Verify the interaction between components and the API. (!TODO!)
- Test scenarios such as user registration, login, poll creation, and voting workflows. (!TODO!)

#### End-to-End Tests

- Simulate user journeys from start to finish. (!TODO!)
- Use Playwright to automate browser interactions to test the complete flow of the application, including responsive behavior on different devices. (!TODO!)
