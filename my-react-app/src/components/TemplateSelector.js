import React from 'react';
import { useResume } from '../contexts/ResumeContext';

// Define the available templates
const availableTemplates = [
    { id: 'template1', name: 'Classic' },
    { id: 'template2', name: 'Modern' },
    { id: 'template3', name: 'Compact' },
    // Add more templates here as you create them
    // { id: 'template4', name: 'Creative' },
    // { id: 'template5', name: 'Professional' },
];

function TemplateSelector() {
    const { selectedTemplate, setSelectedTemplate } = useResume();

    return (
        <div className="template-selector"> {/* Use class from App.css */}
            <h3>Choose a Template</h3>
            <div className="template-options">
                {availableTemplates.map(template => (
                    <button
                        key={template.id}
                        // Add 'active' class if this template is the selected one
                        className={selectedTemplate === template.id ? 'active' : ''}
                        onClick={() => setSelectedTemplate(template.id)}
                        title={`Switch to ${template.name} template`}
                    >
                        {template.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TemplateSelector;