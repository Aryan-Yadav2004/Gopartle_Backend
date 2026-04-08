import express from 'express';
import { createEvent, getUserEvents, getEventsById, updateEvent, deleteEvent } from '../../controllers/event.js';
import { validateEventData } from '../../middlewares/event.js';

const router = express.Router();

router.post('/', validateEventData, createEvent);//done
router.get('/', getUserEvents);//done
router.get('/:id', getEventsById);//done
router.put('/:id', validateEventData, updateEvent);//done
router.delete('/:id', deleteEvent);//done

export default router;