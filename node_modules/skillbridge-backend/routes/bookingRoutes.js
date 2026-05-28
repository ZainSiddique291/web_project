import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createBookingRequest,
  getMyOrders,
  getWorkerBookings,
  updateWorkerBookingDecision,
} from '../controllers/bookingController.js';

const router = express.Router();

router.use(protect);

router.post('/', createBookingRequest);
router.get('/my-orders', getMyOrders);
router.get('/worker', getWorkerBookings);
router.patch('/:id/decision', updateWorkerBookingDecision);

export default router;
