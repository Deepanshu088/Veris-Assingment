import express from 'express';
import authCheck from '../middlewares/authCheck.js';
import { eventCreateValidator } from '../validators/eventValidators.js';
import { createNewEvent, getAllEvents } from '../controllers/eventControllers.js';

const router = express.Router();

router.use(authCheck);

router.get('/all', getAllEvents);

router.post('/create', authCheck, eventCreateValidator, createNewEvent);


export default router;