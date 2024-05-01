"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key for JWT, fallback to a default if not set in environment variables
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
// Middleware to authenticate users based on JWT token
const authenticate = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    // If token is not present, return a 403 Forbidden status
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }
    try {
        // Verify the token with the secret key
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Check if the decoded object has the user property and assign it to req.user
        if (typeof decoded === 'object' && decoded.user) {
            req.user = decoded.user;
            next(); // Pass control to the next middleware function
        }
        else {
            throw new Error('Invalid token payload'); // Throw an error if token payload is invalid
        }
    }
    catch (error) {
        // Handle any error related to token verification by sending a 401 Unauthorized status
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
