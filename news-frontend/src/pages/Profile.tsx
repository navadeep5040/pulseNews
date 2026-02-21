import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "./Profile.css";

const Profile = () => {
    const auth = useContext(AuthContext);
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [articleCount, setArticleCount] = useState(0);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [bookmarkRes, newsRes] = await Promise.all([
                api.get("/bookmarks"),
                api.get("/news"),
            ]);
            setBookmarkCount(bookmarkRes.data.length);
            setArticleCount(newsRes.data.length);
        } catch {
            // silently handle
        }
    };

    if (!auth?.user) return null;

    const joinDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <motion.div
            className="profile-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <div className="profile-header-section">
                <motion.div
                    className="profile-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="profile-avatar-large">
                        {auth.user.name.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="profile-name">{auth.user.name}</h1>
                    <p className="profile-email">{auth.user.email}</p>
                    <span className="profile-role-badge">
                        {auth.user.role === "admin" ? "📊 Publisher" : "📰 Reader"}
                    </span>
                    <p className="profile-joined">Member since {joinDate}</p>
                </motion.div>
            </div>

            {/* Stats */}
            <div className="profile-stats-grid">
                <motion.div
                    className="profile-stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="stat-icon">📰</span>
                    <span className="stat-value">{articleCount}</span>
                    <span className="stat-name">Available Articles</span>
                </motion.div>
                <motion.div
                    className="profile-stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <span className="stat-icon">🔖</span>
                    <span className="stat-value">{bookmarkCount}</span>
                    <span className="stat-name">Bookmarks</span>
                </motion.div>
                <motion.div
                    className="profile-stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="stat-icon">🛡️</span>
                    <span className="stat-value capitalize">{auth.user.role}</span>
                    <span className="stat-name">Account Role</span>
                </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
                className="profile-quick-links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <h2 className="quick-links-title">⚡ Quick Links</h2>
                <div className="quick-links-grid">
                    <Link to="/dashboard" className="quick-link-card">
                        <span className="quick-link-icon">📰</span>
                        <span className="quick-link-text">News Feed</span>
                        <span className="quick-link-arrow">→</span>
                    </Link>
                    <Link to="/bookmarks" className="quick-link-card">
                        <span className="quick-link-icon">🔖</span>
                        <span className="quick-link-text">My Bookmarks</span>
                        <span className="quick-link-arrow">→</span>
                    </Link>
                    {auth.user.role === "admin" && (
                        <Link to="/admin" className="quick-link-card">
                            <span className="quick-link-icon">📊</span>
                            <span className="quick-link-text">Publisher Dashboard</span>
                            <span className="quick-link-arrow">→</span>
                        </Link>
                    )}
                    <Link to="/about" className="quick-link-card">
                        <span className="quick-link-icon">ℹ️</span>
                        <span className="quick-link-text">About PulseNews</span>
                        <span className="quick-link-arrow">→</span>
                    </Link>
                </div>
            </motion.div>

            {/* Account Info */}
            <motion.div
                className="profile-account-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <h2 className="account-info-title">📋 Account Details</h2>
                <div className="account-info-grid">
                    <div className="info-item">
                        <span className="info-label">Full Name</span>
                        <span className="info-value">{auth.user.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Email Address</span>
                        <span className="info-value">{auth.user.email}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Account Type</span>
                        <span className="info-value capitalize">{auth.user.role}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Account ID</span>
                        <span className="info-value mono">{auth.user._id}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;
