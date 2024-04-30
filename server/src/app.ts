import express from 'express';
import { routes } from './router/router';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); // Security headers

// Register the main router with the application to handle all incoming requests
app.use('/', routes);

export default app;
