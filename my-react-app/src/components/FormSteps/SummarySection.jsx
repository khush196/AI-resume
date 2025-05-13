import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function SummarySection() {
    const { resumeData, setResumeData } = useResume(); // Using setResumeData for direct update
    const summary = resumeData.summary;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            summary: { ...prev.summary, [name]: value }
        }));
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
                 {/* Optional AI Button for Summary */}
                 {/*
                 <button type="button" className="ai-button" onClick={() => handleImproveSummary()}>
                    ✨ Improve Summary
                 </button>
                 */}
            </div>
        </div>
    );
}
export default SummarySection;