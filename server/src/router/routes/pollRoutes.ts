import { Router } from 'express';
import {
  getPolls,
  createPoll,
  voteOnPoll,
} from '../../controllers/pollController';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.post('/', authenticate, createPoll);
router.get('/', getPolls);
router.post('/:id/vote', authenticate, voteOnPoll);

export default router;
