import { Firestore } from '@google-cloud/firestore';
import { Menu } from '../entitiies/Menu';
import { MenuDetail } from '../entitiies/MenuDetail';
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
        data.id,
        data.name,
        data.store_name,
        data.review_score,
        data.photo_url,
      );
    });
    return menuItems;
  }

  async getMenuDetail(id: string): Promise<MenuDetail | null> {
    return null;
    //     const snapshot = await firestore.collection('menuItems').doc(id.toString()).get();
    //     if (!snapshot.exists) {
    //         return null;
    //     }
    //     const data = snapshot.data();
    //     return new MenuDetail(
    //         data.id,
    //         data.name,
    //         data.store_name,
    //         data.review_score,
    //         data.photo_url,
    //         data.review_comments,
    //         data.listed_history
    //     );
  }
}
