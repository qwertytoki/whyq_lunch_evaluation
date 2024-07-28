import { MenuService } from '../services/MenuService';

const menuService = new MenuService();

import { Request, Response } from 'express';

export const getMenuItems = async (req: Request, res: Response) => {
    const menuItems = await menuService.getMenuItems();
    res.json(menuItems);
};

export const getMenuDetails = async (req: Request, res: Response) => {
    const menuId = req.params.id;
    const menuDetails = await menuService.getMenuDetails(menuId);
    if (menuDetails === undefined) {
        res.status(404).json({ error: 'Menu not found' });
        return;
    }
    res.json(menuDetails);
};
