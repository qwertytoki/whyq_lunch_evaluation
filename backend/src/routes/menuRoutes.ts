import { Router } from "express"
import { getMenuItems } from "../menuItems";

const router = Router();

router.get('/menu', (req, res) => {
    const menuItems = getMenuItems();
    res.json(menuItems);
});

export default router;