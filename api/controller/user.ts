import { Request, Response } from 'express';
import { ResponseInternalError } from '../utils/functions';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user';

export default {
    newUser: function (req: Request, res: Response) {
        const { name, lastname, email, password } = req.body;
        //HASH A LA CONTRASEÑA PROPORCIONADA
        bcrypt.hash(password, 10, async (err, hashPassword) => {
            if (!err) {
                try {
                    const newUser = await new User({ name, lastname, email, password: hashPassword }).save(); //GUARDADO EN LA DB
                    //CREACION DE TOKEN
                    jwt.sign({ user: newUser._id }, process.env.SECRET_KEY!, { expiresIn: '30 days' }, (error: any, token: any) => {
                        if (!error) {
                            res.status(200).json({ msg: 'User created', data: newUser, token }); //OK
                        } else {
                            ResponseInternalError(res, error);
                        }
                    });
                } catch (error: any) {
                    if (error.code === 11000 && error.keyPattern.email) {
                        res.status(400).json({ msg: 'Email in use', valueWithError: 'email', valueError: error.keyValue.email, error: error });
                    } else if (error.name === 'ValidationError') {
                        res.status(400).json({ msg: error.message, error });
                    } else {
                        ResponseInternalError(res, error);
                    }

                    console.log(error);
                }
            } else {
                ResponseInternalError(res, err);
            }
        });
    },
    signIn: async function (req: Request, res: Response) {
        const { email, password } = req.body;
        let missingData: string[] = []; //DATOS FALTANTES

        const user = await User.findOne({ email }).lean(); //BUSQUEDA DE USUARIO EN DB
        //LLENADO DE DATOS FALTANTES
        if (!email) {
            missingData.push('email');
        }
        if (!password) {
            missingData.push('password');
        }
        //COMPROBAR SI NO FALTA UN DATO EN EL REQ
        if (missingData.length === 0) {
            if (user) {
                //SI EXISTE UN USUARIO SE COMPARA EL PASSWORD DADO CON EL GUARDADO ENCRIPTADO
                bcrypt.compare(password, user.password, (error, result) => {
                    if (!error) {
                        if (result) {
                            res.status(200).json({ msg: 'Successful Login' });
                        } else {
                            //SI LA CONTRASEÑA PROPORCIONADA ES INCORRECTA
                            res.status(400).json({ msg: 'Incorrect Password', valueWithError: 'password' });
                        }
                    } else {
                        ResponseInternalError(res, error);
                    }
                });
            } else {
                //SI NO EXISTE USUARIO EN LA DB
                res.status(400).json({ msg: 'Unregistered user', valueWithError: 'email', valueError: email });
            }
        } else {
            res.status(400).json({ msg: 'Data required', valuesWithError: missingData });
        }
    },
};
