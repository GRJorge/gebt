import { Router } from 'express';
import controller from '../controller/patient';
const router = Router();

router.post('/new', controller.new)

export default router