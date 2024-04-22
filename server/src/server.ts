import express from 'express';
import { Request, Response } from 'express';
import { sequelize } from '../models'; // Adjust the path as necessary to point to your Sequelize models index file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Test route to ensure server is running
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Server is running!');
});

// Sync Sequelize models with the database
sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database synced!');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to sync database:', error);
  });
