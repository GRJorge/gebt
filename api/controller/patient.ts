import { Request, Response } from 'express';
import { ResponseInternalError } from '../utils/functions';
import Patient from '../model/patient';

export default {
    new: async function (req: Request, res: Response) {
        const { name, lastname, phone, birthday, gender } = req.body;

        if (name || lastname || phone || birthday || gender) {
            const birthdayFormat = new Date(birthday);
            try {
                const newPatient = await new Patient({ name, lastname, phone, birthday: birthdayFormat, gender, user: req.user }).save();
                res.status(200).json({ msg: 'Patient created', data: newPatient });
            } catch (error: any) {
                ResponseInternalError(res, error);
                console.log(error);
            }
        } else {
            ResponseInternalError(res, { Error: 'Data required' });
        }
    },
};
