import React from 'react';
import { useResume } from '../../contexts/ResumeContext.jsx';

function SummarySection() {
    const { resumeData, updateField  } = useResume(); 
    console.log('SummarySection - updateField:', updateField);
    console.log('SummarySection - resumeData.summary:', resumeData?.summary);
    const summary = resumeData.summary || { title: '', description: '' };

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateField('summary', name, value);
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="summaryTitle">Headline / Title</label>
                <input
                    type="text"
                    id="summaryTitle"
                    name="title"
                    value={summary.title}
                    onChange={handleChange}
                    placeholder="Your Professional Headline"
                />
            </div>
            <div className="form-group">
                <label htmlFor="summaryDescription">Summary Paragraph</label>
                <textarea
                    id="summaryDescription"
                    name="description"
                    value={summary.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write a brief summary about your skills, experience, and career goals."
                />
                 
            </div>
        </div>
    );
}
export default SummarySection;