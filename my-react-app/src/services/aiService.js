const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001'; 
export const getAISuggestion = async (textToImprove, context) => {
    console.log(`Sending to backend: Text: "${textToImprove}", Context: ${context}`); 

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

        console.log("Received from backend:", data.improvedText); 
        return data.improvedText; // Return only the improved text string

    } catch (error) {
        console.error('Error fetching AI suggestion:', error);
        // Re-throw the error so the component can handle it (e.g., show an alert)
        throw error;
    }
};


