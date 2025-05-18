// my-react-app/src/components/PdfDownloader.jsx
import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useResume } from '../contexts/ResumeContext.jsx'; // Corrected path and extension

function PdfDownloader() {
    console.log("PdfDownloader component is rendering!"); // Keep this for now
    const [isGenerating, setIsGenerating] = useState(false);
    const { resumeData } = useResume();

    const handleDownloadPdf = () => {
        setIsGenerating(true);

        const element = document.getElementById('resume-preview-content');
        if (!element) {
            console.error("Resume preview element not found! ID 'resume-preview-content' is missing from the DOM.");
            setIsGenerating(false);
            alert("Error: Could not find the resume content to download.");
            return;
        }

        const userName = resumeData.personalInfo.name.trim() || 'resume';
        const filename = `${userName.replace(/\s+/g, '_')}_Resume.pdf`;

        const opt = {
            margin:       [0.5, 0.2, 0.5, 0.2], // Margins: [top, left, bottom, right] in inches
            filename:     filename,
            image:        { type: 'jpeg', quality: 0.98 }, // Image quality
            html2canvas:  {
                            scale: 2,         // <--- THIS INCREASES RESOLUTION (can go higher, e.g., 3 or 4, but increases file size/processing)
                            logging: false,
                            useCORS: true,
                            dpi: 192,         // <--- Explicitly set DPI (dots per inch), 192 is good, 300 is higher
                            // letterRendering: true, // May improve text rendering in some cases
                          },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
            // pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
        };

console.log("PdfDownloader: Element to print:", element); // DEBUG
if (!element) {
    console.error("Resume preview element NOT FOUND!");
    setIsGenerating(false);
    alert("Critical Error: Resume content area not found for PDF generation.");
    return;
}
// Check its content
console.log("PdfDownloader: Element innerHTML:", element.innerHTML.substring(0, 500)); // Log first 500 chars

        html2pdf().from(element).set(opt).save()
            .then(() => {
                setIsGenerating(false);
                console.log("PDF generated successfully!");
            })
            .catch((error) => {
                setIsGenerating(false);
                console.error("Error generating PDF:", error);
                alert("Sorry, there was an error generating the PDF. Please try again.");
            });
    };

    return (
        <button
            className="download-button"
            onClick={handleDownloadPdf}
            disabled={isGenerating}
        >
            {isGenerating ? 'Generating PDF...' : 'Download as PDF'}
            {isGenerating && <span className="loading-spinner" style={{marginLeft: '10px', borderTopColor: '#fff'}}></span>}
        </button>
    );
}

export default PdfDownloader;