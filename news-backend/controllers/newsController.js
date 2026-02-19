const News = require("../models/news");

// @desc    Get all news
// @route   GET /api/news
// @access  Public
const getNews = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } }
            ];
        }

        const news = await News.find(query).populate("author", "name").sort({ createdAt: -1 });
        res.status(200).json(news);
    } catch (error) {
        console.error("Get news error:", error);
        res.status(500).json({ message: "Failed to fetch news: " + error.message });
    }
};

// @desc    Create news
// @route   POST /api/news
// @access  Private/Admin
const createNews = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: "Please add a title and content" });
    }

    try {
        const news = await News.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: req.user.id,
        });
        res.status(201).json(news);
    } catch (error) {
        console.error("Create news error:", error);
        res.status(500).json({ message: "Failed to create news: " + error.message });
    }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private/Admin (own articles only)
const updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }

        // Only the author can update their own article
        if (news.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to edit this article" });
        }

        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedNews);
    } catch (error) {
        console.error("Update news error:", error);
        res.status(500).json({ message: "Failed to update news: " + error.message });
    }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private/Admin (own articles only)
const deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }

        // Only the author can delete their own article
        if (news.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this article" });
        }

        await news.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error("Delete news error:", error);
        res.status(500).json({ message: "Failed to delete news: " + error.message });
    }
};

// @desc    Get single news by ID
// @route   GET /api/news/:id
// @access  Public
const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id).populate("author", "name");
        if (!news) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json(news);
    } catch (error) {
        console.error("Get news by id error:", error);
        res.status(500).json({ message: "Failed to fetch article: " + error.message });
    }
};

module.exports = {
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
};
