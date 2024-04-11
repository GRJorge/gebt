import { Request, Response } from 'express';
import Patient from '../model/patient';
import Appointment from '../model/appointment';
import { ResponseInternalError, calculateGEB, calculateGET, calculateIMC, getAge } from '../utils/functions';

export default {
    new: async function (req: Request, res: Response) {
        const { date, patient } = req.body;

        try {
            const patientInfo = await Patient.findById(patient).select('gender birthday').lean();

            if (patientInfo) {
                await new Appointment({ date, patient, user: req.user }).save();
                res.status(200).json({ msg: 'Appointment created' });
            } else {
                res.status(400).json({ msg: 'Patient not found' });
            }
        } catch (error) {
            ResponseInternalError(res, error);
        }
    },
    overlapAppointment: async function (req: Request, res: Response) {
        const { date } = req.body;

        const dateInt = {
            day: parseInt(date.day),
            month: parseInt(date.month),
            year: parseInt(date.year),
            hour: parseInt(date.hour),
            minute: parseInt(date.minute),
            time: date.time,
        };

        try {
            const equalAppointment = await Appointment.find({ date: dateInt, state: { $nin: [2, 3] }, user: req.user }).lean();

            if (equalAppointment.length <= 0) {
                const approximateAppointment = await Appointment.find({
                    'date.day': dateInt.day,
                    'date.month': dateInt.month,
                    'date.year': dateInt.year,
                    'date.time': dateInt.time,
                    'date.hour': {
                        $gte: dateInt.hour - 2,
                        $lte: dateInt.hour + 2,
                    },
                    state: { $nin: [2, 3] },
                    user: req.user,
                })
                    .populate('patient', 'name lastname')
                    .lean();

                if (approximateAppointment.length <= 0) {
                    res.status(200).json({ msg: 'Not appointments' });
                } else {
                    res.status(400).json({ type: 'approximate', msg: 'Approximate appointment', appointments: approximateAppointment });
                }
            } else {
                res.status(400).json({ type: 'same', msg: 'Appointment at the same time', appointment: equalAppointment });
            }
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    get: async function (req: Request, res: Response) {
        const { state } = req.query;

        try {
            const appointments = await Appointment.find({ user: req.user, state }).populate('patient', 'name lastname').lean();

            res.status(200).json(appointments);
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
};
