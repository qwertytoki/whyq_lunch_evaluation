import { ReviewService } from '../services/ReviewService';

const reviewService = new ReviewService();

import { Request, Response } from 'express';

export const getReviewByMenuId = async (req: Request, res: Response) => {
    const menuId = req.params.menuId;
    const reviews = await reviewService.getReviewByMenuId(menuId);
    res.json(reviews);
};
