const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const aiRoutes = require('./routes/aiRoutes'); // Import the AI routes

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust for production later)
app.use(express.json()); // Allow the server to accept JSON data in request bodies

// --- API Routes ---
app.use('/api/ai', aiRoutes); // Mount the AI routes under /api/ai path

// --- Basic Route for Testing ---
app.get('/', (req, res) => {
    res.send('AI Resume Builder Backend is running!');
});

// --- Start the Server ---
const PORT = process.env.PORT || 5001; // Use port from .env or default to 5001

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    if (!process.env.GEMINI_API_KEY) {
        console.warn("WARNING: GEMINI_API_KEY is not set in the .env file. AI features will not work.");
    }
});