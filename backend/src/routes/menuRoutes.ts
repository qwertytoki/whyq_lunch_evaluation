import { Router } from "express"
import { MenuDetail } from "../entitiies/MenuDetail";
import { MenuService } from "../services/MenuService";

const router = Router();

router.get('/menu', (req, res) => {
    const menuItems = MenuService.getMenuItems();
    res.json(menuItems);
});

router.get('/menu/:id', (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) {
        res.status(400).send('Invalid id');
        return;
    }
    const menuDetail = MenuService.getMenuDetail(parsedId);
    if(menuDetail) {
        res.json(menuDetail);
    } else {
        res.status(404).send('Menu not found');
    }
});

export default router;