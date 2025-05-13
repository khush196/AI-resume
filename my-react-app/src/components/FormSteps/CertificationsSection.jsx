import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

function CertificationsSection() {
    const { resumeData, updateListItem, addListItem, removeListItem } = useResume();
    const certList = resumeData.certifications;

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        updateListItem('certifications', index, name, value);
    };

    const handleAddCert = () => addListItem('certifications');
    const handleRemoveCert = (index) => removeListItem('certifications', index);

    return (
        <div>
            {certList.map((cert, index) => (
                <div key={cert.id || index} className="list-item">
                    {certList.length > 1 && (
                        <button type="button" className="remove-button" onClick={() => handleRemoveCert(index)} title="Remove Certification">×</button>
                    )}
                    <div className="form-group">
                        <label htmlFor={`certName-${index}`}>Certification Name </label>
                        <input type="text" id={`certName-${index}`} name="name" value={cert.name} onChange={(e) => handleChange(index, e)} placeholder='e.g., Full Stack' />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`certOrg-${index}`}>Issuing Organization </label>
                        <input type="text" id={`certOrg-${index}`} name="organization" value={cert.organization} onChange={(e) => handleChange(index, e)} placeholder='e.g., Coursera / Udemy'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`certYear-${index}`}>Year </label>
                        <input type="text" id={`certYear-${index}`} name="year" value={cert.year} onChange={(e) => handleChange(index, e)} placeholder='e.g., Dec 2024' />
                    </div>
                </div>
            ))}
            <button type="button" className="add-button" onClick={handleAddCert}>+ Add Certification</button>
        </div>
    );
}
export default CertificationsSection;