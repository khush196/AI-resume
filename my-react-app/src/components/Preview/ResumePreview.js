import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import './ResumePreview.css'; // I'll create this CSS file for base preview styles

// Helper function to format bullet points from textarea input
const formatBulletPoints = (text) => {
    if (!text) return null;
    
    return text.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map((line, index) => {
            if (line.startsWith('*') || line.startsWith('-')) {
                // Remove the bullet character and wrap in <li>
                return <li key={index}>{line.substring(1).trim()}</li>;
            }
           
            return null; 
        }).filter(Boolean); // Remove null entries
};


function ResumePreview() {
    // Get the resume data and selected template from the context
    const { resumeData, selectedTemplate } = useResume();
    const { personalInfo, experience, education, skills, projects } = resumeData;

    // Basic check if a section should be rendered (e.g., has at least one entry with some data)
    const hasExperience = experience.some(exp => exp.jobTitle || exp.company || exp.description);
    const hasEducation = education.some(edu => edu.degree || edu.school);
    const hasSkills = skills.some(skill => skill.trim().length > 0);
    const hasProjects = projects.some(proj => proj.name || proj.description);

    const previewClassName = `resume-preview ${selectedTemplate}`; 

    return (
      
        <div className={previewClassName}>

            {/* --- Header Section --- */}
            {(personalInfo.name || personalInfo.title) && (
                <header className="resume-header">
                    {personalInfo.name && <h1 className="name">{personalInfo.name}</h1>}
                    {personalInfo.title && <h2 className="title">{personalInfo.title}</h2>}
                    <div className="contact-info">
                        {personalInfo.email && <span className="email"> | {personalInfo.email}</span>}
                        {personalInfo.phone && <span className="phone"> | {personalInfo.phone}</span>}
                        {personalInfo.location && <span className="location"> | {personalInfo.location}</span>}
                        {personalInfo.linkedin && <span className="linkedin"> | <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>}
                        {personalInfo.github && <span className="github"> | <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>}
                        {/* Add portfolio link if needed */}
                    </div>
                </header>
            )}

            {/* --- Experience Section --- */}
            {hasExperience && (
                <section className="resume-section experience">
                    <h3 className="section-title">Work Experience</h3>
                    {experience.map((exp, index) => (
                        // Render only if there's actual content in the entry
                        (exp.jobTitle || exp.company || exp.description) && (
                            <div key={`exp-${exp.id || index}`} className="entry">
                                <div className="entry-header">
                                    {exp.jobTitle && <span className="job-title">{exp.jobTitle}</span>}
                                    {exp.company && <span className="company"> | {exp.company}</span>}
                                    {exp.years && <span className="years"> | {exp.years}</span>}
                                </div>
                                {exp.description && (
                                    <ul className="description-list">
                                        {formatBulletPoints(exp.description)}
                                    </ul>
                                )}
                            </div>
                        )
                    ))}
                </section>
            )}

            {/* --- Education Section --- */}
             {hasEducation && (
                <section className="resume-section education">
                    <h3 className="section-title">Education</h3>
                    {education.map((edu, index) => (
                         (edu.degree || edu.school) && (
                            <div key={`edu-${edu.id || index}`} className="entry">
                                <div className="entry-header">
                                    {edu.degree && <span className="degree">{edu.degree}</span>}
                                    {edu.school && <span className="school"> | {edu.school}</span>}
                                    {edu.years && <span className="years"> | {edu.years}</span>}
                                </div>
                                {/* Add GPA or relevant courses here if collected */}
                            </div>
                        )
                    ))}
                </section>
            )}

             {/* --- Skills Section --- */}
             {hasSkills && (
                <section className="resume-section skills">
                    <h3 className="section-title">Skills</h3>
                    <ul className="skills-list">
                        {skills
                            .map(skill => skill.trim()) // Trim whitespace
                            .filter(skill => skill.length > 0) // Filter out empty strings
                            .map((skill, index) => (
                                <li key={`skill-${index}`}>{skill}</li>
                         ))}
                    </ul>
                    {/* Alternative display: comma-separated */}
                    {/* <p className="skills-list-inline">
                        {skills.filter(skill => skill.trim().length > 0).join(', ')}
                    </p> */}
                </section>
            )}

             {/* --- Projects Section --- */}
            {hasProjects && (
                <section className="resume-section projects">
                    <h3 className="section-title">Projects</h3>
                    {projects.map((proj, index) => (
                         (proj.name || proj.description) && (
                            <div key={`proj-${proj.id || index}`} className="entry">
                                <div className="entry-header">
                                    {proj.name && <span className="project-name">{proj.name}</span>}
                                    {/* Optional: Display technologies inline or below */}
                                     {proj.technologies && <span className="technologies"> | Technologies: {proj.technologies}</span>}
                                </div>
                                {proj.description && (
                                    <ul className="description-list">
                                        {formatBulletPoints(proj.description)}
                                    </ul>
                                )}
                                {/* Add project link here if collected */}
                            </div>
                        )
                    ))}
                </section>
            )}

             {/* --- Add other sections (Summary, Certifications) similarly --- */}

        </div>
    );
}

export default ResumePreview;
