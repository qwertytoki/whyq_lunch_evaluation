import { Router } from 'express';
import {
    getMenuDetails,
    getMenuItems,
    getDailyLunchMenus,
} from '../handlers/menuHandlers';

const router = Router();

router.get('/menu', getMenuItems);
router.get('/menu/:id', getMenuDetails);
router.get('/menu/daily', getDailyLunchMenus);

export default router;
