import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Blog, { IBlog } from '../models/Blog';

export async function getBlogs(req: Request, res: Response): Promise<Response> {
    const blogs = await Blog.find();
    return res.json(blogs);
};

export async function createBlog(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const newBlog = { title, description, imagePath: req.file.path };
    const blog = new Blog(newBlog);
    await blog.save();
    return res.json({
        message: 'Blog Saved Successfully',
        blog
    });
};

export async function getBlog(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    return res.json(blog);
}

export async function deleteBlog(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const blog = await Blog.findByIdAndRemove(id) as IBlog;
    if (blog) {
        await fs.unlink(path.resolve(blog.imagePath));
    }
    return res.json({ message: 'Blog Deleted' });
};

export async function updateBlog(req: Request, res: Response): Promise<Response> {
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
}