import express from 'express';
import { routes } from './router/router';
import bodyParser from 'body-parser';
import { sequelize } from './database/models/index';
const app: express.Application = express();

// Set the server port
const PORT: number = 5000;
const address: string = '0.0.0.0:5000';

app.use(bodyParser.json());

// Register the main router with the application to handle all incoming requests
app.use('/', routes);

// Confirm that database is connected
sequelize
  .authenticate()
  .then(() => console.log('Database connected.'))
  .catch((err: Error) =>
    console.error('Unable to connect to the database:', err),
  );

// Start listening for incoming connections on the specified port
app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
