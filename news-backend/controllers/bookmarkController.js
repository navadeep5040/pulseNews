const Bookmark = require("../models/bookmark");

// @desc    Toggle bookmark on/off for a news article
// @route   POST /api/bookmarks/:newsId
// @access  Private
const toggleBookmark = async (req, res) => {
    try {
        const existing = await Bookmark.findOne({
            user: req.user.id,
            news: req.params.newsId
        });

        if (existing) {
            await existing.deleteOne();
            res.status(200).json({ bookmarked: false, message: "Bookmark removed" });
        } else {
            await Bookmark.create({
                user: req.user.id,
                news: req.params.newsId
            });
            res.status(201).json({ bookmarked: true, message: "Article bookmarked" });
        }
    } catch (error) {
        console.error("Toggle bookmark error:", error);
        res.status(500).json({ message: "Failed to toggle bookmark: " + error.message });
    }
};

// @desc    Get all bookmarks for logged-in user
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user.id })
            .populate({
                path: "news",
                populate: { path: "author", select: "name" }
            })
            .sort({ createdAt: -1 });
        res.status(200).json(bookmarks);
    } catch (error) {
        console.error("Get bookmarks error:", error);
        res.status(500).json({ message: "Failed to fetch bookmarks: " + error.message });
    }
};

// @desc    Check if an article is bookmarked
// @route   GET /api/bookmarks/check/:newsId
// @access  Private
const checkBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findOne({
            user: req.user.id,
            news: req.params.newsId
        });
        res.status(200).json({ bookmarked: !!bookmark });
    } catch (error) {
        console.error("Check bookmark error:", error);
        res.status(500).json({ message: "Failed to check bookmark: " + error.message });
    }
};

module.exports = {
    toggleBookmark,
    getBookmarks,
    checkBookmark
};
