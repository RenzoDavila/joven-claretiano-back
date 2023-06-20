const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");
const path = require('path');

//creamos el servidor

const app = express();

//Conectamos con la DB

conectarDB();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({mensaje: 'Esta es la API del joven claretiano'})
});
app.use("/api/tags", require("./routes/tag"));
app.use("/api/blogs", require("./routes/blog"));
app.use("/api/users", require("./routes/user"));
app.use("/api/login", require("./routes/login"));
app.use('/uploads', express.static(path.resolve('uploads')));

app.listen(4000, () => {
  console.log("Corriendo en 4000");
});
