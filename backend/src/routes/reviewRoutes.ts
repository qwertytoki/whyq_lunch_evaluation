import { Router } from 'express';
import { getReviewByMenuId, postReview } from '../handlers/reviewHandler';

const router = Router();

router.get('/review/:menuId', getReviewByMenuId);
router.post('/review', postReview);

export default router;
