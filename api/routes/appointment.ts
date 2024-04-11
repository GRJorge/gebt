import { Router } from 'express';
import { verifyToken } from '../utils/token';
import controller from '../controller/appointment';
const router = Router();

router.post('/new', verifyToken, controller.new);
router.post('/overlap', verifyToken, controller.overlapAppointment);
router.get('/get', verifyToken, controller.get);

export default router;
