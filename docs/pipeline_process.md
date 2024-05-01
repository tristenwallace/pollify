# CI/CD Pipeline Description

This document provides an overview of the Continuous Integration and Continuous Deployment (CI/CD) pipeline configured for our project. The pipeline is specifically designed to automate the building, testing, and deployment processes for both the frontend and backend components of our application to AWS Elastic Beanstalk and Amazon S3, respectively.

## Pipeline Configuration Overview

### CircleCI Configuration

Our CI/CD pipeline utilizes CircleCI, leveraging its powerful orbs feature to simplify integration with Node.js and AWS services. Here’s a breakdown of the pipeline steps:

### 1. CircleCI Orbs

- **Node Orb**: Used to manage Node.js versions and dependencies efficiently.
- **AWS Elastic Beanstalk Orb**: Simplifies interactions with AWS Elastic Beanstalk for deploying the backend.
- **AWS CLI Orb**: Facilitates commands and operations with AWS, particularly for deploying the frontend to Amazon S3.

### 2. Build Job

#### Steps

- **Node.js Environment Setup**: Configures the environment using a specific Node.js version (20.12) to ensure consistency across all environments.
- **Checkout**: Pulls the latest code from the repository for both frontend and backend components.
- **Install Dependencies**:
  - **Frontend Dependencies**: Executes `npm run install-client` which installs dependencies required for the frontend.
  - **Backend Dependencies**: Navigates to the `server` directory and installs backend dependencies.
- **Linting**: Runs linting across both frontend and backend code to ensure code quality and style consistency.
- **Building**:
  - **Frontend Build**: Builds the frontend application, preparing it for deployment to S3.
  - **Backend Build**: Compiles the backend application, preparing it for deployment to Elastic Beanstalk.

### 3. Deploy Job

#### Environment Setup

- **Base Image**: Uses a minimal base Docker image equipped with necessary tools for deployment.

#### Steps

- **AWS CLI Setup**: Configures the AWS CLI with necessary credentials and default region settings.
- **Deploy to AWS**:
  - **Frontend Deployment to S3**: Syncs the built frontend files from the `build` directory to the specified Amazon S3 bucket, making the frontend publicly accessible.
  - **Backend Deployment to Elastic Beanstalk**: Packages the backend build into a zip file and uses AWS Elastic Beanstalk's CLI to deploy the application, ensuring the backend is updated and running.

### 4. Workflow Configuration

#### Sequence

- **Build**: The initial job builds both the frontend and backend.
- **Hold**: An optional manual approval step allows for review and gatekeeping before deploying to production environments.
- **Deploy**: Upon approval, the deploy job is triggered, updating both the frontend and backend in their respective AWS services.

### 5. Branch Filters

- The pipeline is configured to trigger only on changes to the `main` branch, ensuring that only fully vetted and reviewed code is deployed to production.

## Conclusion

This CI/CD setup ensures that every commit pushed to `main` is automatically built, tested, and, upon approval, deployed. It not only enforces a high standard of code quality and consistency but also automates the delivery process, making deployments quick, reliable, and error-free.
