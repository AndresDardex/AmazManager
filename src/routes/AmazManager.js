const express = require("express");
const router = express.Router(); // Manejador de rutas de express
const AmazManagerSchema = require("../models/AmazManager");
const csvtojson = require("csvtojson");
const path = require("path");
// Nuevo AmazManager
router.post("/AmazManager", (req, res) => {
    const AmazManager = new AmazManagerSchema(req.body); // Asegúrate de crear un nuevo documento correctamente
    AmazManager
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
// Consultar todos los AmazManageres (con límite)
router.get("/AmazManager", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // Límite de resultados
        const data = await AmazManagerSchema.find().limit(limit);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;