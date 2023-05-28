import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import User, { IUser } from '../models/User';

export async function getUsers(req: Request, res: Response): Promise<Response> {
    const users = await User.find();
    return res.json(users);
};

export async function createUser(req: Request, res: Response): Promise<Response> {
    const { nombre, password, estado, ver, crear, editar, eliminar } = req.body;
    const newUser = { nombre, password, estado, ver, crear, editar, eliminar };
    const user = new User(newUser);
    await user.save();
    return res.json({
        message: 'User Saved Successfully',
        user
    });
};

export async function getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.json(user);
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id) as IUser;
    if (user) {
        return res.json({ message: 'User Deleted' });
    }else{
        return res.json({ message: 'Error' });
    }
};

export async function updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nombre, password, estado, ver, crear, editar, eliminar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {
        nombre, password, estado, ver, crear, editar, eliminar
    });
    return res.json({
        message: 'Successfully updated',
        updatedUser
    });
}