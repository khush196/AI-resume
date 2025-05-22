import React from 'react';

import { useResume } from '../../contexts/ResumeContext';
import './ResumePreview.css'; 


const formatBulletPoints = (text) => {
    if (!text) return null;
    return text.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map((line, index) => {
            if (line.startsWith('*') || line.startsWith('-')) {
                return <li key={index}>{line.substring(1).trim()}</li>;
            }
            return null;
        }).filter(Boolean);
};

function ResumePreview() {
   
    const { resumeData, selectedTemplate } = useResume();

     console.log('ResumePreview: Rendering. resumeData:', resumeData, 'Selected Template:', selectedTemplate); 

    
    const {
        personalInfo = {}, 
        summary = {},
        skills = { programmingLanguages: '', frameworks: '', tools: '' },
        projects = [],
        education = [],
        certifications = [],
        extracurricular = [] 
    } = resumeData || {}; 

    const hasProjects = projects.some(proj => proj.title || proj.description);
    const hasEducation = education.some(edu => edu.degree ||edu.course || edu.institution);
   const hasSkills = skills.programmingLanguages?.trim() || skills.frameworks?.trim() || skills.tools?.trim();
    const hasCertifications = certifications.some(cert => cert.name || cert.organization);
    const hasExtracurricular = extracurricular.some(activity => activity.title || activity.description);
    


    const previewClassName = `resume-preview ${selectedTemplate}`;

    return (
        <div className={previewClassName}> {}

            {(personalInfo.name || personalInfo.email) && ( // Check if there's any data to display
                <header className="resume-header">
                    {personalInfo.name && <h1 className="name">{personalInfo.name}</h1>}
                    <div className="contact-info-top-line"> {/* For styling location, email, github on one line */}
                        {personalInfo.location && <span className="location">{personalInfo.location}</span>}
                        {personalInfo.email && <span className="email">{personalInfo.email && personalInfo.location ? ' | ' : ''}{personalInfo.email}</span>}
                        {personalInfo.github && <span className="github">{personalInfo.github && (personalInfo.email || personalInfo.location) ? ' | ' : ''}<a href={personalInfo.github} target="_blank" rel="noopener noreferrer">{personalInfo.github}</a></span>}
                    </div>
                    <div className="contact-info-optional"> {/* For optional phone, linkedin */}
                        {personalInfo.phone && <span className="phone">Phone: {personalInfo.phone}</span>}
                        {personalInfo.linkedin && <span className="linkedin">{personalInfo.linkedin && personalInfo.phone ? ' | ' : ''}LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">Profile</a></span>}
                        {personalInfo.portfolio && <span className="portfolio">{personalInfo.portfolio && (personalInfo.phone || personalInfo.linkedin) ? ' | ' : ''}Portfolio: <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer">{personalInfo.portfolio}</a></span>}
                    </div>
                </header>
            )}

            {/* --- Summary Section --- */}
            {(summary.title || summary.description) && (
                <section className="resume-section summary-preview">
                    {summary.title && <h2 className="summary-headline">{summary.title}</h2>}
                    {summary.description && (
                        <div className="summary-text">
                            {summary.description.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                </section>
            )}
{/* 
         

{/* --- Technical Skills Section --- */}
 {hasSkills && (
                <section className="resume-section skills">
                    <h3 className="section-title">Technical Skills</h3>
                    <ul className="skills-category-list"> {/* Make sure class names match your CSS */}
                        {/* Conditionally render each category if it has content */}
                        {skills.programmingLanguages?.trim() && (
                            <li className="skill-category">
                                <strong className="skill-category-label">Programming Languages:</strong>
                                <span className="skill-items">{skills.programmingLanguages}</span>
                            </li>
                        )}
                        {skills.frameworks?.trim() && (
                            <li className="skill-category">
                                <strong className="skill-category-label">Frameworks:</strong>
                                <span className="skill-items">{skills.frameworks}</span>
                            </li>
                        )}
                        {skills.tools?.trim() && (
                            <li className="skill-category">
                                <strong className="skill-category-label">Other Tools:</strong>
                                <span className="skill-items">{skills.tools}</span>
                            </li>
                        )}
                    </ul>
                </section>
            )}

            {/* --- Relevant Projects Section --- */}
            {hasProjects && (
                <section className="resume-section projects">
                    <h3 className="section-title">Relevant Projects</h3>
                    {projects.map((proj, index) => (
                        (proj.title || proj.description) && (
                            <div key={`proj-${proj.id || index}`} className="entry">
                                <div className="entry-header project-header">
                                    {proj.title && <span className="project-title">{proj.title}</span>}
                                    {proj.subtitle && <span className="project-subtitle"> — {proj.subtitle}</span>}
                                    {proj.date && <span className="project-date">({proj.date})</span>}
                                </div>
                                {proj.description && (
                                    <ul className="description-list">
                                        {formatBulletPoints(proj.description)}
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
                        (edu.degree || edu.institution) && (
                            <div key={`edu-${edu.id || index}`} className="entry">
                                <div className="entry-header education-header">
                                    <span className="degree-institution">
                                        {edu.degree && <span className="degree">{edu.degree}</span>}, 

                                          {edu.course && <span className="course">{edu.course}</span>}
                                        {edu.institution && <span className="institution">, {edu.institution}</span>}
                                        {edu.gpa && <span className="gpa"> CGPA: {edu.gpa}</span>}
                                    </span>
                                    {edu.dates && <span className="dates">{edu.dates}</span>}
                                </div>
                            </div>
                        )
                    ))}
                </section>
            )}

            {/* --- Certifications Section --- */}
            {hasCertifications && (
                <section className="resume-section certifications">
                    <h3 className="section-title">Certifications</h3>
                    {certifications.map((cert, index) => (
                        (cert.name || cert.organization) && (
                            <div key={`cert-${cert.id || index}`} className="entry certification-entry">
                                <span className="certification-name">{cert.name}</span>
                                {cert.organization && <span className="certification-org"> — {cert.organization}</span>}
                                {cert.year && <span className="certification-year">({cert.year})</span>}
                            </div>
                        )
                    ))}
                </section>
            )}

            {/* --- Extracurricular Activities / Awards Section --- */}
            {hasExtracurricular && (
                <section className="resume-section extracurricular">
                    <h3 className="section-title">Extracurricular Activities</h3>
                    {extracurricular.map((activity, index) => (
                        (activity.title || activity.description) && (
                            <div key={`activity-${activity.id || index}`} className="entry">
                                <div className="entry-header activity-header">
                                    {activity.title && <span className="activity-title">{activity.title}</span>}
                                    {activity.date && <span className="activity-date">({activity.date})</span>}
                                </div>
                                {activity.description && (
                                    <ul className="description-list">
                                        {formatBulletPoints(activity.description)}
                                    </ul>
                                )}
                            </div>
                        )
                    ))}
                </section>
            )}
        </div>
    );
}

export default ResumePreview;