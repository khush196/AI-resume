import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { getAISuggestion } from '../../services/aiService'; // Import the service

function Experience() {
    // Get loading state and setter from context
    const { resumeData, updateListItem, addListItem, removeListItem, loadingAI, setLoadingAI } = useResume();
    const experienceList = resumeData.experience;

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        updateListItem('experience', index, name, value);
    };

    const handleAddExperience = () => {
        addListItem('experience');
    };

    const handleRemoveExperience = (index) => {
        removeListItem('experience', index);
    };

    // --- NEW: Function to handle AI improvement ---
    const handleImproveDescription = async (index) => {
        const currentDescription = experienceList[index].description;
        if (!currentDescription.trim()) {
            alert("Please enter a description first.");
            return;
        }

        setLoadingAI(true); // Start loading indicator (global for now)

        try {
            // Call the AI service
            const improvedDescription = await getAISuggestion(currentDescription, 'bulletPoint'); // Specify context

            // Update the description in the context state
            updateListItem('experience', index, 'description', improvedDescription);

        } catch (error) {
            console.error("Failed to improve description:", error);
            alert(`Error improving text: ${error.message}`); // Show error to user
        } finally {
            setLoadingAI(false); // Stop loading indicator
        }
    };
    // --- End NEW ---

    return (
        <div>
            {experienceList.map((exp, index) => (
                <div key={exp.id || index} className="list-item">
                     {experienceList.length > 1 && (
                        <button
                            type="button"
                            className="remove-button"
                            onClick={() => handleRemoveExperience(index)}
                            title="Remove Experience"
                        >
                            ×
                        </button>
                     )}

                    {/* ... other input fields (jobTitle, company, years) ... */}
                     <div className="form-group">
                        <label htmlFor={`jobTitle-${index}`}>Job Title</label>
                        <input
                            type="text"
                            id={`jobTitle-${index}`}
                            name="jobTitle"
                            value={exp.jobTitle}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., Software Development Intern"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`company-${index}`}>Company</label>
                        <input
                            type="text"
                            id={`company-${index}`}
                            name="company"
                            value={exp.company}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., Tech Solutions Inc."
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`years-${index}`}>Years / Duration</label>
                        <input
                            type="text"
                            id={`years-${index}`}
                            name="years"
                            value={exp.years}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., June 2023 - Aug 2023 | 2022 - Present"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`description-${index}`}>Description / Bullet Points</label>
                        <textarea
                            id={`description-${index}`}
                            name="description"
                            value={exp.description}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Describe your responsibilities and achievements (use bullet points starting with '*') "
                            rows={4}
                        />
                        {/* --- UPDATED AI Button --- */}
                        
                         {/* --- End UPDATED --- */}
                    </div>
                </div>
            ))}

            <button type="button" className="add-button" onClick={handleAddExperience}>
                + Add Experience
            </button>
        </div>
    );
}

export default Experience;