import express from 'express';
import { register, login} from '../controllers/usersControllers.js';
import { signUpValidator, loginInValidator } from '../validators/userValidators.js';

const router = express.Router();

router.post('/login', loginInValidator, login);

router.post('/register', signUpValidator, register);


export default router;