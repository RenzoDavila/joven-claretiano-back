// Rutas de blog

const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, callback) {
        callback(null, uuid() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

router.post("/", upload.fields([
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
]),blogController.createBlog);
router.get("/:number/:page/:sort", blogController.getBlogs);
router.get("/last/:number", blogController.getBlogsLast);
router.get("/popular/:number", blogController.getBlogsPopular);
router.get("/blogsAddView/:id", blogController.getBlogAddView);
router.put("/:id", blogController.updateBlog);
router.get("/:id", blogController.getBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
