import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const ResumeContext = createContext();

// Initial state for the resume data, including new sections
const initialResumeData = {
    personalInfo: { name: '', title: '', email: '', phone: '', linkedin: '', github: '', location: '' },
    summary: '', // Added a summary section as it's common
    experience: [{ id: Date.now() + Math.random(), jobTitle: '', company: '', years: '', description: '' }], // Using timestamp for potentially better unique ID
    education: [{ id: Date.now() + Math.random(), degree: '', school: '', years: '' }],
    skills: [''], // Start with one empty skill entry
    projects: [{ id: Date.now() + Math.random(), name: '', description: '', technologies: '' }],
    certifications: [{ id: Date.now() + Math.random(), name: '', authority: '', year: '' }], // Initialize certifications
    extracurricular: [{ id: Date.now() + Math.random(), activity: '', role: '', description: '' }], // Initialize extracurricular activities
};

// 2. Create the Provider Component
export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [selectedTemplate, setSelectedTemplate] = useState('template1'); // Default template
    const [loadingAI, setLoadingAI] = useState(false); // State for AI loading

    // --- Functions to update resume data ---

    // Generic updater for simple fields (like personal info, summary)
    const updateField = (section, field, value) => {
        if (section === 'summary') { // Handle summary directly as it's not an object
            setResumeData(prevData => ({
                ...prevData,
                summary: value
            }));
        } else {
            setResumeData(prevData => ({
                ...prevData,
                [section]: { ...prevData[section], [field]: value }
            }));
        }
    };


    // Updater for list items (experience, education, skills, projects, certifications, extracurricular)
    const updateListItem = (type, index, field, value) => {
        setResumeData(prevData => {
            // Ensure the list for the given type exists and is an array
            if (!prevData[type] || !Array.isArray(prevData[type])) {
                console.error(`Cannot updateListItem: resumeData.${type} is not an array or doesn't exist.`);
                return prevData; // Prevent crash
            }

            const list = [...prevData[type]];
            if (index < 0 || index >= list.length) {
                console.error(`Cannot updateListItem: Invalid index ${index} for ${type}`);
                return prevData; // Prevent crash
            }

            if (field) {
                // Update a field within an object in the list
                list[index] = { ...list[index], [field]: value };
            } else {
                // Update a simple string item in the list (like skills)
                list[index] = value;
            }
            return { ...prevData, [type]: list };
        });
    };

    // Add a new item to a list
    const addListItem = (type) => {
        setResumeData(prevData => {
            let newItem;
            // Ensure the list for the given type exists and is an array, or initialize it if it's a known new type
            let list = prevData[type];
            if (!Array.isArray(list)) {
                // If it's a known section that might not be initialized yet, initialize it.
                if (type === 'certifications' || type === 'extracurricular' || type === 'experience' || type === 'education' || type === 'projects' || type === 'skills') {
                    console.warn(`Initializing empty array for resumeData.${type} in addListItem`);
                    list = [];
                } else {
                    console.error(`Error in addListItem: prevData[${type}] is not an array and not a known initializable type. Current prevData:`, prevData);
                    return prevData; // Prevent crash
                }
            }


            // More robust unique ID generation (client-side only)
            const newId = Date.now() + Math.random();

            switch (type) {
                case 'summary': // Summary is not a list, handle separately if "add" means something else
                    console.warn("addListItem called for 'summary', which is not a list. No action taken.");
                    return prevData;
                case 'experience':
                    newItem = { id: newId, jobTitle: '', company: '', years: '', description: '' };
                    break;
                case 'education':
                    newItem = { id: newId, degree: '', school: '', years: '' };
                    break;
                case 'projects':
                    newItem = { id: newId, name: '', description: '', technologies: '' };
                    break;
                case 'certifications':
                    newItem = { id: newId, name: '', authority: '', year: '' };
                    break;
                case 'extracurricular':
                    newItem = { id: newId, activity: '', role: '', description: '' };
                    break;
                case 'skills':
                    newItem = ''; // Skills array contains strings
                    // For skills, directly return the updated state as newItem is just a string
                    return { ...prevData, [type]: [...list, newItem] };
                default:
                    console.error(`Unknown type in addListItem: ${type}`);
                    return prevData; // Return previous data to prevent crash
            }

            // Ensure newItem is defined before trying to spread it.
            // This check is particularly for object-based list items.
            if (newItem === undefined) {
                console.error(`newItem is undefined for type: ${type}. This should not happen if the switch case is correct.`);
                return prevData;
            }

            return { ...prevData, [type]: [...list, newItem] };
        });
    };

    // Remove an item from a list
    const removeListItem = (type, index) => {
        setResumeData(prevData => {
            if (!prevData[type] || !Array.isArray(prevData[type])) {
                console.error(`Cannot removeListItem: resumeData.${type} is not an array or doesn't exist.`);
                return prevData;
            }

            const list = [...prevData[type]];
            if (index < 0 || index >= list.length) {
                console.error(`Cannot removeListItem: Invalid index ${index} for ${type}`);
                return prevData;
            }

            list.splice(index, 1);

            // Optional: If it's the last item for sections that expect at least one entry, add a default empty one back.
            // This behavior is up to your desired UX.
            if (list.length === 0) {
                if (type === 'skills') {
                    list.push(''); // Ensure skills array always has at least one input field
                } else if (type === 'experience' || type === 'education' || type === 'projects' || type === 'certifications' || type === 'extracurricular') {
                    // For these, you might want to add a blank entry back or just leave it empty
                    // Example: addListItem(type); // This would re-add one, but be careful of infinite loops if not handled well.
                    // For simplicity now, we'll allow them to become empty.
                }
            }
            return { ...prevData, [type]: list };
        });
    };


    // --- Value provided by the context ---
    const value = {
        resumeData,
        setResumeData, // Generally prefer granular updaters
        updateField,   // Renamed from updatePersonalInfo for broader use
        updateListItem,
        addListItem,
        removeListItem,
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

// 3. Custom Hook to use the Context easily
export const useResume = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};