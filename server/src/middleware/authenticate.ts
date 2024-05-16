import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { User } from '../database/models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Secret key for JWT, fallback to a default if not set in environment variables
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// Custom Request interface to extend Express's Request with user property
interface Request extends ExpressRequest {
  user?: User;
}

// Middleware to authenticate users based on JWT token
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Authentication middleware triggered');
  // If token is not present, return a 403 Forbidden status
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    // Check if the decoded object has the user property and assign it to req.user
    if (typeof decoded === 'object' && decoded.user) {
      req.user = decoded.user as User;
      console.log('Token verified successfully');
      next(); // Pass control to the next middleware function
    } else {
      throw new Error('Invalid token payload'); // Throw an error if token payload is invalid
    }
  } catch (error) {
    // Handle any error related to token verification by sending a 401 Unauthorized status
    console.error('Invalid token', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
