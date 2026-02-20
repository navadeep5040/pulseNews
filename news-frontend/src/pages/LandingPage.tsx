import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./LandingPage.css";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    category: string;
    author?: { name: string };
    createdAt: string;
}

const LandingPage = () => {
    const [trending, setTrending] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await api.get("/news");
                setTrending(res.data.slice(0, 6));
            } catch {
                // silently handle
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

    const features = [
        { icon: "📰", title: "Real-Time News", desc: "Stay updated with the latest breaking news and stories from around the world." },
        { icon: "🔖", title: "Bookmark Articles", desc: "Save your favorite articles and read them later at your convenience." },
        { icon: "💬", title: "Engage & Comment", desc: "Share your thoughts and join discussions on trending topics." },
        { icon: "🔍", title: "Smart Search", desc: "Find exactly what you're looking for with powerful search and filters." },
        { icon: "📊", title: "Publisher Dashboard", desc: "Admins can publish, edit, and manage articles with ease." },
        { icon: "🛡️", title: "Secure Platform", desc: "Your data is protected with industry-standard encryption." },
    ];

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-shapes">
                    <div className="hero-shape hero-shape-1"></div>
                    <div className="hero-shape hero-shape-2"></div>
                    <div className="hero-shape hero-shape-3"></div>
                </div>
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        ⚡ Powered by PulseNews
                    </motion.span>
                    <h1 className="hero-title">
                        Stay Ahead with
                        <span className="hero-gradient-text"> Real-Time News</span>
                    </h1>
                    <p className="hero-description">
                        Your personalized news platform. Discover, read, bookmark, and engage
                        with stories that matter to you — all in one beautiful experience.
                    </p>
                    <div className="hero-actions">
                        {auth?.user ? (
                            <Link
                                to={auth.user.role === "admin" ? "/admin" : "/dashboard"}
                                className="hero-btn hero-btn-primary"
                            >
                                Go to Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link to="/signup" className="hero-btn hero-btn-primary">
                                    Get Started Free →
                                </Link>
                                <Link to="/login" className="hero-btn hero-btn-secondary">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">1K+</span>
                            <span className="stat-label">Articles</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Readers</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">Categories</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Trending News Section */}
            <section className="trending-section">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-heading">
                        <span className="heading-icon">🔥</span> Trending Now
                    </h2>
                    <p className="section-desc">The latest stories making waves right now</p>
                </motion.div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner large"></div>
                        <p>Loading trending news...</p>
                    </div>
                ) : trending.length === 0 ? (
                    <div className="landing-empty">
                        <span>📭</span>
                        <p>No articles yet. Be the first to publish!</p>
                    </div>
                ) : (
                    <div className="trending-grid">
                        {trending.map((item, i) => (
                            <motion.div
                                key={item._id}
                                className="trending-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -6 }}
                            >
                                <div className="trending-card-top">
                                    <span className="trending-category">{item.category}</span>
                                    <span className="trending-date">{formatDate(item.createdAt)}</span>
                                </div>
                                <h3 className="trending-title">{item.title}</h3>
                                <p className="trending-preview">
                                    {item.content.substring(0, 100)}
                                    {item.content.length > 100 ? "..." : ""}
                                </p>
                                <div className="trending-footer">
                                    <span className="trending-author">
                                        ✍️ {item.author?.name || "Unknown"}
                                    </span>
                                    {auth?.user ? (
                                        <Link to={`/article/${item._id}`} className="trending-read-btn">
                                            Read More →
                                        </Link>
                                    ) : (
                                        <Link to="/login" className="trending-read-btn">
                                            Login to Read →
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="features-section">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-heading">
                        <span className="heading-icon">✨</span> Why PulseNews?
                    </h2>
                    <p className="section-desc">Everything you need in a modern news platform</p>
                </motion.div>
                <div className="features-grid">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            className="feature-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{ y: -4, scale: 1.02 }}
                        >
                            <span className="feature-icon">{feature.icon}</span>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-desc">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <motion.div
                    className="cta-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="cta-title">Ready to Stay Informed?</h2>
                    <p className="cta-desc">
                        Join thousands of readers who trust PulseNews for their daily news.
                    </p>
                    {!auth?.user && (
                        <div className="cta-actions">
                            <Link to="/signup" className="hero-btn hero-btn-primary">
                                Create Free Account →
                            </Link>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="footer-logo">⚡ PulseNews</span>
                        <p className="footer-tagline">Your trusted source for real-time news</p>
                    </div>
                    <div className="footer-links">
                        <Link to="/about">About</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                    <p className="footer-copy">© 2026 PulseNews. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
