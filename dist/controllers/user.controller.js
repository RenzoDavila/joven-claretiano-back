"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const User_1 = __importDefault(require("../models/User"));
async function getUsers(req, res) {
    const users = await User_1.default.find();
    return res.json(users);
}
exports.getUsers = getUsers;
;
async function createUser(req, res) {
    const { nombre, password, estado, ver, crear, editar, eliminar } = req.body;
    const newUser = { nombre, password, estado, ver, crear, editar, eliminar };
    const user = new User_1.default(newUser);
    await user.save();
    return res.json({
        message: 'User Saved Successfully',
        user
    });
}
exports.createUser = createUser;
;
async function getUser(req, res) {
    const { id } = req.params;
    const user = await User_1.default.findById(id);
    return res.json(user);
}
exports.getUser = getUser;
async function deleteUser(req, res) {
    const { id } = req.params;
    const user = await User_1.default.findByIdAndRemove(id);
    if (user) {
        return res.json({ message: 'User Deleted' });
    }
    else {
        return res.json({ message: 'Error' });
    }
}
exports.deleteUser = deleteUser;
;
async function updateUser(req, res) {
    const { id } = req.params;
    const { nombre, password, estado, ver, crear, editar, eliminar } = req.body;
    const updatedUser = await User_1.default.findByIdAndUpdate(id, {
        nombre, password, estado, ver, crear, editar, eliminar
    });
    return res.json({
        message: 'Successfully updated',
        updatedUser
    });
}
exports.updateUser = updateUser;
