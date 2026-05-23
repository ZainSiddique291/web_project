import express from 'express';
import { getPlatformStats, getPublicSettings } from '../controllers/statsController.js';

const router = express.Router();

router.get('/', getPlatformStats);
router.get('/settings', getPublicSettings);

export default router;
