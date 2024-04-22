import express from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();

// Set the server port
const PORT: number = 3000;
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

// Start listening for incoming connections on the specified port
app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
