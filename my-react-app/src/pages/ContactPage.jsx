// my-react-app/src/pages/ContactPage.jsx
import React, { useState } from 'react';
import './ContactPage.css'; // We'll create this for styling

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        // Simulate API call / email sending
        console.log('Form Data Submitted:', formData);

        // In a real app, you'd send this data to a backend API:
        // try {
        //   const response = await fetch('/api/contact', { // Your backend endpoint
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        //   });
        //   if (response.ok) {
        //     setSubmitMessage('Thank you for your message! We will get back to you soon.');
        //     setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
        //   } else {
        //     const errorData = await response.json();
        //     setSubmitMessage(`Error: ${errorData.message || 'Something went wrong.'}`);
        //   }
        // } catch (error) {
        //   setSubmitMessage('Error: Could not send message. Please try again later.');
        //   console.error('Contact form submission error:', error);
        // }

        // Simulate delay for demo
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitMessage(`Thank you, ${formData.name}! Your message about "${formData.subject}" has been received (simulated).`);
        // setFormData({ name: '', email: '', subject: '', message: '' }); // Optionally reset form

        setIsSubmitting(false);
    };

    return (
        <div className="contact-page-container">
            <header className="contact-header">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you! Send us a message using the form below.</p>
            </header>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Full Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Reason for contacting us"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        required
                        placeholder="Your message..."
                    ></textarea>
                </div>
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitMessage && <p className={`submit-message ${submitMessage.startsWith('Error') ? 'error' : 'success'}`}>{submitMessage}</p>}
            </form>
        </div>
    );
}

export default ContactPage;