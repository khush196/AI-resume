import React from 'react';
import FormComponent from '../components/FormSteps/FormComponent';
import ResumePreview from '../components/Preview/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import PdfDownloader from '../components/PdfDownloader';

import '../App.css'; 

function BuilderPage() {
    return (
        <div className="App"> {/* This div provides the flex layout for form and preview */}
            <div className="form-section">
                <h2>Build Your Resume</h2>
                <TemplateSelector />
                <FormComponent />
            </div>
            <div className="preview-section">
                <h2>Live Preview</h2>
                <PdfDownloader />
                <div className="resume-preview-container" id="resume-preview-content">
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}

export default BuilderPage;