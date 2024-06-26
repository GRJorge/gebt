import { Request, Response } from 'express';
import Patient from '../model/patient';
import Appointment from '../model/appointment';
import { ResponseInternalError } from '../utils/functions';

export default {
    new: async function (req: Request, res: Response) {
        const { date, patient } = req.body;

        try {
            const patientInfo = await Patient.findById(patient).select('gender birthday').lean();

            if (patientInfo) {
                await new Appointment({ date: new Date(date), patient, user: req.user }).save();
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

        try {
            const equalAppointment = await Appointment.find({ date, user: req.user, state: 0 }).lean();

            if (equalAppointment.length > 0) {
                res.status(400).json({ type: 'same', msg: 'Appointment at the same time', appointment: equalAppointment });
            } else {
                const startDate = new Date(date);
                startDate.setHours(startDate.getHours() - 2);
                const endDate = new Date(date);
                endDate.setHours(endDate.getHours() + 2);

                const approximateAppointment = await Appointment.find({
                    date: {
                        $gte: startDate,
                        $lte: endDate,
                    },
                    user: req.user,
                    state: 0,
                })
                    .populate('patient', 'name lastname')
                    .lean();

                if (approximateAppointment.length > 0) {
                    res.status(400).json({ type: 'approximate', msg: 'Appointment approximate', appointments: approximateAppointment });
                } else {
                    res.status(200).json({ msg: 'Not overlap appointments' });
                }
            }
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    get: async function (req: Request, res: Response) {
        const { state } = req.query;

        try {
            const appointments = await Appointment.find({ user: req.user, state: { $in: state } })
                .sort({ date: 'desc' })
                .populate('patient', 'name lastname')
                .lean();

            res.status(200).json(appointments);
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    getByPatient: async function (req: Request, res: Response) {
        const { patient } = req.query;

        try {
            const appointments = await Appointment.find({ user: req.user, patient }).populate('patient', 'name lastname').lean();

            res.status(200).json(appointments);
        } catch (error) {
            ResponseInternalError(res, error);
        }
    },
    cancel: async function (req: Request, res: Response) {
        const { appointment } = req.body;

        try {
            await Appointment.updateOne({ _id: appointment, user: req.user }, { state: 2 });

            res.status(200).json({ msg: 'Canceled appointment' });
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    reschedule: async function (req: Request, res: Response) {
        const { appointment, date } = req.body;

        try {
            await Appointment.updateOne({ _id: appointment, user: req.user }, { date: new Date(date) });

            res.status(200).json({ msg: 'Appointment reschedule ok' });
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    getUpcoming: async function (req: Request, res: Response) {
        const date = new Date();
        date.setHours(date.getHours() + 2);

        try {
            const upcomingAppointments = await Appointment.find({
                date: {
                    $gte: date,
                },
                state: 0,
                user: req.user,
            })
                .populate('patient', 'name lastname')
                .lean();

            res.status(200).json(upcomingAppointments);
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    getActive: async function (req: Request, res: Response) {
        const date = new Date();
        const endDate = new Date();
        endDate.setHours(endDate.getHours() + 2);

        try {
            let activeAppointments = await Appointment.find({
                state: 0,
                user: req.user,
            })
                .populate('patient', 'name lastname')
                .lean();

            activeAppointments = activeAppointments.filter((appointment) => {
                const appointmentDate = new Date(appointment.date);
                const appointmentEndDate = new Date(appointment.date);
                appointmentEndDate.setHours(appointmentEndDate.getHours() + 2);

                if (date >= appointmentDate && date <= appointmentEndDate) {
                    return true;
                }
                return false;
            });

            res.status(200).json(activeAppointments);
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
    notAssisted: async function (req: Request, res: Response) {
        const date = new Date();

        try {
            const appointments = await Appointment.find({ date: { $lte: date }, state: 0, user: req.user })
                .select('_id')
                .lean();

            await Appointment.updateMany({ _id: { $in: appointments } }, { state: 3 });

            res.status(200).json({ msg: `${appointments.length} appointments updated` });
        } catch (error: any) {
            ResponseInternalError(res, error);
        }
    },
};
