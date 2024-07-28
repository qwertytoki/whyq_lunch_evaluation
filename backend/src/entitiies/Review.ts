export class Review {
    id: string;
    menu_id: string;
    review_comment: string;
    review_score: number;
    date: Date;

    constructor(
        id: string,
        menu_id: string,
        review_comment: string,
        review_score: number,
        date: Date,
    ) {
        this.id = id;
        this.menu_id = menu_id;
        this.review_comment = review_comment;
        this.review_score = review_score;
        this.date = date;
    }
}
