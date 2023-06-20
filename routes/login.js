// Rutas de login

const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

//api/preductos
router.post("/", loginController.login);

module.exports = router;
