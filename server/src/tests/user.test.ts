import request from 'supertest';
import { startRandomServer } from '../server';
import User from '../database/models/user';
import Poll from '../database/models/poll';
import Vote from '../database/models/vote';
import type { UserDTO } from '../controllers/userController';

describe('User API', () => {
  let serverInstance: { server: import('http').Server; port: number };
  let app: string;
  const hashedPass =
    '$2b$10$Tmh5BMmRudQ/zs4OsK5DluEkPuuoFtxglMKUY8/ug3mE6atADF3y2';

  beforeAll(async () => {
    try {
      serverInstance = await startRandomServer();
      app = `http://localhost:${serverInstance.port}`;

      await User.bulkCreate([
        {
          username: 'user1',
          password: hashedPass,
          name: 'User One',
          avatar_url: null,
        },
        {
          username: 'user2',
          password: hashedPass,
          name: 'User Two',
          avatar_url: null,
        },
      ]);
      const user1 = await User.findOne({ where: { username: 'user1' } });
      const user2 = await User.findOne({ where: { username: 'user2' } });

      if (!user1 || !user2) {
        throw new Error('Test setup failed, required users not found');
      }

      await Poll.create({
        userId: user1.id,
        optionOne: 'Option One',
        optionTwo: 'Option Two',
      });
      const poll1 = await Poll.findOne({ where: { userId: user1.id } });

      if (!poll1) {
        throw new Error('Test setup failed, required poll not found');
      }

      await Vote.create({
        pollId: poll1.id,
        userId: user2.id,
        chosenOption: 1,
      });
    } catch (error) {
      console.error('Error inserting test user:', error);
    }
  });

  afterAll(async () => {
    try {
      await User.destroy({ where: {} });
      await Poll.destroy({ where: {} });
      await Vote.destroy({ where: {} });

      await serverInstance.server.close();
    } catch (error) {
      console.error('Error cleaning up test user:', error);
    }
  });

  describe('POST /register', () => {
    it('should register a new user and return a token', async () => {
      const res = await request(app)
        .post('/user/register')
        .send({
          username: 'user3',
          password: 'password123',
          name: 'New User',
          avatar_url: null,
        })
        .expect(201);

      expect(res.body).toEqual(
        expect.objectContaining({
          message: expect.any(String),
          token: expect.any(String),
        }),
      );
    });

    it('should handle missing username and return a 400 status', async () => {
      const res = await request(app)
        .post('/user/register')
        .send({
          password: 'password123',
          name: 'New User',
        })
        .expect(400);

      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors).toBeInstanceOf(Array);
    });
  });

  describe('POST /login', () => {
    it('should authenticate existing user and return a token', async () => {
      const res = await request(app)
        .post('/user/login')
        .send({
          username: 'user1',
          password: 'password123',
        })
        .expect(200);

      expect(res.body).toEqual({
        message: 'User logged in successfully',
        token: expect.any(String),
      });
    });

    it('should return error for invalid password', async () => {
      const res = await request(app)
        .post('/user/login')
        .send({
          username: 'user1',
          password: 'wrongpassword',
        })
        .expect(401);

      expect(res.body).toEqual({
        error: 'Invalid credentials',
      });
    });
  });

  describe('GET /user/all', () => {
    test('GET /users/all should fetch all users with their details', async () => {
      const res = await request(app).get('/user/all').expect(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((user: UserDTO) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('pollCount');
        expect(user).toHaveProperty('voteCount');
      });
    });
  });
});
