import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../model/user';

export default {
    newUser: function (req: Request, res: Response) {
        const { name, lastname, email, password } = req.body;

        bcrypt.hash(password, 10, async (err, hashPassword) => {
            if (!err) {
                try {
                    const newUser = await new User({ name, lastname, email, password: hashPassword }).save();
                    req.session.user = newUser._id.toString();

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
            } else {
                res.status(500).json({ msg: 'Internal Error', err });
            }
        });
    },
    signIn: async function (req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).lean();

        if (user?.email != null || user?.password != null) {
            if (user) {
                bcrypt.compare(password, user.password, (error, result) => {
                    if (!error) {
                        if (result) {
                            req.session.user = user._id.toString();
                            res.status(200).json({ msg: 'Successful Login' });
                        } else {
                            res.status(400).json({ msg: 'Incorrect Password' });
                        }
                    } else {
                        res.status(500).json({ msg: 'Internal Error', error });
                    }
                });
            } else {
                res.status(400).json({ msg: 'Unregistered user', valueError: email });
            }
        } else {
            res.status(500).json({ msg: 'Data required' });
        }
    },
};
