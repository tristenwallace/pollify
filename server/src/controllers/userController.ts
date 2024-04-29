import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../database/models/user';
import { Poll } from '../database/models/poll';
import { Vote } from '../database/models/vote';
import sequelize from '../config/sequelize';

export interface UserDTO extends User {
  voteCount: number;
  pollCount: number;
}

// Default JWT secret key; consider using a more secure way to manage secrets.
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Creates a JWT token for authenticated users.
 * @param user The user object for which to create the token.
 * @returns The JWT token as a string.
 */
function createToken(
  user: User,
  pollsCreated: number,
  pollsVotedOn: number,
): string {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: user.avatar_url,
    },
    stats: {
      pollsCreated: pollsCreated,
      pollsVotedOn: pollsVotedOn,
    },
  };

  // Sign the JWT with the secret key and set an expiration time
  return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}

/**
 * Registers a new user in the database.
 * @param req The request object.
 * @param res The response object.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, name, avatar_url } = req.body;

    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data for database insertion
    const userData = {
      username,
      password: hashedPassword,
      name,
      avatar_url: avatar_url || null, // Use null as a default value if avatar_url is not provided
    };

    // Create user record in the database
    const user = await User.create(userData);

    // Generate a token for the new user
    const token = createToken(user, 0, 0);

    // Respond with success message and the user token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

/**
 * Authenticates a user and issues a JWT token.
 * @param req The request object.
 * @param res The response object.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check user and password validity
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Respond with an error if authentication fails
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Fetch additional user stats data for token
    const pollsCreated = await Poll.count({ where: { userId: user.id } });
    const pollsVotedOn = await Vote.count({ where: { userId: user.id } });

    // Generate a token for the logged-in user
    const token = createToken(user, pollsCreated, pollsVotedOn);

    // Respond with success message and the token
    res.json({ message: 'User logged in successfully', token });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json({ error: 'Login failed' });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Fetch all users
    const users = await User.findAll({
      attributes: ['id', 'username', 'name'],
      raw: true,
    });

    // Asynchronously fetch poll and vote counts for each user
    const usersWithCounts = await Promise.all(
      users.map(async user => {
        const pollCount = await Poll.count({ where: { userId: user.id } });
        const voteCount = await Vote.count({ where: { userId: user.id } });

        return {
          ...user,
          pollCount,
          voteCount,
        };
      }),
    );

    res.status(200).json(usersWithCounts);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};
