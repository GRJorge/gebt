import { Request, Response } from 'express';
import AppointmentData from '../model/appointmentData';
import Appointment from '../model/appointment';
import Patient from '../model/patient';
import { ResponseInternalError, calculateGEB, calculateGET, calculateIMC, getAge } from '../utils/functions';

export default {
    set: async function (req: Request, res: Response) {
        const { height, weight, af, appointment } = req.body;

        try {
            const appointmentData = await Appointment.findById(appointment).select('patient').populate('patient', '_id').lean();
            const patientData = await Patient.findById(appointmentData!.patient.prototype!._id).select('birthday gender').lean();

            if (appointmentData && patientData) {
                const imc = calculateIMC(weight, height);
                const gebData = calculateGEB(weight, height, imc, patientData!.gender, getAge(patientData!.birthday));
                const getData = calculateGET(gebData, af, imc);

                const newAppointmentData = await new AppointmentData({ height, weight, af, imc, gebData, getData, appointment }).save();

                res.status(200).json({ msg: 'Data saved', data: newAppointmentData });
            } else {
                res.status(400).json({ msg: 'Appointment or patient doesnt exist' });
            }
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
};
