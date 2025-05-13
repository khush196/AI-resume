// my-react-app/src/pages/BuilderPage.jsx
import React from 'react';
import FormComponent from '../components/FormSteps/FormComponent';
import ResumePreview from '../components/Preview/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import PdfDownloader from '../components/PdfDownloader';
// Import App.css if its styles are specific to the builder layout
// and not global. Or create a BuilderPage.css
import '../App.css'; // Assuming App.css contains the builder layout styles

function BuilderPage() {
    return (
        // The className "App" here refers to the layout styling from your App.css
        // You might want to rename this class in App.css to something like "builder-layout"
        // to avoid confusion if .App is also used for global app styling.
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