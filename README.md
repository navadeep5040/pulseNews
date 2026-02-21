# ⚡ PulseNews — Modern News Publishing Platform

A full-stack news publishing platform built with the **MERN stack** (MongoDB, Express, React, Node.js). PulseNews enables admins to publish and manage articles while providing readers with a beautiful, interactive experience to discover, read, bookmark, and discuss news.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

---

## 📋 Features

### 👤 User Features
- **Browse News Feed** — Filter articles by category and search by keywords
- **Article Detail View** — Read full articles with clean typography
- **Bookmark Articles** — Save favorite articles for later reading
- **Comments** — Engage in discussions on articles
- **Share Articles** — Copy article links to clipboard
- **User Profile** — View account details and reading stats

### 📊 Admin Features
- **Publish Articles** — Create news articles with title, content, and category
- **Edit & Delete** — Manage only your own published articles
- **Category Management** — Organize articles by categories (Technology, Sports, Politics, etc.)

### 🔐 Authentication & Security
- **JWT Authentication** — Secure token-based login system
- **Role-Based Access Control** — Separate admin and user roles
- **Password Hashing** — bcrypt encryption for stored passwords
- **Article Ownership** — Admins can only edit/delete their own articles

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | UI Components |
| **Build Tool** | Vite | Fast development & bundling |
| **Routing** | React Router DOM | Client-side navigation |
| **Animations** | Framer Motion | Smooth transitions & effects |
| **HTTP Client** | Axios | API communication |
| **Notifications** | React Hot Toast | User feedback toasts |
| **Backend** | Node.js + Express | REST API server |
| **Database** | MongoDB + Mongoose | Data storage & ODM |
| **Auth** | JWT + bcryptjs | Authentication & encryption |

---

## 📁 Project Structure

```
pep-individual-project/
├── news-backend/
│   ├── controllers/
│   │   ├── authController.js      # Login & Registration
│   │   ├── newsController.js      # CRUD for articles
│   │   ├── commentController.js   # Comment operations
│   │   └── bookmarkController.js  # Bookmark operations
│   ├── models/
│   │   ├── user.js                # User schema
│   │   ├── news.js                # News article schema
│   │   ├── comment.js             # Comment schema
│   │   └── bookmark.js            # Bookmark schema
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   ├── news.js                # News routes
│   │   ├── comments.js            # Comment routes
│   │   └── bookmarks.js           # Bookmark routes
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification & role checks
│   └── server.js                  # Express app entry point
│
├── news-frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx    # Public home page
│   │   │   ├── About.tsx          # About PulseNews
│   │   │   ├── login.tsx          # User login
│   │   │   ├── signup.tsx         # User registration
│   │   │   ├── UserDashboard.tsx  # News feed for readers
│   │   │   ├── AdminDashboard.tsx # Article management for admins
│   │   │   ├── ArticleDetail.tsx  # Full article with comments
│   │   │   ├── Profile.tsx        # User profile page
│   │   │   └── Bookmarks.tsx      # Saved articles
│   │   ├── components/
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   └── ProtectedRoute.tsx # Route guard
│   │   ├── context/
│   │   │   └── AuthContext.tsx     # Auth state management
│   │   └── services/
│   │       └── api.ts             # Axios instance with JWT interceptor
│   └── index.html
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Atlas or local instance)
- **npm** (comes with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/navadeep5040/pulseNews.git
cd pulseNews
```

### 2. Setup Backend
```bash
cd news-backend
npm install
```

Create a `.env` file in the `news-backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

Start the backend server:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd news-frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5174/`

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### News Articles
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/news` | Public | Get all articles |
| GET | `/api/news/:id` | Public | Get single article |
| POST | `/api/news` | Admin | Create article |
| PUT | `/api/news/:id` | Admin (Owner) | Update own article |
| DELETE | `/api/news/:id` | Admin (Owner) | Delete own article |

### Comments
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/comments/:newsId` | Public | Get comments for article |
| POST | `/api/comments/:newsId` | Authenticated | Add comment |
| DELETE | `/api/comments/delete/:id` | Owner/Admin | Delete comment |

### Bookmarks
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/bookmarks` | Authenticated | Get user's bookmarks |
| POST | `/api/bookmarks/:newsId` | Authenticated | Toggle bookmark |
| GET | `/api/bookmarks/check/:newsId` | Authenticated | Check bookmark status |

---

## 📸 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero section, trending articles, features |
| Login | `/login` | User authentication |
| Signup | `/signup` | User registration |
| About | `/about` | Platform info and tech stack |
| News Feed | `/dashboard` | Browse and search articles |
| Admin Dashboard | `/admin` | Publish and manage articles |
| Article Detail | `/article/:id` | Full article with comments |
| Profile | `/profile` | User account details and stats |
| Bookmarks | `/bookmarks` | Saved articles collection |

---

## 👨‍💻 Author

**Navadeep** — [GitHub](https://github.com/navadeep5040)

---

## 📄 License

This project is created for educational purposes as part of an individual project.
