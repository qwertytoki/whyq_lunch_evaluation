import { ReviewDataAccess } from '../dataaccess/ReviewDataAccess';
import { Review } from '../entitiies/Review';

const reviewDataAccess = new ReviewDataAccess();

export class ReviewService {
    async getReviewByMenuId(menuId: string): Promise<Review[]> {
        return await reviewDataAccess.getReviewByMenuId(menuId);
    }
}
