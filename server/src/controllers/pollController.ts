import { Request, Response } from 'express';
import models from '../database/models';

const { Poll, Vote } = models;

/**
 * @swagger
 * /polls:
 *   get:
 *     summary: Fetch all polls
 *     responses:
 *       '200':
 *         description: Array of all poll objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *       '500':
 *         description: Error fetching polls
 */
export const getPolls = async (req: Request, res: Response): Promise<void> => {
  try {
    const polls = await Poll.findAll({
      include: [
        {
          model: Vote,
          as: 'votes',
          attributes: ['userId', 'chosenOption'],
        },
      ],
    });

    res.json({ polls: polls.map(poll => poll.toJSON()) });
  } catch (error) {
    console.log('Failed to fetch polls: return 500 server error');
    res.status(500).json({ error: 'Error fetching polls' });
  }
};

/**
 * @swagger
 * /polls:
 *   post:
 *     summary: Create a new poll (authenticated users only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               optionOne:
 *                 type: string
 *               optionTwo:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Poll created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 optionOne:
 *                   type: string
 *                 optionTwo:
 *                   type: string
 *                 userId:
 *                   type: string
 *       '400':
 *         description: Missing required poll details
 *       '500':
 *         description: Error creating poll
 */
export const createPoll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { optionOne, optionTwo, userId } = req.body;

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
    console.log('Failed to create poll: return 500 server error');
    res.status(500).json({ error: 'Error creating poll' });
  }
};

/**
 * @swagger
 * /polls/{id}/vote:
 *   post:
 *     summary: Submit a vote on a poll option (authenticated users only)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               chosenOption:
 *                 type: integer
 *                 enum: [1, 2]
 *     responses:
 *       '200':
 *         description: Vote recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vote recorded successfully
 *                 vote:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     pollId:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     chosenOption:
 *                       type: integer
 *                       enum: [1, 2]
 *       '400':
 *         description: Missing information
 *       '404':
 *         description: Poll not found
 *       '409':
 *         description: User has already voted on this poll
 *       '500':
 *         description: Error voting
 */
export const voteOnPoll = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId, chosenOption } = req.body;
  const pollId = req.params.id;

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
    console.log('Failed to vote: return 500 server error');
    res.status(500).json({ error: 'Error voting' });
  }
};
