const express = require("express");
const cors = require("cors");
require("dotenv").config();
import initRoutes from "./src/routes/index.js";

const app = express();
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`)
})

