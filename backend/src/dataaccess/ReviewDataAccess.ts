import { Firestore } from '@google-cloud/firestore';
import dotenv from 'dotenv';
import { Review } from '../entitiies/Review';

dotenv.config();
const firestore = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export class ReviewDataAccess {
    async getReviewByMenuId(menuId: string): Promise<Review[]> {
        const snapshot = await firestore
            .collection('reviews')
            .where('menu_id', '==', menuId)
            .get();
        const reviews = snapshot.docs.map((doc) => {
            const data = doc.data();
            return new Review(
                doc.id,
                data.menu_id,
                data.review_comment,
                data.review_score,
                data.date.toDate(),
            );
        });
        return reviews;
    }
    async postReview(review: Review): Promise<void> {
        await firestore.collection('reviews').add({
            menu_id: review.menuId,
            review_comment: review.reviewComment,
            review_score: review.reviewScore,
            date: new Date(),
        });
    }
}
