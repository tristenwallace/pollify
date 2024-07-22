import { authenticate } from '../../src/middleware/authenticate';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Authentication Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer token',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should call next if token is valid', () => {
    const userPayload = { id: '1', username: 'testuser' };
    (jwt.verify as jest.Mock).mockReturnValue({ user: userPayload });

    authenticate(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(userPayload);
  });

  it('should return 403 if no token is provided', () => {
    req.headers = {};
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'No token provided' });
  });

  it('should return 401 if token is invalid', () => {
    (jwt.verify as jest.Mock).mockReturnValue({});

    authenticate(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
});
