export default {
  openapi: '3.0.1',
  info: {
    title: 'Pollify API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
    {
      url: 'https://api.pollify.dev',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          password: { type: 'string' },
          name: { type: 'string' },
          avatar_url: { type: 'string', nullable: true },
        },
      },
      Poll: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          optionOne: { type: 'string' },
          optionTwo: { type: 'string' },
        },
      },
      Vote: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          pollId: { type: 'string' },
          chosenOption: {
            type: 'integer',
            enum: [1, 2],
          },
        },
      },
    },
  },
};
