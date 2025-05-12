import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function Education() {
    const { resumeData, updateListItem, addListItem, removeListItem } = useResume();
    const educationList = resumeData.education;

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        updateListItem('education', index, name, value);
    };

    const handleAddEducation = () => {
        addListItem('education');
    };

    const handleRemoveEducation = (index) => {
        removeListItem('education', index);
    };

    return (
        <div>
            {educationList.map((edu, index) => (
                <div key={edu.id || index} className="list-item">
                     {educationList.length > 1 && (
                        <button
                            type="button"
                            className="remove-button"
                            onClick={() => handleRemoveEducation(index)}
                            title="Remove Education"
                        >
                            ×
                        </button>
                     )}

                    <div className="form-group">
                        <label htmlFor={`degree-${index}`}>Degree / Qualification</label>
                        <input
                            type="text"
                            id={`degree-${index}`}
                            name="degree"
                            value={edu.degree}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., B.S. in Computer Science"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`school-${index}`}>School / University</label>
                        <input
                            type="text"
                            id={`school-${index}`}
                            name="school"
                            value={edu.school}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., University of Example"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`years-${index}`}>Years Attended</label>
                        <input
                            type="text"
                            id={`years-${index}`}
                            name="years"
                            value={edu.years}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="e.g., 2020 - 2024 | Expected May 2025"
                        />
                    </div>
                     {/* Add GPA or relevant courses field if desired */}
                </div>
            ))}

            <button type="button" className="add-button" onClick={handleAddEducation}>
                + Add Education
            </button>
        </div>
    );
}

export default Education;