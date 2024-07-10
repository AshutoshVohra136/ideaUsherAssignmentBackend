const express = require("express");

const app = express();
const postRoutes = require("../ideaUsher/routes/post.routes");
const path = require("path");
const multer = require("multer");
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const Post = require("../ideaUsher/models/post.model");
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

try {
  mongoose
    .connect("mongodb://localhost:27017/ideaUsherTestapp")
    .then(() => console.log(`Mongo Db Connected`))
    .catch((err) => console.log(`ERROR`, err));
} catch (error) {
  console.log(`ERROR`, error);
}

app.use("/api", postRoutes);

app.listen(PORT, () => console.log(`Server running`));
