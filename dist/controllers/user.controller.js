"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Models
const User_1 = __importDefault(require("../models/User"));
async function getUsers(req, res) {
    try {
        const users = await User_1.default.find();
        return res.json(users);
    }
    catch (error) {
        console.log(" ****************** Error en getUsers ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar los usuarios");
    }
}
exports.getUsers = getUsers;
;
async function createUser(req, res) {
    try {
        const { codigo, nombres, apellidos, email, pass, estado, ver, crear, editar, eliminar } = req.body;
        let password = await bcryptjs_1.default.hash(pass, 8);
        const newUser = { codigo, nombres, apellidos, email, password, estado, ver, crear, editar, eliminar };
        const user = new User_1.default(newUser);
        await user.save();
        return res.json({
            message: 'Usuario creado',
            user
        });
    }
    catch (error) {
        console.log(" ****************** Error en createUser ==>", error);
        return res.status(500).send("Ocurrio un problema al crear el usuario");
    }
}
exports.createUser = createUser;
;
async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User_1.default.findById(id);
        return res.json(user);
    }
    catch (error) {
        console.log(" ****************** Error en getUser ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar el usuario");
    }
}
exports.getUser = getUser;
;
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User_1.default.findByIdAndRemove(id);
        console.log("eliminado a ", user);
        return res.json({ message: `Usuario "${user.nombres} ${user.apellidos}" eliminado` });
    }
    catch (error) {
        console.log(" ****************** Error en deleteUser ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el usuario");
    }
}
exports.deleteUser = deleteUser;
;
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { codigo, nombres, apellidos, email, password, estado, ver, crear, editar, eliminar } = req.body;
        const body = { codigo, nombres, apellidos, email, password, estado, ver, crear, editar, eliminar };
        const updatedUser = await User_1.default.findByIdAndUpdate(id, {
            codigo, nombres, apellidos, email, password, estado, ver, crear, editar, eliminar
        });
        return res.json({
            message: 'Usuario actualizado',
            body
        });
    }
    catch (error) {
        console.log(" ****************** Error en updateUser ==>", error);
        return res.status(500).send("Ocurrio un problema al editar el usuario");
    }
}
exports.updateUser = updateUser;
;
