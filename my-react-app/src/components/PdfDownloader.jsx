import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useResume } from '../contexts/ResumeContext'; // 
function PdfDownloader() {
    const [isGenerating, setIsGenerating] = useState(false);
    const { resumeData } = useResume(); 

    const handleDownloadPdf = () => {
        setIsGenerating(true); 
        // 1. Get the element to print
        const element = document.getElementById('resume-preview-content');
        if (!element) {
            console.error("Resume preview element not found!");
            setIsGenerating(false);
            return;
        }

        // 2. Define filename (use user's name if available)
        const userName = resumeData.personalInfo.name.trim() || 'resume';
        const filename = `${userName.replace(/\s+/g, '_')}_Resume.pdf`; 

        // 3. Configure html2pdf options (adjust as needed)
        const opt = {
            margin:       [0.5, 0.2, 0.5, 0.2], // Margins:in inches
            filename:     filename,
            image:        { type: 'jpeg', quality: 0.98 }, // Image quality
            html2canvas:  {
                            scale: 2, // Higher scale for better resolution
                            logging: false, // Disable console logging from html2canvas
                            useCORS: true // Important if resume includes external images (though unlikely here)
                          },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }, // Standard US Letter size, portrait
            // pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] } // Control page breaks (experiment if needed)
        };

        // 4. Run html2pdf
        html2pdf().from(element).set(opt).save()
            .then(() => {
                setIsGenerating(false); // Reset loading state on success
                console.log("PDF generated successfully!");
            })
            .catch((error) => {
                setIsGenerating(false); // Reset loading state on error
                console.error("Error generating PDF:", error);
                alert("Sorry, there was an error generating the PDF. Please try again.");
            });

        <button
            className="download-button" // Use class from App.css
            onClick={handleDownloadPdf}
            disabled={isGenerating} // Disable button while generating
        >
            {isGenerating ? 'Generating PDF...' : 'Download as PDF'}
            {isGenerating && <span className="loading-spinner" style={{marginLeft: '10px', borderTopColor: '#fff'}}></span>} {/* Optional spinner */}
        </button>
    };
}

export default PdfDownloader;
