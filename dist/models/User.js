"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('User', schema);
