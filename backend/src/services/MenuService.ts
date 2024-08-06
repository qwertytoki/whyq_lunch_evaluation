import { Menu } from '../entitiies/Menu';
import { MenuDetail } from '../entitiies/MenuDetail';
import { MenuDataAccess } from '../dataaccess/MenuDataAccess';
import { ReviewDataAccess } from '../dataaccess/ReviewDataAccess';
import { DailyLunchMenus } from '../entitiies/DailyLunchMenus';

const menuDataAccess = new MenuDataAccess();
const reviewDataAccess = new ReviewDataAccess();

export class MenuService {
    async getMenuItems(): Promise<Menu[]> {
        return await menuDataAccess.getMenuItems();
    }

    async getMenuDetails(menuName: string): Promise<MenuDetail | undefined> {
        const menu = await menuDataAccess.getMenuItemsByName(menuName);
        const reviews = await reviewDataAccess.getReviewByMenuName(menuName);
        const reviewComments = reviews
            .map((review) => review.reviewComment)
            .filter((comment) => comment.trim() !== '');

        if (menu) {
            return new MenuDetail(
                menu.name,
                menu.reviewScore,
                menu.photoUrl,
                reviewComments,
                [],
            );
        }
    }

    async getDailyLunchMenus(
        dateString: string,
        sort: string,
    ): Promise<DailyLunchMenus> {
        return await menuDataAccess.getDailyLunchMenus(dateString, sort);
    }
}
