import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/register", { name, email, password, role });
            auth?.login(res.data);
            toast.success(`Welcome aboard, ${res.data.name}! 🚀`);
            navigate(res.data.role === "admin" ? "/admin" : "/dashboard");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.2 + i * 0.1 },
        }),
    };

    return (
        <div className="auth-container">
            <div className="auth-bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="auth-header">
                    <motion.span
                        className="auth-icon"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        🚀
                    </motion.span>
                    <h2 className="auth-title">Join PulseNews</h2>
                    <p className="auth-subtitle">Stay ahead with real-time news</p>
                </div>
                <form onSubmit={handleSignup} className="auth-form">
                    <motion.div className="input-group" custom={0} variants={inputVariants} initial="hidden" animate="visible">
                        <label>Name</label>
                        <div className="input-wrapper">
                            <span className="input-icon">👤</span>
                            <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </motion.div>
                    <motion.div className="input-group" custom={1} variants={inputVariants} initial="hidden" animate="visible">
                        <label>Email</label>
                        <div className="input-wrapper">
                            <span className="input-icon">✉️</span>
                            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </motion.div>
                    <motion.div className="input-group" custom={2} variants={inputVariants} initial="hidden" animate="visible">
                        <label>Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">🔒</span>
                            <input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </motion.div>
                    <motion.div className="input-group" custom={3} variants={inputVariants} initial="hidden" animate="visible">
                        <label>Role</label>
                        <div className="input-wrapper">
                            <span className="input-icon">🎭</span>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="user">Reader</option>
                                <option value="admin">Publisher</option>
                            </select>
                        </div>
                    </motion.div>
                    <motion.button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(99,102,241,0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {loading ? (
                            <span className="btn-loading">
                                <span className="spinner"></span> Creating account...
                            </span>
                        ) : (
                            "Get Started →"
                        )}
                    </motion.button>
                </form>
                <motion.p
                    className="auth-footer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Signup;
