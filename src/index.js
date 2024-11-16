const express = require('express');
const app = express();
const port = 3000;
const AmazManagerRoutes = require("./routes/AmazManager");
const mongoose = require("mongoose");

require('dotenv').config();

app.use(express.json()); 

app.use("/api", AmazManagerRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
