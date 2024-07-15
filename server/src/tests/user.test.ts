import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import app from '../../src/app';
import { User } from '../../src/database/models/user';
import { Poll } from '../../src/database/models/poll';
import { Vote } from '../../src/database/models/vote';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Mocking the models
jest.mock('../../src/database/models/user');
jest.mock('../../src/database/models/poll');
jest.mock('../../src/database/models/vote');

// Mocking jwt and bcrypt
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

// Mocking middleware
jest.mock('../../src/middleware/authenticate', () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => next(),
}));

describe('User Controller', () => {
  const userPayload = {
    id: '1',
    username: 'testuser',
    password: 'testpass',
    name: 'Test User',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /user/register', () => {
    it('should register a new user', async () => {
      (User.create as jest.Mock).mockResolvedValue(userPayload);
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const response = await request(app).post('/user/register').send({
        username: 'testuser',
        password: 'testpass',
        name: 'Test User',
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'User registered successfully',
        token: 'token',
      });
    });

    it('should return 500 if registration fails', async () => {
      (User.create as jest.Mock).mockRejectedValue(
        new Error('Registration failed'),
      );

      const response = await request(app).post('/user/register').send({
        username: 'testuser',
        password: 'testpass',
        name: 'Test User',
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'User registration failed' });
    });
  });

  describe('POST /user/login', () => {
    it('should login a user', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        ...userPayload,
        password: 'hashedpass',
      });
      (jwt.sign as jest.Mock).mockReturnValue('token');
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (Poll.count as jest.Mock).mockResolvedValue(2);
      (Vote.count as jest.Mock).mockResolvedValue(3);

      const response = await request(app)
        .post('/user/login')
        .send({ username: 'testuser', password: 'testpass' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'User logged in successfully',
        token: 'token',
      });
    });

    it('should return 401 if login fails', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/user/login')
        .send({ username: 'testuser', password: 'testpass' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Invalid credentials' });
    });
  });

  describe('GET /user/all', () => {
    it('should fetch all users', async () => {
      const users = [{ id: '1', username: 'testuser', name: 'Test User' }];
      (User.findAll as jest.Mock).mockResolvedValue(users);
      (Poll.count as jest.Mock).mockResolvedValue(2);
      (Vote.count as jest.Mock).mockResolvedValue(3);

      const response = await request(app).get('/user/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: '1',
          username: 'testuser',
          name: 'Test User',
          pollCount: 2,
          voteCount: 3,
        },
      ]);
    });

    it('should return 500 if fetching users fails', async () => {
      (User.findAll as jest.Mock).mockRejectedValue(
        new Error('Error fetching users'),
      );

      const response = await request(app).get('/user/all');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error fetching users' });
    });
  });

  describe('PUT /user/:id', () => {
    it('should update a user', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({
        ...userPayload,
        save: jest.fn().mockResolvedValue(true),
      });
      (jwt.sign as jest.Mock).mockReturnValue('token');

      const response = await request(app)
        .put('/user/1')
        .send({ username: 'updateduser', name: 'Updated User' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'User updated successfully',
        token: 'token',
      });
    });

    it('should return 404 if user is not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/user/1')
        .send({ username: 'updateduser', name: 'Updated User' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    it('should return 500 if updating user fails', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({
        ...userPayload,
        save: jest.fn().mockRejectedValue(new Error('Failed to update user')),
      });

      const response = await request(app)
        .put('/user/1')
        .send({ username: 'updateduser', name: 'Updated User' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to update user' });
    });
  });

  describe('DELETE /user/:id', () => {
    it('should delete a user', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({
        ...userPayload,
        destroy: jest.fn().mockResolvedValue(true),
      });
      (Poll.update as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete('/user/1');

      expect(response.status).toBe(204);
    });

    it('should return 404 if user is not found', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/user/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });

    it('should return 500 if deleting user fails', async () => {
      (User.findByPk as jest.Mock).mockResolvedValue({
        ...userPayload,
        destroy: jest
          .fn()
          .mockRejectedValue(new Error('Failed to delete user')),
      });

      const response = await request(app).delete('/user/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to delete user' });
    });
  });
});
