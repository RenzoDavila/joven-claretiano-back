import { Request, Response } from 'express'

// Models
import Tag, { ITag } from '../models/Tag';

export async function getTags(req: Request, res: Response): Promise<Response> {
    try {
        const tags = await Tag.find();
        return res.json(tags);
    } catch (error) {
        console.log(" ****************** Error en getTags ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar los tags");
    }
};

export async function createTag(req: Request, res: Response): Promise<Response> {
    try {
        const { color, description } = req.body;
        const newTag = { color, description };
        const tag = new Tag(newTag);
        await tag.save();
        return res.json({
            message: 'Tag creado',
            tag
        });
    } catch (error) {
        console.log(" ****************** Error en createTag ==>", error);
        return res.status(500).send("Ocurrio un problema al crear los tags");
    }
};

export async function getTag(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const tag = await Tag.findById(id);
        return res.json(tag);
    } catch (error) {
        console.log(" ****************** Error en getTag ==>", error);
        return res.status(500).send("Ocurrio un problema al crear el tag");
    }
}

export async function deleteTag(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const tag = await Tag.findByIdAndRemove(id) as ITag;
        return res.json({ message: `Tag "${tag.description}" eliminado`});
    } catch (error) {
        console.log(" ****************** Error en deleteTag ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el tag");
    }
};

export async function updateTag(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const { color, description } = req.body;
        const body = { color, description }
        const updatedTag = await Tag.findByIdAndUpdate(id, {
            color,
            description
        });
        return res.json({
            message: 'Tag actualizado',
            body
        });
    } catch (error) {
        console.log(" ****************** Error en updateTag ==>", error);
        return res.status(500).send("Ocurrio un problema al editar el tag");
    }
}