import { Router } from 'express';
import { verifyToken } from '../utils/token';
import controller from '../controller/date';
const router = Router();

router.post('/new', verifyToken, controller.new);

export default router;
