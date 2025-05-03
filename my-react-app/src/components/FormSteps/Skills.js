import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function Skills() {
    const { resumeData, updateListItem, addListItem, removeListItem } = useResume();
    const skillsList = resumeData.skills;

    // Handler for changes within a specific skill input
    const handleChange = (index, e) => {
        // For skills (simple array), the 'field' parameter is null
        updateListItem('skills', index, null, e.target.value);
    };

    // Handler to add a new blank skill input
    const handleAddSkill = () => {
        addListItem('skills');
    };

    // Handler to remove a skill input
    const handleRemoveSkill = (index) => {
        // Only remove if it's not the last input, or handle differently
        if (skillsList.length > 1) {
            removeListItem('skills', index);
        } else {
            // Optionally clear the last input instead of removing it
            updateListItem('skills', index, null, '');
        }
    };

    return (
        <div>
             <p style={{fontSize: '0.9rem', color: '#666', marginTop: '-10px', marginBottom: '15px'}}>
                Enter your skills one by one. Click '+' to add more.
             </p>
            {skillsList.map((skill, index) => (
                <div key={index} className="form-group" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleChange(index, e)}
                        placeholder={`Skill #${index + 1} (e.g., JavaScript, Python, Teamwork)`}
                        style={{ flexGrow: 1, marginRight: '10px' }} // Take available space, add margin
                    />
                    {/* Show remove button only if there's more than one skill input */}
                    {skillsList.length > 1 && (
                         <button
                            type="button"
                            onClick={() => handleRemoveSkill(index)}
                            title="Remove Skill"
                            style={{ /* Basic styling for remove button */
                                background: '#ffcccc',
                                border: '1px solid #ffaaaa',
                                color: '#cc0000',
                                cursor: 'pointer',
                                padding: '5px 8px',
                                borderRadius: '4px',
                                lineHeight: '1', // Ensure text fits
                            }}
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}

            <button type="button" className="add-button" onClick={handleAddSkill} style={{marginTop: '5px'}}>
                + Add Skill
            </button>

            {/* Optional AI Skill Suggestion Button */}
            {/* <button
                type="button"
                className="ai-button"
                style={{ marginLeft: '15px', verticalAlign: 'bottom' }}
                onClick={() => alert('AI skill suggestion coming soon!')}
                title="Suggest skills based on profile"
            >
                ✨ Suggest Skills
            </button> */}
        </div>
    );
}

export default Skills;