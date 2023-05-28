import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Tag, { ITag } from '../models/Tag';

export async function getTags(req: Request, res: Response): Promise<Response> {
    const tags = await Tag.find();
    return res.json(tags);
};

export async function createTag(req: Request, res: Response): Promise<Response> {
    const { color, description } = req.body;
    const newTag = { color, description };
    const tag = new Tag(newTag);
    await tag.save();
    return res.json({
        message: 'Tag Saved Successfully',
        tag
    });
};

export async function getTag(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    return res.json(tag);
}

export async function deleteTag(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const tag = await Tag.findByIdAndRemove(id) as ITag;
    if (tag) {
        return res.json({ message: 'Tag Deleted' });
    }else{
        return res.json({ message: 'Error' });
    }
};

export async function updateTag(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { color, description } = req.body;
    const updatedTag = await Tag.findByIdAndUpdate(id, {
        color,
        description
    });
    return res.json({
        message: 'Successfully updated',
        updatedTag
    });
}