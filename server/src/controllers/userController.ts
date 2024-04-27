import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../database/models/user';
import { Poll } from '../database/models/poll';
import { Vote } from '../database/models/vote';
import sequelize from 'sequelize';


// Default JWT secret key; consider using a more secure way to manage secrets.
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

/**
 * Creates a JWT token for authenticated users.
 * @param user The user object for which to create the token.
 * @returns The JWT token as a string.
 */
function createToken(user: User, pollsCreated: number, pollsVotedOn: number): string {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      avatarURL: user.avatarURL,
    },
    stats: {
      pollsCreated: pollsCreated,
      pollsVotedOn: pollsVotedOn
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
    const { username, password, name, avatarURL } = req.body;

    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data for database insertion
    const userData = {
      username,
      password: hashedPassword,
      name,
      avatarURL: avatarURL || null, // Use null as a default value if avatarURL is not provided
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
    const pollsCreated = await Poll.count({ where: { authorId: user.id } });
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

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all users with their related polls and votes counts
    const users = await User.findAll({
      attributes: ['id', 'username', 'name', [sequelize.fn('COUNT', sequelize.col('polls.id')), 'pollCount'], [sequelize.fn('COUNT', sequelize.col('votes.id')), 'voteCount']],
      include: [
        {
          model: Poll,
          attributes: [],
        },
        {
          model: Vote,
          attributes: [],
        }
      ],
      group: ['User.id'],
    });

    // Prepare data to match expected format
    const userData = users.map(user => {
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        voteCount: user.getDataValue('voteCount'),
        pollCount: user.getDataValue('pollCount'),
      };
    });

    res.json(userData);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};