import React, { createContext, useState, useContext, useEffect } from 'react';

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

    const initialAuth = getInitialAuthState();
    const [isAuthenticated, setIsAuthenticated] = useState(initialAuth.isAuthenticated);
    const [currentUser, setCurrentUser] = useState(initialAuth.user);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
        if (currentUser) {
            localStorage.setItem('user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('user');
        }
    }, [isAuthenticated, currentUser]);

    const loginUser = (userData) => {
        setIsAuthenticated(true);
        setCurrentUser(userData);
    };

    const logoutUser = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setResumeData(initialResumeData);
    };
    // --- End Authentication State ---

     const updateField = (section, field, value) => {
        setResumeData(prevData => {
            const currentSection = prevData[section] || {};
            const updatedSection = { ...currentSection, [field]: value };
            return {
                ...prevData,
                [section]: updatedSection
            };
        });
    };

   const updateSkillCategory = (categoryKey, value) => {
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
                return prevData;
            }
            const list = [...prevData[type]];
            if (index < 0 || index >= list.length) {
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
                if (['certifications', 'extracurricular', 'experience', 'education', 'projects', 'skills'].includes(type)) {
                    list = [];
                } else {
                    return prevData;
                }
            }
            const newId = Date.now() + Math.random();
            switch (type) {
                case 'experience': newItem = { id: newId, jobTitle: '', company: '', years: '', description: '' }; break;
                case 'education': newItem = { id: newId, degree: '', course: '', institution: '', gpa: '', dates: '' }; break;
                case 'projects': newItem = { id: newId, title: '', subtitle: '', date: '', description: '' }; break; // Match your ProjectsSection structure
                case 'certifications': newItem = { id: newId, name: '', organization: '', year: '' }; break;
                case 'extracurricular': newItem = { id: newId, title: '', date: '', description: '' }; break; // Match your ExtracurricularSection structure
                case 'skills': newItem = ''; return { ...prevData, [type]: [...list, newItem] };
                default: return prevData;
            }
            if (newItem === undefined) return prevData;
            return { ...prevData, [type]: [...list, newItem] };
        });
    };


    const removeListItem = (type, index) => {
        setResumeData(prevData => {
            if (!prevData[type] || !Array.isArray(prevData[type])) {
                return prevData;
            }
            const list = [...prevData[type]];
            if (index < 0 || index >= list.length) {
                return prevData;
            }
            list.splice(index, 1);
            if (list.length === 0) {
                if (type === 'skills') list.push('');
                // For other types, you might want to add back a default empty item
                // or simply allow the list to be empty. For this example, we'll allow it.
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