import { model, Schema } from 'mongoose';

const schema = new Schema(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true, immutable: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('User', schema);
