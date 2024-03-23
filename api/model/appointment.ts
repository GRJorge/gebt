import { Schema, Types, model } from 'mongoose';

const schema = new Schema({
    date: { type: Date, required: true },
    datetime: { type: Date, required: true },
    state: { type: Number, required: true, default: 0 }, //0: Activo, 1: Pendiente, 2: Cancelado, 3: No asistido
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    imc: { type: Number, required: true },
    af: { type: Number, required: true },
    geb: { type: Number, required: true },
    get: { type: Number, required: true },
    patient: { type: Types.ObjectId, ref: 'Patient', required: true },
    user: { type: Types.ObjectId, ref: 'User', required: true },
});

export default model('Appointment', schema);
