import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    nombre: String,
    password: String,
    estado: String,
    ver: Boolean,
    crear: Boolean,
    editar: Boolean,
    eliminar: Boolean,
});

export interface IUser extends Document {
    nombre: string;
    password: string;
    estado: string;
    ver: boolean;
    crear: boolean;
    editar: boolean;
    eliminar: boolean;
}

export default model<IUser>('User', schema);