import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    codigo: String,
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    estado: String,
    ver: Boolean,
    crear: Boolean,
    editar: Boolean,
    eliminar: Boolean,
});

export interface IUser extends Document {
    codigo: string;
    nombres: string;
    apellidos: string;
    email: string;
    password: any;
    estado: string;
    ver: boolean;
    crear: boolean;
    editar: boolean;
    eliminar: boolean;
}

export default model<IUser>('User', schema);