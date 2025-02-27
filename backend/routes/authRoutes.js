const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables explicitly
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

// Middleware
app.use(express.json());  // Allows JSON body parsing
app.use(cors());          // Enables Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB..."))
    .catch(err => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });

// Import authentication routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);  // Authentication routes

// Test route
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}...`);
});
