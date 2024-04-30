import app from './app';
import sequelize from './config/sequelize';
import type { Server } from 'http';

// Database connection with retry logic
const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    await sequelize.sync(); // I might want to remove this in production or manage it differently
  } catch (err) {
    console.error('Database connection failed, retrying in 5 seconds...', err);
    setTimeout(connectWithRetry, 5000);
  }
};

// Function to start the server for tests
export const startRandomServer = async (): Promise<{
  server: Server;
  port: number;
}> => {
  try {
    await connectWithRetry(); // Ensure database is connected before starting the server
    return new Promise((resolve, reject) => {
      const server = app
        .listen(0, () => {
          const address = server.address();
          if (address && typeof address !== 'string') {
            const port = address.port;
            console.log(`Server running on port ${port}`);
            resolve({ server, port });
          } else {
            reject(new Error('Failed to start server on dynamic port'));
          }
        })
        .on('error', reject);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    throw err;
  }
};

// Function to start the server for tests
export const startServer = async (): Promise<{
  server: Server;
  port: number;
}> => {
  try {
    const port = parseInt(process.env.PORT || '5000');
    await connectWithRetry(); // Ensure database is connected before starting the server
    return new Promise((resolve, reject) => {
      const server = app
        .listen(port, () => {
          const address = server.address();
          if (address && typeof address !== 'string') {
            const port = address.port;
            console.log(`Server running on port ${port}`);
            resolve({ server, port });
          } else {
            reject(new Error('Failed to start server on dynamic port'));
          }
        })
        .on('error', reject);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    throw err;
  }
};

// Graceful shutdown
const gracefulShutdown = (server: Server, port: number) => {
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      sequelize.close().then(() => {
        console.log('Database connection closed');
        process.exit(port);
      });
    });
  });
};

// Start the server if this file is run directly (not when imported for tests)
if (require.main === module) {
  startServer()
    .then(({ server, port }) => {
      console.log(`Server started on port ${port}`);
      gracefulShutdown(server, port);
    })
    .catch(err => {
      console.error('Server failed to start:', err);
      process.exit(1);
    });
}
