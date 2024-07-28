import { Menu } from '../entitiies/Menu';
import { MenuDetail } from '../entitiies/MenuDetail';
import { MenuDataAccess } from '../dataaccess/MenuDataAccess';
import { ReviewDataAccess } from '../dataaccess/ReviewDataAccess';

const menuDataAccess = new MenuDataAccess();
const reviewDataAccess = new ReviewDataAccess();

export class MenuService {
    async getMenuItems(): Promise<Menu[]> {
        return await menuDataAccess.getMenuItems();
    }

    async getMenuDetails(id: string): Promise<MenuDetail | undefined> {
        const menu = await menuDataAccess.getMenuItemsById(id);
        const reviews = await reviewDataAccess.getReviewByMenuId(id);
        const review_comments = reviews.map((review) => review.review_comment);
        const listed_history = reviews.map((review) => review.date);
        if (menu) {
            return new MenuDetail(
                menu.id,
                menu.name,
                menu.store_name,
                menu.review_score,
                menu.photo_url,
                review_comments,
                listed_history,
            );
        }
    }
}
