import { databases, DATABASE_ID, REGISTRATION_COLLECTION_ID } from './config';
import { ID } from 'appwrite';
import emailService from '../services/emailService';

class RegistrationService {
    // Create a new registration
    async createRegistration({
        teamName,
        numberOfPeople,
        ageRange,
        briefDescription,
        fullName,
        phoneNumber,
        email,
        city
    }) {
        try {
            const registrationData = {
                teamName,
                numberOfPeople: parseInt(numberOfPeople),
                ageRange,
                briefDescription: briefDescription || '',
                fullName,
                phoneNumber,
                email,
                city,
                createdAt: new Date().toISOString()
            };

            // 1. Save to Appwrite database first
            console.log('Saving registration to Appwrite...');
            const response = await databases.createDocument(
                DATABASE_ID,
                REGISTRATION_COLLECTION_ID,
                ID.unique(),
                registrationData
            );

            // 2. Send email notification to admin
            console.log('Sending email notification to admin...');
            const emailResult = await emailService.sendRegistrationNotification(registrationData);
            
            if (!emailResult.success) {
                console.warn('Email notification failed:', emailResult.error);
                // Don't fail the entire registration if email fails
            }

            // 3. Optionally send confirmation email to registrant
            try {
                console.log('Sending confirmation email to registrant...');
                await emailService.sendConfirmationToRegistrant(registrationData);
            } catch (confirmationError) {
                console.warn('Confirmation email failed:', confirmationError);
                // Don't fail the registration if confirmation email fails
            }

            return response;
        } catch (error) {
            console.error('Error creating registration:', error);
            throw error;
        }
    }

    // Get all registrations (for admin purposes)
    async getAllRegistrations() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                REGISTRATION_COLLECTION_ID
            );
            return response;
        } catch (error) {
            console.error('Error fetching registrations:', error);
            throw error;
        }
    }

    // Get a specific registration by ID
    async getRegistration(documentId) {
        try {
            const response = await databases.getDocument(
                DATABASE_ID,
                REGISTRATION_COLLECTION_ID,
                documentId
            );
            return response;
        } catch (error) {
            console.error('Error fetching registration:', error);
            throw error;
        }
    }

    // Update a registration
    async updateRegistration(documentId, data) {
        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                REGISTRATION_COLLECTION_ID,
                documentId,
                data
            );
            return response;
        } catch (error) {
            console.error('Error updating registration:', error);
            throw error;
        }
    }

    // Delete a registration
    async deleteRegistration(documentId) {
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                REGISTRATION_COLLECTION_ID,
                documentId
            );
            return true;
        } catch (error) {
            console.error('Error deleting registration:', error);
            throw error;
        }
    }
}

const registrationService = new RegistrationService();
export default registrationService;
