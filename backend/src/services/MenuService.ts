import { Firestore } from "@google-cloud/firestore";
import { Menu } from "../entitiies/Menu";
import { MenuDetail } from "../entitiies/MenuDetail";
import dotenv from "dotenv";

dotenv.config();
const firestore = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export class MenuService {

    async getMenuItems(): Promise<Menu[]> {
        const snapshot = await firestore.collection('menuItems').get();
        const menuItems = snapshot.docs.map(doc => {
            const data = doc.data();
            return new Menu(data.id, data.name, data.store_name, data.review_score, data.photo_url);
        });
        return menuItems;
    }

    getMenuDetail(id: number): Menu | null {
        // const menuItems = this.getMenuItems();
        // const menu = menuItems.find(item => item.id === id);
        // if (menu) {
        //     return new MenuDetail(
        //         menu.id,
        //         menu.name,
        //         menu.store_name,
        //         menu.review_score,
        //         menu.photo_url,
        //         [], // review_comments
        //         []  // listed_history
        //     );
        // }
        return null;
    }
}