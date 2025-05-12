const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config(); // Ensure environment variables are loaded

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Controller function to handle text improvement requests
const improveText = async (req, res) => {
    const { textToImprove, context } = req.body; // Get text and context

    if (!textToImprove) {
        return res.status(400).json({ message: "No text provided to improve." });
    }

    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Construct a specific prompt based on context
        let prompt;
        if (context === 'bulletPoint') {
            prompt = `Rewrite this resume bullet point to be more action-oriented, concise, and ATS-friendly, quantifying results where possible: "${textToImprove}"`;
        } else if (context === 'projectDescription') {
            prompt = `Improve this project description for a resume, making it engaging and highlighting key achievements and technologies used: "${textToImprove}"`;
        } else if (context === 'skillSuggestion') {
             // Example: Suggest skills based on a job title/description
            prompt = `Based on the job title/role "${textToImprove}", suggest 5-7 relevant technical and soft skills for a resume.`;
        } else {
            prompt = `Improve this text for a resume: "${textToImprove}"`; // Generic fallback
        }

        console.log("Sending prompt to Gemini:", prompt); 

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const improvedText = response.text();

        console.log("Received response from Gemini:", improvedText); 

        res.status(200).json({ improvedText: improvedText });

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Provide more specific error feedback if possible
        if (error.message.includes('API key not valid')) {
             res.status(401).json({ message: "Invalid Gemini API Key. Please check your .env file." });
        } else {
             res.status(500).json({ message: "Failed to get suggestion from AI." });
        }
    }
};

module.exports = {
    improveText,
    // Add other controller functions here later (e.g., suggestProjects)
};
