"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const Tag_1 = __importDefault(require("../models/Tag"));
async function getTags(req, res) {
    try {
        const tags = await Tag_1.default.find();
        return res.json(tags);
    }
    catch (error) {
        console.log(" ****************** Error en getTags ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar los tags");
    }
}
exports.getTags = getTags;
;
async function createTag(req, res) {
    try {
        const { color, description } = req.body;
        const newTag = { color, description };
        const tag = new Tag_1.default(newTag);
        await tag.save();
        return res.json({
            message: 'Tag creado',
            tag
        });
    }
    catch (error) {
        console.log(" ****************** Error en createTag ==>", error);
        return res.status(500).send("Ocurrio un problema al crear los tags");
    }
}
exports.createTag = createTag;
;
async function getTag(req, res) {
    try {
        const { id } = req.params;
        const tag = await Tag_1.default.findById(id);
        return res.json(tag);
    }
    catch (error) {
        console.log(" ****************** Error en getTag ==>", error);
        return res.status(500).send("Ocurrio un problema al crear el tag");
    }
}
exports.getTag = getTag;
async function deleteTag(req, res) {
    try {
        const { id } = req.params;
        const tag = await Tag_1.default.findByIdAndRemove(id);
        return res.json({ message: `Tag "${tag.description}" eliminado` });
    }
    catch (error) {
        console.log(" ****************** Error en deleteTag ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el tag");
    }
}
exports.deleteTag = deleteTag;
;
async function updateTag(req, res) {
    try {
        const { id } = req.params;
        const { color, description } = req.body;
        const body = { color, description };
        const updatedTag = await Tag_1.default.findByIdAndUpdate(id, {
            color,
            description
        });
        return res.json({
            message: 'Tag actualizado',
            body
        });
    }
    catch (error) {
        console.log(" ****************** Error en updateTag ==>", error);
        return res.status(500).send("Ocurrio un problema al editar el tag");
    }
}
exports.updateTag = updateTag;
