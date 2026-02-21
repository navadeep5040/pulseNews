import { useEffect, useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./Dashboard.css";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    category: string;
    author?: { _id: string; name: string };
}

const AdminDashboard = () => {
    const auth = useContext(AuthContext);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setFetching(true);
        try {
            const res = await api.get("/news");
            // Only show articles authored by the current admin
            const myArticles = res.data.filter(
                (item: NewsItem) => item.author?._id === auth?.user?._id
            );
            setNews(myArticles);
        } catch {
            toast.error("Failed to load articles");
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                await api.put(`/news/${editId}`, { title, content, category });
                toast.success("Article updated! ✏️");
            } else {
                await api.post("/news", { title, content, category });
                toast.success("Article published! 🚀");
            }
            setTitle("");
            setContent("");
            setCategory("");
            setEditId(null);
            fetchNews();
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Operation failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: NewsItem) => {
        setTitle(item.title);
        setContent(item.content);
        setCategory(item.category);
        setEditId(item._id);
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/news/${id}`);
            toast.success("Article deleted 🗑️");
            setDeleteConfirm(null);
            fetchNews();
        } catch {
            toast.error("Delete failed");
        }
    };

    const cancelEdit = () => {
        setTitle("");
        setContent("");
        setCategory("");
        setEditId(null);
    };

    return (
        <motion.div
            className="dashboard-container admin-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="dashboard-header">
                <div className="header-text">
                    <h1 className="dashboard-title">
                        <span className="title-icon">📊</span> Publisher Dashboard
                    </h1>
                    <p className="dashboard-subtitle">
                        Manage your content
                        <span className="article-count">{news.length} published</span>
                    </p>
                </div>
            </div>

            <div className="admin-grid">
                {/* Form Section */}
                <motion.div
                    ref={formRef}
                    className="admin-form-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="form-title">
                        {editId ? "✏️ Edit Article" : "📝 New Article"}
                    </h2>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="input-group">
                            <label>Title</label>
                            <input
                                type="text"
                                placeholder="Article headline..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Content</label>
                            <textarea
                                placeholder="Write your article content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                required
                            ></textarea>
                            <span className="char-count">{content.length} characters</span>
                        </div>
                        <div className="input-group">
                            <label>Category</label>
                            <input
                                type="text"
                                placeholder="e.g. Technology, Sports, Politics"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <motion.button
                                type="submit"
                                className={`btn-primary ${editId ? "editing" : ""}`}
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? (
                                    <span className="btn-loading">
                                        <span className="spinner"></span>
                                        {editId ? "Updating..." : "Publishing..."}
                                    </span>
                                ) : editId ? (
                                    "Update Article"
                                ) : (
                                    "Publish Article 🚀"
                                )}
                            </motion.button>
                            {editId && (
                                <motion.button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={cancelEdit}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                            )}
                        </div>
                    </form>
                </motion.div>

                {/* Articles List */}
                <div className="admin-articles">
                    <h2 className="section-title">📋 Published Articles</h2>
                    {fetching ? (
                        <div className="loading-state">
                            <div className="spinner large"></div>
                            <p>Loading articles...</p>
                        </div>
                    ) : news.length === 0 ? (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <span className="empty-icon">✍️</span>
                            <h3>No articles yet</h3>
                            <p>Create your first article using the form</p>
                        </motion.div>
                    ) : (
                        <motion.div className="articles-list" layout>
                            <AnimatePresence>
                                {news.map((item, i) => (
                                    <motion.div
                                        key={item._id}
                                        className="article-item"
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -30, height: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className="article-info">
                                            <h4 className="article-title">{item.title}</h4>
                                            <div className="article-meta">
                                                <span className="article-category">{item.category}</span>
                                                <span className="article-preview">
                                                    {item.content.substring(0, 80)}...
                                                </span>
                                            </div>
                                        </div>
                                        <div className="article-actions">
                                            {deleteConfirm === item._id ? (
                                                <div className="confirm-delete">
                                                    <span>Delete?</span>
                                                    <motion.button
                                                        className="btn-confirm-yes"
                                                        onClick={() => handleDelete(item._id)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        Yes
                                                    </motion.button>
                                                    <motion.button
                                                        className="btn-confirm-no"
                                                        onClick={() => setDeleteConfirm(null)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        No
                                                    </motion.button>
                                                </div>
                                            ) : (
                                                <>
                                                    <motion.button
                                                        className="btn-edit"
                                                        onClick={() => handleEdit(item)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        ✏️
                                                    </motion.button>
                                                    <motion.button
                                                        className="btn-delete"
                                                        onClick={() => setDeleteConfirm(item._id)}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        🗑️
                                                    </motion.button>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
