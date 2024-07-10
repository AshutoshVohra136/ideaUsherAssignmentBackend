const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const Post = require("../models/post.model");
const Tag = require("../models/tag.model");

router.get("/post", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;

    const limit = parseInt(req.query.limit) || 10;

    const search = req.query.search || "";

    const allPost = await Post.find({})
      .where("tags")

      .skip(page * limit)
      .limit(limit);

    const total = await Post.countDocuments();

    res.status(200).json({
      message: "Success",
      TotalPages: total,
      page: page + 1,
      limit: limit,
      Posts: allPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

//  Api for Adding Post with Filteration and Pagination.

router.post("/addPost", upload.single("imageURL"), async (req, res) => {
  let tagobject = await new Tag({
    name: req.body.tags,
  });

  const postobject = new Post({
    title: req.body.title,
    description: req.body.description,
    imageURL: `/uploads/${req.file.filename}`,
    tags: tagobject,
  });

  postobject.save();

  console.log(postobject);
  res.json({ status: "SUCCESS" });
});

module.exports = router;
