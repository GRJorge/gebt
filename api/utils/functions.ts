import { Response } from 'express';

export function ResponseInternalError(res: Response, error: any) {
    res.status(500).json({ msg: 'Internal Error', error });
}