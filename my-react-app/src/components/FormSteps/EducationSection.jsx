import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function EducationSection() {
    const { resumeData, updateListItem, addListItem, removeListItem } = useResume();
    const educationList = resumeData.education;

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        updateListItem('education', index, name, value);
    };

    const handleAddEducation = () => addListItem('education');
    const handleRemoveEducation = (index) => removeListItem('education', index);

    return (
        <div>
            {educationList.map((edu, index) => (
                <div key={edu.id || index} className="list-item">
                    {educationList.length > 1 && (
                        <button type="button" className="remove-button" onClick={() => handleRemoveEducation(index)} title="Remove Education">×</button>
                    )}
                    <div className="form-group">
                        <label htmlFor={`degree-${index}`}>Degree </label>
                        <input type="text" id={`degree-${index}`} name="degree" value={edu.degree} onChange={(e) => handleChange(index, e)} placeholder='e.g., Bachelor of Technology (B.Tech) '/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`course-${index}`}>Course </label>
                        <input type="text" id={`course-${index}`} name="course" value={edu.course} onChange={(e) => handleChange(index, e)} placeholder='e.g., Computer Science & Engg.'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`institution-${index}`}>Institution </label>
                        <input type="text" id={`institution-${index}`} name="institution" value={edu.institution} onChange={(e) => handleChange(index, e)} placeholder='Your college/University' />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`gpa-${index}`}>CGPA </label>
                        <input type="text" id={`gpa-${index}`} name="gpa" value={edu.gpa} onChange={(e) => handleChange(index, e)} placeholder='Your GPA'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`educationDates-${index}`}>Dates </label>
                        <input type="text" id={`educationDates-${index}`} name="dates" value={edu.dates} onChange={(e) => handleChange(index, e)} placeholder='e.g., 2023-2027' />
                    </div>
                </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddEducation}>+ Add Education</button>
        </div>
    );
}
export default EducationSection;