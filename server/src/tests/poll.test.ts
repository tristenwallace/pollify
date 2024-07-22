import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import app from '../app';
import { Poll } from '../database/models/poll';
import { Vote } from '../database/models/vote';

// Mocking the models
jest.mock('../../src/database/models/user');
jest.mock('../../src/database/models/poll');
jest.mock('../../src/database/models/vote');

// Mocking middleware
jest.mock('../../src/middleware/authenticate', () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => next(),
}));

describe('Poll Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /polls', () => {
    it('should fetch all polls', async () => {
      const polls = [
        {
          id: '1',
          optionOne: 'Option One',
          optionTwo: 'Option Two',
          votes: [{ userId: '1', chosenOption: 1 }],
          toJSON: jest.fn().mockReturnValue({
            id: '1',
            optionOne: 'Option One',
            optionTwo: 'Option Two',
            votes: [{ userId: '1', chosenOption: 1 }],
          }),
        },
      ];
      /*
      Poll.findAll returns plain JavaScript objects, not instances of Sequelize models. 
      In Sequelize, toJSON() is a method available on model instances but not on plain objects. 
      To resolve this, we structure polls to return model-like objects.
      */
      (Poll.findAll as jest.Mock).mockResolvedValue(polls);

      const response = await request(app).get('/polls');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        polls: polls.map(poll => poll.toJSON()),
      });
      expect(Poll.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return 500 if fetching polls fails', async () => {
      (Poll.findAll as jest.Mock).mockRejectedValue(
        new Error('Failed to fetch polls'),
      );

      const response = await request(app).get('/polls');
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error fetching polls' });
      expect(Poll.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /polls', () => {
    it('should create a new poll', async () => {
      const poll = {
        id: '1',
        optionOne: 'Option One',
        optionTwo: 'Option Two',
        userId: '1',
        toJSON: jest.fn().mockReturnValue({
          id: '1',
          optionOne: 'Option One',
          optionTwo: 'Option Two',
          userId: '1',
        }),
      };
      (Poll.create as jest.Mock).mockResolvedValue(poll);

      const response = await request(app).post('/polls').send({
        optionOne: 'Option One',
        optionTwo: 'Option Two',
        userId: '1',
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(poll.toJSON());
      expect(Poll.create).toHaveBeenCalledTimes(1);
      expect(Poll.create).toHaveBeenCalledWith({
        optionOne: 'Option One',
        optionTwo: 'Option Two',
        userId: '1',
      });
    });

    it('should return 400 if missing required poll details', async () => {
      const response = await request(app)
        .post('/polls')
        .send({ optionOne: 'Option One' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing required poll details' });
      expect(Poll.create).not.toHaveBeenCalled();
    });

    it('should return 500 if creating poll fails', async () => {
      (Poll.create as jest.Mock).mockRejectedValue(
        new Error('Failed to create poll'),
      );

      const response = await request(app).post('/polls').send({
        optionOne: 'Option One',
        optionTwo: 'Option Two',
        userId: '1',
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error creating poll' });
      expect(Poll.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /polls/:id/vote', () => {
    it('should record a vote on a poll', async () => {
      const pollId = '1';
      const userId = '1';
      const vote = { pollId, userId, chosenOption: 1 };
      const poll = { id: pollId };

      (Poll.findByPk as jest.Mock).mockResolvedValue(poll);
      (Vote.findOne as jest.Mock).mockResolvedValue(null);
      (Vote.create as jest.Mock).mockResolvedValue(vote);

      const response = await request(app)
        .post(`/polls/${pollId}/vote`)
        .send({ userId, chosenOption: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Vote recorded successfully',
        vote,
      });
      expect(Poll.findByPk).toHaveBeenCalledTimes(1);
      expect(Poll.findByPk).toHaveBeenCalledWith(pollId);
      expect(Vote.findOne).toHaveBeenCalledTimes(1);
      expect(Vote.findOne).toHaveBeenCalledWith({ where: { pollId, userId } });
      expect(Vote.create).toHaveBeenCalledTimes(1);
      expect(Vote.create).toHaveBeenCalledWith(vote);
    });

    it('should return 400 if missing vote information', async () => {
      const response = await request(app)
        .post('/polls/1/vote')
        .send({ userId: '1' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing information' });
      expect(Poll.findByPk).not.toHaveBeenCalled();
      expect(Vote.findOne).not.toHaveBeenCalled();
      expect(Vote.create).not.toHaveBeenCalled();
    });

    it('should return 404 if poll is not found', async () => {
      (Poll.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/polls/1/vote')
        .send({ userId: '1', chosenOption: 1 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Poll not found' });
      expect(Poll.findByPk).toHaveBeenCalledTimes(1);
      expect(Vote.findOne).not.toHaveBeenCalled();
      expect(Vote.create).not.toHaveBeenCalled();
    });

    it('should return 409 if user has already voted on this poll', async () => {
      const pollId = '1';
      const userId = '1';
      const existingVote = { pollId, userId, chosenOption: 1 };

      (Poll.findByPk as jest.Mock).mockResolvedValue({ id: pollId });
      (Vote.findOne as jest.Mock).mockResolvedValue(existingVote);

      const response = await request(app)
        .post(`/polls/${pollId}/vote`)
        .send({ userId, chosenOption: 1 });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        error: 'User has already voted on this poll',
      });
      expect(Poll.findByPk).toHaveBeenCalledTimes(1);
      expect(Vote.findOne).toHaveBeenCalledTimes(1);
      expect(Vote.create).not.toHaveBeenCalled();
    });

    it('should return 500 if voting fails', async () => {
      const pollId = '1';
      const userId = '1';

      (Poll.findByPk as jest.Mock).mockResolvedValue({ id: pollId });
      (Vote.findOne as jest.Mock).mockResolvedValue(null);
      (Vote.create as jest.Mock).mockRejectedValue(new Error('Failed to vote'));

      const response = await request(app)
        .post(`/polls/${pollId}/vote`)
        .send({ userId, chosenOption: 1 });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Error voting' });
      expect(Poll.findByPk).toHaveBeenCalledTimes(1);
      expect(Vote.findOne).toHaveBeenCalledTimes(1);
      expect(Vote.create).toHaveBeenCalledTimes(1);
    });
  });
});
