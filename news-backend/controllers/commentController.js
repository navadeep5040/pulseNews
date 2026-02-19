const Comment = require("../models/comment");

// @desc    Get comments for a news article
// @route   GET /api/comments/:newsId
// @access  Public
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ newsId: req.params.newsId })
            .populate("author", "name")
            .sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Get comments error:", error);
        res.status(500).json({ message: "Failed to fetch comments: " + error.message });
    }
};

// @desc    Add comment to a news article
// @route   POST /api/comments/:newsId
// @access  Private
const addComment = async (req, res) => {
    if (!req.body.text) {
        return res.status(400).json({ message: "Please add comment text" });
    }

    try {
        const comment = await Comment.create({
            text: req.body.text,
            author: req.user.id,
            newsId: req.params.newsId
        });

        const populated = await comment.populate("author", "name");
        res.status(201).json(populated);
    } catch (error) {
        console.error("Add comment error:", error);
        res.status(500).json({ message: "Failed to add comment: " + error.message });
    }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (own comment or admin)
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Allow deletion only by the comment author or admin
        if (comment.author.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this comment" });
        }

        await comment.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.error("Delete comment error:", error);
        res.status(500).json({ message: "Failed to delete comment: " + error.message });
    }
};

module.exports = {
    getComments,
    addComment,
    deleteComment
};
