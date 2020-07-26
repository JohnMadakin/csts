import { Router } from 'express';
import userRoutes from './userRoutes';


const router = Router();

const url = '/api/v1';

router.use(url, userRoutes);


export default router;
