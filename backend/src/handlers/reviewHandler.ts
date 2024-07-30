import { ReviewService } from '../services/ReviewService';

const reviewService = new ReviewService();

import { Request, Response } from 'express';

export const getReviewByMenuName = async (req: Request, res: Response) => {
    const menuId = req.params.menuId;
    const reviews = await reviewService.getReviewByMenuName(menuId);
    res.json(reviews);
};

export const postReview = async (req: Request, res: Response) => {
    const review = req.body;
    await reviewService.postReview(review);
    res.json({ message: 'Review posted' });
};
