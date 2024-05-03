import { Request, Response } from 'express';
import AppointmentData from '../model/appointmentData';
import Appointment from '../model/appointment';
import Patient from '../model/patient';
import { ResponseInternalError, calculateGEB, calculateGET, calculateIMC, getAge } from '../utils/functions';

export default {
    set: async function (req: Request, res: Response) {
        const { appointment, height, weight, af, patient } = req.body;

        try {
            const patientData = await Patient.findById(patient).select('birthday gender').lean();

            const imc = calculateIMC(weight, height);
            const gebData = calculateGEB(weight, height, imc, patientData!.gender, getAge(patientData!.birthday));
            const getData = calculateGET(gebData, af, imc);

            const data = {
                height,
                weight,
                af,
                imc,
                gebData,
                getData,
                appointment,
            };

            if (patientData) {
                const appointmentData = await AppointmentData.findOne({ appointment }).lean();

                if (!appointmentData) {
                    const newAppointmentData = await new AppointmentData(data).save();
                    await Appointment.findByIdAndUpdate(appointment, { state: 1 });

                    res.status(200).json({ msg: 'Data saved', data: newAppointmentData });
                } else {
                    await AppointmentData.updateOne({ _id: appointmentData._id }, data);
                    const editedAppointmentData = await AppointmentData.findById(appointmentData._id).lean();

                    res.status(200).json({ msg: 'Data edited', data: editedAppointmentData });
                }
            } else {
                res.status(400).json({ msg: 'Appointment or patient doesnt exist' });
            }
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    get: async function (req: Request, res: Response) {
        const { appointment } = req.query;

        try {
            const data = await AppointmentData.findOne({ appointment }).lean();

            res.status(200).json(data);
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
};
