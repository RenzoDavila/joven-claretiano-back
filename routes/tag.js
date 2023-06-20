// Rutas de tag

const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController");

//api/preductos
router.post("/", tagController.createTag);
router.get("/", tagController.getTags);
router.put("/:id", tagController.updateTag);
router.get("/:id", tagController.getTag);
router.delete("/:id", tagController.deleteTag);

module.exports = router;
