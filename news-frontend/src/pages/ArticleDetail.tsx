import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./ArticleDetail.css";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    category: string;
    author?: { name: string };
    createdAt: string;
}

interface Comment {
    _id: string;
    text: string;
    author: { _id: string; name: string };
    createdAt: string;
}

const ArticleDetail = () => {
    const { id } = useParams<{ id: string }>();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [article, setArticle] = useState<NewsItem | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState("");
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [commenting, setCommenting] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (id) {
            fetchArticle();
            fetchComments();
            checkBookmarkStatus();
        }
    }, [id]);

    const fetchArticle = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/news/${id}`);
            setArticle(res.data);
        } catch {
            toast.error("Article not found");
            navigate("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const res = await api.get(`/comments/${id}`);
            setComments(res.data);
        } catch {
            // silently handle
        }
    };

    const checkBookmarkStatus = async () => {
        try {
            const res = await api.get(`/bookmarks/check/${id}`);
            setBookmarked(res.data.bookmarked);
        } catch {
            // not logged in or error
        }
    };

    const handleToggleBookmark = async () => {
        try {
            const res = await api.post(`/bookmarks/${id}`);
            setBookmarked(res.data.bookmarked);
            toast.success(res.data.bookmarked ? "Article bookmarked! 🔖" : "Bookmark removed");
        } catch {
            toast.error("Failed to bookmark");
        }
    };

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        setCommenting(true);
        try {
            const res = await api.post(`/comments/${id}`, { text: commentText });
            setComments([res.data, ...comments]);
            setCommentText("");
            toast.success("Comment added! 💬");
        } catch {
            toast.error("Failed to add comment");
        } finally {
            setCommenting(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await api.delete(`/comments/delete/${commentId}`);
            setComments(comments.filter((c) => c._id !== commentId));
            toast.success("Comment deleted");
        } catch {
            toast.error("Failed to delete comment");
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link copied! 📋");
        setTimeout(() => setCopied(false), 2000);
    };

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });

    const formatCommentDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    if (loading) {
        return (
            <div className="article-detail-container">
                <div className="loading-state">
                    <div className="spinner large"></div>
                    <p>Loading article...</p>
                </div>
            </div>
        );
    }

    if (!article) return null;

    return (
        <motion.div
            className="article-detail-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="article-detail-nav">
                <Link to="/dashboard" className="back-link">← Back to Feed</Link>
            </div>

            {/* Article Content */}
            <motion.article
                className="article-detail-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="article-detail-header">
                    <span className="article-detail-category">{article.category}</span>
                    <span className="article-detail-date">{formatDate(article.createdAt)}</span>
                </div>
                <h1 className="article-detail-title">{article.title}</h1>
                <div className="article-detail-author">
                    <span className="author-avatar">
                        {article.author?.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                    <div>
                        <span className="author-name">{article.author?.name || "Unknown"}</span>
                        <span className="author-role">Author</span>
                    </div>
                </div>
                <div className="article-detail-body">
                    {article.content.split("\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="article-actions-bar">
                    <motion.button
                        className={`action-btn ${bookmarked ? "bookmarked" : ""}`}
                        onClick={handleToggleBookmark}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {bookmarked ? "🔖 Bookmarked" : "📑 Bookmark"}
                    </motion.button>
                    <motion.button
                        className={`action-btn ${copied ? "copied" : ""}`}
                        onClick={handleCopyLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {copied ? "✅ Copied!" : "🔗 Copy Link"}
                    </motion.button>
                </div>
            </motion.article>

            {/* Comments Section */}
            <motion.div
                className="comments-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="comments-title">
                    💬 Comments <span className="comments-count">{comments.length}</span>
                </h2>

                {/* Add Comment Form */}
                {auth?.user && (
                    <form onSubmit={handleAddComment} className="comment-form">
                        <div className="comment-input-wrapper">
                            <span className="comment-user-avatar">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </span>
                            <textarea
                                placeholder="Share your thoughts..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                rows={3}
                                maxLength={500}
                                required
                            />
                        </div>
                        <div className="comment-form-actions">
                            <span className="char-remaining">{500 - commentText.length} chars left</span>
                            <motion.button
                                type="submit"
                                className="comment-submit-btn"
                                disabled={commenting || !commentText.trim()}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {commenting ? "Posting..." : "Post Comment"}
                            </motion.button>
                        </div>
                    </form>
                )}

                {/* Comments List */}
                <div className="comments-list">
                    <AnimatePresence>
                        {comments.length === 0 ? (
                            <div className="no-comments">
                                <span>🤫</span>
                                <p>No comments yet. Be the first to share your thoughts!</p>
                            </div>
                        ) : (
                            comments.map((comment, i) => (
                                <motion.div
                                    key={comment._id}
                                    className="comment-item"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <div className="comment-header">
                                        <span className="comment-avatar">
                                            {comment.author?.name?.charAt(0).toUpperCase() || "?"}
                                        </span>
                                        <div className="comment-meta">
                                            <span className="comment-author-name">
                                                {comment.author?.name || "Unknown"}
                                            </span>
                                            <span className="comment-date">
                                                {formatCommentDate(comment.createdAt)}
                                            </span>
                                        </div>
                                        {(auth?.user?._id === comment.author?._id ||
                                            auth?.user?.role === "admin") && (
                                                <motion.button
                                                    className="comment-delete-btn"
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    🗑️
                                                </motion.button>
                                            )}
                                    </div>
                                    <p className="comment-text">{comment.text}</p>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ArticleDetail;
