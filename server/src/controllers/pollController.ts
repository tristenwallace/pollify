import { Request, Response } from 'express';
import { Poll } from '../database/models/poll';
import { Vote } from '../database/models/vote';

export const getPolls = async (req: Request, res: Response): Promise<void> => {
  try {
    const polls = await Poll.findAll({
      include: [
        {
          model: Vote,
          as: 'voters',
          attributes: ['userId', 'chosenOption'], // Include relevant vote details
        },
      ],
    });

    res.json({ polls: polls.map(poll => poll.toJSON()) });
  } catch (error) {
    console.error('Failed to fetch polls:', error);
    res.status(500).json({ error: 'Error fetching polls' });
  }
};

export const createPoll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { optionOne, optionTwo, userId } = req.body; // Destructure the necessary fields from the request body

    if (!optionOne || !optionTwo) {
      res.status(400).json({ error: 'Missing required poll details' });
      return;
    }

    const poll = await Poll.create({
      optionOne,
      optionTwo,
      userId,
    });

    res.status(201).json(poll);
  } catch (error) {
    console.error('Failed to create poll:', error);
    res.status(500).json({ error: 'Error creating poll' });
  }
};

export const voteOnPoll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { pollId, userId, chosenOption } = req.body;

  if (!pollId || !chosenOption || !userId) {
    res.status(400).json({ error: 'Missing information' });
    return;
  }

  try {
    const poll = await Poll.findByPk(pollId);
    if (!poll) {
      res.status(404).json({ error: 'Poll not found' });
      return;
    }

    // Check if the user has already voted on this poll
    const existingVote = await Vote.findOne({
      where: {
        pollId,
        userId,
      },
    });

    if (existingVote) {
      res.status(409).json({ error: 'User has already voted on this poll' });
      return;
    }

    // Create a new vote
    const vote = await Vote.create({
      pollId,
      userId,
      chosenOption,
    });

    res.json({ message: 'Vote recorded successfully', vote });
  } catch (error) {
    console.error('Failed to vote:', error);
    res.status(500).json({ error: 'Error voting' });
  }
};
