import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
    const features = [
        { icon: "📰", title: "News Publishing", desc: "Admins can publish, edit, and delete articles with a rich editor and category support." },
        { icon: "🔍", title: "Search & Filter", desc: "Powerful search across all articles with category-based filtering for quick discovery." },
        { icon: "🔖", title: "Bookmarks", desc: "Save articles you love and access them anytime from your bookmarks collection." },
        { icon: "💬", title: "Comments", desc: "Engage in discussions by commenting on articles and sharing your perspectives." },
        { icon: "🔐", title: "Authentication", desc: "Secure JWT-based login system with role-based access control for admins and users." },
        { icon: "📱", title: "Responsive Design", desc: "Seamless experience across all devices — desktop, tablet, and mobile." },
    ];

    const techStack = [
        { name: "React", icon: "⚛️", desc: "Frontend UI Library" },
        { name: "Node.js", icon: "🟢", desc: "Backend Runtime" },
        { name: "Express", icon: "🚂", desc: "API Framework" },
        { name: "MongoDB", icon: "🍃", desc: "NoSQL Database" },
        { name: "TypeScript", icon: "📘", desc: "Type Safety" },
        { name: "JWT", icon: "🔑", desc: "Authentication" },
    ];

    return (
        <motion.div
            className="about-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-bg">
                    <div className="about-shape about-shape-1"></div>
                    <div className="about-shape about-shape-2"></div>
                </div>
                <motion.div
                    className="about-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="about-badge">ℹ️ About Us</span>
                    <h1 className="about-title">
                        About <span className="about-gradient">PulseNews</span>
                    </h1>
                    <p className="about-description">
                        PulseNews is a modern, full-stack news publishing platform built with the MERN stack.
                        It enables admins to publish and manage articles while providing readers with a beautiful,
                        interactive experience to discover, read, bookmark, and discuss news.
                    </p>
                </motion.div>
            </section>

            {/* Mission */}
            <section className="about-section">
                <motion.div
                    className="mission-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="about-section-title">🎯 Our Mission</h2>
                    <p className="mission-text">
                        To provide a clean, fast, and engaging platform where publishers can share stories
                        and readers can stay informed with the latest news. We believe in the power of
                        accessible, well-designed information.
                    </p>
                </motion.div>
            </section>

            {/* Features */}
            <section className="about-section">
                <h2 className="about-section-title centered">✨ Platform Features</h2>
                <div className="about-features-grid">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            className="about-feature-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <span className="about-feature-icon">{feature.icon}</span>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Tech Stack */}
            <section className="about-section">
                <h2 className="about-section-title centered">🛠️ Technology Stack</h2>
                <div className="tech-grid">
                    {techStack.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            className="tech-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                        >
                            <span className="tech-icon">{tech.icon}</span>
                            <h4 className="tech-name">{tech.name}</h4>
                            <p className="tech-desc">{tech.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact / CTA */}
            <section className="about-section">
                <motion.div
                    className="about-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="about-section-title">📬 Get In Touch</h2>
                    <p className="about-cta-text">
                        Have questions or feedback? We'd love to hear from you.
                    </p>
                    <div className="about-contact-info">
                        <div className="contact-item">
                            <span>✉️</span>
                            <span>contact@pulsenews.com</span>
                        </div>
                        <div className="contact-item">
                            <span>🌐</span>
                            <span>www.pulsenews.com</span>
                        </div>
                    </div>
                    <Link to="/" className="about-home-btn">
                        ← Back to Home
                    </Link>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default About;
