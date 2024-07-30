import { Router } from 'express';
import {
    getMenuDetails,
    getMenuItems,
    getDailyLunchMenus,
} from '../handlers/menuHandlers';

const router = Router();

router.get('/menu/daily', getDailyLunchMenus);
router.get('/menu/detail', getMenuDetails);
router.get('/menu', getMenuItems);

export default router;
