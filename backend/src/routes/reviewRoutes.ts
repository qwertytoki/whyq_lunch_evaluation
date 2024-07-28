import { Router } from 'express';
import { getReviewByMenuId } from '../handlers/reviewHandler';

const router = Router();

router.get('/review/:menuId', getReviewByMenuId);
// router.post('/review', postReview);

export default router;
