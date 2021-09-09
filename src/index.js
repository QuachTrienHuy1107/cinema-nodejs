require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./router");

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

//Using static folder image
app.use("/images", express.static(path.join(__dirname, "\\../public/images")));

//router
app.use("/api", router);

//connectDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is starting at ${PORT}`);
});
