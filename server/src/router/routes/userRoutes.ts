import { Router } from 'express';
import { register, login, getAllUsers } from '../../controllers/userController';
import { validateRegistration } from '../../middleware/validation';

const router = Router();

router.post('/register', validateRegistration, register);
router.post('/login', login);
router.get('/all', getAllUsers)

export default router;
