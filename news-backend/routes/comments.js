const express = require("express");
const router = express.Router();
const { getComments, addComment, deleteComment } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:newsId")
    .get(getComments)
    .post(protect, addComment);

router.route("/delete/:id")
    .delete(protect, deleteComment);

module.exports = router;
