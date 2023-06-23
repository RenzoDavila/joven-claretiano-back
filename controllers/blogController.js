const Blog = require("../models/Blog");
const fs = require('fs-extra');
const path = require('path');

exports.getBlogs = async (req, res) => {
    try {
        const { number, page, sort } = req.params;
        const num = Number(number);
        const pag = Number(page) - 1;
        const skip = num * pag;
        const sortByDate = { dateCreated: -1 };
        let pagination = 0;
        let residue = 0;
        let data = {};
        data.registers = 0;
        data.pagination = 0;
        data.page = 0;
        console.log("sort", sort);
        let registers = await Blog.find().count();
        if (registers > 0) {
            pagination = Math.floor(registers / num);
            residue = Math.floor(registers % num);
            if (residue > 0) {
                pagination = pagination + 1;
            }
            data.registers = registers;
            data.pagination = pagination;
            data.page = Number(page);
        }
        ;
        data.data = await Blog.find().sort({ dateCreated: -1 }).skip(skip).limit(num);
        return res.json(data);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogs ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
};

exports.getBlogsLast = async (req, res) => {
    try {
        const { number } = req.params;
        const num = Number(number);
        const sort = { dateCreated: -1 };
        let blogs = await Blog.find().sort(sort).limit(num);
        return res.json(blogs);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogsLast ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
};

exports.getBlogsPopular = async (req, res) => {
    try {
        const { number } = req.params;
        const num = Number(number);
        const sort = { views: -1, dateCreated: -1 };
        let blogs = await Blog.find().sort(sort).limit(num);
        return res.json(blogs);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogsPopular ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
};

exports.createBlog = async (req, res) => {
        try {
            let principalImagePath;
            let dateEdited, dateCreated, title, views, tag, state;
            let content = [
                {
                    description : 1,
                    text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam dignissim diam quis enim lobortis scelerisque. Sit amet venenatis urna cursus eget nunc scelerisque viverra. Purus non enim praesent elementum facilisis leo vel fringilla. Fringilla ut morbi tincidunt augue interdum. Eu feugiat pretium nibh ipsum. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Suspendisse potenti nullam ac tortor vitae purus faucibus ornare. Arcu felis bibendum ut tristique et egestas quis. Consequat id porta nibh venenatis. At tempor commodo ullamcorper a lacus. Leo duis ut diam quam nulla porttitor massa. Et ultrices neque ornare aenean euismod. Sem integer vitae justo eget magna fermentum iaculis eu non. Neque laoreet suspendisse interdum consectetur. Sit amet mattis vulputate enim. Accumsan in nisl nisi scelerisque eu ultrices. At elementum eu facilisis sed odio morbi quis commodo odio. Morbi enim nunc faucibus a pellentesque. Elementum integer enim neque volutpat ac tincidunt vitae semper quis.",
                    multimediaType : "N",
                    multimediaPosition : "",
                    descPath : ""
                },
                {
                    description : 2,
                    text : "A diam maecenas sed enim ut. Aliquam vestibulum morbi blandit cursus risus at. Bibendum arcu vitae elementum curabitur vitae nunc sed velit. Pellentesque habitant morbi tristique senectus et netus. Neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Adipiscing bibendum est ultricies integer quis auctor elit sed. Maecenas sed enim ut sem viverra aliquet eget sit. Sed arcu non odio euismod lacinia. Volutpat blandit aliquam etiam erat velit. Augue neque gravida in fermentum et sollicitudin. Donec ac odio tempor orci dapibus ultrices in iaculis. Urna et pharetra pharetra massa massa ultricies. Lacus luctus accumsan tortor posuere ac ut consequat. Vitae tempus quam pellentesque nec nam aliquam. Egestas dui id ornare arcu. Eget lorem dolor sed viverra. Ac ut consequat semper viverra.",
                    multimediaType : "N",
                    multimediaPosition : "",
                    descPath : ""
                }
            ];
            let start = new Date(2020, 0, 1);
            let end = new Date();
            let startHour = 0;
            let endHour = 24;
            let tagArray = ["645fd9a97613ca2100243b12", "645fd9bb7613ca2100243b13", "645fda117613ca2100243b14"]
            let array = [];
            for (let i = 0; i < 40; i++) {
                var date = new Date(+start + Math.random() * (end - start));
                var hour = startHour + Math.random() * (endHour - startHour) | 0;
                date.setHours(hour);
                principalImagePath = "";
                dateCreated = date;
                dateEdited = date;
                title = "Titulo de prueba haciendo uso de la fecha " + date.toString() + " en el ciclo " + i;
                views = Math.floor(Math.random() * 1000);
                tag = tagArray[Math.floor(Math.random() * 3)];
                state = "C"
                const newBlog = { title, views, tag, dateEdited, dateCreated, content, state, principalImagePath};
                const blog = new Blog(newBlog);
                array.push(blog)
                await blog.save();
            }
            return res.json({
                message: 'Blog creado'
            });
        } catch (error) {
            console.log(" ****************** Error en createBlog ==>", error);
            return res.status(500).send("Ocurrio un problema al crear el blog");
        }
};

// exports.createBlog = async (req, res) => {
//     try {
//         let principalImagePath;
//         const { title, views, tag, content, state } = req.body;
//         let { dateEdited, dateCreated } = req.body;
//         const filter = content.filter((t) => t.multimediaType != 'N');
//         dateCreated = new Date(dateCreated);
//         dateEdited = new Date(dateEdited);
//         if (filter.length > 0) {
//             switch (filter[0].file) {
//                 case 'files0':
//                     principalImagePath = req.files.files0[0].path;
//                     break;
//                 case 'files1':
//                     principalImagePath = req.files.files1[0].path;
//                     break;
//                 case 'files2':
//                     principalImagePath = req.files.files2[0].path;
//                     break;
//                 case 'files3':
//                     principalImagePath = req.files.files3[0].path;
//                     break;
//                 case 'files4':
//                     principalImagePath = req.files.files4[0].path;
//                     break;
//                 case 'files5':
//                     principalImagePath = req.files.files5[0].path;
//                     break;
//                 case 'files6':
//                     principalImagePath = req.files.files6[0].path;
//                     break;
//                 case 'files7':
//                     principalImagePath = req.files.files7[0].path;
//                     break;
//                 case 'files8':
//                     principalImagePath = req.files.files8[0].path;
//                     break;
//                 case 'files9':
//                     principalImagePath = req.files.files9[0].path;
//                     break;
//                 default:
//                     principalImagePath = '';
//                     break;
//             }
//         }
//         else {
//             principalImagePath = "";
//         }
//         content.map((item) => {
//             switch (item.file) {
//                 case 'files0':
//                     item.imagePath = req.files.files0[0].path;
//                     break;
//                 case 'files1':
//                     item.imagePath = req.files.files1[0].path;
//                     break;
//                 case 'files2':
//                     item.imagePath = req.files.files2[0].path;
//                     break;
//                 case 'files3':
//                     item.imagePath = req.files.files3[0].path;
//                     break;
//                 case 'files4':
//                     item.imagePath = req.files.files4[0].path;
//                     break;
//                 case 'files5':
//                     item.imagePath = req.files.files5[0].path;
//                     break;
//                 case 'files6':
//                     item.imagePath = req.files.files6[0].path;
//                     break;
//                 case 'files7':
//                     item.imagePath = req.files.files7[0].path;
//                     break;
//                 case 'files8':
//                     item.imagePath = req.files.files8[0].path;
//                     break;
//                 case 'files9':
//                     item.imagePath = req.files.files9[0].path;
//                     break;
//                 default:
//                     item.imagePath = '';
//                     break;
//             }
//         });
//         const newBlog = { title, views, tag, dateEdited, dateCreated, content, state, principalImagePath };
//         const blog = new Blog(newBlog);
//         await blog.save();
//         return res.json({
//             message: 'Blog creado',
//             blog
//         });
//     }
//     catch (error) {
//         console.log(" ****************** Error en createBlog ==>", error);
//         return res.status(500).send("Ocurrio un problema al crear el blog");
//     }
// };

exports.updateBlog = async (req, res) => {
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
        const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog);
        return res.json({
            message: 'Successfully updated',
            newBlog
        });
    }
    catch (error) {
        console.log(" ****************** Error en updateBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al editar el blog");
    }
};

exports.getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        let blog = await Blog.findById(id);
        return res.json(blog);
    }
    catch (error) {
        console.log(" ****************** Error en getBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar el blog");
    }
};

exports.getBlogAddView = async (req, res) => {
    try {
        const { id } = req.params;
        let blog = await Blog.findById(id);
        blog.views = blog.views + 1;
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog);
        return res.json(blog);
    }
    catch (error) {
        console.log(" ****************** Error en getBlogAddView ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar el blog");
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndRemove(id);
        if (blog) {
            await blog.content.forEach(element => {
                if (element.imagePath != "") {
                    fs.unlink(path.resolve(element.imagePath));
                }
            });
        }
        // return res.json({ message: 'Blog eliminado', blog: blog });
        return res.json({ message: `Blog "${blog.title}" eliminado` });
    }
    catch (error) {
        console.log(" ****************** Error en deleteBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el blog");
    }
};
