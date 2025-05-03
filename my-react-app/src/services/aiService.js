// client/src/services/aiService.js

// Define the base URL for your backend API
// In development, this is typically http://localhost:PORT
// In production, this will be your deployed backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001'; // Use environment variable or default

/**
 * Calls the backend API to get AI suggestions for improving text.
 * @param {string} textToImprove - The text the user wants to enhance.
 * @param {'bulletPoint' | 'projectDescription' | 'skillSuggestion' | 'generic'} context - The type of text being improved, helps tailor the prompt.
 * @returns {Promise<string>} - A promise that resolves with the improved text.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const getAISuggestion = async (textToImprove, context) => {
    console.log(`Sending to backend: Text: "${textToImprove}", Context: ${context}`); // Debug log

    try {
        const response = await fetch(`${API_BASE_URL}/api/ai/improve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textToImprove, context }), // Send text and context in the body
        });

        if (!response.ok) {
            // Try to get error message from backend response body
            const errorBody = await response.json().catch(() => ({ message: 'Unknown error occurred' })); // Handle cases where body isn't valid JSON
            console.error("API Error Response:", errorBody);
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody.message || 'Failed to fetch suggestion'}`);
        }

        const data = await response.json();

        if (!data.improvedText) {
             throw new Error("API Error: Received empty suggestion from the server.");
        }

        console.log("Received from backend:", data.improvedText); // Debug log
        return data.improvedText; // Return only the improved text string

    } catch (error) {
        console.error('Error fetching AI suggestion:', error);
        // Re-throw the error so the component can handle it (e.g., show an alert)
        throw error;
    }
};

// Add other AI service functions here later if needed
// export const suggestSkills = async (jobTitle) => { ... }