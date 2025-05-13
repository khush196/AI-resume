import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { getAISuggestion } from '../../services/aiService';

function ProjectsSection() {
    const { resumeData, updateListItem, addListItem, removeListItem, loadingAI, setLoadingAI } = useResume();
    const projectList = resumeData.projects;

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        updateListItem('projects', index, name, value);
    };

    const handleAddProject = () => addListItem('projects');
    const handleRemoveProject = (index) => removeListItem('projects', index);

    const handleImproveDescription = async (index) => {
        const currentDescription = projectList[index].description;
        if (!currentDescription.trim()) {
            alert("Please enter a description first.");
            return;
        }
        setLoadingAI(true);
        try {
            const improvedDescription = await getAISuggestion(currentDescription, 'projectDescription');
            updateListItem('projects', index, 'description', improvedDescription);
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <div>
            {projectList.map((proj, index) => (
                <div key={proj.id || index} className="list-item">
                    {projectList.length > 1 && (
                        <button type="button" className="remove-button" onClick={() => handleRemoveProject(index)} title="Remove Project">×</button>
                    )}
                    <div className="form-group">
                        <label htmlFor={`projectTitle-${index}`}>Project Title</label>
                        <input type="text" id={`projectTitle-${index}`} name="title" value={proj.title} onChange={(e) => handleChange(index, e)} placeholder='Your Project name' />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`projectSubtitle-${index}`}>Tech Stack </label>
                        <input type="text" id={`projectSubtitle-${index}`} name="subtitle" value={proj.subtitle} onChange={(e) => handleChange(index, e)} placeholder='Tech stack used'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`projectDate-${index}`}>Date / Expected Completion </label>
                        <input type="text" id={`projectDate-${index}`} name="date" value={proj.date} onChange={(e) => handleChange(index, e)} placeholder='e.g. November 2024'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`projectDescription-${index}`}>Description (Use bullet points starting with '*')</label>
                        <textarea id={`projectDescription-${index}`} name="description" value={proj.description} onChange={(e) => handleChange(index, e)} rows={4} placeholder='Write a brief summary of your project.'/>
                      {/*   <button type="button" className="ai-button" onClick={() => handleImproveDescription(index)} disabled={loadingAI}>
                            {loadingAI ? 'Improving...' : '✨ Improve'}
                        </button> */}
                    </div>
                </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddProject}>+ Add Project</button>
        </div>
    );
}
export default ProjectsSection;