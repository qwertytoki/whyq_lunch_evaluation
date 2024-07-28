import { Firestore } from '@google-cloud/firestore';
import { Menu } from '../entitiies/Menu';
import dotenv from 'dotenv';

dotenv.config();
const firestore = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export class MenuDataAccess {
    async getMenuItems(): Promise<Menu[]> {
        const snapshot = await firestore.collection('menuItems').get();
        const menuItems = snapshot.docs.map((doc) => {
            const data = doc.data();
            return new Menu(
                doc.id,
                data.name,
                data.store_name,
                data.review_score,
                data.photo_url,
            );
        });
        return menuItems;
    }

    async getMenuItemsById(id: string): Promise<Menu | null> {
        const snapshot = await firestore
            .collection('menuItems')
            .doc(id.toString())
            .get();
        if (!snapshot.exists) {
            return null;
        }
        const data = snapshot.data();
        if (!data) {
            return null;
        }
        return new Menu(
            snapshot.id,
            data.name,
            data.store_name,
            data.review_score,
            data.photo_url,
        );
    }
}
