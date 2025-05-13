import React from 'react';
import HeaderInfo from './HeaderInfo';
import SummarySection from './SummarySection';
import SkillsSection from './SkillsSection'; // Assuming you kept SkillsSection.js (modified Skills.js)
import ProjectsSection from './ProjectsSection';
import EducationSection from './EducationSection';
import CertificationsSection from './CertificationsSection';
import ExtracurricularSection from './ExtracurricularSection';

const sectionStyle = { /* ... keep your existing style ... */ };
const sectionTitleStyle = { /* ... keep your existing style ... */ };

function FormComponent() {
    return (
        <div> {/* Removed formContainerStyle for brevity, add back if needed */}
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Personal Information</h3>
                <HeaderInfo />
            </div>
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Summary</h3>
                <SummarySection />
            </div>
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Technical Skills</h3>
                <SkillsSection />
            </div>
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Relevant Projects</h3>
                <ProjectsSection />
            </div>
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Education</h3>
                <EducationSection />
            </div>
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Certifications</h3>
                <CertificationsSection />
            </div>
            <div style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Extracurricular Activities / Awards</h3>
                <ExtracurricularSection />
            </div>
        </div>
    );
}
export default FormComponent;