import { Firestore } from '@google-cloud/firestore';
import { Menu } from '../entitiies/Menu';
import dotenv from 'dotenv';
import { DailyLunchMenus } from '../entitiies/DailyLunchMenus';

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

    async getMenuItemsByIds(ids: string[]): Promise<Menu[]> {
        const promises = ids.map((id) =>
            firestore.collection('menuItems').doc(id).get(),
        );
        const snapshots = await Promise.all(promises);

        const menus = snapshots
            .filter((snapshot) => snapshot.exists)
            .map((snapshot) => {
                const data = snapshot.data();
                if (!data) {
                    throw new Error('Data not found');
                }
                return new Menu(
                    snapshot.id,
                    data.name,
                    data.store_name,
                    data.review_score,
                    data.photo_url,
                );
            });
        return menus;
    }

    async getDailyLunchMenus(dateString: string): Promise<DailyLunchMenus> {
        const snapshot = await firestore
            .collection('dailyLunchMenus')
            .where('date_string', '==', dateString)
            .get();
        if (snapshot.empty) {
            return new DailyLunchMenus(dateString, []);
        }
        const menuIds = snapshot.docs.map((doc) => doc.data().menu_id);
        const menus = await this.getMenuItemsByIds(menuIds);
        return new DailyLunchMenus(dateString, menus);
    }
}
