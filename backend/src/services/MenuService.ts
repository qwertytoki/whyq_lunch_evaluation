import { Menu } from '../entitiies/Menu';
import { MenuDetail } from '../entitiies/MenuDetail';
import { MenuDataAccess } from '../dataaccess/MenuDataAccess';

const menuDataAccess = new MenuDataAccess();

export class MenuService {
  async getMenuItems(): Promise<Menu[]> {
    return await menuDataAccess.getMenuItems();
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
