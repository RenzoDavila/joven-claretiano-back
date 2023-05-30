import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Blog, { IBlog } from '../models/Blog';
import Tag, { ITag } from '../models/Tag';

export async function getBlogs(req: Request, res: Response): Promise<Response> {
    try {
        const blogs = await Blog.find();

        blogs.sort(function (a, b) {
            // const dateA = a.fecha;
            // const dateB = b.fecha;
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);

            if (dateA < dateB) { 
                return 1;
            } else if (dateA > dateB) {
                return -1;
            } 
            return 0;
        });

        return res.json(blogs);
    } catch (error) {
        console.log(" ****************** Error en getBlogs ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar los blogs");
    }
};

export async function createBlog(req: any, res: Response): Promise<Response> {
    try {
        let principalImagePath;
        const { title, views, tag, fecha, content} = req.body;
        const filter = content.filter((t: { multimediaType: string; }) => t.multimediaType != 'N');
        
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
        })

        const newBlog = { title, views, tag, fecha, content, principalImagePath};
        const blog = new Blog(newBlog);
    
        await blog.save();
        return res.json({
            message: 'Blog creado',
            blog
        });
    } catch (error) {
        console.log(" ****************** Error en createBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al crear el blog");
    }
};

export async function getBlog(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        return res.json(blog);
    } catch (error) {
        console.log(" ****************** Error en deleteBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al buscar el blog");
    }
}

export async function deleteBlog(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndRemove(id) as IBlog;
        if (blog) {
            await blog.content.forEach(element => {
                console.log("element", element)
                if(element.imagePath != ""){
                    fs.unlink(path.resolve(element.imagePath));
                }
            });
        }
        return res.json({ message: 'Blog eliminado' });
    } catch (error) {
        console.log(" ****************** Error en deleteBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el blog");
    }
};

export async function updateBlog(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            title,
            description
        });
        return res.json({
            message: 'Successfully updated',
            updatedBlog
        });
    } catch (error) {
        console.log(" ****************** Error en updateBlog ==>", error);
        return res.status(500).send("Ocurrio un problema al actualizar el blog");
}
}