const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    news: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
        required: true
    }
}, { timestamps: true });

// Prevent duplicate bookmarks
bookmarkSchema.index({ user: 1, news: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
