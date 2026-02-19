const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 500
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    newsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
