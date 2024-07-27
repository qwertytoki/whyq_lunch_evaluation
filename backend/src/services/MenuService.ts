import { Menu } from "../entitiies/Menu";
import { MenuDetail } from "../entitiies/MenuDetail";

export class MenuService {
    getMenuItems(): Menu[] {
        //TODO these data will get from database.
        return [
            new Menu(1, 'Pizza', 'test store', 4.5, 'https://thumb.photo-ac.com/3e/3ef8c1dab024a40572616f3ec4c3d3b5_w.jpeg'),
            new Menu(2, 'Burger', 'test store', 4.2, 'https://thumb.photo-ac.com/3e/3ef8c1dab024a40572616f3ec4c3d3b5_w.jpeg'),
            new Menu(3, 'Pasta', 'test store', 4.1, 'https://thumb.photo-ac.com/3e/3ef8c1dab024a40572616f3ec4c3d3b5_w.jpeg'),
        ];
    }

    getMenuDetail(id: number): Menu | null {
        const menuItems = this.getMenuItems();
        const menu = menuItems.find(item => item.id === id);
        if (menu) {
            return new MenuDetail(
                menu.id,
                menu.name,
                menu.store_name,
                menu.review_score,
                menu.photo_url,
                [], // review_comments
                []  // listed_history
            );
        }
        return null;
    }
}