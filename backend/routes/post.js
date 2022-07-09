const express = require("express");
const { createPost, getAllPost } = require("../controllers/post");
1;
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPost", authUser, getAllPost);

module.exports = router;
