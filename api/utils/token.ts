/// <reference path="../custom.d.ts" />
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
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

interface decodeToken {
    user: string;
    iat: number;
    exp: number;
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        //REVISAR SI EXISTE TOKEN
        const token = bearerHeader.split(' ')[1];
        //VERIFICAR EL TOKEN
        jwt.verify(token, process.env.SECRET_KEY!, (error, decoded) => {
            if (error) {
                res.status(403).json({ msg: 'Invalid Token' });
            } else {
                //GUARDADO DE ID DE ACTUAL TOKEN EN EL REQ
                req.user = jwtDecode<decodeToken>(token).user;
                next();
            }
        });
    } else {
        res.status(403).json({ msg: 'Non-exist Token' });
    }
}
