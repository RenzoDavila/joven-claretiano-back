"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Models
const Photo_1 = __importDefault(require("../models/Photo"));
async function getPhotos(req, res) {
    const photos = await Photo_1.default.find();
    return res.json(photos);
}
exports.getPhotos = getPhotos;
;
async function createPhoto(req, res) {
    try {
        const { title, description } = req.body;
        const newPhoto = { title, description, imagePath: req.file.path };
        const photo = new Photo_1.default(newPhoto);
        await photo.save();
        return res.json({
            message: 'Foto creada con éxito',
            photo
        });
    }
    catch (error) {
        console.log(" ****************** Error en createPhoto ==>", error);
        return res.status(500).send("Ocurrio un problema al crear la foto");
    }
}
exports.createPhoto = createPhoto;
;
async function getPhoto(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findById(id);
    return res.json(photo);
}
exports.getPhoto = getPhoto;
async function deletePhoto(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findByIdAndRemove(id);
    if (photo) {
        await fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
}
exports.deletePhoto = deletePhoto;
;
async function updatePhoto(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo_1.default.findByIdAndUpdate(id, {
        title,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}
exports.updatePhoto = updatePhoto;
