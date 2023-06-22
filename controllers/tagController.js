const Tag = require("../models/Tag");

exports.getTags = async (req, res) => {
    try {const { number, page, sort } = req.params;
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
    
    let registers = await Tag.find().count();
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
    // data.data = await Tag.find().sort({dateCreated: -1}).skip(skip).limit(num);
    data.data = await Tag.find().skip(skip).limit(num);
    return res.json(data);
    }
    catch (error) {
        console.log(" ****************** Error en getTags ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar los tags");
    }
};

exports.getTagsAll = async (req, res) => {
    try {
    let data = await Tag.find();
    return res.json(data);
    }
    catch (error) {
        console.log(" ****************** Error en getTags ==>", error);
        return res.status(500).send("Ocurrio un problema al cargar los tags");
    }
};

exports.createTag = async (req, res) => {
    try {
        console.log("req",req.body)
        const { color, description, title } = req.body;
        const newTag = { color, description, title };
        const tag = new Tag(newTag);
        await tag.save();
        return res.json({
            message: 'Tag creado',
            body
        });
    }
    catch (error) {
        console.log(" ****************** Error en createTag ==>", error);
        return res.status(500).send("Ocurrio un problema al crear los tags");
    }
};

exports.updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { color, description, title } = req.body;
        const body = { color, description, title };
        const updatedTag = await Tag.findByIdAndUpdate(id, {
            color,
            description,
            title
        });
        return res.json({
            message: 'Tag actualizado',
            body
        });
    }
    catch (error) {
        console.log(" ****************** Error en updateTag ==>", error);
        return res.status(500).send("Ocurrio un problema al editar el tag");
    }
};

exports.getTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findById(id);
        return res.json(tag);
    }
    catch (error) {
        console.log(" ****************** Error en getTag ==>", error);
        return res.status(500).send("Ocurrio un problema al crear el tag");
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByIdAndRemove(id);
        return res.json({ message: `Tag "${tag.description}" eliminado` });
    }
    catch (error) {
        console.log(" ****************** Error en deleteTag ==>", error);
        return res.status(500).send("Ocurrio un problema al eliminar el tag");
    }
};
