import { Router, Response, Request } from 'express';
import controller from '../controller/user';
import { verifyToken } from '../utils/token';
const router = Router();

router.post('/new', controller.newUser);
router.post('/signIn', controller.signIn);
router.post('/verifytoken', verifyToken, (req: Request, res: Response) => {
    res.status(200).json({ msg: 'Ok Token' });
});
router.get('/get', verifyToken, controller.get);
router.patch('/changeName', verifyToken, controller.changeName);
router.patch('/changePassword', verifyToken, controller.changePassword);

export default router;
