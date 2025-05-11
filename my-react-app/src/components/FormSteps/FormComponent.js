import React from 'react';
import PersonalInfo from './PersonalInfo';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
// Import other section components as you create them (e.g., Certifications, Summary)

// Basic styling for the form container (can be moved to a CSS file)
const formContainerStyle = {
    padding: '10px',
};

const sectionStyle = {
    marginBottom: '30px', // Space between sections
    paddingBottom: '20px', // Padding at the bottom of each section
    borderBottom: '1px solid #eee', // Separator line
};

const sectionTitleStyle = {
    fontSize: '1.4rem',
    color: '#333',
    marginBottom: '15px',
    borderBottom: '2px solid #6c5ce7', // Accent color underline
    paddingBottom: '5px',
    display: 'inline-block', // Keep underline only under text
};


function FormComponent() {
    return (
        <div style={formContainerStyle}>
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Personal Information</h3>
                <PersonalInfo />
            </div>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Work Experience</h3>
                <Experience />
            </div>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Education</h3>
                <Education />
            </div>

             <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Skills</h3>
                <Skills />
            </div>

            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Projects</h3>
                <Projects />
            </div>

            {/* Add other sections here */}
            {/* <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Certifications</h3>
                <Certifications />
            </div> */}

        </div>
    );
}

export default FormComponent;
