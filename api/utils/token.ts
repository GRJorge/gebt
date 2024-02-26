import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ResponseInternalError } from './functions';

export function createUserToken(res: Response, user: string, fun: Function) {
    jwt.sign({ user }, process.env.SECRET_KEY!, { expiresIn: '30 days' }, (error, token) => {
        if (!error) {
            fun(token);
        } else {
            ResponseInternalError(res, error);
        }
    });
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        //REVISAR SI EXISTE TOKEN
        const token = bearerHeader.split(' ')[1];
        //VERIFICAR EL TOKEN
        jwt.verify(token, process.env.SECRET_KEY!, (error) => {
            if (error) {
                res.status(403).json({ msg: 'Invalid Token' });
            } else {
                next();
            }
        });
    } else {
        res.status(403).json({ msg: 'Non-exist Token' });
    }
}