import { Menu } from '../entitiies/Menu';
import { MenuDetail } from '../entitiies/MenuDetail';
import { MenuDataAccess } from '../dataaccess/MenuDataAccess';

const menuDataAccess = new MenuDataAccess();

export class MenuService {
    async getMenuItems(): Promise<Menu[]> {
        return await menuDataAccess.getMenuItems();
    }

    async getMenuDetails(id: string): Promise<MenuDetail | undefined> {
        const menu = await menuDataAccess.getMenuItemsById(id);
        console.log(menu);
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
    }
}
