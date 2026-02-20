const express = require("express");
const router = express.Router();
const { getNews, createNews, updateNews, deleteNews } = require("../controllers/newsController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.route("/")
  .get(getNews)
  .post(protect, adminOnly, createNews);

router.route("/:id")
  .put(protect, adminOnly, updateNews)
  .delete(protect, adminOnly, deleteNews);

module.exports = router;
