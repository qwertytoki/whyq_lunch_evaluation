import { ReviewDataAccess } from '../dataaccess/ReviewDataAccess';
import { Review } from '../entitiies/Review';

const reviewDataAccess = new ReviewDataAccess();

export class ReviewService {
    async getReviewByMenuName(menuName: string): Promise<Review[]> {
        return await reviewDataAccess.getReviewByMenuName(menuName);
    }

    async postReview(review: Review): Promise<void> {
        await reviewDataAccess.postReview(review);
    }
}
