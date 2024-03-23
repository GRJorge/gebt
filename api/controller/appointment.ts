import { Request, Response } from 'express';

export default {
    new: function (req: Request, res: Response) {
        const { date, hour, state, height, weight } = req.body; //imc, af, geb, get
    },
};
