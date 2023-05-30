import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs';

// Models
import User, { IUser } from '../models/User';

export async function login(req: Request, res: Response): Promise<Response> {
    try {
        const { user, pass } = req.body;
        const reqOjb:any = {};

        if(user.indexOf("@") != -1){
            reqOjb.mail = user
        }else{
            reqOjb.codigo = user
        }

        const login = await User.findOne(reqOjb);
        
        if(login){
            const compare = bcryptjs.compareSync(pass, login!.password);

            if(compare){
                return res.json(login);
            }
            else{
                return res.json({message: 'La contraseña no es correcta'});
            }
        }
        else{
            return res.json({message: 'El usuario no existe'});
        }

    } catch (error) {
        console.log(" ****************** Error en loginUser ==>", error);
        return res.status(500).send("Contraseña o usuario equivocado");
    }
};