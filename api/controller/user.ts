import { Request, Response } from "express";

export default {
    newUser: function (req: Request, res: Response) {
        res.send('User new')
    },
};
