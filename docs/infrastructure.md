# Infrastructure Overview for Polling App

This document outlines the infrastructure setup for the Polling App, which leverages various AWS services to ensure robust, scalable, and secure operations. The architecture includes services for hosting the API, the frontend, and the database.

![Architecture Diagram](https://hangouthabit.sirv.com/polling_app/architecture_diagram.jpeg)

## AWS Services Used

### Amazon RDS (Relational Database Service)

- **Purpose**: Hosts the PostgreSQL database used by the Polling App.
- **Benefits**: Provides scalable and manageable database services with automated backups, patch management, and replication features to enhance availability and reliability.

### Amazon S3 (Simple Storage Service)

- **Purpose**: Hosts the static files for the frontend of the Polling App.
- **Benefits**: Offers reliable, scalable, and inexpensive cloud storage service for data backup, archival, and analytics. It serves the frontend as a static website, enabling fast content delivery.

### AWS Elastic Beanstalk

- **Purpose**: Deploys and manages the backend API of the Polling App.
- **Benefits**: Automates the deployment of applications in the cloud, making it easier to quickly deploy and manage applications without worrying about the infrastructure.

### Security Groups

- **Purpose**: Controls the traffic allowed into and out of the RDS instances and Elastic Beanstalk environments.
- **Details**: Configured to allow only the necessary ports and sources, enhancing the security of the application.

### IAM Roles and Policies

- **Purpose**: Manages the permissions for AWS services and resources securely.
- **Details**: Custom IAM roles and policies are applied to ensure that each component and service has only the permissions necessary to operate, following the principle of least privilege.

### VPC (Virtual Private Cloud)

- **Purpose**: Provides a private network to control AWS resources in a virtual network.
- **Benefits**: Offers advanced security features, allows subnet creation, IP range selection, route table configuration, and network gateway setup.
