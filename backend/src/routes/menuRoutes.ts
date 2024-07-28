import { Router } from 'express';
import { getMenuDetails, getMenuItems } from '../handlers/menuHandlers';

const router = Router();

router.get('/menu', getMenuItems);
router.get('/menu/:id', getMenuDetails);

export default router;
