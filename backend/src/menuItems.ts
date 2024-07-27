import { Menu } from "./entitiies/menu";

export function getMenuItems(): Menu[] {
    //TODO these data will get from database.
    return [
        new Menu(1, 'Pizza', 4.5, 'https://thumb.photo-ac.com/3e/3ef8c1dab024a40572616f3ec4c3d3b5_w.jpeg'),
        new Menu(2, 'Burger', 4.2, 'https://thumb.photo-ac.com/3e/3ef8c1dab024a40572616f3ec4c3d3b5_w.jpeg'),
        new Menu(3, 'Pasta', 4.1, 'https://thumb.photo-ac.com/3e/3ef8c1dab024a40572616f3ec4c3d3b5_w.jpeg'),
    ];
}
