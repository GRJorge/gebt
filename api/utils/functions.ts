import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function ResponseInternalError(res: Response, error: any) {
    res.status(500).json({ msg: 'Internal Error', error });
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) { //REVISAR SI EXISTE TOKEN
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
