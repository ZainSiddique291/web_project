import express from 'express';
import {
  getWorkers,
  getWorkerById,
  getWorkerCategories,
} from '../controllers/workerController.js';

const router = express.Router();

router.get('/', getWorkers);
router.get('/categories', getWorkerCategories);
router.get('/:id', getWorkerById);

export default router;
