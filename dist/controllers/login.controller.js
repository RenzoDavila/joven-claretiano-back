"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Models
const User_1 = __importDefault(require("../models/User"));
async function login(req, res) {
    try {
        const { user, pass } = req.body;
        const reqOjb = {};
        if (user.indexOf("@") != -1) {
            reqOjb.email = user;
        }
        else {
            reqOjb.codigo = user;
        }
        const login = await User_1.default.findOne(reqOjb);
        if (login) {
            const compare = bcryptjs_1.default.compareSync(pass, login.password);
            if (compare) {
                return res.json(login);
            }
            else {
                return res.json({ message: 'La contraseña no es correcta' });
            }
        }
        else {
            return res.json({ message: 'El usuario no existe' });
        }
    }
    catch (error) {
        console.log(" ****************** Error en loginUser ==>", error);
        return res.status(500).send("Contraseña o usuario equivocado");
    }
}
exports.login = login;
;
