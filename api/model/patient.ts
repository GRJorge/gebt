import { Schema, model, Types } from 'mongoose';

const schema = new Schema(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        phone: { type: String, required: true },
        birthday: { type: Date, required: true },
        gender: { type: String, required: true },
        user: { type: Types.ObjectId, ref: 'User', required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default model('Patient', schema);
