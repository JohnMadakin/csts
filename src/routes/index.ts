import { Router } from 'express';
import userRoutes from './userRoutes';
import requestRoutes from './requestRoutes';
import commentRoutes from './commentRoutes';

const router = Router();

const url = '/api/v1';

router.use(url, userRoutes);
router.use(url, commentRoutes);
router.use(url, requestRoutes);

export default router;
