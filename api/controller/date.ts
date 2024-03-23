import { Request, Response } from 'express';

export default {
    new: function (req: Request, res: Response) {
        res.send('Funciona');
    },
};
