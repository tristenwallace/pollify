import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../database/models/user';
import { Poll } from '../database/models/poll';
import { Vote } from '../database/models/vote';

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
function createToken(user: User, pollCount: number, voteCount: number): string {
  const payload = {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: user.avatar_url,
      pollCount: pollCount,
      voteCount: voteCount,
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
    console.log('Login user controller triggered');
    const { username, password } = req.body;
    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // Check user and password validity
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Respond with an error if authentication fails
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Fetch additional user stats data for token
    const pollCount = await Poll.count({ where: { userId: user.id } });
    const voteCount = await Vote.count({ where: { userId: user.id } });

    // Generate a token for the logged-in user
    const token = createToken(user, pollCount, voteCount);

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

export const updateUser = async (req: Request, res: Response) => {
  try {
    console.log('Update user controller triggered');
    const id = req.params.id;
    const { username, name, avatar_url, password } = req.body;

    console.log(`Fetching user with ID: ${id}`);
    const user = await User.findByPk(id);
    if (!user) {
      console.log(`User not found`);
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's fields
    console.log('Updating user details');
    user.username = username || user.username;
    user.name = name || user.name;
    user.avatar_url = avatar_url || user.avatar_url;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user
    await user.save();
    console.log('User updated successfully');

    // Generate a token for the new user
    const token = createToken(user, 0, 0);

    // Respond with success message and the user token
    res.status(201).json({ message: 'User updated successfully', token });
  } catch (error) {
    console.error('Failed to update user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log('Delete user controller triggered');
    const { id } = req.params;

    console.log(`Fetching user with ID: ${id}`);
    const user = await User.findByPk(id);
    if (!user) {
      console.log('User Not Found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('anonymizing polls');
    await Poll.update({ userId: null }, { where: { userId: id } });
    await user.destroy();
    console.log('User deleted successfully');
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
