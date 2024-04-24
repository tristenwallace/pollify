import express from 'express';
import authRoutes from './routes/authRoutes';
//TODO import pollsRoutes from './routes/pollRoutes';
//TODO import usersRoutes from './routes/userRoutes';

export const routes = express.Router();

// Root route definition
routes.get('/', (req, res) => {
  // Sends a simple response for the root route
  res.send('main api route');
});

// Use the defined routes
routes.use('/auth', authRoutes);
//TODO routes.use('/polls', pollsRoutes);
//TODO routes.use('/users', usersRoutes);
