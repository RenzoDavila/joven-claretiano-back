const mongoose = require("mongoose");

const schema = mongoose.Schema({
  codigo: String,
  nombres: String,
  apellidos: String,
  email: String,
  password: String,
  estado: String,
  ver: Boolean,
  crear: Boolean,
  editar: Boolean,
  eliminar: Boolean,
});

module.exports = mongoose.model("User", schema);
