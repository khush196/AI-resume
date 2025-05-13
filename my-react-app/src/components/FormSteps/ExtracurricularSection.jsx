import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
// Assuming you might want AI help for descriptions here too
// import { getAISuggestion } from '../../services/aiService';

function ExtracurricularSection() {
    const { resumeData, updateListItem, addListItem, removeListItem, loadingAI, setLoadingAI } = useResume();
    const activityList = resumeData.extracurricular;

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        updateListItem('extracurricular', index, name, value);
    };

    const handleAddActivity = () => addListItem('extracurricular');
    const handleRemoveActivity = (index) => removeListItem('extracurricular', index);

    // Optional: AI Improvement for description
    // const handleImproveDescription = async (index) => { ... similar to projects ... };

    return (
        <div>
            {activityList.map((activity, index) => (
                <div key={activity.id || index} className="list-item">
                    {activityList.length > 1 && (
                        <button type="button" className="remove-button" onClick={() => handleRemoveActivity(index)} title="Remove Activity">×</button>
                    )}
                    <div className="form-group">
                        <label htmlFor={`activityTitle-${index}`}>Title / Award </label>
                        <input type="text" id={`activityTitle-${index}`} name="title" value={activity.title} onChange={(e) => handleChange(index, e)} placeholder='e.g., Winner - Hackathon 2023'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`activityDate-${index}`}>Year</label>
                        <input type="text" id={`activityDate-${index}`} name="date" value={activity.date} onChange={(e) => handleChange(index, e)} placeholder='e.g., Nov 2023'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`activityDescription-${index}`}>Description (Use bullet points)</label>
                        <textarea id={`activityDescription-${index}`} name="description" value={activity.description} onChange={(e) => handleChange(index, e)} rows={3} placeholder='Write a brief summary of ypur Awards.'/>
                        {/* Optional AI Button */}
                        {/*
                        <button type="button" className="ai-button" onClick={() => handleImproveDescription(index)} disabled={loadingAI}>
                            {loadingAI ? 'Improving...' : '✨ Improve'}
                        </button>
                        */}
                    </div>
                </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddActivity}>+ Add Activity/Award</button>
        </div>
    );
}
export default ExtracurricularSection;