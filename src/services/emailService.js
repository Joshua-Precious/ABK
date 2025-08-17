import emailjs from '@emailjs/browser';

class EmailService {
    constructor() {
        // Initialize EmailJS with your public key
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    }

    async sendRegistrationNotification(registrationData) {
        try {
            const templateParams = {
                // WHO receives the email (can be anyone's email)
                to_name: 'ABK Organizer', // Name of the person receiving notifications
                to_email: import.meta.env.VITE_ADMIN_EMAIL, // Email of who should receive notifications
                
                // Registration details to include in email
                team_name: registrationData.teamName,
                full_name: registrationData.fullName,
                email: registrationData.email,
                phone_number: registrationData.phoneNumber,
                city: registrationData.city,
                number_of_people: registrationData.numberOfPeople,
                age_range: registrationData.ageRange,
                brief_description: registrationData.briefDescription || 'No description provided',
                submission_date: new Date().toLocaleString(),
                
                // Optional: Add a direct link to admin dashboard
                admin_link: `${window.location.origin}/admin`
            };

            // This sends FROM your connected email TO the admin email
            const response = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams
            );

            console.log('Email sent successfully:', response);
            return { success: true, response };
        } catch (error) {
            console.error('Failed to send email:', error);
            return { success: false, error: error.message };
        }
    }

    async sendConfirmationToRegistrant(registrationData) {
        try {
            const templateParams = {
                to_name: registrationData.fullName,
                to_email: registrationData.email,
                team_name: registrationData.teamName,
                submission_date: new Date().toLocaleString(),
                // Add any additional info you want to send to the registrant
            };

            const response = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID,
                templateParams
            );

            console.log('Confirmation email sent:', response);
            return { success: true, response };
        } catch (error) {
            console.error('Failed to send confirmation email:', error);
            return { success: false, error: error.message };
        }
    }
}

const emailService = new EmailService();
export default emailService;
