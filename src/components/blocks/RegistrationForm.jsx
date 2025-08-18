import { useState, useRef, useEffect } from "react";
import registrationService from "../../appwrite/registrationService";

export default function RegistrationForm({ isSectionLoaded }) {
    // Form state
    const [formData, setFormData] = useState({
        teamName: '',
        numberOfPeople: '',
        ageRange: '',
        briefDescription: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        city: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'
    
    // Use ref to track timeouts for cleanup
    const timeoutRef = useRef(null);
    
    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Form handling functions
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const validateForm = () => {
        const requiredFields = ['teamName', 'numberOfPeople', 'ageRange', 'fullName', 'phoneNumber', 'email', 'city'];
        return requiredFields.every(field => formData[field].trim() !== '');
    };
    
    // Helper function to set message with auto-clear
    const setMessageWithTimeout = (message, status, duration) => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        setSubmitMessage(message);
        setSubmitStatus(status);
        
        // Set new timeout
        timeoutRef.current = setTimeout(() => {
            setSubmitMessage('');
            setSubmitStatus('');
            timeoutRef.current = null;
        }, duration);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            setMessageWithTimeout('Please fill in all required fields', 'error', 5000);
            return;
        }
        
        setIsSubmitting(true);
        setSubmitMessage('');
        
        try {
            await registrationService.createRegistration(formData);
            
            // Reset form
            setFormData({
                teamName: '',
                numberOfPeople: '',
                ageRange: '',
                briefDescription: '',
                fullName: '',
                phoneNumber: '',
                email: '',
                city: ''
            });
            
            setMessageWithTimeout('Registration submitted successfully!', 'success', 5000);
        } catch (error) {
            console.error('Registration error:', error);
            
            // Provide more specific error messages
            let errorMessage = 'Registration failed. Please try again.';
            
            if (error.code === 401) {
                errorMessage = 'Authentication failed. Please contact support.';
            } else if (error.code === 404) {
                errorMessage = 'Database not found. Please contact support.';
            } else if (error.code === 400) {
                errorMessage = 'Invalid data provided. Please check your inputs.';
            } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
                errorMessage = 'Network error. Please check your internet connection.';
            }
            
            setMessageWithTimeout(errorMessage, 'error', 8000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div id="register-section" className={`flex items-center justify-center p-2 pt-24 transition-all duration-800 ${
                isSectionLoaded('register') ? 'section-visible' : 'section-hidden'
            }`}>
                <h1 className="font-bold text-xl md:text-2xl">REGISTER</h1>
            </div>
            <div className={`flex items-center justify-center space-x-4 container mx-auto px-4 transition-all duration-800 ${
                isSectionLoaded('register') ? 'section-visible' : 'section-hidden'
            }`}>
                <div className="w-full max-w-6xl bg-primary p-4 md:p-8 rounded-lg">
                    {/* Submit message banner */}
                    {submitMessage && (
                        <div className={`mb-6 p-3 rounded-lg text-center ${
                            submitStatus === 'success' 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                            {submitMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
                            {/* Audition Details Section */}
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold mb-6 text-neutral-content">Audition Details</h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <input 
                                            type="text" 
                                            name="teamName"
                                            value={formData.teamName}
                                            onChange={handleInputChange}
                                            placeholder="Team Name *" 
                                            required
                                            className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-3 focus:outline-none focus:border-primary-content text-sm md:text-base"
                                        />
                                    </div>
                                    
                                    <div>
                                        <input 
                                            type="number" 
                                            name="numberOfPeople"
                                            value={formData.numberOfPeople}
                                            onChange={handleInputChange}
                                            placeholder="Number of people *" 
                                            required
                                            min="1"
                                            className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-3 focus:outline-none focus:border-primary-content text-sm md:text-base"
                                        />
                                    </div>
                                    
                                    <div>
                                        <input 
                                            type="text" 
                                            name="ageRange"
                                            value={formData.ageRange}
                                            onChange={handleInputChange}
                                            placeholder="Age Range *" 
                                            required
                                            className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-3 focus:outline-none focus:border-primary-content text-sm md:text-base"
                                        />
                                    </div>
                                    
                                    <div>
                                        <textarea 
                                            name="briefDescription"
                                            value={formData.briefDescription}
                                            onChange={handleInputChange}
                                            placeholder="Brief Description" 
                                            rows="3"
                                            className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-3 focus:outline-none focus:border-primary-content resize-none text-sm md:text-base"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Vertical Divider */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-neutral transform -translate-x-1/2 hidden md:block"></div>

                            {/* Primary Contact Section */}
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold mb-6 text-neutral-content">Primary Contact</h2>
                                
                                <div className="space-y-6">
                                    <div>
                                        <input 
                                            type="text" 
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="Full Name *" 
                                            required
                                            className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-3 focus:outline-none focus:border-primary-content text-sm md:text-base"
                                        />
                                    </div>
                                    
                                    <div>
                                        <input 
                                            type="tel" 
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            placeholder="Phone Number *" 
                                            required
                                            className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-3 focus:outline-none focus:border-primary-content text-sm md:text-base"
                                        />
                                    </div>
                                    
                                    <div>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Email *" 
                                            required
                                            className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-3 focus:outline-none focus:border-primary-content text-sm md:text-base"
                                        />
                                    </div>
                                    
                                    <div>
                                        <input 
                                            type="text" 
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            placeholder="City *" 
                                            required
                                            className="w-full bg-transparent border-b border-primary-content text-neutral-content placeholder-neutral-content/60 py-3 focus:outline-none focus:border-primary-content text-sm md:text-base"
                                        />
                                    </div>
                                    
                                    <div className="pt-6">
                                        <button 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-primary-content text-primary font-semibold py-3 md:py-4 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
