const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const commentRoutes = require("./routes/comments");
const bookmarkRoutes = require("./routes/bookmarks");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection — uses in-memory server for local dev
const connectDB = async () => {
  try {
    // Try Atlas first
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (atlasError) {
    console.log("Atlas connection failed, starting local MongoDB...");
    try {
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log(`MongoDB Connected (In-Memory): ${mongoose.connection.host}`);
    } catch (localError) {
      console.error("MongoDB Error:", localError.message);
      process.exit(1);
    }
  }
};

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
