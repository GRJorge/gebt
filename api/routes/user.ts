import { Router } from 'express';
import controller from '../controller/user';
const router = Router();

router.post('/new', controller.newUser);
router.post('/signIn', controller.signIn);

export default router;
