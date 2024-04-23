import { Schema, Types, model } from 'mongoose';

const schema = new Schema(
    {
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        af: { type: Number, required: true },
        imc: { type: Number, required: true },
        gebData: { type: Number, required: true },
        getData: { type: Number, required: true },
        appointment: { type: Types.ObjectId, ref: 'Appointment', required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('AppointmentData', schema);
