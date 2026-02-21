import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";
import "./Dashboard.css";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    category: string;
    author?: { name: string };
    createdAt: string;
}

const UserDashboard = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await api.get("/news");
            setNews(res.data);
        } catch {
            // handle silently
        } finally {
            setLoading(false);
        }
    };

    const filtered = news.filter((n) => {
        const matchSearch =
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.content.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category ? n.category === category : true;
        return matchSearch && matchCategory;
    });

    const categories = [...new Set(news.map((n) => n.category))];

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });


    return (
        <motion.div
            className="dashboard-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="dashboard-header">
                <div className="header-text">
                    <h1 className="dashboard-title">
                        <span className="title-icon">📰</span> Your News Feed
                    </h1>
                    <p className="dashboard-subtitle">
                        Stay informed with the latest stories
                        <span className="article-count">{filtered.length} articles</span>
                    </p>
                </div>
            </div>

            <div className="filter-bar">
                <div className="search-wrapper">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                    {search && (
                        <button className="clear-search" onClick={() => setSearch("")}>✕</button>
                    )}
                </div>
                <div className="category-chips">
                    <motion.button
                        className={`chip ${category === "" ? "active" : ""}`}
                        onClick={() => setCategory("")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        All
                    </motion.button>
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            className={`chip ${category === cat ? "active" : ""}`}
                            onClick={() => setCategory(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner large"></div>
                    <p>Loading articles...</p>
                </div>
            ) : filtered.length === 0 ? (
                <motion.div
                    className="empty-state"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <span className="empty-icon">📭</span>
                    <h3>No articles found</h3>
                    <p>Try a different search or check back later</p>
                </motion.div>
            ) : (
                <motion.div className="news-grid" layout>
                    {filtered.map((item, i) => (
                        <motion.div
                            key={item._id}
                            className="news-card"
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="card-top">
                                <span className="card-category">{item.category}</span>
                                <span className="card-date">{formatDate(item.createdAt)}</span>
                            </div>
                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-content">
                                {item.content.substring(0, 120)}
                                {item.content.length > 120 ? "..." : ""}
                            </p>
                            <div className="card-footer">
                                <span className="card-author">
                                    ✍️ {item.author?.name || "Unknown"}
                                </span>
                                <Link to={`/article/${item._id}`} className="read-more-hint">
                                    Read Full Article →
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default UserDashboard;
