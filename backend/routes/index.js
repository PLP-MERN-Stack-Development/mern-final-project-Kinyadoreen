import { Router } from 'express';
import authRoutes from './authRoutes.js';
import courseRoutes from './courseRoutes.js';
import { getDashboard } from '../controllers/courseController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.get('/dashboard', auth, getDashboard);

export default router;
