import { databases, DATABASE_ID, REGISTRATION_COLLECTION_ID } from '../appwrite/config';
import { ID, Permission, Role } from 'appwrite';

// This script helps you set up the database and collection programmatically
// Run this once after creating your Appwrite project

export async function setupAppwriteDatabase() {
    try {
        console.log('Setting up Appwrite database...');
        
        // Try to create the database
        try {
            const database = await databases.create(
                DATABASE_ID,
                'ABK Registration Database'
            );
            console.log('✅ Database created:', database);
        } catch (error) {
            if (error.code === 409) {
                console.log('✅ Database already exists');
            } else {
                throw error;
            }
        }
        
        // Try to create the collection
        try {
            const collection = await databases.createCollection(
                DATABASE_ID,
                REGISTRATION_COLLECTION_ID,
                'Team Registrations',
                [
                    Permission.create(Role.any()),
                    Permission.read(Role.any()),
                    Permission.update(Role.any()),
                    Permission.delete(Role.any())
                ]
            );
            console.log('✅ Collection created:', collection);
        } catch (error) {
            if (error.code === 409) {
                console.log('✅ Collection already exists');
            } else {
                throw error;
            }
        }
        
        // Create attributes
        const attributes = [
            { key: 'teamName', type: 'string', size: 255, required: true },
            { key: 'numberOfPeople', type: 'integer', required: true },
            { key: 'ageRange', type: 'string', size: 100, required: true },
            { key: 'briefDescription', type: 'string', size: 1000, required: false },
            { key: 'fullName', type: 'string', size: 255, required: true },
            { key: 'phoneNumber', type: 'string', size: 20, required: true },
            { key: 'email', type: 'email', required: true },
            { key: 'city', type: 'string', size: 100, required: true },
            { key: 'createdAt', type: 'datetime', required: true }
        ];
        
        for (const attr of attributes) {
            try {
                let attribute;
                switch (attr.type) {
                    case 'string':
                        attribute = await databases.createStringAttribute(
                            DATABASE_ID,
                            REGISTRATION_COLLECTION_ID,
                            attr.key,
                            attr.size,
                            attr.required
                        );
                        break;
                    case 'integer':
                        attribute = await databases.createIntegerAttribute(
                            DATABASE_ID,
                            REGISTRATION_COLLECTION_ID,
                            attr.key,
                            attr.required
                        );
                        break;
                    case 'email':
                        attribute = await databases.createEmailAttribute(
                            DATABASE_ID,
                            REGISTRATION_COLLECTION_ID,
                            attr.key,
                            attr.required
                        );
                        break;
                    case 'datetime':
                        attribute = await databases.createDatetimeAttribute(
                            DATABASE_ID,
                            REGISTRATION_COLLECTION_ID,
                            attr.key,
                            attr.required
                        );
                        break;
                }
                console.log(`✅ Attribute ${attr.key} created:`, attribute);
            } catch (error) {
                if (error.code === 409) {
                    console.log(`✅ Attribute ${attr.key} already exists`);
                } else {
                    console.error(`❌ Error creating attribute ${attr.key}:`, error);
                }
            }
        }
        
        console.log('🎉 Appwrite setup completed successfully!');
        return true;
        
    } catch (error) {
        console.error('❌ Setup failed:', error);
        return false;
    }
}

// Uncomment the line below to run the setup
// setupAppwriteDatabase();
