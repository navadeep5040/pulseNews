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
        res.status(500).json({ message: "Server Error" });
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
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private/Admin
const updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }

        // Check user (optional, but good practice if multiple admins or strict ownership)
        // For this requirement, any admin can update

        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private/Admin
const deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);

        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }

        await news.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getNews,
    createNews,
    updateNews,
    deleteNews,
};
