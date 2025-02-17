const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);


const app = express();

// Middleware
app.use(express.json()); // Allows JSON body parsing
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ Connected to MongoDB..."))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Import routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes); // Authentication routes

// Test route
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}...`);
});
