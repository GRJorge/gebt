import { Router } from 'express';
import { verifyToken } from '../utils/token';
import controller from '../controller/appointmentData';

const router = Router();

router.post('/set', verifyToken, controller.set);

export default router;
