import Event from "../models/event.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/server.js';

async function createEvent(req, res) {
  try {
    const token = req.cookies?.token;

    const user = jwt.verify(token, JWT_SECRET_KEY);
    
    const eventData = req.body;
    console.log('Received event data:', eventData);

    const newEvent = new Event({ ...eventData, createdBy: user.userId });

    await newEvent.save();

    return res.status(201).json(newEvent);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to create event' });
  }
  
};

async function getEvent(req, res) {
  try {

    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    return res.status(200).json(event);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch event' });
  }
};

async function getUserEvents(req, res) {
  try {

    const token = req.cookies?.token;

    if (!token) {//authorization check
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = jwt.verify(token, JWT_SECRET_KEY);

    const userId = user.userId;
    const events = await Event.find({ createdBy: userId });
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user events' });
  }
};

async function getEventsById(req, res) {
  try {

    const token = req.cookies?.token;
    const user = jwt.verify(token, JWT_SECRET_KEY);

    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    if (event.createdBy.toString() !== user.userId.toString() && user.role !== 'admin') {//ownership check
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.status(200).json(event);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch event' });
  }
};

async function deleteEvent(req, res) {
  try {
    const eventId = req.params.id;
    const token = req.cookies?.token;

    const user = jwt.verify(token, JWT_SECRET_KEY);

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.createdBy.toString() !== user.userId.toString() && user.role !== 'admin') {//ownership check
      return res.status(403).json({ error: 'Forbidden' });
    }

    await Event.findByIdAndDelete(eventId);
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete event' });
  }
};

async function updateEvent(req, res) {
  try {

    const eventId = req.params.id;
    const token = req.cookies?.token;

    const user = jwt.verify(token, JWT_SECRET_KEY);
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.createdBy.toString() !== user.userId.toString() && user.role !== 'admin') {//ownership check
      return res.status(403).json({ error: 'Forbidden' });
    }

    const eventData = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });

    return res.status(200).json(updatedEvent);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to update event' });
  }
};

async function getAllEvents(req, res) {
  try {

    const limit = 10;
    const page  = req.query.page || 1;

    const skip = (page - 1) * 10;
    
    const events = await Event.find().limit(limit).skip(skip);
    return res.status(200).json(events);

  } catch (error) {

    return res.status(500).json({ error: 'Failed to fetch events' });
  }

};

export { createEvent, getEvent, getUserEvents, deleteEvent, updateEvent, getAllEvents, getEventsById };