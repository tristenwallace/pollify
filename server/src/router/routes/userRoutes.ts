import { Router } from 'express';
import {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUser,
} from '../../controllers/userController';
import { validateRegistration } from '../../middleware/validation';
import { authenticate } from '../../middleware/authenticate';

const router = Router();

router.post('/register', validateRegistration, register);
router.post('/login', login);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);
router.get('/all', getAllUsers);

export default router;
