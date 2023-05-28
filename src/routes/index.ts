import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getPhotos, createPhoto, deletePhoto, getPhoto, updatePhoto } from '../controllers/photo.controller'
import { getBlogs, createBlog, deleteBlog, getBlog, updateBlog } from '../controllers/blog.controller'
import { getTags, createTag, deleteTag, getTag, updateTag } from '../controllers/tag.controller'
import { getUsers, createUser, deleteUser, getUser, updateUser } from '../controllers/user.controller'

// middleware
// router.use(upload.single('file'));

// routes users
router.route('/users/')
.get(getUsers)
.post(upload.single('file'), createUser);

router.route('/users/:id')
.get(getUser)
.delete(deleteUser)
.put(updateUser);

// routes tags
router.route('/tags/')
.get(getTags)
.post(upload.single('file'), createTag);

router.route('/tags/:id')
.get(getTag)
.delete(deleteTag)
.put(updateTag);

// routes blogs
router.route('/blogs')
.get(getBlogs)
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

router.route('/blogs/:id')
.get(getBlog)
.delete(deleteBlog)
.put(updateBlog);

// routes photos
router.route('/photos')
    .get(getPhotos)
    .post(upload.single('file'), createPhoto);

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto);

export default router;