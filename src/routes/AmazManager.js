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
router.delete("/AmazManager/deleteAll", async (req, res) => {
    try {
        // Eliminar todos los documentos de la colección
        const result = await AmazManagerSchema.deleteMany({}); // No se pasa ningún filtro para eliminar todos
        res.status(200).json({ message: "Todos los datos han sido eliminados", result });
    } catch (error) {
        console.error("Error al eliminar los datos:", error);
        res.status(500).json({ message: "Error al eliminar los datos", error: error.message });
    }
});
router.get("/AmazManager/:id", (req, res) => {
    const { id } = req.params;
    AmazManagerSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
router.put("/AmazManager/:id", (req, res) => {
    const { id } = req.params;
    const { product_id, product_name, category, discounted_price, actual_price, discount_percentage, rating, rating_count, about_product, user_id, user_name, review_id, review_title, review_content, img_link, product_link } = req.body;
    AmazManagerSchema
        .updateOne({ _id: id }, {
            $set: { product_id, product_name, category, discounted_price, actual_price, discount_percentage, rating, rating_count, about_product, user_id, user_name, review_id, review_title, review_content, img_link, product_link }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
router.delete("/AmazManager/:id", (req, res) => {
    const { id } = req.params;
    AmazManagerSchema
        .findByIdAndDelete(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
router.post("/AmazManager/importCSV", async (req, res) => {
    try {
        // Ruta del archivo CSV
        const filePath = path.join(__dirname, "../amazon.csv");
        console.log("Ruta del archivo CSV:", filePath);
        
        // Leer el archivo CSV y convertirlo en JSON
        const jsonArray = await csvtojson().fromFile(filePath);
        
        // Convertir todos los valores a string
        const dataAsStrings = jsonArray.map(item => {
            const cleanedItem = {};
            Object.keys(item).forEach(key => {
                cleanedItem[key] = String(item[key]).trim(); // Convertir a string
            });
            return cleanedItem;
        });
        console.log("Datos leídos del archivo:", dataAsStrings);
        // Insertar los datos convertidos a string en la base de datos
        const result = await AmazManagerSchema.insertMany(dataAsStrings); // Cambié AmazManager por AmazManagerSchema
        res.status(200).json({ message: "Datos insertados exitosamente" });
    } catch (error) {
        console.error("Error al procesar el archivo:", error);
        res.status(500).json({ message: "Error al insertar los datos", error: error.message });
    }
});
module.exports = router;