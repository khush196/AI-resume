import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function SkillsSection() {
    const { resumeData, updateSkillCategory } = useResume();
console.log('SkillsSection - updateSkillCategory:', updateSkillCategory);
console.log('SkillsSection - resumeData.skills:', resumeData?.skills);

    
    const skills = resumeData?.skills || {
        programmingLanguages: '',
        frameworks: '',
        tools: ''
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        updateSkillCategory(name, value);
    };

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
                    name="programmingLanguages"
                    value={skills.programmingLanguages} 
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, Python, SQL"
                />
            </div>

            <div className="form-group">
                <label htmlFor="frameworks">Frameworks</label>
                <input
                    type="text"
                    id="frameworks"
                    name="frameworks" 
                    value={skills.frameworks} 
                    onChange={handleChange}
                    placeholder="e.g., React, Node.js,"
                />
            </div>

            <div className="form-group">
                <label htmlFor="tools">Other Tools</label>
                <input
                    type="text"
                    id="tools"
                    name="tools" 
                    value={skills.tools} 
                    onChange={handleChange}
                    placeholder="e.g., Git, Webpack,"
                />
            </div>

        </div>
    );
}

export default SkillsSection;