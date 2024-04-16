import { Schema, Types, model } from 'mongoose';

const schema = new Schema(
    {
        date: { type: Date, required: true },
        state: { type: Number, required: true, default: 0 }, //0: Pendiente, 1: Activo, 2: Cancelado, 3: No asistido
        patient: { type: Types.ObjectId, ref: 'Patient', required: true },
        user: { type: Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/*
    data: {
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        imc: { type: Number, required: true },
        af: { type: Number, required: true },
        gebData: { type: Number, required: true },
        getData: { type: Number, required: true },
    },
*/

export default model('Appointment', schema);
