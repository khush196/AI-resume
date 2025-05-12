import React, { createContext, useState, useContext,  useEffect  } from 'react';

// 1. Create the Context
const ResumeContext = createContext();

// Initial state for the resume data
const initialResumeData = {
    personalInfo: { name: '', title: '', email: '', phone: '', linkedin: '', github: '', location: '' },
    experience: [{ id: 1, jobTitle: '', company: '', years: '', description: '' }],
    education: [{ id: 1, degree: '', school: '', years: '' }],
    skills: [''], // Start with one empty skill entry
    projects: [{ id: 1, name: '', description: '', technologies: '' }],

};

// 2. Create the Provider Component
export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [selectedTemplate, setSelectedTemplate] = useState('template1'); // Default template
    const [loadingAI, setLoadingAI] = useState(false); // State for AI loading

      // --- NEW: Theme State ---
    // Initialize theme from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('resumeBuilderTheme');
        return savedTheme || 'light'; // Default to light if nothing saved
    });

    // --- NEW: Effect to apply theme class to HTML element and save to localStorage ---
    
     useEffect(() => {
          document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('resumeBuilderTheme', theme);
    }, [theme]); 

  
    // --- NEW: Function to toggle theme ---
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    // --- End NEW ---

    
    // --- Functions to update resume data ---

    // Generic updater for simple fields (like personal info)
    const updatePersonalInfo = (field, value) => {
        setResumeData(prevData => ({
            ...prevData,
            personalInfo: { ...prevData.personalInfo, [field]: value }
        }));
    };

    // value: the new value
    const updateListItem = (type, index, field, value) => {
        setResumeData(prevData => {
            const list = [...prevData[type]];
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

    // Add a new item to a list (experience, education, projects, skills)
    const addListItem = (type) => {
        setResumeData(prevData => {
            let newItem;
            const list = prevData[type];
            const newId = list.length > 0 ? Math.max(...list.map(item => item.id || 0)) + 1 : 1; // Basic ID generation

            switch (type) {
                case 'experience':
                    newItem = { id: newId, jobTitle: '', company: '', years: '', description: '' };
                    break;
                case 'education':
                    newItem = { id: newId, degree: '', school: '', years: '' };
                    break;
                case 'projects':
                    newItem = { id: newId, name: '', description: '', technologies: '' };
                    break;
                 case 'skills':
                    newItem = ''; // Just add an empty string for a new skill input
                     return { ...prevData, [type]: [...list, newItem] }; // Skills don't need ID here
                default:
                    return prevData; // Should not happen
            }
            return { ...prevData, [type]: [...list, newItem] };
        });
    };

    // Remove an item from a list
    const removeListItem = (type, index) => {
        setResumeData(prevData => {
            const list = [...prevData[type]];
            list.splice(index, 1); // Remove item at the given index
        
            return { ...prevData, [type]: list };
        });
    };


    // --- Value provided by the context ---
    const value = {
        resumeData,
        setResumeData, // Allow direct setting if needed, though granular updaters are safer
        updatePersonalInfo,
        updateListItem,
        addListItem,
        removeListItem,
        selectedTemplate,
        setSelectedTemplate,
        loadingAI,
        setLoadingAI,
          // --- NEW: Add theme state and toggle function ---
          theme,
          toggleTheme
          // --- End NEW ---
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
