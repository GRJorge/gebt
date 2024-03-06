import { Request, Response } from 'express';
import { ResponseInternalError } from '../utils/functions';
import { SortOrder } from 'mongoose';
import Patient from '../model/patient';

export default {
    get: async function (req: Request, res: Response) {
        let sort = req.query.sort;
        let order: SortOrder = 1;
        //INICIALIZACION DE PARAMETROS SORT
        if (!sort) {
            sort = 'createdAt';
        }
        if (req.query.order == 'desc') {
            order = -1;
        }

        try {
            //BUSQUEDA EN DB
            const patients = await Patient.find({ user: req.user })
                .sort([[`${sort}`, order]])
                .select('name lastname phone birthday gender')
                .lean();

            res.status(200).json(patients);
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    new: async function (req: Request, res: Response) {
        const { name, lastname, phone, birthday, gender } = req.body;

        if (name || lastname || phone || birthday || gender) {
            try {
                const newPatient = await new Patient({ name, lastname, phone, birthday: new Date(birthday), gender, user: req.user }).save();
                res.status(200).json({ msg: 'Patient created', data: newPatient });
            } catch (error: any) {
                ResponseInternalError(res, error);
                console.log(error);
            }
        } else {
            ResponseInternalError(res, { error: 'Data required' });
        }
    },
    delete: async function (req: Request, res: Response) {
        const { id } = req.body;
        const patient = await Patient.findById(id).lean();

        if (id) {
            if (patient) {
                try {
                    await Patient.findByIdAndDelete(id);
                    res.status(200).json({ msg: 'Patient deleted' });
                } catch (error: any) {
                    ResponseInternalError(res, error);
                }
            } else {
                res.status(400).json({ msg: 'Patient not found in DB' });
            }
        } else {
            ResponseInternalError(res, 'Id required');
        }
    },
};
