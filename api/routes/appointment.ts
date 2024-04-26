import { Router } from 'express';
import { verifyToken } from '../utils/token';
import controller from '../controller/appointment';
const router = Router();

router.post('/new', verifyToken, controller.new);
router.post('/overlap', verifyToken, controller.overlapAppointment);
router.get('/get', verifyToken, controller.get);
router.get('/upcoming', verifyToken, controller.getUpcoming);
router.get('/active', verifyToken, controller.getActive);
router.patch('/cancel', verifyToken, controller.cancel);
router.patch('/reschedule', verifyToken, controller.reschedule);

export default router;
