// src/components/FormSteps/SkillsSection.jsx (or .js)

import React from 'react';
// Make sure the path to ResumeContext is correct for your structure
import { useResume } from '../../contexts/ResumeContext';

function SkillsSection() {
    // Get the specific updater function and the resumeData
    const { resumeData, updateSkillCategory } = useResume();

    // Get the skills object from resumeData. Provide a default object structure
    // to prevent errors if resumeData or resumeData.skills is initially undefined.
    const skills = resumeData?.skills || {
        programmingLanguages: '',
        frameworks: '',
        tools: ''
    };

    // Handler for changes in ANY of the skill input fields
    const handleChange = (event) => {
        const { name, value } = event.target;
        // 'name' will match the keys in our skills state object
        // ('programmingLanguages', 'frameworks', 'tools')
        updateSkillCategory(name, value);
    };

    // THE RETURNED JSX SHOULD ***NOT*** USE .map() for skills anymore
    return (
        <div>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '-10px', marginBottom: '15px' }}>
                Enter skills for each category, separated by commas.
            </p>

            <div className="form-group">
                <label htmlFor="programmingLanguages">Programming Languages</label>
                <input
                    type="text"
                    id="programmingLanguages"
                    name="programmingLanguages" // This name MUST match the key in the context state
                    value={skills.programmingLanguages} // Access the specific category
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, Python, SQL"
                />
            </div>

            <div className="form-group">
                <label htmlFor="frameworks">Frameworks</label>
                <input
                    type="text"
                    id="frameworks"
                    name="frameworks" // This name MUST match the key in the context state
                    value={skills.frameworks} // Access the specific category
                    onChange={handleChange}
                    placeholder="e.g., React, Node.js,"
                />
            </div>

            <div className="form-group">
                <label htmlFor="tools">Other Tools</label>
                <input
                    type="text"
                    id="tools"
                    name="tools" // This name MUST match the key in the context state
                    value={skills.tools} // Access the specific category
                    onChange={handleChange}
                    placeholder="e.g., Git, Webpack,"
                />
            </div>

            {/* No .map() call, no Add/Remove buttons for skills */}
        </div>
    );
}

export default SkillsSection;