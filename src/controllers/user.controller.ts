import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs';

// Models
import User, { IUser } from '../models/User';

export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        const { number, page, sort } = req.params;
        const num = Number(number);
        const pag = Number(page) - 1;
        const skip = num * pag;
        const sortByDate = {dateCreated: -1};

        let pagination = 0;
        let residue = 0;
        let data:any = {};

        data.registers = 0;
        data.pagination = 0;
        data.page = 0;

        console.log("sort", sort);

        let registers = await User.find().count();
        if(registers > 0) {
            pagination = Math.floor(registers / num);
            residue = Math.floor(registers % num);
    
            if(residue > 0){
                pagination = pagination + 1
            }

            data.registers = registers;
            data.pagination = pagination;
            data.page = Number(page);
        };

        // data.data = await User.find().sort({dateCreated: -1}).skip(skip).limit(num);
        data.data = await User.find().skip(skip).limit(num);

        return res.json(data);
    } catch (error) {
        console.log(" ****************** Error en getUsers ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar los usuarios");
    }
};

export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { codigo, nombres, apellidos, email, pass, estado, ver, crear, editar, eliminar } = req.body;

        let password = await bcryptjs.hash(pass, 8)

        const newUser = { codigo, nombres, apellidos, email, password, estado, ver, crear, editar, eliminar };

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
        console.log("eliminado a ", user)
        return res.json({ message: `Usuario "${user.nombres} ${user.apellidos}" eliminado`});
    } catch (error) {
        console.log(" ****************** Error en deleteUser ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el usuario");
    }
};

export async function updateUser(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const { codigo, nombres, apellidos, email, password, estado, ver, crear, editar, eliminar } = req.body;
        const body = { codigo, nombres, apellidos, email, password, estado, ver, crear, editar, eliminar }
        const updatedUser = await User.findByIdAndUpdate(id, {
            codigo, nombres, apellidos, email, password, estado, ver, crear, editar, eliminar
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