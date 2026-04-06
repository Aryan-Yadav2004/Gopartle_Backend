import express from 'express';
import { createEvent, getUserEvents, getEventsById, updateEvent, deleteEvent } from '../../controllers/event.js';
import { validateEventData } from '../../middlewares/event.js';

const router = express.Router();

router.post('/', validateEventData, createEvent);
router.get('/', getUserEvents);
router.get('/:id', getEventsById);
router.put('/:id', validateEventData, updateEvent);
router.delete('/:id', deleteEvent);

export default router;