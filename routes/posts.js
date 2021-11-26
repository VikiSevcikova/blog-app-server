const express = require('express');
const router = express.Router();

const { getAllPosts, deletePost, addNewPost, updatePost } = require('../controllers/posts');
const { protect } = require('../middleware/auth');

router.route("/all").get(protect, getAllPosts);
router.route("/delete/:id").delete(protect, deletePost);
router.route("/add").post(protect, addNewPost);
router.route("/update/:id").put(protect, updatePost);

module.exports = router;