const Tag = require("../models/Tag");

exports.getTags = async (req, res) => {
  try {
      const tags = await Tag.find();
      return res.json(tags);
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
          tag
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
