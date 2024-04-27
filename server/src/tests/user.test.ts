import request from 'supertest';
import { startServer } from '../server';
import sequelize from '../config/sequelize';
import User from '../database/models/user';

describe('User API', () => {
  let serverInstance: { server: import('http').Server, port: number };
  let app: string;

  beforeAll(async () => {
    try {
      serverInstance = await startServer();
      app = `http://localhost:${serverInstance.port}`;

      await User.create({
        username: 'testuser',
        password:
          '$2b$10$Tmh5BMmRudQ/zs4OsK5DluEkPuuoFtxglMKUY8/ug3mE6atADF3y2',
        name: 'Test User',
        avatar_url: null,
      });
    } catch (error) {
      console.error('Error inserting test user:', error);
    }
  });

  afterAll(async () => {
    try {
      await sequelize.query("DELETE FROM users WHERE username = 'testuser'");
      await serverInstance.server.close();
    } catch (error) {
      console.error('Error cleaning up test user:', error);
    }
  });

  describe('POST /register', () => {
    it('should register a new user and return a token', async () => {
      const uniqueUsername = `newuser_${Date.now()}`;
      const res = await request(app)
        .post('/user/register')
        .send({
          username: uniqueUsername,
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

      // Cleanup
      await User.destroy({ where: { username: uniqueUsername } });
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
          username: 'testuser',
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
          username: 'testuser',
          password: 'wrongpassword',
        })
        .expect(401);

      expect(res.body).toEqual({
        error: 'Invalid credentials',
      });
    });
  });
});
