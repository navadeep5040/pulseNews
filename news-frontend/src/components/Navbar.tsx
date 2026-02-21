import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        auth?.logout();
        navigate("/login");
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -72 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">Pulse</span>
                    <span className="logo-accent">News</span>
                </Link>
                <ul className="nav-menu">
                    {auth?.user ? (
                        <>
                            <li className="nav-item">
                                <span className="nav-greeting">
                                    Welcome, <strong>{auth.user.name}</strong>
                                    <span className="role-badge">{auth.user.role}</span>
                                </span>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className={`nav-link ${isActive("/") ? "active" : ""}`}
                                >
                                    🏠 Home
                                </Link>
                            </li>
                            {auth.user.role === "admin" && (
                                <li className="nav-item">
                                    <Link
                                        to="/admin"
                                        className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                                    >
                                        📊 Dashboard
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link
                                    to="/dashboard"
                                    className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                                >
                                    📰 Feed
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/bookmarks"
                                    className={`nav-link ${isActive("/bookmarks") ? "active" : ""}`}
                                >
                                    🔖 Bookmarks
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/profile"
                                    className={`nav-link ${isActive("/profile") ? "active" : ""}`}
                                >
                                    👤 Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/about"
                                    className={`nav-link ${isActive("/about") ? "active" : ""}`}
                                >
                                    ℹ️ About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <motion.button
                                    onClick={handleLogout}
                                    className="btn-logout"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Logout
                                </motion.button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className={`nav-link ${isActive("/") ? "active" : ""}`}
                                >
                                    🏠 Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/about"
                                    className={`nav-link ${isActive("/about") ? "active" : ""}`}
                                >
                                    ℹ️ About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to="/login"
                                    className={`nav-link ${isActive("/login") ? "active" : ""}`}
                                >
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link nav-signup-btn">
                                    Get Started
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </motion.nav>
    );
};

export default Navbar;
