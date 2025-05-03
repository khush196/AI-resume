const express = require('express');
const { improveText } = require('../controllers/aiController'); // Import controller function

const router = express.Router();

// Define the route for improving text
// POST /api/ai/improve
router.post('/improve', improveText);

// Add other AI-related routes here later
// router.post('/suggest-skills', suggestSkills);
// router.post('/suggest-projects', suggestProjects);

module.exports = router;