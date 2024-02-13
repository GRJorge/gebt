import { Request, Response } from 'express';
import User from '../model/user';

export default {
    newUser: async function (req: Request, res: Response) {
        const { name, lastname, email, password } = req.body;

        try {
            const newUser = await new User({ name, lastname, email, password }).save();

            res.status(200).json({ msg: 'User created', data: newUser });
        } catch (error: any) {
            if (error.code === 11000 && error.keyPattern.email) {
                res.status(400).json({ msg: 'Email in use', valueWithError: 'email', valueError: error.keyValue.email, error: error });
            } else if (error.name === 'ValidationError') {
                res.status(400).json({ msg: error.message, error });
            } else {
                res.status(500).json({ msg: 'Internal Error', error });
            }

            console.log(error);
        }
    },
};
