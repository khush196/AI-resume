import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

const getInitialAuthState = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');
    return {
        isAuthenticated: isAuthenticated === 'true',
        user: user ? JSON.parse(user) : null,
    };
};

const initialResumeData = {
    personalInfo: { name: '', title: '', email: '', phone: '', linkedin: '', github: '', location: '',  portfolio: '' },
    summary: { title: '', description: '' },
    experience: [{ id: Date.now() + Math.random(), jobTitle: '', company: '', years: '', description: '' }], 
    education: [{ id: Date.now() + Math.random(), degree: '', course: '', institution: '', gpa: '', dates: ''}],
    skills: {
        programmingLanguages: '',
        frameworks: '',
        tools: ''
    }, 
    projects: [{ id: Date.now() + Math.random(), title: '', date: '', description: '', technologies: '' }],
    certifications: [{ id: Date.now() + Math.random(), name: '', organization: '', year: '' }], 
    extracurricular: [{ id: Date.now() + Math.random(), activity: '', role: '', description: '' }], 
};


export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [selectedTemplate, setSelectedTemplate] = useState('template1'); 
    const [loadingAI, setLoadingAI] = useState(false); 

     // --- Authentication State ---
    const initialAuth = getInitialAuthState();
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth.isAuthenticated);
    const [currentUser, setCurrentUser] = useState(initialAuth.user); // Store user info (e.g., email, name from Google)

    useEffect(() => {
        // Persist auth state to localStorage
        localStorage.setItem('isAuthenticated', isAuthenticated);
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('user');
        }
    }, [isAuthenticated, currentUser]);

    const loginUser = (userData) => {
        // In a real app, userData would come from your backend after successful login/Google verification
        setIsAuthenticated(true);
        setCurrentUser(userData); // e.g., { email: 'user@example.com', name: 'User Name' }
        // Potentially load user-specific resumeData here if implementing resume saving
    };

    const logoutUser = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setResumeData(initialResumeData); // Reset resume data on logout
        // In a real app, also call backend to invalidate session/token
    };
    // --- End Authentication State ---
    
     const updateField = (section, field, value) => {
        console.log(`ResumeContext: updateField for section=${section}, field=${field}, value=${value}`); // Debugging
        setResumeData(prevData => {
            // Ensure the section exists, especially if it's an object
            const currentSection = prevData[section] || {};
            const updatedSection = { ...currentSection, [field]: value };
            return {
                ...prevData,
                [section]: updatedSection
            };
        });
    };

   const updateSkillCategory = (categoryKey, value) => {
        console.log(`ResumeContext: updateSkillCategory for categoryKey=${categoryKey}, value=${value}`); // Debugging
        setResumeData(prevData => ({
            ...prevData,
            skills: {
                ...prevData.skills,
                [categoryKey]: value
            }
        }));
    };

    const updateListItem = (type, index, field, value) => {
        setResumeData(prevData => {
            if (!prevData[type] || !Array.isArray(prevData[type])) {
                console.error(`Cannot updateListItem: resumeData.${type} is not an array or doesn't exist.`);
                return prevData; 
            }

            const list = [...prevData[type]];
            if (index < 0 || index >= list.length) {
                console.error(`Cannot updateListItem: Invalid index ${index} for ${type}`);
                return prevData; 
            }

            if (field) {
                list[index] = { ...list[index], [field]: value };
            } else {
                list[index] = value;
            }
            return { ...prevData, [type]: list };
        });
    };


    const addListItem = (type) => {
        setResumeData(prevData => {
            let newItem;
            let list = prevData[type];
            if (!Array.isArray(list)) {
                if (type === 'certifications' || type === 'extracurricular' || type === 'experience' || type === 'education' || type === 'projects' || type === 'skills') {
                    console.warn(`Initializing empty array for resumeData.${type} in addListItem`);
                    list = [];
                } else {
                    console.error(`Error in addListItem: prevData[${type}] is not an array and not a known initializable type. Current prevData:`, prevData);
                    return prevData; 
                }
            }


            const newId = Date.now() + Math.random();

            switch (type) {
                case 'summary': 
                    console.warn("addListItem called for 'summary', which is not a list. No action taken.");
                    return prevData;
                case 'experience':
                    newItem = { id: newId, jobTitle: '', company: '', years: '', description: '' };
                    break;
                case 'education':
                    newItem = { id: newId, degree: '', course: '', school: '', years: '' };
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
                    newItem = ''; 
                    return { ...prevData, [type]: [...list, newItem] };
                default:
                    console.error(`Unknown type in addListItem: ${type}`);
                    return prevData; 
            }

            if (newItem === undefined) {
                console.error(`newItem is undefined for type: ${type}. This should not happen if the switch case is correct.`);
                return prevData;
            }

            return { ...prevData, [type]: [...list, newItem] };
        });
    };

    
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

            
            if (list.length === 0) {
                if (type === 'skills') {
                    list.push(''); 
                } else if (type === 'experience' || type === 'education' || type === 'projects' || type === 'certifications' || type === 'extracurricular') {
                    
                    
                }
            }
            return { ...prevData, [type]: list };
        });
    };


    
    const value = {
        resumeData,
        setResumeData, 
        updateField, 
        updateSkillCategory,
        updateListItem,
        addListItem,
        removeListItem,
        selectedTemplate,
        setSelectedTemplate,
        loadingAI,
        setLoadingAI,
        isAuthenticated,
        currentUser,
        loginUser,
        logoutUser,
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