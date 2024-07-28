import { Menu } from './Menu';

export class DailyLunchMenus {
    dateString: string;
    menus: Menu[];

    constructor(dateString: string, menus: Menu[]) {
        this.dateString = dateString;
        this.menus = menus;
    }
}
