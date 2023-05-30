import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs';

// Models
import User, { IUser } from '../models/User';

export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.log(" ****************** Error en getUsers ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar los usuarios");
    }
};

export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { codigo, nombre, mail, pass, estado, ver, crear, editar, eliminar } = req.body;

        let password = await bcryptjs.hash(pass, 8)

        const newUser = { codigo, nombre, mail, password, estado, ver, crear, editar, eliminar };

        const user = new User(newUser);
        await user.save();
        return res.json({
            message: 'Usuario creado',
            user
        });
    } catch (error) {
        console.log(" ****************** Error en createUser ==>", error);
        return res.status(500).send("Ocurrio un problema al crear el usuario");
    }
};

export async function getUser(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.json(user);
    } catch (error) {
        console.log(" ****************** Error en getUser ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar el usuario");
    }
};

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndRemove(id) as IUser;
        return res.json({ message: `Usuario "${user.nombre}" eliminado`});
    } catch (error) {
        console.log(" ****************** Error en deleteUser ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el usuario");
    }
};

export async function updateUser(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const { codigo, nombre, mail, password, estado, ver, crear, editar, eliminar } = req.body;
        const body = { codigo, nombre, mail, password, estado, ver, crear, editar, eliminar }
        const updatedUser = await User.findByIdAndUpdate(id, {
            codigo, nombre, mail, password, estado, ver, crear, editar, eliminar
        });
        return res.json({
            message: 'Usuario actualizado',
            body
        });
    } catch (error) {
        console.log(" ****************** Error en updateUser ==>", error);
        return res.status(500).send("Ocurrio un problema al editar el usuario");
    }
};