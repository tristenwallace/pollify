"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.startRandomServer = void 0;
const app_1 = __importDefault(require("./app"));
const sequelize_1 = __importDefault(require("./config/sequelize"));
// Database connection with retry logic
const connectWithRetry = async () => {
    try {
        await sequelize_1.default.authenticate();
        console.log('Database connected.');
        await sequelize_1.default.sync(); // I might want to remove this in production or manage it differently
    }
    catch (err) {
        console.error('Database connection failed, retrying in 5 seconds...', err);
        setTimeout(connectWithRetry, 5000);
    }
};
// Function to start the server for tests
const startRandomServer = async () => {
    try {
        await connectWithRetry(); // Ensure database is connected before starting the server
        return new Promise((resolve, reject) => {
            const server = app_1.default
                .listen(0, () => {
                const address = server.address();
                if (address && typeof address !== 'string') {
                    const port = address.port;
                    console.log(`Server running on port ${port}`);
                    resolve({ server, port });
                }
                else {
                    reject(new Error('Failed to start server on dynamic port'));
                }
            })
                .on('error', reject);
        });
    }
    catch (err) {
        console.error('Failed to start server:', err);
        throw err;
    }
};
exports.startRandomServer = startRandomServer;
// Function to start the server for tests
const startServer = async () => {
    try {
        const port = parseInt(process.env.PORT || '5000');
        await connectWithRetry(); // Ensure database is connected before starting the server
        return new Promise((resolve, reject) => {
            const server = app_1.default
                .listen(port, () => {
                const address = server.address();
                if (address && typeof address !== 'string') {
                    const port = address.port;
                    console.log(`Server running on port ${port}`);
                    resolve({ server, port });
                }
                else {
                    reject(new Error('Failed to start server on dynamic port'));
                }
            })
                .on('error', reject);
        });
    }
    catch (err) {
        console.error('Failed to start server:', err);
        throw err;
    }
};
exports.startServer = startServer;
// Graceful shutdown
const gracefulShutdown = (server, port) => {
    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            console.log('HTTP server closed');
            sequelize_1.default.close().then(() => {
                console.log('Database connection closed');
                process.exit(port);
            });
        });
    });
};
// Start the server if this file is run directly (not when imported for tests)
if (require.main === module) {
    (0, exports.startServer)()
        .then(({ server, port }) => {
        console.log(`Server started on port ${port}`);
        gracefulShutdown(server, port);
    })
        .catch(err => {
        console.error('Server failed to start:', err);
        process.exit(1);
    });
}
