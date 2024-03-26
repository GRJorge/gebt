import { Request, Response } from 'express';
import Patient from '../model/patient';
import Appointment from '../model/appointment';
import { ResponseInternalError, calculateGEB, calculateGET, calculateIMC, getAge } from '../utils/functions';

export default {
    new: async function (req: Request, res: Response) {
        const { date, datetime, state, height, weight, af, patient } = req.body; //imc, geb, get

        try {
            const patientInfo = await Patient.findById(patient).select('gender birthday').lean();

            if (patientInfo) {
                const imc = calculateIMC(weight, height);
                const geb = calculateGEB(weight, height, imc, patientInfo.gender, getAge(patientInfo.birthday));
                const get = calculateGET(geb, af, imc);

                await new Appointment({
                    date,
                    datetime,
                    state,
                    height,
                    weight,
                    imc,
                    af,
                    geb,
                    get,
                    patient,
                    user: req.user,
                }).save();
            } else {
                res.status(400).json({ msg: 'Patient not found' });
            }
        } catch (error) {
            ResponseInternalError(res, error);
        }
    },
};
