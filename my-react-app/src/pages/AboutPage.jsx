``
import React from 'react';
import './AboutPage.css'; 

function AboutPage() {
    return (
        <div className="about-page-container">
            <header className="about-header">
                <h1>About Our AI Resume Builder</h1>
                <p className="about-subtitle">
                    Crafting professional resumes, simplified by Artificial Intelligence.
                </p>
            </header>

            <section className="about-section">
                <h2>The Problem We Solve</h2>
                <p>
                    Building a compelling resume can be a daunting task. Many job seekers struggle with
                    formatting, finding the right words, and tailoring their resume for specific roles.
                    Traditional resume builders can be clunky, and writing effective content from scratch
                    is time-consuming. This is where our AI Resume Builder steps in.
                </p>
            </section>

            <section className="about-section">
                <h2>Our Solution</h2>
                <p>
                    Our AI Resume Builder is a smart, practical, and modern web application designed to
                    streamline the resume creation process. We leverage the power of Artificial Intelligence,
                    specifically Google's Gemini API, to provide intelligent suggestions and enhancements,
                    helping you create a polished, ATS-friendly resume with ease.
                </p>
                <h3>Key Features:</h3>
                <ul>
                    <li><strong>Interactive Form Input:</strong> A user-friendly form guides you through each section of your resume, modeled after effective, ATS-friendly formats.</li>
                    <li><strong>AI-Powered Content Enhancement:</strong> Get smart suggestions to improve your bullet points, project descriptions, and overall wording, making your achievements shine.</li>
                    <li><strong>Multiple Professional Templates:</strong> Choose from a selection of beautifully designed templates that are both visually appealing and optimized for applicant tracking systems.</li>
                    <li><strong>Live Preview:</strong> See your resume update in real-time as you input your information and select different templates.</li>
                    <li><strong>PDF Download:</strong> Easily download your finalized resume as a high-quality, professional PDF document.</li>
                    <li><strong>ATS-Friendly Design:</strong> Our templates and content suggestions are geared towards ensuring your resume is easily parsable by Applicant Tracking Systems.</li>
                    <li><strong>Theme Customization:</strong> Personalize your experience with light and dark mode options.</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>The Technology</h2>
                <p>
                    This project is a full-stack MERN application with a modern twist:
                </p>
                <ul>
                    <li><strong>Frontend:</strong> React.js for a dynamic user interface, styled with standard CSS, and utilizing React Router for navigation and React Context API for state management.</li>
                    <li><strong>Backend:</strong> Node.js and Express.js to create a robust API for interacting with the AI model.</li>
                    <li><strong>Database (Future):</strong> Planned integration with MongoDB for user accounts and saved resumes.</li>
                    <li><strong>Artificial Intelligence:</strong> Google Gemini API for providing content suggestions and enhancements.</li>
                    <li><strong>PDF Generation:</strong> Client-side PDF generation using `html2pdf.js`.</li>
                    <li><strong>Deployment:</strong> (Planned/Actual) Frontend hosted on Vercel, Backend on Render/Railway.</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Meet the Developer</h2>
                <p>
                    This AI Resume Builder was developed by Khush Paliwal, a passionate Full Stack Developer and Innovator in Web Development.
                    You can learn more about Khush and other projects on <a href="https://github.com/khush196" target="_blank" rel="noopener noreferrer">GitHub</a>.
                </p>
            </section>

            <section className="about-section about-cta">
                <p>Ready to build your standout resume?</p>
                <a href="/build" className="hero-cta-button">Build Your Resume Now</a>
            </section>
        </div>
    );
}

export default AboutPage;