import express from 'express';
import { createEvent, getUserEvents, getEventsById, updateEvent, deleteEvent,getAllEvents } from '../../controllers/event.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getUserEvents);
router.get('/admin', getAllEvents);
router.get('/:id', getEventsById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;