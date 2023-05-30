import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    codigo: String,
    nombre: String,
    mail: String,
    password: String,
    estado: String,
    ver: Boolean,
    crear: Boolean,
    editar: Boolean,
    eliminar: Boolean,
});

export interface IUser extends Document {
    codigo: string;
    nombre: string;
    mail: string;
    password: any;
    estado: string;
    ver: boolean;
    crear: boolean;
    editar: boolean;
    eliminar: boolean;
}

export default model<IUser>('User', schema);