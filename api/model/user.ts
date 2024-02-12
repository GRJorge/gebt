import { model, Schema } from 'mongoose';

const schema = new Schema(
    {
        name: { type: 'String', require: true },
        lastname: { type: 'String', require: true },
        email: { type: 'String', require: true, unique: true, immutable: true },
        password: { type: 'String', require: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('User', schema);
