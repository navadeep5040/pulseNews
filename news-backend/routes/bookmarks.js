const express = require("express");
const router = express.Router();
const { toggleBookmark, getBookmarks, checkBookmark } = require("../controllers/bookmarkController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
    .get(protect, getBookmarks);

router.route("/check/:newsId")
    .get(protect, checkBookmark);

router.route("/:newsId")
    .post(protect, toggleBookmark);

module.exports = router;
