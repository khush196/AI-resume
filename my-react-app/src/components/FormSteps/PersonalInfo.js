import React from 'react';
import { useResume } from '../../contexts/ResumeContext'; // Import the hook

function PersonalInfo() {
    // Get the state and updater function from the context
    const { resumeData, updatePersonalInfo } = useResume();
    const personalInfo = resumeData.personalInfo;

    // Handler function for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        updatePersonalInfo(name, value); // Update the context state
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handleChange}
                    placeholder="e.g., Jane Doe"
                />
            </div>
            <div className="form-group">
                <label htmlFor="title">Job Title / Role</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={personalInfo.title}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer | Full Stack Developer"
                />
            </div>
             <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleChange}
                    placeholder="e.g., jane.doe@example.com"
                />
            </div>
             <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handleChange}
                    placeholder="e.g., +1 123-456-7890"
                />
            </div>
             <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={personalInfo.location}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, CA"
                />
            </div>
             <div className="form-group">
                <label htmlFor="linkedin">LinkedIn Profile URL</label>
                <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={personalInfo.linkedin}
                    onChange={handleChange}
                    placeholder="e.g., linkedin.com/in/janedoe"
                />
            </div>
             <div className="form-group">
                <label htmlFor="github">GitHub Profile URL</label>
                <input
                    type="text"
                    id="github"
                    name="github"
                    value={personalInfo.github}
                    onChange={handleChange}
                    placeholder="e.g., github.com/janedoe"
                />
            </div>
            {/* Add other fields like Portfolio URL if needed */}
        </div>
    );
}

export default PersonalInfo;
