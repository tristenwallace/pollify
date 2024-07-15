import express from 'express';
import { routes } from './router/router';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDef from './swaggerDef';

const app: express.Application = express();

// Swagger setup
const swaggerOptions = {
  definition: swaggerDef,
  apis: ['./src/controllers/*.ts'], // This should match your controllers' path
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(bodyParser.json());
app.use(helmet()); // Security headers

// Register the main router with the application to handle all incoming requests
app.use('/', routes);

export default app;
