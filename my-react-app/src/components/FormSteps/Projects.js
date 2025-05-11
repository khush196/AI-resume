import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { getAISuggestion } from '../../services/aiService'; 

function Projects() {
    // Get loading state and setter
    const { resumeData, updateListItem, addListItem, removeListItem, loadingAI, setLoadingAI } = useResume();
    const projectList = resumeData.projects;

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        updateListItem('projects', index, name, value);
    };

    const handleAddProject = () => {
        addListItem('projects');
    };

    const handleRemoveProject = (index) => {
        removeListItem('projects', index);
    };

    // --- NEW: Function to handle AI improvement ---
    const handleImproveDescription = async (index) => {
        const currentDescription = projectList[index].description;
        if (!currentDescription.trim()) {
            alert("Please enter a description first.");
            return;
        }

        setLoadingAI(true); // Start loading

        try {
            // Call the AI service with 'projectDescription' context
            const improvedDescription = await getAISuggestion(currentDescription, 'projectDescription');

            // Update the context state
            updateListItem('projects', index, 'description', improvedDescription);

        } catch (error) {
            console.error("Failed to improve project description:", error);
            alert(`Error improving text: ${error.message}`);
        } finally {
            setLoadingAI(false); // Stop loading
        }
    };
    // --- End NEW ---


    return (
        <div>
            {projectList.map((proj, index) => (
                <div key={proj.id || index} className="list-item">
                     {projectList.length > 1 && (
                        <button
                            type="button"
                            className="remove-button"
                            onClick={() => handleRemoveProject(index)}
                            title="Remove Project"
                        >
                            ×
                        </button>
                     )}

                    {/* ... other input fields (name, technologies) ... */}
                     <div className="form-group">
                        <label htmlFor={`projectName-${index}`}>Project Name</label>
                        <input
                            type="text"
                            id={`projectName-${index}`}
                            name="name"
                            value={proj.name}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., AI Resume Builder"
                        />
                    </div>
                     <div className="form-group">
                        <label htmlFor={`technologies-${index}`}>Technologies Used</label>
                        <input
                            type="text"
                            id={`technologies-${index}`}
                            name="technologies"
                            value={proj.technologies}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., React, Node.js, Express, Gemini API, CSS"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`projectDescription-${index}`}>Description</label>
                        <textarea
                            id={`projectDescription-${index}`}
                            name="description"
                            value={proj.description}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Describe the project, your role, and key features or outcomes."
                            rows={4}
                        />
                         {/* --- UPDATED AI Button --- */}
                      
                         {/* --- End UPDATED --- */}
                    </div>
                </div>
            ))}

            <button type="button" className="add-button" onClick={handleAddProject}>
                + Add Project
            </button>
        </div>
    );
}

export default Projects;
