import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Blog, { IBlog } from '../models/Blog';
import Tag, { ITag } from '../models/Tag';

export async function getBlogs(req: Request, res: Response): Promise<Response> {
    try {
        const { number, page, sort } = req.params;
        const num = Number(number);
        const pag = Number(page);
        const skip = num * pag;
        const sortByDate = {dateCreated: -1};

        console.log("num", num);
        console.log("skip", skip);
        console.log("sort", sort);

        let blogs = await Blog.find().sort({dateCreated: -1}).skip(skip).limit(num);
        // let blogs = await Blog.find().sort(sortByDate).skip(4);

        return res.json(blogs);
    } catch (error) {
        console.log(" ****************** Error en getBlogs ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
};

export async function getBlogsLast(req: Request, res: Response): Promise<Response> {
    try {
        const { number } = req.params;
        const num = Number(number);
        const sort = { dateCreated: -1};

        let blogs = await Blog.find().sort(sort).limit(num);
        return res.json(blogs);
    } catch (error) {
        console.log(" ****************** Error en getBlogsLast ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
};

export async function getBlogsPopular(req: Request, res: Response): Promise<Response> {
    try {
        const { number } = req.params;
        const num = Number(number);
        const sort = { views: -1, dateCreated: -1};

        let blogs = await Blog.find().sort(sort).limit(num);
        return res.json(blogs);

    } catch (error) {
        console.log(" ****************** Error en getBlogsPopular ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
};

export async function createBlog(req: any, res: Response): Promise<Response> {
    try {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let principalImagePath;
            const { title, views, tag, content, state} = req.body;
            let { dateEdited, dateCreated} = req.body;
            const filter = content.filter((t: { multimediaType: string; }) => t.multimediaType != 'N');

            dateCreated = new Date(dateCreated);
            dateEdited = new Date(dateEdited);
            
            if(filter.length > 0){
                switch (filter[0].file) {
                    case 'files0':
                        principalImagePath = req.files.files0[0].path
                        break;
                    case 'files1':
                        principalImagePath = req.files.files1[0].path
                        break;
                    case 'files2':
                        principalImagePath = req.files.files2[0].path
                        break;
                    case 'files3':
                        principalImagePath = req.files.files3[0].path
                        break;
                    case 'files4':
                        principalImagePath = req.files.files4[0].path
                        break;
                    case 'files5':
                        principalImagePath = req.files.files5[0].path
                        break;
                    case 'files6':
                        principalImagePath = req.files.files6[0].path
                        break;
                    case 'files7':
                        principalImagePath = req.files.files7[0].path
                        break;
                    case 'files8':
                        principalImagePath = req.files.files8[0].path
                        break;
                    case 'files9':
                        principalImagePath = req.files.files9[0].path
                        break;
                    default:
                        principalImagePath = ''
                        break;
                }
            }else{
                principalImagePath = "";
            }

            content.map((item: any) => {
                switch (item.file) {
                    case 'files0':
                        item.imagePath = req.files.files0[0].path
                        break;
                    case 'files1':
                        item.imagePath = req.files.files1[0].path
                        break;
                    case 'files2':
                        item.imagePath = req.files.files2[0].path
                        break;
                    case 'files3':
                        item.imagePath = req.files.files3[0].path
                        break;
                    case 'files4':
                        item.imagePath = req.files.files4[0].path
                        break;
                    case 'files5':
                        item.imagePath = req.files.files5[0].path
                        break;
                    case 'files6':
                        item.imagePath = req.files.files6[0].path
                        break;
                    case 'files7':
                        item.imagePath = req.files.files7[0].path
                        break;
                    case 'files8':
                        item.imagePath = req.files.files8[0].path
                        break;
                    case 'files9':
                        item.imagePath = req.files.files9[0].path
                        break;
                    default:
                        item.imagePath = ''
                        break;
                }
            });

            const newBlog = { title, views, tag, dateEdited, dateCreated, content, state, principalImagePath};
            const blog = new Blog(newBlog);
        
            await blog.save();
        }
        return res.json({
            message: 'Blog creado',
            // blog
        });
    } catch (error) {
        console.log(" ****************** Error en createBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al crear el blog");
    }
};

export async function getBlog(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        let blog = await Blog.findById(id);

        return res.json(blog);
    } catch (error) {
        console.log(" ****************** Error en getBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar el blog");
    }
}

export async function getBlogAddView(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        let blog = await Blog.findById(id);
        blog!.views = blog!.views + 1;
        
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog);

        return res.json(blog);
    } catch (error) {
        console.log(" ****************** Error en getBlogAddView ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar el blog");
    }
}

export async function deleteBlog(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndRemove(id) as IBlog;
        if (blog) {
            await blog.content.forEach(element => {
                if(element.imagePath != ""){
                    fs.unlink(path.resolve(element.imagePath));
                }
            });
        }
        return res.json({ message: 'Blog eliminado', blog: blog } );
    } catch (error) {
        console.log(" ****************** Error en deleteBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el blog");
    }
};

export async function updateBlog(req: any, res: Response): Promise<Response> {
    try {
        let principalImagePath;
        const { id } = req.params;
        const { title, views, tag, content, state} = req.body;
        let { dateEdited, dateCreated} = req.body;
        const filter = content.filter((t: { multimediaType: string; }) => t.multimediaType != 'N');
        
        dateCreated = new Date(dateCreated);
        dateEdited = new Date(dateEdited);
        
        if(filter.length > 0){
            switch (filter[0].file) {
                case 'files0':
                    principalImagePath = req.files.files0[0].path
                    break;
                case 'files1':
                    principalImagePath = req.files.files1[0].path
                    break;
                case 'files2':
                    principalImagePath = req.files.files2[0].path
                    break;
                case 'files3':
                    principalImagePath = req.files.files3[0].path
                    break;
                case 'files4':
                    principalImagePath = req.files.files4[0].path
                    break;
                case 'files5':
                    principalImagePath = req.files.files5[0].path
                    break;
                case 'files6':
                    principalImagePath = req.files.files6[0].path
                    break;
                case 'files7':
                    principalImagePath = req.files.files7[0].path
                    break;
                case 'files8':
                    principalImagePath = req.files.files8[0].path
                    break;
                case 'files9':
                    principalImagePath = req.files.files9[0].path
                    break;
                case '':
                    principalImagePath = filter[0].descPath
                    break;
                default:
                    principalImagePath = ''
                    break;
            }
        }else{
            principalImagePath = "";
        }

        content.map((item: any) => {
            if(item.descPath != ''){
                item.imagePath = item.descPath;
            }else{
                switch (item.file) {
                    case 'files0':
                        item.imagePath = req.files.files0[0].path
                        break;
                    case 'files1':
                        item.imagePath = req.files.files1[0].path
                        break;
                    case 'files2':
                        item.imagePath = req.files.files2[0].path
                        break;
                    case 'files3':
                        item.imagePath = req.files.files3[0].path
                        break;
                    case 'files4':
                        item.imagePath = req.files.files4[0].path
                        break;
                    case 'files5':
                        item.imagePath = req.files.files5[0].path
                        break;
                    case 'files6':
                        item.imagePath = req.files.files6[0].path
                        break;
                    case 'files7':
                        item.imagePath = req.files.files7[0].path
                        break;
                    case 'files8':
                        item.imagePath = req.files.files8[0].path
                        break;
                    case 'files9':
                        item.imagePath = req.files.files9[0].path
                        break;
                    default:
                        item.imagePath = ''
                        break;
                }
            }
        });


        const newBlog = { title, views, tag, dateEdited, dateCreated, content, state, principalImagePath};
        const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog);

        return res.json({
            message: 'Successfully updated',
            newBlog
        });
    } catch (error) {
        console.log(" ****************** Error en updateBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al editar el blog");
    }
};