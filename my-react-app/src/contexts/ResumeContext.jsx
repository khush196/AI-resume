// src/contexts/ResumeContext.jsx (or .js)

import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

// --- UPDATED initialResumeData for skills ---
const initialResumeData = {
    personalInfo: { /* ... */ },
    summary: { /* ... */ },
    // Skills is now an object with keys for each category
    skills: {
        programmingLanguages: '',
        frameworks: '',
        tools: '' // Using 'tools' as the key for "Other Tools"
    },
    projects: [{ /* ... */ }],
    education: [{ /* ... */ }],
    certifications: [{ /* ... */ }],
    extracurricular: [{ /* ... */ }],
};


export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [selectedTemplate, setSelectedTemplate] = useState('template1');
    const [loadingAI, setLoadingAI] = useState(false);

    // --- Updaters for non-list items ---
    const updatePersonalInfo = (field, value) => { /* ... as before ... */ };
    const updateSummary = (field, value) => { /* ... as before ... */ };

    // --- NEW Updater specifically for skill categories ---
    const updateSkillCategory = (category, value) => {
        // category will be 'programmingLanguages', 'frameworks', or 'tools'
        setResumeData(prevData => ({
            ...prevData,
            skills: {
                 ...prevData.skills,
                 [category]: value // Update the specific category string
                }
        }));
    };

    // --- List item updaters (no longer handle 'skills') ---
    const updateListItem = (type, index, field, value) => {
        // Ensure 'skills' type is not processed here if called accidentally
        if (type === 'skills') {
             console.warn("updateListItem called for 'skills', use updateSkillCategory instead.");
             return; // Or handle appropriately if skills could ever be a list again
        }
        setResumeData(prevData => {
            // ... existing logic for projects, education, etc. ...
            if (!prevData[type] || !Array.isArray(prevData[type])) return prevData;
            if (index < 0 || index >= prevData[type].length) return prevData;

            const list = [...prevData[type]];
            if (field) {
                list[index] = { ...list[index], [field]: value };
            } else {
                 console.warn(`updateListItem called for ${type} without a 'field'.`);
            }
            return { ...prevData, [type]: list };
        });
    };

    const addListItem = (type) => {
        // Ensure 'skills' type is not processed here
         if (type === 'skills') {
             console.warn("addListItem called for 'skills'. Skills are now an object.");
             return;
        }
        setResumeData(prevData => {
            // ... existing logic for adding projects, education items ...
            // Make sure the switch statement doesn't have a 'skills' case anymore
            // or handle it appropriately.
             if (!prevData[type] || !Array.isArray(prevData[type])) return prevData;
            const list = prevData[type];
            let newItem;
            const newId = Date.now() + Math.random();

            switch (type) {
                // NO 'skills' case needed here anymore
                case 'projects': /* ... */ break;
                case 'education': /* ... */ break;
                case 'certifications': /* ... */ break;
                case 'extracurricular': /* ... */ break;
                default:
                    console.error("Unknown list item type for addListItem:", type);
                    return prevData;
            }
            return { ...prevData, [type]: [...list, newItem] };
        });
    };

    const removeListItem = (type, index) => {
        // Ensure 'skills' type is not processed here
         if (type === 'skills') {
             console.warn("removeListItem called for 'skills'. Skills are now an object.");
             return;
        }
        setResumeData(prevData => {
             // ... existing logic for removing projects, education items ...
             if (!prevData[type] || !Array.isArray(prevData[type])) return prevData;
             if (index < 0 || index >= prevData[type].length) return prevData;

            const list = [...prevData[type]];
            list.splice(index, 1);
            return { ...prevData, [type]: list };
        });
    };

    // --- Context Value ---
    const value = {
        resumeData,
        setResumeData,
        updatePersonalInfo,
        updateSummary,
        updateSkillCategory, // <-- EXPORT the new function
        updateListItem,      // Keep for other lists
        addListItem,         // Keep for other lists
        removeListItem,      // Keep for other lists
        selectedTemplate,
        setSelectedTemplate,
        loadingAI,
        setLoadingAI
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};