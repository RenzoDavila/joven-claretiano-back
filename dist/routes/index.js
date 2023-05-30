"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const multer_1 = __importDefault(require("../libs/multer"));
const photo_controller_1 = require("../controllers/photo.controller");
const blog_controller_1 = require("../controllers/blog.controller");
const tag_controller_1 = require("../controllers/tag.controller");
const user_controller_1 = require("../controllers/user.controller");
const login_controller_1 = require("../controllers/login.controller");
// middleware
// router.use(upload.single('file'));
// routes login
router.route('/login/')
    .post(multer_1.default.single('file'), login_controller_1.login);
// routes users
router.route('/users/')
    .get(user_controller_1.getUsers)
    .post(multer_1.default.single('file'), user_controller_1.createUser);
router.route('/users/:id')
    .get(user_controller_1.getUser)
    .delete(user_controller_1.deleteUser)
    .put(multer_1.default.single('file'), user_controller_1.updateUser);
// routes tags
router.route('/tags/')
    .get(tag_controller_1.getTags)
    .post(multer_1.default.single('file'), tag_controller_1.createTag);
router.route('/tags/:id')
    .get(tag_controller_1.getTag)
    .delete(tag_controller_1.deleteTag)
    .put(multer_1.default.single('file'), tag_controller_1.updateTag);
// routes blogs
router.route('/blogs')
    .get(blog_controller_1.getBlogs)
    .post(multer_1.default.fields([
    { name: 'files0' },
    { name: 'files1' },
    { name: 'files2' },
    { name: 'files3' },
    { name: 'files4' },
    { name: 'files5' },
    { name: 'files6' },
    { name: 'files7' },
    { name: 'files8' },
    { name: 'files9' }
]), blog_controller_1.createBlog);
router.route('/blogs/:id')
    .get(blog_controller_1.getBlog)
    .delete(blog_controller_1.deleteBlog)
    .put(multer_1.default.single('file'), blog_controller_1.updateBlog);
// routes photos
router.route('/photos')
    .get(photo_controller_1.getPhotos)
    .post(multer_1.default.single('file'), photo_controller_1.createPhoto);
router.route('/photos/:id')
    .get(photo_controller_1.getPhoto)
    .delete(photo_controller_1.deletePhoto)
    .put(multer_1.default.single('file'), photo_controller_1.updatePhoto);
exports.default = router;
