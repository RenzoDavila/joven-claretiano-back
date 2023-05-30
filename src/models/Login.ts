import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    user: String,
    pass: String,
});

export interface ILogin extends Document {
    user: string;
    pass: string;
}

export default model<ILogin>('Login', schema);