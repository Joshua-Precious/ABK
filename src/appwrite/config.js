import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

// Database and Collection IDs - you'll need to create these in your Appwrite console
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'abk-database';
export const REGISTRATION_COLLECTION_ID = import.meta.env.VITE_APPWRITE_REGISTRATION_COLLECTION_ID || 'registrations';

export default client;
