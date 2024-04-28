import express from 'express';
import userRoutes from './routes/userRoutes';
import pollRoutes from './routes/pollRoutes';
//TODO import usersRoutes from './routes/userRoutes';

export const routes = express.Router();

// Root route definition
routes.get('/', (req, res) => {
  // Sends a simple response for the root route
  res.send('main api route');
});

// Use the defined routes
routes.use('/user', userRoutes);
routes.use('/polls', pollRoutes);
//TODO routes.use('/users', usersRoutes);
