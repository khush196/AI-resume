import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function HeaderInfo() {
    const { resumeData, updatePersonalInfo } = useResume();
    const personalInfo = resumeData.personalInfo;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updatePersonalInfo(name, value);
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="name">Full Name </label>
                <input type="text" id="name" name="name" value={personalInfo.name} onChange={handleChange} placeholder="Your Full Name" />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location </label>
                <input type="text" id="location" name="location" value={personalInfo.location} onChange={handleChange} placeholder="City, Country" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={personalInfo.email} onChange={handleChange} placeholder="your.email@example.com" />
            </div>
            <div className="form-group">
                <label htmlFor="github">GitHub Profile URL </label>
                <input type="text" id="github" name="github" value={personalInfo.github} onChange={handleChange} placeholder="github.com/yourusername" />
            </div>
            <div className="form-group">
                <label htmlFor="linkedin">LinkedIn Profile URL </label>
                <input type="text" id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} placeholder="linkedin.com/in/yourusername" />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone (Optional)</label>
                <input type="tel" id="phone" name="phone" value={personalInfo.phone} onChange={handleChange} placeholder="+1 123-456-7890" />
            </div>
             <div className="form-group">
                <label htmlFor="portfolio">Portfolio URL (Optional)</label>
                <input type="text" id="portfolio" name="portfolio" value={personalInfo.portfolio} onChange={handleChange} placeholder="yourportfolio.com" />
            </div>
        </div>
    );
}
export default HeaderInfo;