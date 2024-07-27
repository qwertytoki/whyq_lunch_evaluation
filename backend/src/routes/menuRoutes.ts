import { Router } from "express"
import { getMenuItems } from "../menuItems";

const router = Router();

router.get('/menu', (req, res) => {
    const menuItems = getMenuItems();
    res.json(menuItems);
});

router.get('/menu/:id', (req, res) => {
    const { id } = req.params;
    const menuItems = getMenuItems();
    const parsedId = parseInt(id);
    const menu = menuItems.find(item => item.id === (isNaN(parsedId) ? -1 : parsedId));
    if (menu) {
        res.json(menu);
    } else {
        res.status(404).json({ message: "Menu not found" });
    }
});

export default router;