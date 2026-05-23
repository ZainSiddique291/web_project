import express from 'express';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import {
  getAdminOverview,
  getAdminUsers,
  getAdminBookings,
  updateAdminSettings,
  updateContactStatus,
} from '../controllers/adminController.js';
import { getContacts } from '../controllers/contactController.js';
import { getPublicSettings } from '../controllers/statsController.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/overview', getAdminOverview);
router.get('/users', getAdminUsers);
router.get('/bookings', getAdminBookings);
router.get('/contacts', getContacts);
router.get('/settings', getPublicSettings);
router.put('/settings', updateAdminSettings);
router.patch('/contacts/:id', updateContactStatus);

export default router;
