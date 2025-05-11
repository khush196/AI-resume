const express = require('express');
const { improveText } = require('../controllers/aiController'); // Import controller function

const router = express.Router();

router.post('/improve', improveText);

// Add other AI-related routes here later
// router.post('/suggest-skills', suggestSkills);
// router.post('/suggest-projects', suggestProjects);

module.exports = router;
