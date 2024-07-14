# Base image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]