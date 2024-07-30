import { Router } from 'express';
import { getReviewByMenuName, postReview } from '../handlers/reviewHandler';

const router = Router();

router.get('/review/:menuId', getReviewByMenuName);
router.post('/review', postReview);

export default router;
