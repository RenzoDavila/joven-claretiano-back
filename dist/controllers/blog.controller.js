"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// Models
const Blog_1 = __importDefault(require("../models/Blog"));
async function getBlogs(req, res) {
    try {
        const blogs = await Blog_1.default.find();
        blogs.sort(function (a, b) {
            // const dateA = a.fecha;
            // const dateB = b.fecha;
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);
            if (dateA < dateB) {
                return 1;
            }
            else if (dateA > dateB) {
                return -1;
            }
            return 0;
        });
        return res.json(blogs);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogs ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
}
exports.getBlogs = getBlogs;
;
async function createBlog(req, res) {
    try {
        let principalImagePath;
        const { title, views, tag, fecha, content } = req.body;
        const filter = content.filter((t) => t.multimediaType != 'N');
        if (filter.length > 0) {
            switch (filter[0].file) {
                case 'files0':
                    principalImagePath = req.files.files0[0].path;
                    break;
                case 'files1':
                    principalImagePath = req.files.files1[0].path;
                    break;
                case 'files2':
                    principalImagePath = req.files.files2[0].path;
                    break;
                case 'files3':
                    principalImagePath = req.files.files3[0].path;
                    break;
                case 'files4':
                    principalImagePath = req.files.files4[0].path;
                    break;
                case 'files5':
                    principalImagePath = req.files.files5[0].path;
                    break;
                case 'files6':
                    principalImagePath = req.files.files6[0].path;
                    break;
                case 'files7':
                    principalImagePath = req.files.files7[0].path;
                    break;
                case 'files8':
                    principalImagePath = req.files.files8[0].path;
                    break;
                case 'files9':
                    principalImagePath = req.files.files9[0].path;
                    break;
                default:
                    principalImagePath = '';
                    break;
            }
        }
        else {
            principalImagePath = "";
        }
        content.map((item) => {
            switch (item.file) {
                case 'files0':
                    item.imagePath = req.files.files0[0].path;
                    break;
                case 'files1':
                    item.imagePath = req.files.files1[0].path;
                    break;
                case 'files2':
                    item.imagePath = req.files.files2[0].path;
                    break;
                case 'files3':
                    item.imagePath = req.files.files3[0].path;
                    break;
                case 'files4':
                    item.imagePath = req.files.files4[0].path;
                    break;
                case 'files5':
                    item.imagePath = req.files.files5[0].path;
                    break;
                case 'files6':
                    item.imagePath = req.files.files6[0].path;
                    break;
                case 'files7':
                    item.imagePath = req.files.files7[0].path;
                    break;
                case 'files8':
                    item.imagePath = req.files.files8[0].path;
                    break;
                case 'files9':
                    item.imagePath = req.files.files9[0].path;
                    break;
                default:
                    item.imagePath = '';
                    break;
            }
        });
        const newBlog = { title, views, tag, fecha, content, principalImagePath };
        const blog = new Blog_1.default(newBlog);
        await blog.save();
        return res.json({
            message: 'Blog creado',
            blog
        });
    }
    catch (error) {
        console.log(" ****************** Error en createBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al crear el blog");
    }
}
exports.createBlog = createBlog;
;
async function getBlog(req, res) {
    try {
        const { id } = req.params;
        const blog = await Blog_1.default.findById(id);
        return res.json(blog);
    }
    catch (error) {
        console.log(" ****************** Error en deleteBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar el blog");
    }
}
exports.getBlog = getBlog;
async function deleteBlog(req, res) {
    try {
        const { id } = req.params;
        const blog = await Blog_1.default.findByIdAndRemove(id);
        if (blog) {
            await blog.content.forEach(element => {
                console.log("element", element);
                if (element.imagePath != "") {
                    fs_extra_1.default.unlink(path_1.default.resolve(element.imagePath));
                }
            });
        }
        return res.json({ message: 'Blog eliminado' });
    }
    catch (error) {
        console.log(" ****************** Error en deleteBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el blog");
    }
}
exports.deleteBlog = deleteBlog;
;
async function updateBlog(req, res) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedBlog = await Blog_1.default.findByIdAndUpdate(id, {
            title,
            description
        });
        return res.json({
            message: 'Successfully updated',
            updatedBlog
        });
    }
    catch (error) {
        console.log(" ****************** Error en updateBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al actualizar el blog");
    }
}
exports.updateBlog = updateBlog;
