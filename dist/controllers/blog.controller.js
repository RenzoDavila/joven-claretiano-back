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
        const { number, page, sort } = req.params;
        const num = Number(number);
        const pag = Number(page);
        const skip = num * pag;
        const sortByDate = { dateCreated: -1 };
        console.log("num", num);
        console.log("skip", skip);
        console.log("sort", sort);
        let blogs = await Blog_1.default.find().sort({ dateCreated: -1 }).skip(skip).limit(num);
        // let blogs = await Blog.find().sort(sortByDate).skip(4);
        return res.json(blogs);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogs ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
}
exports.getBlogs = getBlogs;
;
async function getBlogsLast(req, res) {
    try {
        const { number } = req.params;
        const num = Number(number);
        const sort = { dateCreated: -1 };
        let blogs = await Blog_1.default.find().sort(sort).limit(num);
        return res.json(blogs);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogsLast ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
}
exports.getBlogsLast = getBlogsLast;
;
async function getBlogsPopular(req, res) {
    try {
        const { number } = req.params;
        const num = Number(number);
        const sort = { views: -1, dateCreated: -1 };
        let blogs = await Blog_1.default.find().sort(sort).limit(num);
        return res.json(blogs);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogsPopular ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
}
exports.getBlogsPopular = getBlogsPopular;
;
async function createBlog(req, res) {
    try {
        let principalImagePath;
        const { title, views, tag, content, state } = req.body;
        let { dateEdited, dateCreated } = req.body;
        const filter = content.filter((t) => t.multimediaType != 'N');
        dateCreated = new Date(dateCreated);
        dateEdited = new Date(dateEdited);
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
        const newBlog = { title, views, tag, dateEdited, dateCreated, content, state, principalImagePath };
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
        let blog = await Blog_1.default.findById(id);
        return res.json(blog);
    }
    catch (error) {
        console.log(" ****************** Error en getBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar el blog");
    }
}
exports.getBlog = getBlog;
async function getBlogAddView(req, res) {
    try {
        const { id } = req.params;
        let blog = await Blog_1.default.findById(id);
        blog.views = blog.views + 1;
        const updatedBlog = await Blog_1.default.findByIdAndUpdate(id, blog);
        return res.json(blog);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogAddView ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar el blog");
    }
}
exports.getBlogAddView = getBlogAddView;
async function deleteBlog(req, res) {
    try {
        const { id } = req.params;
        const blog = await Blog_1.default.findByIdAndRemove(id);
        if (blog) {
            await blog.content.forEach(element => {
                if (element.imagePath != "") {
                    fs_extra_1.default.unlink(path_1.default.resolve(element.imagePath));
                }
            });
        }
        return res.json({ message: 'Blog eliminado', blog: blog });
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
        let principalImagePath;
        const { id } = req.params;
        const { title, views, tag, content, state } = req.body;
        let { dateEdited, dateCreated } = req.body;
        const filter = content.filter((t) => t.multimediaType != 'N');
        dateCreated = new Date(dateCreated);
        dateEdited = new Date(dateEdited);
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
                case '':
                    principalImagePath = filter[0].descPath;
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
            if (item.descPath != '') {
                item.imagePath = item.descPath;
            }
            else {
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
            }
        });
        const newBlog = { title, views, tag, dateEdited, dateCreated, content, state, principalImagePath };
        const updatedBlog = await Blog_1.default.findByIdAndUpdate(id, newBlog);
        return res.json({
            message: 'Successfully updated',
            newBlog
        });
    }
    catch (error) {
        console.log(" ****************** Error en updateBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al editar el blog");
    }
}
exports.updateBlog = updateBlog;
;
