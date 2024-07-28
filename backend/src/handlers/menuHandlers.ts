import { MenuService } from '../services/MenuService';

const menuService = new MenuService();

import { Request, Response } from 'express';

export const getMenuItems = async (req: Request, res: Response) => {
  const menuItems = await menuService.getMenuItems();
  res.json(menuItems);
};

export const getMenuDetails = (req: Request, res: Response) => {
  const menuId = req.params.id;
  const persedId = parseInt(menuId);
  if (isNaN(persedId)) {
    res.status(400).json({ error: 'Invalid menu id' });
    return;
  }
  const menuDetails = menuService.getMenuDetail(persedId);
  if (menuDetails === null) {
    res.status(404).json({ error: 'Menu not found' });
    return;
  }
  res.json(menuDetails);
};
