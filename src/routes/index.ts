import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } from '../controllers/photo.controller'
import { getBlogs, createBlog, deleteBlog, getBlog, updateBlog, getBlogAddView, getBlogsLast, getBlogsPopular } from '../controllers/blog.controller'
import { getTags, createTag, deleteTag, getTag, updateTag } from '../controllers/tag.controller'
import { getUsers, createUser, deleteUser, getUser, updateUser } from '../controllers/user.controller'
import { login } from '../controllers/login.controller'

// middleware
// router.use(upload.single('file'));

// routes login
router.route('/login/')
.post(upload.single('file'), login)

// routes users
router.route('/users/')
.get(getUsers)
.post(upload.single('file'), createUser)

router.route('/users/:id')
.get(getUser)
.delete(deleteUser)
.put(upload.single('file'), updateUser);

// routes tags
router.route('/tags/')
.get(getTags)
.post(upload.single('file'), createTag);

router.route('/tags/:id')
.get(getTag)
.delete(deleteTag)
.put(upload.single('file'), updateTag);

// routes blogs
router.route('/blogs')
.post(upload.fields([
    {name: 'files0'},
    {name: 'files1'},
    {name: 'files2'},
    {name: 'files3'},
    {name: 'files4'},
    {name: 'files5'},
    {name: 'files6'},
    {name: 'files7'},
    {name: 'files8'},
    {name: 'files9'}
]), createBlog);

router.route('/blogs/:number/:page/:sort')
.get(getBlogs)

router.route('/blogs/last/:number')
.get(getBlogsLast)

router.route('/blogs/popular/:number')
.get(getBlogsPopular)

router.route('/blogs/:id')
.get(getBlog)
.delete(deleteBlog)
.put(upload.fields([
    {name: 'files0'},
    {name: 'files1'},
    {name: 'files2'},
    {name: 'files3'},
    {name: 'files4'},
    {name: 'files5'},
    {name: 'files6'},
    {name: 'files7'},
    {name: 'files8'},
    {name: 'files9'}
]), updateBlog);

router.route('/blogsAddView/:id')
.get(getBlogAddView)

// routes photos
router.route('/photos')
    .get(getPhotos)
    .post(upload.single('file'), createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(upload.single('file'), updatePhoto);

export default router;