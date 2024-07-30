import { MenuService } from '../services/MenuService';

const menuService = new MenuService();

import { Request, Response } from 'express';

export const getMenuItems = async (req: Request, res: Response) => {
    const menuItems = await menuService.getMenuItems();
    res.json(menuItems);
};

export const getMenuDetails = async (req: Request, res: Response) => {
    let menuName = req.query.name as string;
    const menuDetails = await menuService.getMenuDetails(menuName);
    if (menuDetails === undefined) {
        res.status(404).json({ error: 'Menu not found' });
        return;
    }
    res.json(menuDetails);
};

export const getDailyLunchMenus = async (req: Request, res: Response) => {
    let dateString = req.query.date as string;

    if (!dateString) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateString = `${year}-${month}-${day}`;
    }
    const dailyLunchMenus = await menuService.getDailyLunchMenus(dateString);
    res.json(dailyLunchMenus);
};
