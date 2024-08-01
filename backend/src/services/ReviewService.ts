import { ReviewDataAccess } from '../dataaccess/ReviewDataAccess';
import { Review } from '../entitiies/Review';
import { MenuDataAccess } from '../dataaccess/MenuDataAccess';

const reviewDataAccess = new ReviewDataAccess();
const menuDataAccess = new MenuDataAccess();

export class ReviewService {
    async getReviewByMenuName(menuName: string): Promise<Review[]> {
        return await reviewDataAccess.getReviewByMenuName(menuName);
    }

    async postReview(review: Review): Promise<void> {
        await reviewDataAccess.postReview(review);

        const reviews = await reviewDataAccess.getReviewByMenuName(
            review.menuName,
        );
        const totalScore = reviews.reduce(
            (sum, rev) => sum + rev.reviewScore,
            0,
        );
        const newAverageScore = parseFloat(
            (totalScore / reviews.length).toFixed(1),
        );
        await menuDataAccess.updateReviewScore(
            review.menuName,
            newAverageScore,
        );
    }
}
