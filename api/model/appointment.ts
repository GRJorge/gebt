import { Schema, Types, model } from 'mongoose';

const schema = new Schema(
    {
        date: { type: Date, required: true },
        state: { type: Number, required: true, default: 0 }, //0: Pendiente, 1: Atendido, 2: Cancelado, 3: No asistido
        patient: { type: Types.ObjectId, ref: 'Patient', required: true },
        user: { type: Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Appointment', schema);
