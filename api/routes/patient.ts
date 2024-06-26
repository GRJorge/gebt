import { Router } from 'express';
import { verifyToken } from '../utils/token';
import controller from '../controller/patient';
const router = Router();

router.get('/get', verifyToken, controller.get);
router.get('/getById', verifyToken, controller.getById);
router.post('/new', verifyToken, controller.new);
router.patch('/edit', verifyToken, controller.edit);
router.delete('/delete', verifyToken, controller.delete);

export default router;
