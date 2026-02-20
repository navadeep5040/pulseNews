import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import "./Bookmarks.css";

interface BookmarkItem {
    _id: string;
    news: {
        _id: string;
        title: string;
        content: string;
        category: string;
        author?: { name: string };
        createdAt: string;
    };
    createdAt: string;
}

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const fetchBookmarks = async () => {
        setLoading(true);
        try {
            const res = await api.get("/bookmarks");
            setBookmarks(res.data);
        } catch {
            toast.error("Failed to load bookmarks");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveBookmark = async (newsId: string) => {
        try {
            await api.post(`/bookmarks/${newsId}`);
            setBookmarks(bookmarks.filter((b) => b.news._id !== newsId));
            toast.success("Bookmark removed");
        } catch {
            toast.error("Failed to remove bookmark");
        }
    };

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    return (
        <motion.div
            className="bookmarks-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="bookmarks-header">
                <h1 className="bookmarks-title">
                    <span className="title-icon">🔖</span> My Bookmarks
                </h1>
                <p className="bookmarks-subtitle">
                    Your saved articles collection
                    <span className="bookmark-count">{bookmarks.length} saved</span>
                </p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner large"></div>
                    <p>Loading bookmarks...</p>
                </div>
            ) : bookmarks.length === 0 ? (
                <motion.div
                    className="empty-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <span className="empty-icon">📑</span>
                    <h3>No bookmarks yet</h3>
                    <p>Start saving articles from your feed to read later</p>
                    <Link to="/dashboard" className="browse-btn">Browse Articles →</Link>
                </motion.div>
            ) : (
                <motion.div className="bookmarks-grid" layout>
                    <AnimatePresence>
                        {bookmarks.map((bookmark, i) => (
                            <motion.div
                                key={bookmark._id}
                                className="bookmark-card"
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="bookmark-card-top">
                                    <span className="bookmark-category">{bookmark.news.category}</span>
                                    <span className="bookmark-date">
                                        Saved {formatDate(bookmark.createdAt)}
                                    </span>
                                </div>
                                <h3 className="bookmark-card-title">{bookmark.news.title}</h3>
                                <p className="bookmark-preview">
                                    {bookmark.news.content.substring(0, 120)}
                                    {bookmark.news.content.length > 120 ? "..." : ""}
                                </p>
                                <div className="bookmark-card-footer">
                                    <span className="bookmark-author">
                                        ✍️ {bookmark.news.author?.name || "Unknown"}
                                    </span>
                                    <div className="bookmark-actions">
                                        <Link
                                            to={`/article/${bookmark.news._id}`}
                                            className="bookmark-read-btn"
                                        >
                                            Read →
                                        </Link>
                                        <motion.button
                                            className="bookmark-remove-btn"
                                            onClick={() => handleRemoveBookmark(bookmark.news._id)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            ✕
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Bookmarks;
