import User from '../models/user.js';
import Event from '../models/event.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const eventCount = await Event.countDocuments();
    res.status(200).json({ userCount, eventCount });
    } catch (error) {  
      res.status(500).json({ error: 'Failed to fetch admin dashboard data' });
    }
};