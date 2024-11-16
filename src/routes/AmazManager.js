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
module.exports = router;