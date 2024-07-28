import { Menu } from '../entitiies/Menu';
import { MenuDetail } from '../entitiies/MenuDetail';
import { MenuDataAccess } from '../dataaccess/MenuDataAccess';

const menuDataAccess = new MenuDataAccess();

export class MenuService {
    async getMenuItems(): Promise<Menu[]> {
        return await menuDataAccess.getMenuItems();
    }

    async getMenuDetail(id: string): Promise<MenuDetail | null> {
        const menuItems = await this.getMenuItems();
        console.log(menuItems);

        const menu = menuItems.find((item: Menu) => item.id === id);
        if (menu) {
            return new MenuDetail(
                menu.id,
                menu.name,
                menu.store_name,
                menu.review_score,
                menu.photo_url,
                [], // review_comments
                [], // listed_history
            );
        }
        return null;
    }
}
