import { Router } from 'express';
import { verifyToken } from '../utils/token';
import controller from '../controller/appointment';
const router = Router();

router.post('/new', verifyToken, controller.new);

export default router;
