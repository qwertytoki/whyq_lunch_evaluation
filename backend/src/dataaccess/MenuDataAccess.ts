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
            return new Menu(data.menu_name, data.review_score, data.photo_url);
        });
        return menuItems;
    }

    async getMenuItemsByName(menuName: string): Promise<Menu | null> {
        const snapshot = await firestore
            .collection('menuItems')
            .where('menu_name', '==', menuName)
            .get();
        if (snapshot.docs.length === 0) {
            return null;
        }
        const data = snapshot.docs[0].data();
        if (!data) {
            return null;
        }
        return new Menu(data.menu_name, data.review_score, data.photo_url);
    }

    async getMenuItemsByNames(names: string[]): Promise<Menu[]> {
        const promises = names.map((name) =>
            firestore
                .collection('menuItems')
                .where('menu_name', '==', name)
                .get(),
        );
        const snapshots = await Promise.all(promises);

        const menus = snapshots
            .filter((snapshot) => !snapshot.empty)
            .map((snapshot) => {
                const doc = snapshot.docs[0];
                const data = doc.data();
                if (!data) {
                    throw new Error('Data not found');
                }
                return new Menu(
                    data.menu_name,
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
        const menuNames = snapshot.docs.map((doc) => doc.data().menu_name);
        const menus = await this.getMenuItemsByNames(menuNames);
        return new DailyLunchMenus(dateString, menus);
    }

    async updateReviewScore(
        menuName: string,
        reviewScore: number,
    ): Promise<void> {
        const snapshot = await firestore
            .collection('menuItems')
            .where('menu_name', '==', menuName)
            .get();

        if (!snapshot.empty) {
            const docRef = snapshot.docs[0].ref;
            await docRef.update({ review_score: reviewScore });
        }
    }
}
