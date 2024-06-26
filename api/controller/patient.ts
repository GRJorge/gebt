import { Request, Response } from 'express';
import { ResponseInternalError } from '../utils/functions';
import { SortOrder } from 'mongoose';
import Patient from '../model/patient';

export default {
    get: async function (req: Request, res: Response) {
        let name = req.query.name;
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
            const patients = await Patient.find({ user: req.user, name: { $regex: name, $options: 'i' } })
                .sort([[`${sort}`, order]])
                .select('name lastname phone birthday gender')
                .lean();

            res.status(200).json(patients);
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    getById: async function (req: Request, res: Response) {
        const { patient } = req.query;

        try {
            const patientQuery = await Patient.findById(patient);

            res.status(200).json(patientQuery);
        } catch (error) {
            ResponseInternalError(res, error);
        }
    },
    new: async function (req: Request, res: Response) {
        const { name, lastname, phone, birthday, gender } = req.body;

        if (name || lastname || phone || birthday || gender) {
            try {
                const newPatient = await new Patient({ name, lastname, phone, birthday, gender, user: req.user }).save();
                res.status(200).json({ msg: 'Patient created', data: newPatient });
            } catch (error: any) {
                ResponseInternalError(res, error);
            }
        } else {
            ResponseInternalError(res, { error: 'Data required' });
        }
    },
    edit: async function (req: Request, res: Response) {
        const { _id, name, lastname, phone, birthday, gender } = req.body;

        try {
            await Patient.find({ _id, user: req.user }).updateOne({ name, lastname, phone, birthday, gender });
            res.status(200).json({ msg: 'Patient edited' });
        } catch (error: any) {
            ResponseInternalError(res, error);
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
