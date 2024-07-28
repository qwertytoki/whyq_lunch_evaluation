import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';

dotenv.config();

console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log('GOOGLE_CLOUD_PROJECT:', process.env.GOOGLE_CLOUD_PROJECT);

const firestore = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

async function testFirestore() {
    try {
        const snapshot = await firestore.collection('menuItems').limit(1).get();
        console.log('Successfully connected to Firestore');
    } catch (error) {
        console.error('Error connecting to Firestore:', error);
    }
}

testFirestore();