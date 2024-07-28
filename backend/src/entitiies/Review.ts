export class Review {
    id: string;
    menuId: string;
    reviewComment: string;
    reviewScore: number;
    date: Date;

    constructor(
        id: string,
        menuId: string,
        reviewComment: string,
        reviewScore: number,
        date: Date,
    ) {
        this.id = id;
        this.menuId = menuId;
        this.reviewComment = reviewComment;
        this.reviewScore = reviewScore;
        this.date = date;
    }
}
