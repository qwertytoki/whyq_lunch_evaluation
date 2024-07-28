export class Review {
    id: string;
    menu_id: string;
    review_comment: string;
    date: Date;

    constructor(
        id: string,
        menu_id: string,
        review_comment: string,
        date: Date,
    ) {
        this.id = id;
        this.menu_id = menu_id;
        this.review_comment = review_comment;
        this.date = date;
    }
}
