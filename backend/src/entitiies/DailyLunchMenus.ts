import { Menu } from './Menu';

export class DailyLunchMenus {
    date: Date;
    menus: Menu[];

    constructor(date: Date, menus: Menu[]) {
        this.date = date;
        this.menus = menus;
    }
}
